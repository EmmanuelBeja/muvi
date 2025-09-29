import { useFetchMovieFavorites } from '@/app/hooks/movies/useFetchMovieFavorites';
import { useAuthStore } from '@/app/store/useAuthStore';
import type { Media } from '@/app/types';
import MediaCard from '@/components/shared/Media/MediaCard';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';

/**
 * FavoriteMovies component
 * Displays a list of the user's favorite movies, with loading and no-data states.
 * Prefetches movie details on hover.
 */
const FavoriteMovies = () => {
  // Get accountId from authentication store
  const accountId = useAuthStore.getState().accountId;
  // Fetch favorite movies for the user
  const {
    data,
    isLoading: isLoadingFavoriteMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchMovieFavorites(accountId!);

  // Flatten paginated movie results into a single array
  const favoriteMovies: Media[] = [];
  if (data?.pages && data?.pages?.length && data?.pages[0]) {
    data?.pages.map((pageData) => {
      favoriteMovies.push(...pageData.results);
    });
  }

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
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {/* Render each favorite movie as a card */}
          {favoriteMovies.map((m) => (
            <li key={m.id} className="bg-white shadow p-3 rounded-lg">
              <MediaCard media={m} />
            </li>
          ))}
        </ul>
      )}
      {/* Load more button for pagination */}
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            data-loading={isFetchingNextPage}
            data-testid="load-more"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mx-auto mt-4 px-4 py-2 rounded text-white"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
};

// Export the FavoriteMovies component as default
export default FavoriteMovies;
