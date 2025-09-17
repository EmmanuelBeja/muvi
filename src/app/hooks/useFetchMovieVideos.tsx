import { fetchMovieVideos } from '@/app/services/tmdb';
import { useQuery } from '@tanstack/react-query';

export function useFetchMovieVideos(movieId: number) {
  return useQuery({
    queryKey: ['movie-videos', movieId],
    queryFn: () => fetchMovieVideos(movieId),
    staleTime: 1000 * 60 * 5,
  });
}
