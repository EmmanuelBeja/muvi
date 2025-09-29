// Route definition for the /tv-shows/:tvShowId page (tv show details)
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

// Create the /tv-shows/$tvShowId route and render the TvShow component
export const Route = createFileRoute('/tv-shows/$tvShowId')({
  component: lazyRouteComponent(() => import('@/components/pages/TvShow')), // Render the TvShow details page for this route
});
