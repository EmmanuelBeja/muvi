import {
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieVideos,
} from '@/app/services/tmdb';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchMovie() {
  const qc = useQueryClient();

  return (movieId: number | string) => {
    qc.prefetchQuery({
      queryKey: ['movie-details', movieId],
      queryFn: () => fetchMovieDetails(Number(movieId)),
      staleTime: 1000 * 60 * 5,
    });

    qc.prefetchQuery({
      queryKey: ['movie-recommendations', movieId],
      queryFn: () => fetchMovieRecommendations(Number(movieId)),
      staleTime: 1000 * 60 * 5,
    });

    qc.prefetchQuery({
      queryKey: ['movie-videos', movieId],
      queryFn: () => fetchMovieVideos(Number(movieId)),
      staleTime: 1000 * 60 * 5,
    });
  };
}
