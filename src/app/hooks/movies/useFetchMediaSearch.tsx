import { searchMovies } from '@/app/services/movies';
import { searchTvShows } from '@/app/services/tvShows';
import type { Media } from '@/app/types/';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchMediaSearch hook
 * Fetches both movies and TV shows based on a debounced search query
 * Runs only when the query is not empty
 */
export function useFetchMediaSearch(debouncedQuery: string) {
  return useQuery({
    queryKey: ['media-search', debouncedQuery],
    queryFn: async () => {
      const [movies = [], tvShows = []] = await Promise.all([
        searchMovies(debouncedQuery),
        searchTvShows(debouncedQuery),
      ]);

      return { movies: movies as Media[], tvShows: tvShows as Media[] }; // return both
    },
    enabled: !!debouncedQuery, // don’t fetch when input is empty
  });
}
