import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const location = useRouterState({
    select: (s) => s.location,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  return null;
};

export default ScrollToTop;
