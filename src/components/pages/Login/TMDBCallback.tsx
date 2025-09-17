import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createSession, fetchAccount } from '../../../app/services/tmdb';
import { useAuthStore } from '../../../app/store/useAuthStore';
import Preloader from '../../shared/Preloader';

/**
 * TMDBCallback component
 * Handles the callback from TMDB authentication, sets session and account info, and redirects user.
 */
const TMDBCallback = () => {
  // Navigation hook for redirecting users
  const navigate = useNavigate();
  // Retrieve authentication state and setters from the store
  const requestToken = useAuthStore.getState().requestToken;
  const setSessionId = useAuthStore.getState().setSessionId;
  const setAccountId = useAuthStore.getState().setAccountId;
  const setAccountUsername = useAuthStore.getState().setAccountUsername;

  useEffect(() => {
    // Handles the final steps of authentication after TMDB callback
    async function finishAuth() {
      // If no request token, redirect to login
      if (!requestToken) {
        navigate({ to: '/login' });
        return;
      }

      // Create a session with TMDB using the request token
      const sessionId = await createSession(requestToken);
      setSessionId(sessionId);
      // Fetch account details using the session ID
      const account = await fetchAccount(sessionId);
      setAccountId(account.id);
      setAccountUsername(account.username);
      // Redirect to movies page after successful login
      navigate({ to: '/movies' });
    }

    finishAuth();
  }, [requestToken, navigate, setSessionId, setAccountUsername, setAccountId]);

  // Show a loading spinner while authentication is being processed
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
