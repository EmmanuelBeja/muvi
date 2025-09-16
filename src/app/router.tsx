// router.tsx
import { routeTree } from '@/app/routeTree.gen';
import ErrorBoundary from '@/components/pages/ErrorBoundary';
import NotFound from '@/components/pages/NotFound';
import { createRouter } from '@tanstack/react-router';

export const router = createRouter({
  routeTree,
  defaultErrorComponent: ErrorBoundary,
  defaultNotFoundComponent: NotFound,
});

export default router;
