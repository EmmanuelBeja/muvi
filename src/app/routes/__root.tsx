// RootRoute: layout, header, outlet
import ScrollToTop from '@/components/shared/ScrollToTop';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="w-full">
        <ScrollToTop />
        <div className="mx-auto p-4 max-w-6xl">
          <Outlet />
        </div>
      </div>
    );
  },
});
