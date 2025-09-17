import type { MovieCategories } from '@/app/types';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  params: { api_key: import.meta.env.VITE_APP_TMDB_API_KEY },
});

// Movie APIs
export async function fetchMovies(category: MovieCategories, page = 1) {
  const res = await api.get(`/movie/${category}`, {
    params: { page },
  });
  return res.data;
}

export async function fetchMovieDetails(id: number) {
  const res = await api.get(`/movie/${id}`, {
    params: { append_to_response: 'credits' },
  });
  return res.data;
}

export async function fetchMovieRecommendations(id: number) {
  const res = await api.get(`/movie/${id}/recommendations`);
  return res.data;
}

export async function fetchMovieVideos(movieId: number) {
  const { data } = await api.get(`/movie/${movieId}/videos`, {
    params: {
      language: 'en-US',
    },
  });

  return data.results; // array of videos
}

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

export async function searchMovies(query: string) {
  if (!query) return [];
  const res = await api.get(`/search/movie`, {
    params: {
      query,
    },
  });
  return res.data.results;
}

// Auth APIS
export async function fetchRequestToken() {
  const { data } = await api.get(`/authentication/token/new`);
  return data.request_token;
}

export async function createSession(requestToken: string) {
  const { data } = await api.post(`/authentication/session/new`, {
    request_token: requestToken,
  });
  return data.session_id;
}

export async function fetchAccount(sessionId: string) {
  const { data } = await api.get(`/account`, {
    params: { session_id: sessionId },
  });
  return data;
}
