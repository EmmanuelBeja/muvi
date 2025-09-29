// src/app/routes/tv-shows/index.tsx
// Route definition for the /tv-shows page
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import type { TVShowCategories } from '../../types';

// Create the /tv-shows route and render the TvShows component
export const Route = createFileRoute('/tv-shows/')({
  component: lazyRouteComponent(() => import('@/components/pages/TVShows')), // Render the TvShows page for this route
  validateSearch: (search) => ({
    // Ensure category param is a valid TVShowCategories value, default to 'popular'
    category: (search.category as TVShowCategories) ?? 'popular',
  }),
});
