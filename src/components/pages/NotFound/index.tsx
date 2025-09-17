import { Link } from '@tanstack/react-router';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center">
      <h1 className="font-bold text-primary text-5xl">404</h1>
      <p className="mt-4 text-gray-600 text-lg">Page not found</p>
      <Link to="/" className="mt-6 text-secondary hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
