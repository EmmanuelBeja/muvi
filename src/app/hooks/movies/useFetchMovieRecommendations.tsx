import { fetchMovieRecommendations } from '@/app/services/movies';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchMovieRecommendation hook
 * Fetches recommended movies for a given movieId using React Query
 */
export function useFetchMovieRecommendation(movieId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['movie-recommendations', movieId],
    queryFn: () => fetchMovieRecommendations(Number(movieId)),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}
