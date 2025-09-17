// router.tsx
// Sets up the application's main router using TanStack Router
import { routeTree } from '@/app/routeTree.gen';
import ErrorBoundary from '@/components/pages/ErrorBoundary';
import NotFound from '@/components/pages/NotFound';
import { createRouter } from '@tanstack/react-router';

// Create and configure the router instance
export const router = createRouter({
  routeTree, // Generated route tree for all app routes
  defaultErrorComponent: ErrorBoundary, // Component to show on errors
  defaultNotFoundComponent: NotFound, // Component to show for unknown routes
});

export default router;
