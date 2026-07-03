const AUTH_KEY = 'literasi_auth';

const DUMMY_USER = {
  username: 'petugas',
  password: 'literasi123',
  namaPetugas: 'Petugas Perpustakaan',
  idPetugas: 'P001',
};

export function login(username, password) {
  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    const session = { idPetugas: DUMMY_USER.idPetugas, namaPetugas: DUMMY_USER.namaPetugas, username: DUMMY_USER.username };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }
  return { success: false, message: 'Username atau password tidak sesuai' };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

export function isAuthenticated() {
  return getUser() !== null;
}
