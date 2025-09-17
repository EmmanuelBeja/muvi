// src/app/routes/movies/index.tsx
import type { MovieCategories } from '@/app/types';
import Movies from '@/components/pages/Movies';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movies/')({
  component: Movies,
  validateSearch: (search) => ({
    category: (search.category as MovieCategories) ?? 'now_playing',
  }),
});
