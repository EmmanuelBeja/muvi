import { fetchMovieAccountState } from '@/app/services/tmdb';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export function useFetchMovieAccountState(movieId: number) {
  const sessionId = useAuthStore.getState().sessionId;

  return useQuery({
    queryKey: ['movie-account-state', movieId],
    queryFn: () => fetchMovieAccountState(movieId, sessionId!),
    enabled: !!sessionId, // only run when logged in
  });
}
