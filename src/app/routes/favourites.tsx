// src/app/routes/favourites.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/favourites')({
  component: () => <>Favorite</>,
});
