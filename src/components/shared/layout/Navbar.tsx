import { useAuthStore } from '@/app/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, useRouterState } from '@tanstack/react-router';
import { LogIn, LogOut } from 'lucide-react';
import { cn } from '../../../lib/utils';
import MovieSearchNavigationMenuItem from './MovieSearchNavigationMenuItem';

// Navbar component
// Renders the top navigation bar with search, favourites, login/logout
export function Navbar() {
  const { location } = useRouterState();
  // Get sessionId and logout function from auth store
  const { sessionId, logout } = useAuthStore();

  // Render navigation menu
  return (
    <NavigationMenu className="top-0 z-50 sticky justify-center bg-primary shadow">
      <div className="flex justify-between p-4 w-full max-w-6xl">
        {/* Logo/Home link */}
        <Link
          to="/"
          className="flex justify-center items-center bg-secondary drop-shadow-lg border border-white border-dashed rounded-full w-[36px] h-[36px] font-extrabold text-[24px] text-white animate-pulse"
        >
          🍿
        </Link>
        <NavigationMenuList className="flex items-center space-x-2">
          {/* Search menu item */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <MovieSearchNavigationMenuItem />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                to="/movies"
                className={cn(
                  'hover:bg-transparent focus:bg-transparent drop-shadow-lg font-semibold text-[18px] hover:text-secondary focus:text-secondary',
                  location.pathname.includes('/movies')
                    ? 'bg-primary/60 text-secondary border border-secondary'
                    : 'bg-transparent text-white'
                )}
              >
                Movies
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                to="/tv-shows/"
                className={cn(
                  'hover:bg-transparent focus:bg-transparent drop-shadow-lg font-semibold text-[18px] hover:text-secondary focus:text-secondary',
                  location.pathname.includes('/tv-shows')
                    ? 'bg-primary/60 text-secondary border border-secondary'
                    : 'bg-transparent text-white'
                )}
              >
                TV Shows
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* Favourites link, only if logged in */}
          {sessionId ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  to="/favourites"
                  className={cn(
                    'hover:bg-transparent focus:bg-transparent drop-shadow-lg font-semibold text-[18px] hover:text-secondary focus:text-secondary',
                    location.pathname.includes('/favourites')
                      ? 'bg-primary/60 text-secondary border border-secondary'
                      : 'bg-transparent text-white'
                  )}
                >
                  Favourites
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : null}
          {/* Login/Logout button depending on auth state */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {sessionId ? (
                <Button
                  onClick={() => logout()} // Logout when clicked
                  className="bg-transparent hover:bg-transparent focus:bg-transparent drop-shadow-lg hover:drop-shadow-lg font-semibold text-[18px] text-white hover:text-secondary focus:text-secondary"
                >
                  <LogOut />
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="bg-transparent hover:bg-transparent focus:bg-transparent drop-shadow-lg hover:drop-shadow-lg font-semibold text-[18px] text-white hover:text-secondary focus:text-secondary"
                >
                  <LogIn />
                </Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
