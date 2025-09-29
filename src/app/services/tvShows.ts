// TV Shows APIs
import type { TVShowCategories } from '@/app/types';
import api from './api';

/**
 * Fetches TV shows by category and page
 */
export async function fetchTvShows(category: TVShowCategories, page = 1) {
  const res = await api.get(`/tv/${category}`, {
    params: { page },
  });
  return res.data;
}
/**
 * Fetches detailed info for a tv show, including credits
 */
export async function fetchTvShowDetails(tvShowId: number) {
  const res = await api.get(`/tv/${tvShowId}`, {
    params: { append_to_response: 'credits' },
  });
  return res.data;
}

/**
 * Fetches recommended tv shows for a given tv show
 */
export async function fetchTvShowRecommendations(tvShowId: number) {
  const res = await api.get(`/tv/${tvShowId}/recommendations`);
  return res.data;
}

/**
 * Fetches videos (trailers, clips) for a tv show
 */
export async function fetchTvShowVideos(tvShowId: number) {
  const { data } = await api.get(`/tv/${tvShowId}/videos`, {
    params: {
      language: 'en-US',
    },
  });
  return data.results; // array of videos
}

/**
 * Marks a tv show as favorite for the user
 */
export async function markTvShowAsFavorite(
  accountId: number,
  sessionId: string,
  tvShowId: number,
  favorite: boolean
) {
  const { data } = await api.post(
    `/account/${accountId}/favorite`,
    {
      media_type: 'tv',
      media_id: tvShowId,
      favorite,
    },
    {
      params: { session_id: sessionId },
    }
  );
  return data;
}

/**
 * Fetches the user's favorite tv shows
 */
export async function fetchFavoriteTvShows(
  accountId: number,
  sessionId: string,
  page = 1
) {
  const res = await api.get(`/account/${accountId}/favorite/tv`, {
    params: {
      session_id: sessionId,
      language: 'en-US',
      sort_by: 'created_at.desc',
      page,
    },
  });
  return res.data; // array of tv shows
}

/**
 * Fetches account state for a tv show (favorite, watchlist)
 */
export async function fetchTvShowAccountState(
  tvShowId: number,
  sessionId: string
) {
  const { data } = await api.get(`/tv/${tvShowId}/account_states`, {
    params: {
      session_id: sessionId,
    },
  });
  return data; // { id: number, favorite: boolean, watchlist: boolean }
}

/**
 * Searches for tv shows by query string
 */
export async function searchTvShows(query: string) {
  if (!query) return [];
  const res = await api.get(`/search/tv`, {
    params: {
      query,
    },
  });
  return res.data.results;
}
