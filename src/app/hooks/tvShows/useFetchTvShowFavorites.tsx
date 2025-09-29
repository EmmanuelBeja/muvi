import { fetchFavoriteTvShows } from '@/app/services/tvShows';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * useFetchTvShowFavorites hook
 * Fetches the user's favorite tvShows using React Query
 * Only runs when both accountId and sessionId are available
 */
export function useFetchTvShowFavorites(accountId?: number) {
  const sessionId = useAuthStore.getState().sessionId;
  return useInfiniteQuery({
    queryKey: ['favorite-tv-shows', accountId],
    queryFn: ({ pageParam = 1 }) =>
      fetchFavoriteTvShows(accountId!, sessionId!, pageParam),
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
