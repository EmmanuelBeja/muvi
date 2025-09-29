import type { MediaDetails } from '@/app/types';
import { formatMovieDuration, formatNumber } from '@/lib/utils';
import { Calendar, Clock, Group, PiggyBank, Ungroup } from 'lucide-react';

/**
 * OtherDetails component
 * Displays additional details for a media (duration, release date, budget, genres).
 * @param mediaDetails - Media details object to display.
 * @param isTvShow - Boolean indicating if the media is a TV show.
 */

const OtherDetails = ({
  mediaDetails,
  isTvShow,
}: {
  mediaDetails: MediaDetails;
  isTvShow?: boolean;
}) => {
  // Render additional details for the media
  // Includes duration, release date, budget, and genres
  return (
    <div className="flex space-x-2 mb-4">
      {/* Tv show seasons count */}
      {isTvShow && mediaDetails?.number_of_seasons && (
        <div className="flex items-center">
          <Group className="h-[15px] text-tertiary" />
          {mediaDetails?.number_of_seasons}{' '}
          {mediaDetails?.number_of_seasons > 1 ? 'seasons' : 'season'}
        </div>
      )}
      {/* Tv show episodes count */}
      {isTvShow && mediaDetails?.number_of_episodes && (
        <div className="flex items-center">
          <Ungroup className="h-[15px] text-tertiary" />
          {mediaDetails?.number_of_episodes}{' '}
          {mediaDetails?.number_of_episodes > 1 ? 'episodes' : 'episode'}
        </div>
      )}
      {/* Media duration in hours and minutes */}
      {!isTvShow && mediaDetails?.runtime && (
        <div className="flex items-center">
          <Clock className="h-[15px] text-tertiary" />
          {mediaDetails?.runtime
            ? formatMovieDuration(mediaDetails?.runtime)
            : 'unknown'}
        </div>
      )}

      {/* Media release date formatted as Month Day, Year */}
      <div className="flex items-center">
        <Calendar className="h-[15px] text-tertiary" />
        {mediaDetails?.release_date
          ? new Date(mediaDetails?.release_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : isTvShow && mediaDetails?.first_air_date
            ? new Date(mediaDetails?.first_air_date).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              )
            : 'unknown'}
      </div>
      {/* Media budget formatted with currency and suffix */}
      <div className="flex items-center">
        <PiggyBank className="h-[15px] text-tertiary" />
        {mediaDetails?.budget
          ? `$${formatNumber(mediaDetails?.budget)}`
          : 'unknown'}
      </div>
      {/* List of genres for the media */}
      {mediaDetails?.genres.map((genre: { id: number; name: string }) => (
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
