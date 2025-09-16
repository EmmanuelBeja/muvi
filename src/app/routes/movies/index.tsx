// src/app/routes/movies/index.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movies/')({
  component: () => <>Movies</>,
});
