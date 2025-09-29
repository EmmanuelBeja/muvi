import {
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieVideos,
} from '@/app/services/movies';
import { useQueryClient } from '@tanstack/react-query';

/**
 * usePrefetchMovie hook
 * Prefetches movie details, recommendations, and videos for a given movieId
 * Improves perceived performance by loading data before navigation
 */
export function usePrefetchMovie() {
  // Get the React Query client instance
  const qc = useQueryClient();

  // Prefetch relevant movie queries for the given movieId
  return (movieId: number | string) => {
    // Prefetch movie details
    qc.prefetchQuery({
      queryKey: ['movie-details', movieId],
      queryFn: () => fetchMovieDetails(Number(movieId)),
      staleTime: 1000 * 60 * 5,
    });

    // Prefetch movie recommendations
    qc.prefetchQuery({
      queryKey: ['movie-recommendations', movieId],
      queryFn: () => fetchMovieRecommendations(Number(movieId)),
      staleTime: 1000 * 60 * 5,
    });

    // Prefetch movie videos
    qc.prefetchQuery({
      queryKey: ['movie-videos', movieId],
      queryFn: () => fetchMovieVideos(Number(movieId)),
      staleTime: 1000 * 60 * 5,
    });
  };
}
