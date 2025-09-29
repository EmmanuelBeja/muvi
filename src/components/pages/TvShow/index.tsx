import { useFetchTvShowDetails } from '@/app/hooks/tvShows/useFetchTvShow';
import Preloader from '@/components/shared/Preloader';
import { Link, useParams } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import ActionButtons from '../../shared/Media/ActionButtons';
import CastCrew from '../../shared/Media/CastCrew';
import OtherDetails from '../../shared/Media/OtherDetails';
import Overview from '../../shared/Media/Overview';
import Poster from '../../shared/Media/Poster';
import YouMightLike from '../../shared/Media/YouMightLike';

/**
 * TvShow component
 * Displays details for a single TV show, including poster, overview, cast/crew, and recommendations.
 */
const TvShow = () => {
  const { tvShowId } = useParams({ from: '/tv-shows/$tvShowId' });

  const { data: tvShowDetails, isLoading: isLoadingTvShow } =
    useFetchTvShowDetails(tvShowId);

  if (isLoadingTvShow)
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  return (
    <div className="">
      {/* title */}
      <div className="flex items-center space-x-2 mb-2">
        <Link to="/tv-shows" className="block">
          <ChevronLeft />
        </Link>
        <h1 className="py-2 font-semibold text-[30px] capitalize">
          {tvShowDetails?.name}
        </h1>
      </div>
      <OtherDetails mediaDetails={tvShowDetails} isTvShow />

      {/*  poster/overview/action buttons/you might like */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-5 mb-6">
        <div className="group relative md:col-span-2 w-full">
          {/* poster */}
          <Poster mediaDetails={tvShowDetails} />
        </div>
        <div className="space-y-4 md:col-span-3 w-full">
          {/* overview */}
          <Overview mediaDetails={tvShowDetails} />
          {/* action buttons */}
          <ActionButtons mediaDetails={tvShowDetails} isTvShow />
          {/* you might like */}
          <YouMightLike mediaId={tvShowId} isTvShow={true} />
        </div>
      </div>

      {/* cast/crew */}
      <div className="space-y-4">
        <CastCrew castCrew={tvShowDetails?.credits?.cast || []} title="Cast" />
        <CastCrew castCrew={tvShowDetails?.credits?.crew || []} title="Crew" />
      </div>
    </div>
  );
};

export default TvShow;
