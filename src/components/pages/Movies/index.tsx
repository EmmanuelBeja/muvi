import { movieCategories, movieCategoriesMap } from '@/app/constants';
import { useFetchMovies } from '@/app/hooks/useFetchMovies';
import type { Movie, MovieCategories } from '@/app/types';
import MovieCard from '@/components/shared/MovieCard';
import NoData from '@/components/shared/NoData';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useSearch } from '@tanstack/react-router';

const Movies = () => {
  const search = useSearch({ from: '/movies/' });
  const movieCategory: MovieCategories = search?.category || 'now_playing';

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchMovies(movieCategory);

  const moviesData: Movie[] = [];
  if (data?.pages && data?.pages?.length && data?.pages[0]?.results) {
    data?.pages.map((pageData) => {
      moviesData.push(...pageData.results);
    });
  }

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  return (
    <div className="">
      <h2 className="py-2 font-semibold text-[30px] capitalize">
        {movieCategoriesMap[movieCategory]} movies
      </h2>
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
      {moviesData.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[75vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {moviesData.map((movie: Movie) => (
            <li key={movie.id} className="bg-white shadow p-3 rounded-lg">
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}

      {/* Load more button */}
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
