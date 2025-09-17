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
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                to="/login"
                className="bg-transparent hover:bg-primary/60 hover:drop-shadow-lg font-semibold text-[18px] text-white hover:text-secondary"
              >
                Login
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
