import { TMDB_IMAGE_BASE_URL } from '@/app/constants';
import type { CastCrew as CastCrewType } from '@/app/types';
import { Card, CardContent } from '@/components/ui/card';
import ColorThief from 'colorthief';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * CastCrewCard component
 * Displays a card for a cast or crew member with image, name, and role/job.
 * @param castCrewMember - Cast or crew member object to display.
 */
const CastCrewCard = ({ castCrewMember }: { castCrewMember: CastCrewType }) => {
  const [bgColor, setBgColor] = useState<string>('#e5e5e5'); // default

  useEffect(() => {
    if (!castCrewMember?.profile_path) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `${TMDB_IMAGE_BASE_URL}/w500${castCrewMember.profile_path}`;

    img.onload = () => {
      const colorThief = new ColorThief();
      const result = colorThief.getColor(img);
      setBgColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
    };
  }, [castCrewMember]);

  return (
    <Card className="shadow-none drop-shadow-none px-0 border-none w-full">
      <CardContent className="flex justify-center items-center px-0 pb-2">
        <div className="block w-full">
          <div
            className="flex justify-center items-center drop-shadow-lg p-1 rounded-md w-full max-w-[200px] h-[250px] aspect-square"
            style={{ backgroundColor: bgColor }}
          >
            {castCrewMember?.profile_path ? (
              <LazyLoadImage
                effect="blur"
                src={`${TMDB_IMAGE_BASE_URL}/w500${castCrewMember.profile_path}`}
                alt={castCrewMember.name}
                className="h-[250px] object-contain"
              />
            ) : (
              <>
                <div className="w-full font-semibold text-[20px] text-secondary text-center">
                  ?
                </div>
              </>
            )}
          </div>
          <div className="px-1 w-full text-center">
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
