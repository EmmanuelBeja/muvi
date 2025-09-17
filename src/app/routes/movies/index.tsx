// src/app/routes/movies/index.tsx
// Route definition for the /movies page
import type { MovieCategories } from '@/app/types';
import Movies from '@/components/pages/Movies';
import { createFileRoute } from '@tanstack/react-router';

// Create the /movies route with validation for search params
export const Route = createFileRoute('/movies/')({
  component: Movies, // Render the Movies page for this route
  validateSearch: (search) => ({
    // Ensure category param is a valid MovieCategories value, default to 'now_playing'
    category: (search.category as MovieCategories) ?? 'now_playing',
  }),
});
