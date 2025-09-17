import { useFetchMovieRecommendation } from '@/app/hooks/useFetchMovieRecommendations';
import type { Movie as MovieType } from '@/app/types';
import MovieCard from '@/components/shared/MovieCard';
import NoData from '@/components/shared/NoData';

/**
 * YouMightLike component
 * Displays recommended movies based on the current movie.
 * @param movieId - ID of the movie to fetch recommendations for.
 */
const YouMightLike = ({ movieId }: { movieId: number }) => {
  // Fetch recommended movies for the given movieId
  const { data: movieRecommendations } = useFetchMovieRecommendation(movieId);

  // Render recommended movies or a no-data message
  return (
    <div className="space-y-2">
      {/* Section title */}
      <div className="font-semibold text-[20px]">You Might also like</div>
      {/* Show no data message if no recommendations */}
      {movieRecommendations?.results?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[30vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul
          data-testid="recommendations"
          className="gap-4 grid grid-cols-2 md:grid-cols-4 mt-4"
        >
          {/* Render up to 4 recommended movies as MovieCard components */}
          {movieRecommendations?.results
            ?.slice(0, 4)
            ?.map((movie: MovieType) => (
              <li key={movie.id} className="bg-white shadow p-3 rounded-lg">
                <MovieCard
                  movie={movie}
                  imgClassName="rounded w-full h-[200px]"
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default YouMightLike;
