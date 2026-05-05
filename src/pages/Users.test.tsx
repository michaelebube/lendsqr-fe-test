import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Users } from './Users';

describe('Users', () => {
  it('renders mock users and the 500 user count', async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('500')).toBeInTheDocument());
    expect(screen.getByText('graceeffiom001')).toBeInTheDocument();
  });

  it('shows an empty state when filters do not match', async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText('graceeffiom001')).toBeInTheDocument());
    await userEvent.click(screen.getAllByRole('button', { name: /show filters/i })[0]);
    await userEvent.type(screen.getByPlaceholderText(/user/i), 'no-such-user');

    expect(screen.getByText(/no users match your filters/i)).toBeInTheDocument();
  });
});
