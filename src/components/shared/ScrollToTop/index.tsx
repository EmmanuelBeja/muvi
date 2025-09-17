import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

// ScrollToTop component
// Scrolls the window to the top whenever the route changes
const ScrollToTop = () => {
  // Get the current location from the router state
  const location = useRouterState({
    select: (s) => s.location,
  });

  // Effect: scroll to top when pathname or search changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  // This component does not render anything
  return null;
};

export default ScrollToTop;
