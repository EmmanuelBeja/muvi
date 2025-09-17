import { useFetchMovieFavorites } from '@/app/hooks/useFetchMovieFavorites';
import { usePrefetchMovie } from '@/app/hooks/usePrefetchMovie';
import { useAuthStore } from '@/app/store/useAuthStore';
import type { Movie } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Link } from '@tanstack/react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const FavoritesList = () => {
  const accountId = useAuthStore.getState().accountId;
  const { data: favoriteMovies, isLoading: isLoadingFavoriteMovies } =
    useFetchMovieFavorites(accountId!);
  // prefetch movie details on hover
  const prefetchMovie = usePrefetchMovie();

  if (isLoadingFavoriteMovies)
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  return (
    <>
      {favoriteMovies?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[75vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {favoriteMovies.map((m: Movie) => (
            <li key={m.id} className="bg-white shadow p-3 rounded-lg">
              <Link
                to={`/movies/${m.id}`}
                onMouseEnter={() => prefetchMovie(m.id)}
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
                <h3 className="mt-2 font-medium text-sm truncate">{m.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FavoritesList;
