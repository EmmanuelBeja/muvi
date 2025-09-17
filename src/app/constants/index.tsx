// List of movie category keys used in the app
export const movieCategories = [
  'now_playing',
  'popular',
  'top_rated',
  'upcoming',
] as const;

// Mapping of category keys to their display names
export const movieCategoriesMap = {
  now_playing: 'Now Playing',
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
};
