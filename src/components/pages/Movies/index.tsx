import { movieCategories, movieCategoriesMap } from '@/app/constants';
import { useFetchMovies } from '@/app/hooks/useFetchMovies';
import type { Movie, MovieCategories } from '@/app/types';
import MovieCard from '@/components/shared/MovieCard';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useSearch } from '@tanstack/react-router';

/**
 * Movies component
 * Displays a list of movies by category, with loading and no-data states.
 * Fetches movies and handles pagination.
 */
const Movies = () => {
  // Get search params from router (category)
  const search = useSearch({ from: '/movies/' });
  // Determine current movie category, default to 'now_playing'
  const movieCategory: MovieCategories = search?.category || 'now_playing';

  // Fetch movies for the selected category
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchMovies(movieCategory);

  // Flatten paginated movie results into a single array
  const moviesData: Movie[] = [];
  if (data?.pages && data?.pages?.length && data?.pages[0]?.results) {
    data?.pages.map((pageData) => {
      moviesData.push(...pageData.results);
    });
  }

  // Show loading spinner while fetching movies
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  // Render movies list and category selector
  return (
    <div className="min-h-[90vh]">
      {/* Category title */}
      <h2 className="py-2 font-semibold text-[30px] capitalize">
        {movieCategoriesMap[movieCategory]} movies
      </h2>
      {/* Category selection buttons */}
      <div className="flex items-center space-x-2 mb-4 overflow-x-scroll">
        {movieCategories.map((movieCategoryItem) => (
          <Link
            key={`${movieCategoryItem}-item`}
            data-testid={movieCategoryItem}
            className={cn(
              'bg-primary hover:bg-primary/90 shadow px-2 py-1 rounded text-primary-foreground',
              movieCategoryItem === movieCategory
                ? 'text-white bg-secondary hover:bg-secondary/90 '
                : ''
            )}
            to="/movies"
            search={{ category: movieCategoryItem }}
          >
            {movieCategoriesMap[movieCategoryItem]}
          </Link>
        ))}
      </div>
      {/* Show no data message if no movies found */}
      {moviesData.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[75vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {/* Render each movie as a MovieCard */}
          {moviesData.map((movie: Movie) => (
            <li key={movie.id} className="bg-white shadow p-3 rounded-lg">
              <MovieCard movie={movie} />
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

export default Movies;
