const USER_KEY = "sportmate_user";

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateCurrentUser(partialUser) {
  const current = getCurrentUser() || {};
  const updated = { ...current, ...partialUser };
  setCurrentUser(updated);
  return updated;
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}
