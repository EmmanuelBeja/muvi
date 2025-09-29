// src/app/routes/favourites.tsx
// Route definition for the /favourites page
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

// Create the /favourites route and render the Favourites component
export const Route = createFileRoute('/favourites')({
  component: lazyRouteComponent(() => import('@/components/pages/Favourites')), // Render the Favourites page for this route
});
