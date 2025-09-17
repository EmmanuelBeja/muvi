import { usePrefetchMovie } from '@/app/hooks/usePrefetchMovie';
import type { Movie } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import { Link } from '@tanstack/react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { cn } from '../../../lib/utils';

/**
 * MovieCard component
 * Displays a single movie card with image and title.
 * Prefetches movie details on hover.
 * @param movie - Movie object to display.
 * @param imgClassName - Optional image class name for styling.
 * @param onClick - Optional click handler for the card.
 */
const MovieCard = ({
  movie,
  imgClassName,
  onClick,
}: {
  movie: Movie;
  imgClassName?: string;
  onClick?: VoidFunction;
}) => {
  // prefetch movie details on hover
  const prefetchMovie = usePrefetchMovie();

  return (
    <Link
      to={`/movies/${movie.id}`}
      onMouseEnter={() => prefetchMovie(movie.id)}
      onClick={() => (onClick ? onClick() : '')}
      className="h-fit"
    >
      <LazyLoadImage
        effect="blur"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : moviePlaceholder
        }
        alt={movie.title}
        className={cn(imgClassName || 'rounded w-full h-[350px]')}
      />
      <h3
        className="mt-2 font-medium text-sm truncate"
        data-testid={`movie-title-${movie.id}`}
      >
        {movie.title}
      </h3>
      <p className="mt-1 text-muted-foreground text-xs truncate">
        {movie.overview}
      </p>
    </Link>
  );
};

export default MovieCard;
