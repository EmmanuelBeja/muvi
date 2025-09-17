// src/app/routes/favourites.tsx
import Favourites from '@/components/pages/Favourites';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/favourites')({
  component: Favourites,
});
