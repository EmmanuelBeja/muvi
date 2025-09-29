import { useFetchMediaSearch } from '@/app/hooks/movies/useFetchMediaSearch';
import { useDebounce } from '@/app/hooks/shared/useDebounce';
import MediaCard from '@/components/shared/Media/MediaCard';
import Preloader from '@/components/shared/Preloader';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import NoData from '../NoData';

// MovieSearchNavigationMenuItem component
// Provides a navigation menu item for searching movies with a drawer UI
const MovieSearchNavigationMenuItem = () => {
  // State to control drawer open/close
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // State for search query input
  const [query, setQuery] = useState('');
  // Debounce the query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, 700);

  // Fetch movies matching the debounced search query
  const { data: mediaData = { movies: [], tvShows: [] }, isLoading } =
    useFetchMediaSearch(debouncedQuery);

  // Render the drawer and search UI
  return (
    <Drawer open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
      {/* Button to open the search drawer */}
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
            mediaData?.movies[0] || mediaData?.tvShows[0] ? 'h-[100vh]' : ''
          )}
        >
          {/* Button to close the drawer */}
          <DrawerClose asChild>
            <Button
              data-testid="search-drawer-close-button"
              variant="outline"
              className="top-2 right-2 absolute"
            >
              <X />
            </Button>
          </DrawerClose>
          {/* Search input field */}
          <div className="group flex space-x-1 mx-auto p-4 pb-0 border-1 w-full max-w-sm">
            <Search className="my-auto text-tertiary group-hover:animate-pulse" />
            <Input
              data-testid="search-input"
              placeholder="Search For a Movie/TV Show"
              className="shadow-none drop-shadow-none border-none rounded-0"
              value={query}
              autoFocus
              onChange={(e) => setQuery(e.target.value)} // Update query state on input change
            />
          </div>

          {/* Show loading spinner while fetching results */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-[50vh]">
              <Preloader />
            </div>
          ) : (
            <Tabs
              defaultValue="movies"
              className="mx-auto px-4 pb-20 max-w-6xl"
            >
              <TabsList>
                <TabsTrigger
                  value="movies"
                  className={cn({
                    'text-primary': mediaData?.movies?.length > 0,
                  })}
                >
                  Movies
                </TabsTrigger>
                <TabsTrigger
                  value="tv-shows"
                  className={cn({
                    'text-primary': mediaData?.tvShows?.length > 0,
                  })}
                >
                  TV Shows
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="movies"
                className="pb-20 h-[80vh] overflow-y-scroll"
              >
                {mediaData?.movies?.length === 0 && (
                  <div className="flex justify-center items-center h-full">
                    <NoData withIcon message="No movies found" />
                  </div>
                )}
                <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
                  {/* Render search results as MediaCard components */}
                  {mediaData?.movies.map((movie) => (
                    <li
                      key={movie.id}
                      className="bg-white shadow p-3 rounded-lg h-fit"
                      data-testid="search-result"
                    >
                      <MediaCard
                        media={movie}
                        // When a movie card is clicked, close the drawer
                        onClick={() => setDrawerIsOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent
                value="tv-shows"
                className="pb-20 h-[80vh] overflow-y-scroll"
              >
                {mediaData?.tvShows?.length === 0 && (
                  <div className="flex justify-center items-center h-full">
                    <NoData withIcon message="No TV shows found" />
                  </div>
                )}
                <ul className="gap-4 grid grid-cols-2 md:grid-cols-4">
                  {/* Render search results as MediaCard components */}
                  {mediaData?.tvShows.map((tvShow) => (
                    <li
                      key={tvShow.id}
                      className="bg-white shadow p-3 rounded-lg h-fit"
                    >
                      <MediaCard
                        media={tvShow}
                        isTvShow
                        // When a movie card is clicked, close the drawer
                        onClick={() => setDrawerIsOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MovieSearchNavigationMenuItem;
