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

const ActionButtons = ({ movieDetails }: { movieDetails: MovieDetails }) => {
  const accountId = useAuthStore.getState().accountId;
  const sessionId = useAuthStore.getState().sessionId;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (fav: boolean) => {
      if (!accountId || !sessionId) {
        throw new Error('User not authenticated');
      }
      return markMovieAsFavorite(accountId, sessionId, movieDetails.id, fav);
    },
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
    onError: (e) => {
      const message = e instanceof Error ? e.message : 'Unknown error';
      toast.error(`Something went wrong, please try again: ${message}`);
    },
  });

  const { data: movieVideos } = useFetchMovieVideos(movieDetails?.id);
  const { data: movieAccountState, isLoading: isLoadingMovieAccountState } =
    useFetchMovieAccountState(movieDetails?.id);

  console.log({ movieVideos });

  const isFavorite =
    !isLoadingMovieAccountState && movieAccountState?.favorite
      ? movieAccountState?.favorite
      : false;

  const toggleFavorite = () => {
    if (!sessionId) {
      toast('Please login to favourite movies');
      return;
    }
    mutation.mutate(!isFavorite);
  };

  return (
    <div
      className={cn(
        'gap-2 grid grid-cols-1',
        movieVideos?.length && movieVideos[0]?.site === 'YouTube'
          ? 'md:grid-cols-3'
          : 'md:grid-cols-2'
      )}
    >
      {/* learn more */}
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

      {/* favourite */}
      <Button
        data-testid="favorite-movie"
        className="flex justify-center items-center gap-x-2 bg-secondary hover:bg-secondary/90 rounded w-full text-white"
        onClick={() => toggleFavorite()}
      >
        <Heart />
        {isFavorite ? 'Remove Favourite' : 'Favourite'}
      </Button>

      {/* trailer */}
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
