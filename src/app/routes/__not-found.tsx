import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__not-found')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="font-bold text-primary text-5xl">404</h1>
      <p className="mt-4 text-gray-600 text-lg">Page not found</p>
      <a href="/" className="mt-6 text-secondary hover:underline">
        Go back home
      </a>
    </div>
  );
}
