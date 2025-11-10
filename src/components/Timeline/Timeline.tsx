import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types/timeline';
import TimelineItem from './TimelineItem';
import './Timeline.css';

interface TimelineProps {
  items: TimelineItemType[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="timeline-container">
        <div className="timeline-empty">
          <p>No items found for this filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-container">
      <div className="timeline-scroll">
        <div className="timeline-line"></div>
        {items.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

