import { useEffect, useRef, useState } from "react";
import { useTimelineChips } from "../../hooks/useTimelineChips";
import type { TimelineItem } from "../../types/timeline";
import "./ConfettiParticles.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  width: number;
  height: number;
  settled: boolean;
  delay: number;
  initialY: number;
  hovered: boolean;
  chipData?: TimelineItem; // Link particle to timeline chip
  image?: HTMLImageElement; // Loaded image if available
}

interface ConfettiParticlesProps {
  onSettled?: () => void;
  onChipClick?: (chip: TimelineItem) => void;
}

export function ConfettiParticles({ onSettled, onChipClick }: ConfettiParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const hasNotifiedSettledRef = useRef(false);
  const onSettledRef = useRef(onSettled);
  const onChipClickRef = useRef(onChipClick);
  
  // Fetch timeline chips from Supabase
  const { chips, isLoading } = useTimelineChips(80);

  useEffect(() => {
    onSettledRef.current = onSettled;
    onChipClickRef.current = onChipClick;
  }, [onSettled, onChipClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Get category colors from chips or use defaults
    const getCategoryColor = (category?: string): string => {
      const colorMap: Record<string, string> = {
        'Listening': '#4F6784',
        'Loving': '#F8DBEE',
        'Building': '#4F6784',
        'Reading': '#D5E4F0',
        'Doing': '#D5E4F0',
        'Creating': '#E8C5A0',
      };
      return category ? (colorMap[category] || '#4F6784') : '#4F6784';
    };

    // Create particles from chips data, or use defaults if no chips
    const particleCount = Math.max(chips.length || 80, 80);
    const defaultColors = ["#4F6784", "#4F6784", "#4F6784", "#4F6784", "#D5E4F0", "#D5E4F0"];
    
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const chip = chips[i];
      const width = Math.random() * 15 + 15;
      const height = Math.random() * 20 + 15;
      const initialY = -Math.random() * 200 - 100;
      const color = chip ? getCategoryColor(chip.category) : defaultColors[Math.floor(Math.random() * defaultColors.length)];
      
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: initialY,
        initialY,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 5 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color,
        width,
        height,
        settled: false,
        delay: (i % 10) * 15,
        hovered: false,
        chipData: chip,
      };

      // Load image if chip has one
      if (chip?.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          particle.image = img;
        };
        img.onerror = () => {
          // If image fails to load, particle will use solid color
        };
        img.src = chip.image;
      }

      return particle;
    });

    const gravity = 0.6;
    const bounce = 0.65;
    const friction = 0.985;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - (particle.x + scrollOffset);
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Use 1.5x scale for hover detection to match the visual scale
        const hoverRadius = Math.max(particle.width, particle.height) * 1.5;
        particle.hovered = distance < hoverRadius;
      });
    };

    const handleClick = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        // Don't trigger click if user was dragging
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Find clicked particle
      const clickedParticle = particlesRef.current.find((particle) => {
        const dx = mouseX - (particle.x + scrollOffset);
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const clickRadius = Math.max(particle.width, particle.height) * 1.5;
        return distance < clickRadius;
      });

      if (clickedParticle?.chipData && onChipClickRef.current) {
        onChipClickRef.current(clickedParticle.chipData);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      if (canvas.style) {
        canvas.style.cursor = "grabbing";
      }
    };

    const handleMouseMoveCanvas = (e: MouseEvent) => {
      handleMouseMove(e);

      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastXRef.current;
        setScrollOffset((prev) => Math.max(prev + deltaX, -window.innerWidth * 1.5));
        lastXRef.current = e.clientX;
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      if (canvas.style) {
        canvas.style.cursor = "grab";
      }
    };

    if (canvas.style) {
      canvas.style.cursor = "grab";
    }
    canvas.addEventListener("mousemove", handleMouseMoveCanvas);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);
    canvas.addEventListener("click", handleClick);

    const animate = (timestamp: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allSettled = true;

      // Find the hovered particle
      const hoveredParticle = particlesRef.current.find((p) => p.hovered);
      const hoverScale = 1.5;
      const repulsionStrength = 0.08;
      const maxHorizontalVelocity = 1.5; // Limit horizontal movement

      // First pass: update physics and apply repulsion from hovered particle
      particlesRef.current.forEach((particle) => {
        if (elapsed < particle.delay) {
          allSettled = false;
          return;
        }

        // Apply gentle repulsion force from hovered particle
        if (hoveredParticle && particle !== hoveredParticle) {
          const hoveredWidth = hoveredParticle.width * hoverScale;
          const hoveredHeight = hoveredParticle.height * hoverScale;
          
          // Calculate distance between particle centers
          const dx = (particle.x + scrollOffset) - (hoveredParticle.x + scrollOffset);
          const dy = particle.y - hoveredParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Calculate the expanded bounds of the hovered particle
          const hoveredMaxDim = Math.max(hoveredWidth, hoveredHeight);
          const particleMaxDim = Math.max(particle.width, particle.height);
          const minDistance = (hoveredMaxDim + particleMaxDim) / 2;
          const repulsionRange = minDistance * 1.2; // Slightly larger range for smoother transition
          
          // If particles are close, apply gentle repulsion
          if (distance < repulsionRange && distance > 0) {
            const overlap = Math.max(0, minDistance - distance);
            // Use a smoother falloff curve
            const normalizedDistance = distance / repulsionRange;
            const falloff = 1 - normalizedDistance;
            const force = (overlap / minDistance) * repulsionStrength * falloff;
            
            // Normalize direction vector
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Apply gentle repulsion force (much smaller multiplier)
            const pushX = nx * force * 2;
            const pushY = ny * force * 3; // Slightly more vertical movement
            
            // Limit horizontal velocity to prevent flying across
            const newVx = particle.vx + pushX;
            particle.vx = Math.max(-maxHorizontalVelocity, Math.min(maxHorizontalVelocity, newVx));
            particle.vy += pushY;
            
            // If particle is settled, temporarily "unsettle" it to allow gentle movement
            if (particle.settled && (Math.abs(pushX) > 0.05 || Math.abs(pushY) > 0.05)) {
              particle.settled = false;
            }
          }
        }

        if (!particle.settled) {
          allSettled = false;

          particle.vy += gravity;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;

          // Apply more friction to horizontal movement to keep it localized
          particle.vx *= friction * 0.98; // Extra friction for horizontal
          particle.vy *= friction;

          if (particle.y + particle.height / 2 > canvas.height) {
            particle.y = canvas.height - particle.height / 2;
            particle.vy *= -bounce;
            particle.rotationSpeed *= bounce;

            if (Math.abs(particle.vy) < 0.5 && Math.abs(particle.vx) < 0.5) {
              particle.vy = 0;
              particle.vx = 0;
              particle.rotationSpeed = 0;
              particle.settled = true;
            }
          }

          if (particle.x - particle.width / 2 < 0) {
            particle.x = particle.width / 2;
            particle.vx *= -bounce;
          } else if (particle.x + particle.width / 2 > canvas.width) {
            particle.x = canvas.width - particle.width / 2;
            particle.vx *= -bounce;
          }
        }

        ctx.save();
        ctx.translate(particle.x + scrollOffset, particle.y);
        ctx.rotate(particle.rotation);

        if (particle.hovered) {
          ctx.scale(hoverScale, hoverScale);
        }

        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        // Draw image if available, otherwise draw colored rectangle
        if (particle.image && particle.image.complete) {
          // Draw image
          ctx.drawImage(
            particle.image,
            -particle.width / 2,
            -particle.height / 2,
            particle.width,
            particle.height
          );
        } else {
          // Draw colored rectangle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          const radius = 5;
          const x = -particle.width / 2;
          const y = -particle.height / 2;
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + particle.width - radius, y);
          ctx.quadraticCurveTo(x + particle.width, y, x + particle.width, y + radius);
          ctx.lineTo(x + particle.width, y + particle.height - radius);
          ctx.quadraticCurveTo(
            x + particle.width,
            y + particle.height,
            x + particle.width - radius,
            y + particle.height
          );
          ctx.lineTo(x + radius, y + particle.height);
          ctx.quadraticCurveTo(x, y + particle.height, x, y + particle.height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      // Notify parent when all particles are settled
      if (allSettled && !hasNotifiedSettledRef.current && onSettledRef.current) {
        // Add a small delay to ensure particles are truly settled
        setTimeout(() => {
          if (!hasNotifiedSettledRef.current && onSettledRef.current) {
            hasNotifiedSettledRef.current = true;
            onSettledRef.current();
          }
        }, 300);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMoveCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollOffset, chips, isLoading]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}

