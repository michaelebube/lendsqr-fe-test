import { afterEach, describe, expect, it } from 'vitest';
import { users } from './mockApi';
import { getStoredUserDetails, saveUserDetails } from './userStorage';

describe('userStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves user details', () => {
    saveUserDetails(users[0]);

    expect(getStoredUserDetails(users[0].id)).toEqual(users[0]);
  });

  it('clears malformed user detail records', () => {
    localStorage.setItem('lendsqr:user:USR-001', '{broken');

    expect(getStoredUserDetails('USR-001')).toBeNull();
    expect(localStorage.getItem('lendsqr:user:USR-001')).toBeNull();
  });
});
