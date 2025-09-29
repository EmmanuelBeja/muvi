import { fetchTvShowDetails } from '@/app/services/tvShows';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchTvShowDetails hook
 * Fetches detailed information for a TV show using React Query
 */
export function useFetchTvShowDetails(tvShowId: number) {
  return useQuery({
    queryKey: ['tv-show-details', tvShowId],
    queryFn: () => fetchTvShowDetails(Number(tvShowId)),
    staleTime: 1000 * 60 * 5,
  });
}
