import axios from 'axios';

// Axios instance configured for TMDB API
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  params: { api_key: import.meta.env.VITE_APP_TMDB_API_KEY },
});

export default api;
