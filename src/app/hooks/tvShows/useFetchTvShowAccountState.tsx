import { fetchTvShowAccountState } from '@/app/services/tvShows';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

/**
 * useFetchTvShowAccountState hook
 * Fetches the account state (favorite, watchlist) for a TV show using React Query
 * Only runs when sessionId is available (user is logged in)
 */
export function useFetchTvShowAccountState(
  tvShowId: number | null,
  enabled: boolean
) {
  const sessionId = useAuthStore.getState().sessionId;

  return useQuery({
    queryKey: ['tv-show-account-state', tvShowId],
    queryFn: () => tvShowId && fetchTvShowAccountState(tvShowId, sessionId!),
    enabled: !!sessionId && !!enabled, // only run when logged in and enabled is true
  });
}
