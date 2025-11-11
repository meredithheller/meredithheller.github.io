export type TimelineCategory = 'Listening' | 'Loving' | 'Building' | 'Reading' | 'Doing' | 'Creating';

export interface BaseTimelineItem {
  id: string;
  category: TimelineCategory;
  title: string;
  description: string;
  image: string;
  date?: string;
}

export interface ListeningItem extends BaseTimelineItem {
  category: 'Listening';
  spotifyLink: string;
}

export interface LovingItem extends BaseTimelineItem {
  category: 'Loving';
  productLink?: string;
  // If no productLink, it's a quote/board from Pinterest
}

export interface BuildingItem extends BaseTimelineItem {
  category: 'Building';
  projectType: 'career' | 'personal';
}

export interface ReadingItem extends BaseTimelineItem {
  category: 'Reading';
  // Image will be uploaded book cover
  // Title is book title
  // Description is review/thoughts
}

export interface DoingItem extends BaseTimelineItem {
  category: 'Doing';
  // Image is from life
  // Title and description are custom
}

export interface CreatingItem extends BaseTimelineItem {
  category: 'Creating';
  // Image is from baking/creating ventures
  // Title and description are custom
}

export type TimelineItem = ListeningItem | LovingItem | BuildingItem | ReadingItem | DoingItem | CreatingItem;

