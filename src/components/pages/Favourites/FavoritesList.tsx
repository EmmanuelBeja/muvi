import { useFetchMovieFavorites } from '@/app/hooks/useFetchMovieFavorites';
import { usePrefetchMovie } from '@/app/hooks/usePrefetchMovie';
import { useAuthStore } from '@/app/store/useAuthStore';
import type { Movie } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Link } from '@tanstack/react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * FavoritesList component
 * Displays a list of the user's favorite movies, with loading and no-data states.
 * Prefetches movie details on hover.
 */
const FavoritesList = () => {
  // Get accountId from authentication store
  const accountId = useAuthStore.getState().accountId;
  // Fetch favorite movies for the user
  const { data: favoriteMovies, isLoading: isLoadingFavoriteMovies } =
    useFetchMovieFavorites(accountId!);
  // Prefetch movie details on hover for faster navigation
  const prefetchMovie = usePrefetchMovie();

  // Show loading spinner while fetching favorites
  if (isLoadingFavoriteMovies)
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  // Render favorite movies or no-data state
  return (
    <>
      {/* Show no-data message if no favorites */}
      {favoriteMovies?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[75vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4 p-2 h-[75vh] overflow-y-scroll">
          {/* Render each favorite movie as a card */}
          {favoriteMovies.map((m: Movie) => (
            <li key={m.id} className="bg-white shadow p-3 rounded-lg">
              <Link
                to={`/movies/${m.id}`}
                onMouseEnter={() => prefetchMovie(m.id)} // Prefetch details on hover
                className="block"
              >
                <LazyLoadImage
                  effect="blur"
                  src={
                    m?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                      : moviePlaceholder
                  }
                  alt={m.title}
                  className="rounded w-full"
                />
                {/* Movie title */}
                <h3 className="mt-2 font-medium text-sm truncate">{m.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Export the FavoritesList component as default
export default FavoritesList;
