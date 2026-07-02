import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { authApi } from '../../api/authApi';
import { renderWithProviders } from '../../tests/test-utils';
import { Login } from './Login';

vi.mock('../../api/authApi', () => ({
  authApi: {
    login: vi.fn(),
  },
}));

describe('Login', () => {
  it('submits credentials', async () => {
    vi.mocked(authApi.login).mockResolvedValue({
      token: 'token',
      user: { id: 1, email: 'jan@example.com', name: 'Jan' },
    });

    renderWithProviders(<Login />);

    await userEvent.type(screen.getByLabelText('Email'), 'jan@example.com');
    await userEvent.type(screen.getByLabelText('Hasło'), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

    await waitFor(() =>
      expect(authApi.login).toHaveBeenCalledWith(
        {
          email: 'jan@example.com',
          password: 'secret123',
        },
        expect.any(Object),
      ),
    );
  });
});
