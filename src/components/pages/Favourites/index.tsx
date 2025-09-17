import { useAuthStore } from '@/app/store/useAuthStore';
import { Link, Navigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import FavoritesList from './FavoritesList';

const Favourites = () => {
  const { sessionId } = useAuthStore();

  if (!sessionId) {
    // send to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-[80vh]">
      {/* title */}
      <div className="flex items-center space-x-2 mb-2">
        <Link to="/movies" className="block">
          <ChevronLeft />
        </Link>
        <h1 className="py-2 font-semibold text-[30px] capitalize">
          Your favourites
        </h1>
      </div>
      <FavoritesList />
    </div>
  );
};

export default Favourites;
