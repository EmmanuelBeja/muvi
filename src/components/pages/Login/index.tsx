import { fetchRequestToken } from '@/app/services/tmdb';
import { useAuthStore } from '@/app/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Link, useSearch } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import TMDBCallback from './TMDBCallback';

const Login = () => {
  const setRequestToken = useAuthStore.getState().setRequestToken;

  const search = useSearch({ from: '/login' });
  if (search?.callback) {
    return <TMDBCallback />;
  }

  const handleLogin = async () => {
    const token = await fetchRequestToken();
    setRequestToken(token);

    // Redirect user to TMDB auth page
    window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}${window.location.pathname}?callback=true`;
  };

  return (
    <div className="w-full h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="gap-2 grid grid-cols-2 drop-shadow-md lg:pb-20 h-[20vh] md:h-[80vh]">
          <div className="bg-primary rounded-md h-full"></div>
          <div className="bg-secondary rounded-md h-full"></div>
          <div className="bg-white rounded-md h-full"></div>
          <div className="bg-tertiary rounded-md h-full"></div>
        </div>
        <div className="p-2 md:px-5 md:py-10">
          {/* title */}
          <div className="flex items-center space-x-2 mb-2">
            <Link to="/movies" className="block">
              <ChevronLeft data-lucide="chevron-left" />
            </Link>
            <h1 className="py-2 font-semibold text-[30px] capitalize">
              Sign in
            </h1>
          </div>
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

export default Login;
