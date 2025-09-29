import { fetchRequestToken } from '@/app/services/auth';
import { useAuthStore } from '@/app/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Link, useSearch } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import TMDBCallback from './TMDBCallback';

/**
 * Login component
 * Handles TMDB authentication flow and renders login UI.
 * Redirects to TMDB for authentication and handles callback.
 */
const Login = () => {
  // Setter for request token in the authentication store
  const setRequestToken = useAuthStore.getState().setRequestToken;

  // Get search params to check for callback
  const search = useSearch({ from: '/login' });
  // If redirected back from TMDB, show the callback handler
  if (search?.callback) {
    return <TMDBCallback />;
  }

  // Initiates login by fetching a request token and redirecting to TMDB
  const handleLogin = async () => {
    const token = await fetchRequestToken();
    setRequestToken(token);

    // Redirect user to TMDB authentication page
    window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}${window.location.pathname}?callback=true`;
  };

  // Render login UI
  return (
    <div className="w-full h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Decorative color blocks for left side */}
        <div className="gap-2 grid grid-cols-2 drop-shadow-md lg:pb-20 h-[20vh] md:h-[80vh]">
          <div className="bg-primary rounded-md h-full"></div>
          <div className="bg-secondary rounded-md h-full"></div>
          <div className="bg-white rounded-md h-full"></div>
          <div className="bg-tertiary rounded-md h-full"></div>
        </div>
        {/* Login form and info on right side */}
        <div className="p-2 md:px-5 md:py-10">
          {/* Title and back button */}
          <div className="flex items-center space-x-2 mb-2">
            <Link to="/movies" className="block">
              <ChevronLeft data-lucide="chevron-left" />
            </Link>
            <h1 className="py-2 font-semibold text-[30px] capitalize">
              Sign in
            </h1>
          </div>
          {/* Authentication info text */}
          <div className="mt-2">
            You will be securely authenticated through{' '}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline"
            >
              The Movie Database
            </a>
            . We&apos;ll redirect you to TMDB to log in and grant access, then
            bring you back here.
          </div>
          {/* Login button triggers TMDB authentication */}
          <Button
            className="bg-secondary mt-4 px-4 py-2 rounded w-full text-white"
            onClick={() => handleLogin()}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

// Export the Login component as default
export default Login;
