import { searchMovies } from '@/app/services/tmdb';
import { useQuery } from '@tanstack/react-query';

export function useFetchMovieSearch(debouncedQuery: string) {
  return useQuery({
    queryKey: ['movie-search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery, // ✅ don’t fetch when input is empty
  });
}
