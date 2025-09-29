import { TMDB_IMAGE_BASE_URL } from '@/app/constants';
import { usePrefetchMovie } from '@/app/hooks/movies/usePrefetchMovie';
import { usePrefetchTvShow } from '@/app/hooks/tvShows/usePrefetchTvShow';
import type { Media } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * MediaCard component
 * Displays a single media card with image and title.
 * Prefetches media details on hover.
 * @param media - Movie/TV show object to display.
 * @param isTvShow - Optional flag to indicate if the media is a TV show.
 * @param imgClassName - Optional image class name for styling.
 * @param onClick - Optional click handler for the card.
 */
const MediaCard = ({
  media,
  isTvShow,
  imgClassName,
  onClick,
}: {
  media: Media;
  isTvShow?: boolean;
  imgClassName?: string;
  onClick?: VoidFunction;
}) => {
  // prefetch movie and tv show details on hover
  const prefetchMovie = usePrefetchMovie();
  const prefetchTvShow = usePrefetchTvShow();

  return (
    <Link
      to={isTvShow ? `/tv-shows/${media.id}` : `/movies/${media.id}`}
      onMouseEnter={() =>
        isTvShow ? prefetchTvShow(media.id) : prefetchMovie(media.id)
      }
      onClick={() => (onClick ? onClick() : '')}
      className="h-fit"
    >
      <LazyLoadImage
        effect="blur"
        src={
          media.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${media.poster_path}`
            : moviePlaceholder
        }
        alt={media.title}
        className={cn(imgClassName || 'rounded w-full h-[350px]')}
      />
      <h3
        className="mt-2 font-medium text-sm truncate"
        data-testid={`media-title-${media.id}`}
      >
        {isTvShow ? media?.name : media.title}
      </h3>
      <p className="mt-1 text-muted-foreground text-xs truncate">
        {media.overview}
      </p>
    </Link>
  );
};

export default MediaCard;
