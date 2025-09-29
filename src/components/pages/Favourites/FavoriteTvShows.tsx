import { useFetchTvShowFavorites } from '@/app/hooks/tvShows/useFetchTvShowFavorites';
import { useAuthStore } from '@/app/store/useAuthStore';
import type { Media } from '@/app/types';
import MediaCard from '@/components/shared/Media/MediaCard';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';

/**
 * FavoriteTvShows component
 * Displays a list of the user's favorite TV shows, with loading and no-data states.
 * Prefetches TV show details on hover.
 */
const FavoriteTvShows = () => {
  // Get accountId from authentication store
  const accountId = useAuthStore.getState().accountId;
  // Fetch favorite tvShows for the user
  const {
    data,
    isLoading: isLoadingFavoriteTvShows,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchTvShowFavorites(accountId!);

  // Flatten paginated tvShow results into a single array
  const favoriteTvShows: Media[] = [];
  if (data?.pages && data?.pages?.length && data?.pages[0]) {
    data?.pages.map((pageData) => {
      favoriteTvShows.push(...pageData.results);
    });
  }

  // Show loading spinner while fetching favorites
  if (isLoadingFavoriteTvShows)
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  // Render favorite tvShows or no-data state
  return (
    <>
      {/* Show no-data message if no favorites */}
      {favoriteTvShows?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[75vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {/* Render each favorite movie as a card */}
          {favoriteTvShows.map((tvShow) => (
            <li key={tvShow.id} className="bg-white shadow p-3 rounded-lg">
              <MediaCard media={tvShow} isTvShow />
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

// Export the FavoriteTvShows component as default
export default FavoriteTvShows;
