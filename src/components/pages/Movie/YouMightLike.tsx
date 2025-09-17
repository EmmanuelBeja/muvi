import { useFetchMovieRecommendation } from '@/app/hooks/useFetchMovieRecommendations';
import type { Movie as MovieType } from '@/app/types';
import MovieCard from '@/components/shared/MovieCard';
import NoData from '@/components/shared/NoData';

const YouMightLike = ({ movieId }: { movieId: number }) => {
  const { data: movieRecommendations } = useFetchMovieRecommendation(movieId);

  return (
    <div className="space-y-2">
      <div className="font-semibold text-[20px]">You Might also like</div>
      {movieRecommendations?.results?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[30vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul
          data-testid="recommendations"
          className="gap-4 grid grid-cols-2 md:grid-cols-4 mt-4"
        >
          {movieRecommendations?.results
            ?.slice(0, 4)
            ?.map((movie: MovieType) => (
              <li key={movie.id} className="bg-white shadow p-3 rounded-lg">
                <MovieCard movie={movie} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default YouMightLike;
