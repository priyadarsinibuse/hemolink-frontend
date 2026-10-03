const SESSION_KEY = 'hemolink.session';

export function signIn(user = {}) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    authenticated: true,
    name: user.name?.trim() || 'Sridhar',
  }));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}

export function isAuthenticated() {
  return getSession().authenticated === true;
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}