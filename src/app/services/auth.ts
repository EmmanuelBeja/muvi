// Auth APIs
import api from './api';

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
