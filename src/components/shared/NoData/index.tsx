import noData from '@/assets/shared/noData.svg';
import { CircleAlert } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * NoData component
 * Displays a message and icon when there is no data to show.
 * @param message - Optional message to display.
 * @param withIcon - Whether to show the icon.
 */
const NoData = ({
  message,
  withIcon,
}: {
  message?: string;
  withIcon?: boolean;
}) => {
  return (
    <div
      data-testid="no-data"
      className="flex flex-col justify-center mt-4 pt-12 pb-12 text-sm"
    >
      {withIcon && (
        <div className="flex justify-center items-center mb-2">
          <LazyLoadImage
            effect="blur"
            src={noData}
            className="drop-shadow-lg w-14 h-14 text-gray-500"
            alt={'Nothing to show'}
          />
        </div>
      )}
      <div className="flex justify-center items-center gap-x-2 my-2">
        <CircleAlert />{' '}
        <span className="capitalize">{message || 'Nothing to show.'}</span>
      </div>
    </div>
  );
};

export default NoData;
