import { fetchTvShows } from '@/app/services/tvShows';
import type { TVShowCategories } from '@/app/types';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * useFetchTVShows hook
 * Fetches TV shows by category with infinite scrolling support
 * Uses React Query's useInfiniteQuery for pagination
 */
export function useFetchTvShows(category: TVShowCategories) {
  return useInfiniteQuery({
    queryKey: ['tv-Shows', category],
    queryFn: ({ pageParam = 1 }) => fetchTvShows(category, pageParam),
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
