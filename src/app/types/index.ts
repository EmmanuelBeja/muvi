import type { movieCategories } from '../constants';

export type Movie = {
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
};

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

export type CastCrew = Cast & Crew;

export type MovieDetails = {
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
};

// infer types
export type MovieCategories = (typeof movieCategories)[number];
