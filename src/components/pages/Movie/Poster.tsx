import type { MovieDetails } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import { formatNumber } from '@/lib/utils';
import { Star, Users } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * Poster component
 * Displays the movie poster and rating information.
 * @param movieDetails - Movie details object to display poster and ratings for.
 */

const Poster = ({ movieDetails }: { movieDetails: MovieDetails }) => {
  // Render the movie poster image
  // If no poster path, use placeholder image
  return (
    <>
      <LazyLoadImage
        effect="blur"
        src={
          movieDetails?.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`
            : moviePlaceholder
        }
        alt={movieDetails?.title}
        width={`100%`}
        className="shadow-md drop-shadow-md rounded w-full md:h-[500px]"
      />

      {/* Render rating info if available */}
      {movieDetails?.vote_average ? (
        <div className="group-hover:hidden top-2 right-2 absolute flex flex-col justify-center items-center bg-tertiary shadow-lg drop-shadow-lg rounded-full w-[100px] h-[100px] text-white transition-all duration-700 ease-in-out delay-700">
          {/* Star icon and average rating */}
          <Star />
          <div className="font-bold">
            {movieDetails?.vote_average.toFixed(1)}
          </div>
          {/* Number of votes with Users icon */}
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-[15px]" />
            {movieDetails?.vote_count
              ? formatNumber(movieDetails?.vote_count)
              : 0}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Poster;
