import type { MovieCategories } from '@/app/types';
import axios from 'axios';

// Axios instance configured for TMDB API
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  params: { api_key: import.meta.env.VITE_APP_TMDB_API_KEY },
});

// Movie APIs

/**
 * Fetches movies by category and page
 */
export async function fetchMovies(category: MovieCategories, page = 1) {
  const res = await api.get(`/movie/${category}`, {
    params: { page },
  });
  return res.data;
}

/**
 * Fetches detailed info for a movie, including credits
 */
export async function fetchMovieDetails(id: number) {
  const res = await api.get(`/movie/${id}`, {
    params: { append_to_response: 'credits' },
  });
  return res.data;
}

/**
 * Fetches recommended movies for a given movie
 */
export async function fetchMovieRecommendations(id: number) {
  const res = await api.get(`/movie/${id}/recommendations`);
  return res.data;
}

/**
 * Fetches videos (trailers, clips) for a movie
 */
export async function fetchMovieVideos(movieId: number) {
  const { data } = await api.get(`/movie/${movieId}/videos`, {
    params: {
      language: 'en-US',
    },
  });
  return data.results; // array of videos
}

/**
 * Marks a movie as favorite for the user
 */
export async function markMovieAsFavorite(
  accountId: number,
  sessionId: string,
  movieId: number,
  favorite: boolean
) {
  const { data } = await api.post(
    `/account/${accountId}/favorite`,
    {
      media_type: 'movie',
      media_id: movieId,
      favorite,
    },
    {
      params: { session_id: sessionId },
    }
  );
  return data;
}

/**
 * Fetches the user's favorite movies
 */
export async function fetchFavoriteMovies(
  accountId: number,
  sessionId: string
) {
  const { data } = await api.get(`/account/${accountId}/favorite/movies`, {
    params: {
      session_id: sessionId,
      language: 'en-US',
      sort_by: 'created_at.desc',
      page: 1,
    },
  });
  return data.results; // array of movies
}

/**
 * Fetches account state for a movie (favorite, watchlist)
 */
export async function fetchMovieAccountState(
  movieId: number,
  sessionId: string
) {
  const { data } = await api.get(`/movie/${movieId}/account_states`, {
    params: {
      session_id: sessionId,
    },
  });
  return data; // { id: number, favorite: boolean, watchlist: boolean }
}

/**
 * Searches for movies by query string
 */
export async function searchMovies(query: string) {
  if (!query) return [];
  const res = await api.get(`/search/movie`, {
    params: {
      query,
    },
  });
  return res.data.results;
}

// Auth APIs

/**
 * Fetches a new request token for authentication
 */
export async function fetchRequestToken() {
  const { data } = await api.get(`/authentication/token/new`);
  return data.request_token;
}

/**
 * Creates a new session using a request token
 */
export async function createSession(requestToken: string) {
  const { data } = await api.post(`/authentication/session/new`, {
    request_token: requestToken,
  });
  return data.session_id;
}

/**
 * Fetches account details for the authenticated user
 */
export async function fetchAccount(sessionId: string) {
  const { data } = await api.get(`/account`, {
    params: { session_id: sessionId },
  });
  return data;
}
