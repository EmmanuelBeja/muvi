import { useFetchMovieAccountState } from '@/app/hooks/useFetchMovieAccountState';
import { useFetchMovieVideos } from '@/app/hooks/useFetchMovieVideos';
import { markMovieAsFavorite } from '@/app/services/tmdb';
import { useAuthStore } from '@/app/store/useAuthStore';
import type { MovieDetails } from '@/app/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Heart, Play, SquareArrowOutUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * ActionButtons component
 * Renders action buttons for a movie (favorite, play, external link).
 * Handles favorite mutation and user feedback.
 * @param movieDetails - Details of the movie to display actions for.
 */

const ActionButtons = ({ movieDetails }: { movieDetails: MovieDetails }) => {
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
      // Call API to mark/unmark favorite
      return markMovieAsFavorite(accountId, sessionId, movieDetails.id, fav);
    },
    // On success, invalidate relevant queries and show toast
    onSuccess: (_, fav) => {
      if (accountId) {
        queryClient.invalidateQueries({
          queryKey: ['favorites', accountId],
        });
        queryClient.invalidateQueries({
          queryKey: ['movie-account-state', movieDetails?.id],
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
  const { data: movieVideos } = useFetchMovieVideos(movieDetails?.id);
  const { data: movieAccountState, isLoading: isLoadingMovieAccountState } =
    useFetchMovieAccountState(movieDetails?.id);

  // Determine if movie is currently a favorite
  const isFavorite =
    !isLoadingMovieAccountState && movieAccountState?.favorite
      ? movieAccountState?.favorite
      : false;

  // Function to toggle favorite status
  const toggleFavorite = () => {
    if (!sessionId) {
      toast('Please login to favourite movies');
      return;
    }
    mutation.mutate(!isFavorite);
  };

  // Render action buttons: Learn More, Favorite, Watch Trailer
  return (
    <div
      className={cn(
        'gap-2 grid grid-cols-1',
        movieVideos?.length && movieVideos[0]?.site === 'YouTube'
          ? 'md:grid-cols-3'
          : 'md:grid-cols-2'
      )}
    >
      {/* Learn more button if homepage exists */}
      {movieDetails?.homepage ? (
        <Link
          data-testid="learn-more"
          className="flex justify-center items-center gap-x-2 bg-transparent hover:bg-primary/90 border border-primary hover:border-primary/90 rounded w-full text-primary hover:text-primary-foreground"
          to={movieDetails?.homepage}
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
      {movieVideos?.length && movieVideos[0]?.site === 'YouTube' ? (
        <Link
          to={`https://www.youtube.com/watch?v=${movieVideos[0]?.key}`}
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
