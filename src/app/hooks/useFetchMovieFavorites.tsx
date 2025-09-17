import { fetchFavoriteMovies } from '@/app/services/tmdb';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchMovieFavorites hook
 * Fetches the user's favorite movies using React Query
 * Only runs when both accountId and sessionId are available
 */
export function useFetchMovieFavorites(accountId?: number) {
  const sessionId = useAuthStore.getState().sessionId;

  return useQuery({
    queryKey: ['favorites', accountId],
    queryFn: () => fetchFavoriteMovies(accountId!, sessionId!),
    enabled: !!accountId && !!sessionId,
    staleTime: 1000 * 60 * 5, // cache 5 mins
  });
}
