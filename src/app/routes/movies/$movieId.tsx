// Route definition for the /movies/:movieId page (movie details)
import Movie from '@/components/pages/Movie';
import { createFileRoute } from '@tanstack/react-router';

// Create the /movies/$movieId route and render the Movie component
export const Route = createFileRoute('/movies/$movieId')({
  component: Movie, // Render the Movie details page for this route
});
