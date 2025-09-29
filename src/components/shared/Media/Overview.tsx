import type { Media } from '@/app/types';

/**
 * Overview component
 * Displays the overview/description for a media.
 * @param mediaDetails - Media object to display overview for.
 */
const Overview = ({ mediaDetails }: { mediaDetails: Media }) => {
  // Render the overview section for the media
  // If no overview is available, show a placeholder message
  return (
    <div className="space-y-2">
      {/* Section title */}
      <h2 className="font-semibold text-[20px]">Overview</h2>
      {/* Media description or fallback text */}
      <p className="line-clamp-3">
        {mediaDetails?.overview || 'We are working on it'}
      </p>
    </div>
  );
};

export default Overview;
