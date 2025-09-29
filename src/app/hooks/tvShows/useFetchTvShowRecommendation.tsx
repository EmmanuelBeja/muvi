import { fetchTvShowRecommendations } from '@/app/services/tvShows';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchTvShowRecommendation hook
 * Fetches recommended TV shows for a given TV show ID using React Query
 */
export function useFetchTvShowRecommendation(
  tvShowId: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tv-show-recommendations', tvShowId],
    queryFn: () => fetchTvShowRecommendations(Number(tvShowId)),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}
