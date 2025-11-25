// React hook for managing timeline chips
import { useState, useEffect, useMemo } from 'react';
import { fetchRecentChips } from '../lib/api';
import type { TimelineItem, TimelineCategory } from '../types/timeline';

interface UseTimelineChipsReturn {
  chips: TimelineItem[];
  selectedCategory: TimelineCategory | null;
  setSelectedCategory: (category: TimelineCategory | null) => void;
  filteredChips: TimelineItem[];
  isLoading: boolean;
  error: Error | null;
}

export function useTimelineChips(initialLimit: number = 50): UseTimelineChipsReturn {
  const [chips, setChips] = useState<TimelineItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TimelineCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const chipsData = await fetchRecentChips(initialLimit);
        setChips(chipsData);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load timeline data');
        setError(error);
        console.error('Error loading timeline data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [initialLimit]);

  // Filter chips based on selected category
  const filteredChips = useMemo(() => {
    if (selectedCategory === null) {
      return chips;
    }
    return chips.filter(chip => chip.category === selectedCategory);
  }, [chips, selectedCategory]);

  return {
    chips,
    selectedCategory,
    setSelectedCategory,
    filteredChips,
    isLoading,
    error
  };
}

