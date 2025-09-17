// src/app/routes/login.tsx
// Route definition for the /login page
// import Login from '@/components/pages/Login';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

// Create the /login route with validation for search params
export const Route = createFileRoute('/login')({
  component: lazyRouteComponent(() => import('@/components/pages/Login')), // Render the Login component for this route
  validateSearch: (search) => ({
    // Ensure callback param is treated as boolean
    callback: search.callback as boolean,
  }),
});
