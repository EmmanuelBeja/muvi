import { fetchMovieVideos } from '@/app/services/movies';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchMovieVideos hook
 * Fetches videos (trailers, clips) for a given movie using React Query
 * @param movieId - The ID of the movie to fetch videos for
 */
export function useFetchMovieVideos(movieId: number | null, enabled: boolean) {
  return useQuery({
    queryKey: ['movie-videos', movieId], // Unique query key for caching
    queryFn: () => movieId && fetchMovieVideos(movieId), // Fetch function
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    enabled, // Only run the query if enabled is true
  });
}
