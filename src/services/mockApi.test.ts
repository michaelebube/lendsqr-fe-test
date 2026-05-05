import { describe, expect, it } from 'vitest';
import { getUserById, getUsers } from './mockApi';

describe('mockApi', () => {
  it('returns 500 user records', async () => {
    const records = await getUsers();

    expect(records).toHaveLength(500);
    expect(records[0]).toMatchObject({
      id: 'USR-001',
      organization: 'Lendsqr',
    });
  });

  it('returns null for an unknown user', async () => {
    await expect(getUserById('missing-user')).resolves.toBeNull();
  });
});
