import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../tests/test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders loading state', () => {
    renderWithProviders(<Button isLoading>Wyślij</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Przetwarzanie...')).toBeInTheDocument();
  });
});
