import { TV_SHOW_CATEGORIES, TV_SHOW_CATEGORIES_MAP } from '@/app/constants';
import { useFetchTvShows } from '@/app/hooks/tvShows/useFetchTvShows';
import type { Media, TVShowCategories } from '@/app/types';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useSearch } from '@tanstack/react-router';
import MediaCard from '../../shared/Media/MediaCard';

/**
 * TvShows component
 * Displays a list of tvShows by category, with loading and no-data states.
 * Fetches tvShows and handles pagination.
 */
const TvShows = () => {
  // Get search params from router (category)
  const search = useSearch({ from: '/tv-shows/' });
  // Determine current tvShow category, default to 'popular'
  const tvShowCategory: TVShowCategories = search?.category || 'popular';

  // Fetch tvShows for the selected category
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchTvShows(tvShowCategory);

  // Flatten paginated tvShow results into a single array
  const tvShowsData: Media[] = [];
  if (data?.pages && data?.pages?.length && data?.pages[0]?.results) {
    data?.pages.map((pageData) => {
      tvShowsData.push(...pageData.results);
    });
  }

  // Show loading spinner while fetching tvShows
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  // Render tvShows list and category selector
  return (
    <div className="">
      {/* Category title */}
      <h2 className="py-2 font-semibold text-[30px] capitalize">
        {TV_SHOW_CATEGORIES_MAP[tvShowCategory]} TV Shows
      </h2>
      {/* Category selection buttons */}
      <div className="flex items-center space-x-2 mb-4 overflow-x-scroll">
        {TV_SHOW_CATEGORIES.map((tvShowCategoryItem) => (
          <Link
            key={`${tvShowCategoryItem}-item`}
            data-testid={tvShowCategoryItem}
            className={cn(
              'bg-primary hover:bg-primary/90 shadow px-2 py-1 rounded text-primary-foreground',
              tvShowCategoryItem === tvShowCategory
                ? 'text-white bg-secondary hover:bg-secondary/90 '
                : ''
            )}
            to="/tv-shows/"
            search={{ category: tvShowCategoryItem }}
          >
            {TV_SHOW_CATEGORIES_MAP[tvShowCategoryItem]}
          </Link>
        ))}
      </div>
      {/* Show no data message if no tvShows found */}
      {tvShowsData.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[75vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {/* Render each tvShow as a MediaCard */}
          {tvShowsData.map((tvShow) => (
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
    </div>
  );
};

export default TvShows;
