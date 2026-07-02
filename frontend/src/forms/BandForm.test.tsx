import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../tests/test-utils';
import { BandForm } from './BandForm';

describe('BandForm', () => {
  it('submits valid band input', async () => {
    const onSubmit = vi.fn();
    renderWithProviders(
      <BandForm isSubmitting={false} submitLabel="Dodaj" onSubmit={onSubmit} />,
    );

    await userEvent.type(screen.getByLabelText('Nazwa zespołu'), 'Blue Room');
    await userEvent.type(screen.getByLabelText('Miasto'), 'Warszawa');
    await userEvent.type(screen.getByLabelText('Gatunek'), 'Jazz');
    await userEvent.type(screen.getByLabelText('Poszukiwany instrument'), 'Saksofon');
    await userEvent.type(screen.getByLabelText('Opis ogłoszenia'), 'Szukamy muzyka do koncertów.');
    await userEvent.type(screen.getByLabelText('Email kontaktowy'), 'band@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Dodaj' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });
});
