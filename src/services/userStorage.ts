import type { User } from '../types/user';

const keyForUser = (userId: string) => `lendsqr:user:${userId}`;

export function saveUserDetails(user: User) {
  localStorage.setItem(keyForUser(user.id), JSON.stringify(user));
}

export function getStoredUserDetails(userId: string): User | null {
  const rawUser = localStorage.getItem(keyForUser(userId));

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    localStorage.removeItem(keyForUser(userId));
    return null;
  }
}
