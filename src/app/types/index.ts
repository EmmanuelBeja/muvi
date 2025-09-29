import type { MOVIE_CATEGORIES, TV_SHOW_CATEGORIES } from '../constants';

/**
 * Media type
 * Represents a media object returned from TMDB API
 */
export type Media = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date?: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number; // can have decimals
  video: boolean;
  vote_average: number; // can have decimals
  vote_count: number;

  // TV show specific fields (for type reuse)
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
};

/**
 * Cast type
 * Represents a cast member in a movie
 */
export type Cast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number; // can be decimal
  profile_path: string;
};

/**
 * Crew type
 * Represents a crew member in a movie
 */
export type Crew = {
  adult: boolean;
  credit_id: string;
  gender: number;
  department: string;
  job: string;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number; // can be decimal
  profile_path: string;
};

/**
 * CastCrew type
 * Combines Cast and Crew types
 */
export type CastCrew = Cast & Crew;

/**
 * MediaDetails type
 * Represents detailed information about a movie/tv show, including credits and metadata
 */
export type MediaDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    backdrop_path: string | null;
    id: number;
    name: string;
    poster_path: string | null;
  } | null;
  budget: number;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string; // ISO date string
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  // TV show specific fields (for type reuse)
  name?: string;
  original_name?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  type?: string;
};

/**
 * MovieCategories type
 * Infers valid movie category keys from MOVIE_CATEGORIES constant
 */
export type MovieCategories = (typeof MOVIE_CATEGORIES)[number];

export type TVShowCategories = (typeof TV_SHOW_CATEGORIES)[number];
