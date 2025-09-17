import { fetchMovieRecommendations } from '@/app/services/tmdb';
import { useQuery } from '@tanstack/react-query';

export function useFetchMovieRecommendation(movieId: number) {
  return useQuery({
    queryKey: ['movie-recommendations', movieId],
    queryFn: () => fetchMovieRecommendations(Number(movieId)),
    staleTime: 1000 * 60 * 5,
  });
}
