import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createSession, fetchAccount } from '../../../app/services/tmdb';
import { useAuthStore } from '../../../app/store/useAuthStore';
import Preloader from '../../shared/Preloader';

const TMDBCallback = () => {
  const navigate = useNavigate();
  const requestToken = useAuthStore.getState().requestToken;
  const setSessionId = useAuthStore.getState().setSessionId;
  const setAccountId = useAuthStore.getState().setAccountId;
  const setAccountUsername = useAuthStore.getState().setAccountUsername;

  useEffect(() => {
    async function finishAuth() {
      if (!requestToken) {
        navigate({ to: '/login' });
        return;
      }

      const sessionId = await createSession(requestToken);
      setSessionId(sessionId);
      const account = await fetchAccount(sessionId);
      setAccountId(account.id);
      setAccountUsername(account.username);
      navigate({ to: '/movies' }); // redirect after login
    }

    finishAuth();
  }, [requestToken, navigate, setSessionId, setAccountUsername, setAccountId]);

  return (
    <div
      data-testid="auth-success"
      className="flex justify-center items-center w-full h-[80vh]"
    >
      <Preloader />
    </div>
  );
};

export default TMDBCallback;
