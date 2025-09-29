import { fetchTvShowVideos } from '@/app/services/tvShows';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchTvShowVideos hook
 * Fetches videos (trailers, clips) for a given TV show using React Query
 * @param tvShowId - The ID of the TV show to fetch videos for
 */
export function useFetchTvShowVideos(
  tvShowId: number | null,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tv-show-videos', tvShowId], // Unique query key for caching
    queryFn: () => tvShowId && fetchTvShowVideos(tvShowId), // Fetch function
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    enabled, // Only run the query if enabled is true
  });
}
