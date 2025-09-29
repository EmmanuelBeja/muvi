import {
  fetchTvShowDetails,
  fetchTvShowRecommendations,
  fetchTvShowVideos,
} from '@/app/services/tvShows';
import { useQueryClient } from '@tanstack/react-query';

/**
 * usePrefetchTvShow hook
 * Prefetches tv Show details, recommendations, and videos for a given tvShowId
 * Improves perceived performance by loading data before navigation
 */
export function usePrefetchTvShow() {
  // Get the React Query client instance
  const qc = useQueryClient();

  // Prefetch relevant tvShow queries for the given tvShowId
  return (tvShowId: number | string) => {
    // Prefetch tvShow details
    qc.prefetchQuery({
      queryKey: ['tv-show-details', tvShowId],
      queryFn: () => fetchTvShowDetails(Number(tvShowId)),
      staleTime: 1000 * 60 * 5,
    });

    // Prefetch tvShow recommendations
    qc.prefetchQuery({
      queryKey: ['tv-show-recommendations', tvShowId],
      queryFn: () => fetchTvShowRecommendations(Number(tvShowId)),
      staleTime: 1000 * 60 * 5,
    });

    // Prefetch tvShow videos
    qc.prefetchQuery({
      queryKey: ['tv-show-videos', tvShowId],
      queryFn: () => fetchTvShowVideos(Number(tvShowId)),
      staleTime: 1000 * 60 * 5,
    });
  };
}
