import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../tests/test-utils';
import { ProtectedRoute } from './ProtectedRoute';

describe('ProtectedRoute', () => {
  it('redirects anonymous users to login', () => {
    renderWithProviders(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Private</div>} />
        </Route>
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>,
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
