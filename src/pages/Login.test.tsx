import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Login } from './Login';

describe('Login', () => {
  it('shows a validation error for bad credentials', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/enter a valid email and password/i)).toBeInTheDocument();
  });

  it('accepts valid credentials', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'candidate@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'secret');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.queryByText(/enter a valid email and password/i)).not.toBeInTheDocument();
  });
});
