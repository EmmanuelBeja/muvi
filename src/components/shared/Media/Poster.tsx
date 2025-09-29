import { TMDB_IMAGE_BASE_URL } from '@/app/constants';
import type { MediaDetails } from '@/app/types';
import moviePlaceholder from '@/assets/pages/movies/moviePlaceholder.jpg';
import { formatNumber } from '@/lib/utils';
import { Star, Users } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * Poster component
 * Displays the media poster and rating information.
 * @param mediaDetails - Media details object to display poster and ratings for.
 */

const Poster = ({ mediaDetails }: { mediaDetails: MediaDetails }) => {
  // Render the media poster image
  // If no poster path, use placeholder image
  return (
    <>
      <LazyLoadImage
        effect="blur"
        src={
          mediaDetails?.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${mediaDetails?.poster_path}`
            : moviePlaceholder
        }
        alt={mediaDetails?.title || mediaDetails?.name || 'Media Poster'}
        width={`100%`}
        className="shadow-md drop-shadow-md rounded w-full md:h-[500px]"
      />

      {/* Render rating info if available */}
      {mediaDetails?.vote_average ? (
        <div className="group-hover:hidden top-2 right-2 absolute flex flex-col justify-center items-center bg-tertiary shadow-lg drop-shadow-lg rounded-full w-[100px] h-[100px] text-white transition-all duration-700 ease-in-out delay-700">
          {/* Star icon and average rating */}
          <Star />
          <div className="font-bold">
            {mediaDetails?.vote_average.toFixed(1)}
          </div>
          {/* Number of votes with Users icon */}
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-[15px]" />
            {mediaDetails?.vote_count
              ? formatNumber(mediaDetails?.vote_count)
              : 0}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Poster;
