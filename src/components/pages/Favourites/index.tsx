import { useAuthStore } from '@/app/store/useAuthStore';
import { Link, Navigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import FavoritesList from './FavoritesList';

/**
 * Favourites component
 * Displays the user's favorite movies page, redirects to login if not authenticated.
 */
const Favourites = () => {
  // Get sessionId from authentication store
  const { sessionId } = useAuthStore();

  // If not authenticated, redirect to login page
  if (!sessionId) {
    return <Navigate to="/login" replace />;
  }

  // Render the favourites page UI
  return (
    <div className="h-[80vh]">
      {/* Title and back button */}
      <div className="flex items-center space-x-2 mb-2">
        <Link to="/movies" className="block">
          <ChevronLeft />
        </Link>
        <h1 className="py-2 font-semibold text-[30px] capitalize">
          Your favourites
        </h1>
      </div>
      {/* List of favourite movies */}
      <FavoritesList />
    </div>
  );
};

// Export the Favourites component as default
export default Favourites;
