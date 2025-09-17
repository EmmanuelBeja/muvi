import Movie from '@/components/pages/Movie';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movies/$movieId')({
  component: Movie,
});
