import { fetchMovieAccountState } from '@/app/services/movies';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchMovieAccountState hook
 * Fetches the account state (favorite, watchlist) for a movie using React Query
 * Only runs when sessionId is available (user is logged in)
 */
export function useFetchMovieAccountState(
  movieId: number | null,
  enabled: boolean
) {
  const sessionId = useAuthStore.getState().sessionId;

  return useQuery({
    queryKey: ['movie-account-state', movieId],
    queryFn: () => movieId && fetchMovieAccountState(movieId, sessionId!),
    enabled: !!sessionId && !!enabled, // only run when logged in and enabled is true
  });
}
