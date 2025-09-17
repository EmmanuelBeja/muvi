import { useAuthStore } from '@/app/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from '@tanstack/react-router';
import MovieSearchNavigationMenuItem from './MovieSearchNavigationMenuItem';

export function Navbar() {
  const { sessionId, logout } = useAuthStore();

  return (
    <NavigationMenu className="justify-center bg-primary">
      <div className="flex justify-between p-4 w-full max-w-6xl">
        <Link to="/" className="font-extrabold text-[30px] text-white">
          🍿 movies
        </Link>
        <NavigationMenuList className="flex items-center space-x-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <MovieSearchNavigationMenuItem />
            </NavigationMenuLink>
          </NavigationMenuItem>
          {sessionId ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  to="/favourites"
                  className="bg-transparent hover:bg-primary/60 hover:drop-shadow-lg font-semibold text-[18px] text-white hover:text-secondary"
                >
                  Favourites
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : null}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {sessionId ? (
                <Button
                  onClick={() => logout()}
                  className="bg-transparent hover:bg-primary/60 hover:drop-shadow-lg font-semibold text-white hover:text-secondary"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="bg-transparent hover:bg-primary/60 hover:drop-shadow-lg font-semibold text-[18px] text-white hover:text-secondary"
                >
                  Login
                </Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
