import type { User } from '../types/auth';

const TOKEN_KEY = 'bandfinder.token';
const USER_KEY = 'bandfinder.user';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getUser: (): User | null => {
    const value = localStorage.getItem(USER_KEY);
    if (!value) return null;

    try {
      return JSON.parse(value) as User;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },
  setSession: (token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
