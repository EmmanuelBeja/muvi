// RootRoute: layout, header, outlet
// Defines the root route for the app, including layout and shared components
import Footer from '@/components/shared/layout/Footer';
import { Navbar } from '@/components/shared/layout/Navbar';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '../store/useAuthStore';

// Create the root route with layout and shared UI
export const Route = createRootRoute({
  component: () => {
    // Get the current account username from auth store
    const accountUsername = useAuthStore.getState().accountUsername;
    return (
      <div className="w-full">
        {/* Scroll to top on route change */}
        <ScrollToTop />
        {/* Navigation bar */}
        <Navbar />
        {/* Main content area */}
        <div className="mx-auto p-4 max-w-6xl">
          {/* Show greeting if user is logged in */}
          {accountUsername ? (
            <div className="font-semibold text-sm">
              Hello <span className="text-secondary">{accountUsername}</span>!
            </div>
          ) : (
            ''
          )}
          {/* Render child routes */}
          <Outlet />
        </div>
        {/* Footer at the bottom */}
        <Footer />
      </div>
    );
  },
});
