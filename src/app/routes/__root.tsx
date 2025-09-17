// RootRoute: layout, header, outlet
import Footer from '@/components/shared/layout/Footer';
import { Navbar } from '@/components/shared/layout/Navbar';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="w-full">
        <ScrollToTop />
        <Navbar />
        <div className="mx-auto p-4 max-w-6xl">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  },
});
