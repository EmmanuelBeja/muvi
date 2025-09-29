import { fetchFavoriteMovies } from '@/app/services/movies';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * useFetchMovieFavorites hook
 * Fetches the user's favorite movies using React Query
 * Only runs when both accountId and sessionId are available
 */
export function useFetchMovieFavorites(accountId?: number) {
  const sessionId = useAuthStore.getState().sessionId;
  return useInfiniteQuery({
    queryKey: ['favorite-movies', accountId],
    queryFn: ({ pageParam = 1 }) =>
      fetchFavoriteMovies(accountId!, sessionId!, pageParam),
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
