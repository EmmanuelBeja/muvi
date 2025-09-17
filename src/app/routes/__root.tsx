// RootRoute: layout, header, outlet
import Footer from '@/components/shared/layout/Footer';
import { Navbar } from '@/components/shared/layout/Navbar';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '../store/useAuthStore';

export const Route = createRootRoute({
  component: () => {
    const accountUsername = useAuthStore.getState().accountUsername;
    return (
      <div className="w-full">
        <ScrollToTop />
        <Navbar />
        <div className="mx-auto p-4 max-w-6xl">
          {accountUsername ? (
            <div className="font-semibold text-sm">
              Hello <span className="text-secondary">{accountUsername}</span>!
            </div>
          ) : (
            ''
          )}
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  },
});
