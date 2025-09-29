import { useFetchMovieAccountState } from '@/app/hooks/movies/useFetchMovieAccountState';
import { useFetchMovieVideos } from '@/app/hooks/movies/useFetchMovieVideos';
import { useFetchTvShowAccountState } from '@/app/hooks/tvShows/useFetchTvShowAccountState';
import { useFetchTvShowVideos } from '@/app/hooks/tvShows/useFetchTvShowVideos';
import { markMovieAsFavorite } from '@/app/services/movies';
import { markTvShowAsFavorite } from '@/app/services/tvShows';
import { useAuthStore } from '@/app/store/useAuthStore';
import type { MediaDetails } from '@/app/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Heart, Play, SquareArrowOutUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * ActionButtons component
 * Renders action buttons for a media (favorite, play, external link).
 * Handles favorite mutations and displays appropriate buttons based on media type.
 * @param mediaDetails - Details of the Media to display actions for.
 */

const ActionButtons = ({
  mediaDetails,
  isTvShow,
}: {
  mediaDetails: MediaDetails;
  isTvShow?: boolean;
}) => {
  // Get user account and session info from store
  const accountId = useAuthStore.getState().accountId;
  const sessionId = useAuthStore.getState().sessionId;

  // Get React Query client for cache management
  const queryClient = useQueryClient();

  // Mutation for marking movie as favorite
  const mutation = useMutation({
    // Function to call when toggling favorite
    mutationFn: (fav: boolean) => {
      if (!accountId || !sessionId) {
        throw new Error('User not authenticated');
      }
      if (isTvShow) {
        // Call API to mark/unmark favorite
        return markTvShowAsFavorite(accountId, sessionId, mediaDetails.id, fav);
      } else {
        // Call API to mark/unmark favorite
        return markMovieAsFavorite(accountId, sessionId, mediaDetails.id, fav);
      }
    },
    // On success, invalidate relevant queries and show toast
    onSuccess: (_, fav) => {
      queryClient.invalidateQueries({
        queryKey: ['favorite-movies', accountId],
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite-tv-shows', accountId],
      });
      if (isTvShow) {
        queryClient.invalidateQueries({
          queryKey: ['tv-show-account-state', mediaDetails?.id],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['movie-account-state', mediaDetails?.id],
        });
      }

      toast.success(fav ? 'Added to favorites!' : 'Removed from favorites!');
    },
    // On error, show error toast
    onError: (e) => {
      const message = e instanceof Error ? e.message : 'Unknown error';
      toast.error(`Something went wrong, please try again: ${message}`);
    },
  });

  // Fetch movie videos and account state
  const { data: movieVideos } = useFetchMovieVideos(
    mediaDetails?.id,
    !isTvShow && !!mediaDetails?.id
  );
  const { data: movieAccountState, isLoading: isLoadingMovieAccountState } =
    useFetchMovieAccountState(
      mediaDetails?.id,
      !isTvShow && !!mediaDetails?.id
    );

  // Fetch tv show videos and account state
  const { data: tvShowVideos } = useFetchTvShowVideos(
    mediaDetails?.id,
    !!isTvShow && !!mediaDetails?.id
  );
  const { data: tvShowAccountState, isLoading: isLoadingTvShowAccountState } =
    useFetchTvShowAccountState(
      mediaDetails?.id,
      !!isTvShow && !!mediaDetails?.id
    );

  // Determine if movie is currently a favorite
  const isMovieFavorite =
    !isLoadingMovieAccountState && movieAccountState?.favorite
      ? movieAccountState?.favorite
      : false;
  // Determine if tv show is currently a favorite
  const isTvShowFavorite =
    !isLoadingTvShowAccountState && tvShowAccountState?.favorite
      ? tvShowAccountState?.favorite
      : false;

  // Overall favorite status based on media type
  const isFavorite = isMovieFavorite || isTvShowFavorite;

  // Get videos based on media type
  const mediaVideos = isTvShow ? tvShowVideos : movieVideos;

  // Function to toggle favorite status
  const toggleFavorite = () => {
    if (!sessionId) {
      toast(`Please login to favourite ${isTvShow ? 'tv shows' : 'movies'}`);
      return;
    }
    mutation.mutate(!isFavorite);
  };

  // Render action buttons: Learn More, Favorite, Watch Trailer
  return (
    <div
      className={cn(
        'gap-2 grid grid-cols-1',
        mediaVideos?.length && mediaVideos[0]?.site === 'YouTube'
          ? 'md:grid-cols-3'
          : 'md:grid-cols-2'
      )}
    >
      {/* Learn more button if homepage exists */}
      {mediaDetails?.homepage ? (
        <Link
          data-testid="learn-more"
          className="flex justify-center items-center gap-x-2 bg-transparent hover:bg-primary/90 border border-primary hover:border-primary/90 rounded w-full text-primary hover:text-primary-foreground"
          to={mediaDetails?.homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SquareArrowOutUpRight />
          Learn More
        </Link>
      ) : null}

      {/* Favorite button */}
      <Button
        data-testid="favorite-movie"
        className="flex justify-center items-center gap-x-2 bg-secondary hover:bg-secondary/90 rounded w-full text-white"
        onClick={() => toggleFavorite()}
      >
        <Heart />
        {isFavorite ? 'Remove Favourite' : 'Favourite'}
      </Button>

      {/* Trailer button if YouTube video exists */}
      {mediaVideos?.length && mediaVideos[0]?.site === 'YouTube' ? (
        <Link
          to={`https://www.youtube.com/watch?v=${mediaVideos[0]?.key}`}
          className="flex justify-center items-center gap-x-2 bg-tertiary hover:bg-tertiary/90 border border-tertiary hover:border-tertiary/90 rounded w-full text-white"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="watch-trailer"
        >
          <Play className="animate-pulse" />
          Watch Trailer
        </Link>
      ) : null}
    </div>
  );
};

export default ActionButtons;
