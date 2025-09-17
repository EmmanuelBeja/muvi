import type { Movie } from '@/app/types';

/**
 * Overview component
 * Displays the overview/description for a movie.
 * @param movieDetails - Movie object to display overview for.
 */
const Overview = ({ movieDetails }: { movieDetails: Movie }) => {
  // Render the overview section for the movie
  // If no overview is available, show a placeholder message
  return (
    <div className="space-y-2">
      {/* Section title */}
      <h2 className="font-semibold text-[20px]">Overview</h2>
      {/* Movie description or fallback text */}
      <p className="line-clamp-3">
        {movieDetails?.overview || 'We are working on it'}
      </p>
    </div>
  );
};

export default Overview;
