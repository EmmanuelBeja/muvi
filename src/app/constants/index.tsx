// List of movie category keys used in the app
export const MOVIE_CATEGORIES = [
  'now_playing',
  'popular',
  'top_rated',
  'upcoming',
] as const;

// Mapping of category keys to their display names
export const MOVIE_CATEGORIES_MAP = {
  now_playing: 'Now Playing',
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
};

// List of TV show category keys used in the app
export const TV_SHOW_CATEGORIES = [
  'popular',
  'top_rated',
  'on_the_air',
  'airing_today',
] as const;

// Mapping of TV category keys to their display names
export const TV_SHOW_CATEGORIES_MAP = {
  popular: 'Popular',
  top_rated: 'Top Rated',
  on_the_air: 'On The Air',
  airing_today: 'Airing Today',
};

// Base URL for fetching images from TMDB
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
