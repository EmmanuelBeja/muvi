import { fetchMovieDetails } from '@/app/services/tmdb';
import { useQuery } from '@tanstack/react-query';

export function useFetchMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => fetchMovieDetails(Number(movieId)),
    staleTime: 1000 * 60 * 5,
  });
}
