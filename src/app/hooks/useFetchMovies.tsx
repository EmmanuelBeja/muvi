import { fetchMovies } from '@/app/services/tmdb';
import type { MovieCategories } from '@/app/types';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * useFetchMovies hook
 * Fetches movies by category with infinite scrolling support
 * Uses React Query's useInfiniteQuery for pagination
 */
export function useFetchMovies(movieCategory: MovieCategories) {
  return useInfiniteQuery({
    queryKey: ['movies', movieCategory],
    queryFn: ({ pageParam = 1 }) => fetchMovies(movieCategory, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}
