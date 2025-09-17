import type { MovieDetails } from '@/app/types';
import { formatMovieDuration, formatNumber } from '@/lib/utils';
import { Calendar, Clock, PiggyBank } from 'lucide-react';

const OtherDetails = ({ movieDetails }: { movieDetails: MovieDetails }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {/* duration */}
      <div className="flex items-center">
        <Clock className="h-[15px] text-tertiary" />
        {movieDetails?.runtime
          ? formatMovieDuration(movieDetails?.runtime)
          : 'unknown'}
      </div>
      {/* released data */}
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
      {/* budget */}
      <div className="flex items-center">
        <PiggyBank className="h-[15px] text-tertiary" />
        {movieDetails?.budget
          ? `$${formatNumber(movieDetails?.budget)}`
          : 'unknown'}
      </div>
      {/* genres */}
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
