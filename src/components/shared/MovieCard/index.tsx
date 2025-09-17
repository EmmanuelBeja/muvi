import { usePrefetchMovie } from '@/app/hooks/usePrefetchMovie';
import type { Movie } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import { Link } from '@tanstack/react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieCard = ({ movie }: { movie: Movie }) => {
  // prefetch movie details on hover
  const prefetchMovie = usePrefetchMovie();

  return (
    <Link
      to={`/movies/${movie.id}`}
      onMouseEnter={() => prefetchMovie(movie.id)}
    >
      <LazyLoadImage
        effect="blur"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : moviePlaceholder
        }
        alt={movie.title}
        className="rounded w-full h-[350px]"
      />
      <h3
        className="mt-2 font-medium text-sm truncate"
        data-testid={`movie-title-${movie.id}`}
      >
        {movie.title}
      </h3>
    </Link>
  );
};

export default MovieCard;
