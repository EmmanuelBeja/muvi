import type { Movie } from '@/app/types';

const Overview = ({ movieDetails }: { movieDetails: Movie }) => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-[20px]">Overview</h2>
      <p className="line-clamp-3">
        {movieDetails?.overview || 'We are working on it'}
      </p>
    </div>
  );
};

export default Overview;
