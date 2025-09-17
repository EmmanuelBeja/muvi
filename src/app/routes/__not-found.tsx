// Not-found route: handles unknown routes and displays a 404 page
import { createFileRoute } from '@tanstack/react-router';

// Create the /__not-found route and render the RouteComponent
export const Route = createFileRoute('/__not-found')({
  component: RouteComponent, // Render the not-found page for this route
});

// Component for displaying the 404 not found page
function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      {/* 404 error code */}
      <h1 className="font-bold text-primary text-5xl">404</h1>
      {/* Not found message */}
      <p className="mt-4 text-gray-600 text-lg">Page not found</p>
      {/* Link to go back to home page */}
      <a href="/" className="mt-6 text-secondary hover:underline">
        Go back home
      </a>
    </div>
  );
}
