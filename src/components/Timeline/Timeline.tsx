import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types/timeline';
import TimelineItem from './TimelineItem';
import './Timeline.css';

interface TimelineProps {
  items: TimelineItemType[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="timeline-container">
      <div className="timeline-scroll">
        {items.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

