import type { MovieDetails } from '@/app/types';
import { formatMovieDuration, formatNumber } from '@/lib/utils';
import { Calendar, Clock, PiggyBank } from 'lucide-react';

/**
 * OtherDetails component
 * Displays additional details for a movie (duration, release date, budget, genres).
 * @param movieDetails - Movie details object to display.
 */

const OtherDetails = ({ movieDetails }: { movieDetails: MovieDetails }) => {
  // Render additional details for the movie
  // Includes duration, release date, budget, and genres
  return (
    <div className="flex space-x-2 mb-4">
      {/* Movie duration in hours and minutes */}
      <div className="flex items-center">
        <Clock className="h-[15px] text-tertiary" />
        {movieDetails?.runtime
          ? formatMovieDuration(movieDetails?.runtime)
          : 'unknown'}
      </div>
      {/* Movie release date formatted as Month Day, Year */}
      <div className="flex items-center">
        <Calendar className="h-[15px] text-tertiary" />
        {movieDetails?.release_date
          ? new Date(movieDetails?.release_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'unknown'}
      </div>
      {/* Movie budget formatted with currency and suffix */}
      <div className="flex items-center">
        <PiggyBank className="h-[15px] text-tertiary" />
        {movieDetails?.budget
          ? `$${formatNumber(movieDetails?.budget)}`
          : 'unknown'}
      </div>
      {/* List of genres for the movie */}
      {movieDetails?.genres.map((genre: { id: number; name: string }) => (
        <div
          className="mr-1 px-2 border border-tertiary rounded text-tertiary"
          key={`${genre.id}-genre`}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default OtherDetails;
