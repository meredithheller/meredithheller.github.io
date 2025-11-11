import { useState } from 'react';
import type { TimelineItem as TimelineItemType } from '../../types/timeline';
import TimelineItem from './TimelineItem';
import './Timeline.css';

interface TimelineProps {
  items: TimelineItemType[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="timeline-container">
        <div className="timeline-empty">
          <p>No items found for this filter.</p>
        </div>
      </div>
    );
  }

  // Calculate offset for each item based on hovered item
  // When item scales to 1.15, it expands 21px on each side (42px total / 2)
  // Items shift away to make room, with immediate neighbors shifting the most
  const getItemOffset = (index: number): number => {
    if (hoveredIndex === null) return 0;
    
    const hovered = hoveredIndex;
    const itemWidth = 280; // Base width
    const scale = 1.15;
    const expansionPerSide = (itemWidth * (scale - 1)) / 2; // ~21px expansion per side
    
    if (index < hovered) {
      // Items to the left shift left (negative)
      const distance = hovered - index;
      // Immediate neighbor needs to shift by expansion amount
      if (distance === 1) {
        return -expansionPerSide; // ~21px for immediate left neighbor
      } else if (distance === 2) {
        return -expansionPerSide * 0.6; // ~13px for second neighbor
      } else if (distance === 3) {
        return -expansionPerSide * 0.3; // ~6px for third neighbor
      } else {
        return -expansionPerSide * 0.15; // ~3px for further items
      }
    } else if (index > hovered) {
      // Items to the right shift right (positive)
      const distance = index - hovered;
      if (distance === 1) {
        return expansionPerSide; // ~21px for immediate right neighbor
      } else if (distance === 2) {
        return expansionPerSide * 0.6; // ~13px for second neighbor
      } else if (distance === 3) {
        return expansionPerSide * 0.3; // ~6px for third neighbor
      } else {
        return expansionPerSide * 0.15; // ~3px for further items
      }
    } else {
      // Hovered item stays centered (no offset)
      return 0;
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-scroll">
        <div className="timeline-line"></div>
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isHovered={hoveredIndex === index}
            offset={getItemOffset(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

