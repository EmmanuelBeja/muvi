import { searchMovies } from '@/app/services/tmdb';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchMovieSearch hook
 * Fetches movies based on a debounced search query using React Query
 * Only runs when the query is not empty
 */
export function useFetchMovieSearch(debouncedQuery: string) {
  return useQuery({
    queryKey: ['movie-search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery, // don’t fetch when input is empty
  });
}
