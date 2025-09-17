import { useDebounce } from '@/app/hooks/useDebounce';
import { useFetchMovieSearch } from '@/app/hooks/useFetchMovieSearch';
import type { Movie } from '@/app/types';
import MovieCard from '@/components/shared/MovieCard';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

const MovieSearchNavigationMenuItem = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 700);

  const { data: moviesData = [], isLoading } =
    useFetchMovieSearch(debouncedQuery);

  return (
    <Drawer open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
      <DrawerTrigger asChild data-testid="search-nav-bar-button">
        <Button className="bg-transparent hover:bg-primary/60 hover:drop-shadow-lg font-semibold text-[18px] text-white hover:text-secondary">
          <Search />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div
          data-testid="search-drawer"
          className={cn(
            'relative w-full h-[70vh]',
            moviesData?.length > 0 ? 'h-[100vh]' : ''
          )}
        >
          <DrawerClose asChild>
            <Button
              data-testid="search-drawer-close-button"
              variant="outline"
              className="top-2 right-2 absolute"
            >
              <X />
            </Button>
          </DrawerClose>
          {/* search input */}
          <div className="group flex space-x-1 mx-auto p-4 pb-0 border-1 w-full max-w-sm">
            <Search className="my-auto text-tertiary group-hover:animate-pulse" />
            <Input
              data-testid="search-input"
              placeholder="Search For a Movie"
              className="shadow-none drop-shadow-none border-none rounded-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center w-full h-[50vh]">
              <Preloader />
            </div>
          ) : (
            <ul className="gap-4 grid grid-cols-2 md:grid-cols-4 mx-auto p-4 pb-20 max-w-6xl h-full overflow-y-scroll">
              {/* search result */}
              {moviesData.map((movie: Movie) => (
                <li
                  key={movie.id}
                  className="bg-white shadow p-3 rounded-lg"
                  data-testid="search-result"
                >
                  <MovieCard
                    movie={movie}
                    onClick={() => setDrawerIsOpen(false)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MovieSearchNavigationMenuItem;
