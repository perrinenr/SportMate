import { getCurrentUser } from "./auth";

export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5156/api";

function buildHeaders(extraHeaders = {}) {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.id ? { "X-User-Id": String(user.id) } : {}),
    ...extraHeaders,
  };
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const message = data?.message || data?.title || "Backend request failed.";
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, { method: "POST", body: JSON.stringify(body || {}) }),
  put: (path, body) => apiRequest(path, { method: "PUT", body: JSON.stringify(body || {}) }),
  delete: (path) => apiRequest(path, { method: "DELETE" }),
};
