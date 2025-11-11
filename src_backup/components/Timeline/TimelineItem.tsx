import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types/timeline';
import './TimelineItem.css';

interface TimelineItemProps {
  item: TimelineItemType;
  isHovered: boolean;
  offset: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  item, 
  isHovered, 
  offset, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const getCategoryColor = (category: TimelineItemType['category']): string => {
    switch (category) {
      case 'Listening':
        return '#4F6784';
      case 'Loving':
        return '#F8DBEE';
      case 'Building':
        return '#2F3A4C';
      case 'Reading':
        return '#493E32';
      case 'Doing':
        return '#D5E4F0';
      case 'Creating':
        return '#E8C5A0'; // Warm beige/tan for baking/creating
      default:
        return '#4F6784';
    }
  };

  const handleClick = () => {
    if (item.category === 'Listening' && 'spotifyLink' in item) {
      window.open(item.spotifyLink, '_blank');
    } else if (item.category === 'Loving' && 'productLink' in item && item.productLink) {
      window.open(item.productLink, '_blank');
    }
  };

  const isClickable = (item.category === 'Listening') || 
                     (item.category === 'Loving' && 'productLink' in item && item.productLink);

  // Calculate transform: translate first (in original space), then scale if hovered
  // This ensures offset is applied in the original coordinate system
  const transform = isHovered 
    ? `translateX(${offset}px) scale(1.15)` 
    : `translateX(${offset}px) scale(1)`;

  return (
    <div 
      className={`timeline-item ${isClickable ? 'clickable' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{ 
        borderColor: getCategoryColor(item.category),
        transform: transform,
      }}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="timeline-item-image-container">
        <img 
          src={item.image} 
          alt={item.title}
          className="timeline-item-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        <div 
          className={`timeline-item-category-badge ${isHovered ? 'hidden' : ''}`}
          style={{ backgroundColor: getCategoryColor(item.category) }}
        >
          {item.category}
        </div>
      </div>
      <div className="timeline-item-content">
        <h3 className="timeline-item-title">{item.title}</h3>
        <p className="timeline-item-description">{item.description}</p>
        {item.category === 'Building' && 'projectType' in item && (
          <span className="timeline-item-tag">{item.projectType}</span>
        )}
        {item.date && (
          <span className="timeline-item-date">{item.date}</span>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;

