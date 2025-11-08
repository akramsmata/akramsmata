const TOKEN_KEY = 'chicdz-token';

export function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}
