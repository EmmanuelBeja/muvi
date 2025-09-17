// "/" home route
// Route definition for the root (home) page
import { createFileRoute, redirect } from '@tanstack/react-router';

// Create the root route and redirect to /movies
export const Route = createFileRoute('/')({
  loader: () => {
    // Redirect users from / to /movies
    throw redirect({ to: '/movies' });
  },
});
