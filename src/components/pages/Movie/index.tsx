import { useFetchMovieDetails } from '@/app/hooks/useFetchMovie';
import Preloader from '@/components/shared/Preloader';
import { Link, useParams } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import ActionButtons from './ActionButtons';
import CastCrew from './CastCrew';
import OtherDetails from './OtherDetails';
import Overview from './Overview';
import Poster from './Poster';
import YouMightLike from './YouMightLike';

/**
 * Movie component
 * Displays details for a single movie, including poster, overview, cast/crew, and recommendations.
 */
const Movie = () => {
  const { movieId } = useParams({ from: '/movies/$movieId' });

  const { data: movieDetails, isLoading: isLoadingMovie } =
    useFetchMovieDetails(movieId);

  if (isLoadingMovie)
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
        <Preloader />
      </div>
    );

  return (
    <div className="min-h-[85vh]">
      {/* title */}
      <div className="flex items-center space-x-2 mb-2">
        <Link to="/movies" className="block">
          <ChevronLeft />
        </Link>
        <h1 className="py-2 font-semibold text-[30px] capitalize">
          {movieDetails?.title}
        </h1>
      </div>
      <OtherDetails movieDetails={movieDetails} />

      {/*  poster/overview/action buttons/you might like */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-5 mb-6">
        <div className="group relative md:col-span-2 w-full">
          {/* poster */}
          <Poster movieDetails={movieDetails} />
        </div>
        <div className="space-y-4 md:col-span-3 w-full">
          {/* overview */}
          <Overview movieDetails={movieDetails} />
          {/* action buttons */}
          <ActionButtons movieDetails={movieDetails} />
          {/* you might like */}
          <YouMightLike movieId={movieId} />
        </div>
      </div>
      {/* cast/crew */}
      <div className="space-y-4">
        <CastCrew castCrew={movieDetails?.credits?.cast || []} title="Cast" />
        <CastCrew castCrew={movieDetails?.credits?.crew || []} title="Crew" />
      </div>
    </div>
  );
};

export default Movie;
