import { useFetchMovieRecommendation } from '@/app/hooks/movies/useFetchMovieRecommendations';
import { useFetchTvShowRecommendation } from '@/app/hooks/tvShows/useFetchTvShowRecommendation';
import type { Media } from '@/app/types';
import MediaCard from '@/components/shared/Media/MediaCard';
import NoData from '@/components/shared/NoData';

/**
 * YouMightLike component
 * Displays recommended movies based on the current movie.
 * @param mediaId - ID of the media to fetch recommendations for.
 * @param isTvShow - Optional flag indicating if the media is a TV show.
 */
const YouMightLike = ({
  mediaId,
  isTvShow,
}: {
  mediaId: number;
  isTvShow?: boolean;
}) => {
  // Fetch recommended movies only if it's NOT a TV show
  const { data: movieRecommendations } = useFetchMovieRecommendation(
    mediaId,
    !isTvShow && !!mediaId
  );

  // Fetch recommended TV shows only if it IS a TV show
  const { data: tvShowRecommendations } = useFetchTvShowRecommendation(
    mediaId,
    !!isTvShow && !!mediaId
  );

  const recommendations = isTvShow
    ? tvShowRecommendations
    : movieRecommendations;

  // Render recommended movies or a no-data message
  return (
    <div className="space-y-2">
      {/* Section title */}
      <div className="font-semibold text-[20px]">You Might also like</div>
      {/* Show no data message if no recommendations */}
      {recommendations?.results?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[30vh]">
          <NoData withIcon />
        </div>
      ) : (
        <ul
          data-testid="recommendations"
          className="gap-4 grid grid-cols-2 md:grid-cols-4 mt-4"
        >
          {/* Render up to 4 recommended movies as MediaCard components */}
          {recommendations?.results
            ?.slice(0, 4)
            ?.map((recommendation: Media) => (
              <li
                key={recommendation.id}
                className="bg-white shadow p-3 rounded-lg"
              >
                <MediaCard
                  media={recommendation}
                  isTvShow={isTvShow}
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
