import type { CastCrew as CastCrewType } from '@/app/types';
import castCrewPlaceholder from '@/assets/pages/movies/$movieId/crewPlaceholder.png';
import { Card, CardContent } from '@/components/ui/card';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * CastCrewCard component
 * Displays a card for a cast or crew member with image, name, and role/job.
 * @param castCrewMember - Cast or crew member object to display.
 */
const CastCrewCard = ({ castCrewMember }: { castCrewMember: CastCrewType }) => {
  return (
    <Card className="px-0 w-full">
      <CardContent className="flex justify-center items-center px-0 pb-2">
        <div className="block w-full">
          <LazyLoadImage
            effect="blur"
            src={
              castCrewMember?.profile_path
                ? `https://image.tmdb.org/t/p/w500${castCrewMember.profile_path}`
                : castCrewPlaceholder
            }
            alt={castCrewMember.name}
            width={`100%`}
            className="bg-secondary-foreground rounded-lg w-full h-[200px] object-contain"
          />
          <div className="px-1 w-full">
            <h3 className="mt-2 font-bold text-sm">{castCrewMember.name}</h3>
            <p className="truncate">
              {castCrewMember?.character || castCrewMember?.job}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CastCrewCard;
