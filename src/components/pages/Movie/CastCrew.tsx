import type { CastCrew as CastCrewType } from '@/app/types';
import NoData from '@/components/shared/NoData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import CastCrewCard from './CastCrewCard';

const CastCrew = ({
  castCrew,
  title,
}: {
  castCrew: CastCrewType[];
  title: string;
}) => {
  return (
    <div className="relative space-y-2">
      <h2 className="font-semibold text-[20px]">{title}</h2>

      {castCrew?.length > 0 ? (
        <Carousel
          opts={{
            align: 'start',
          }}
          className="justify-center w-full"
        >
          <CarouselContent>
            {castCrew?.map((castCrewMember, idx) => (
              <CarouselItem
                key={`${castCrewMember.id}-cast-crew-member-${idx}`}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <CastCrewCard castCrewMember={castCrewMember} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex justify-center items-center w-full h-[30vh]">
          <NoData withIcon />
        </div>
      )}
    </div>
  );
};

export default CastCrew;
