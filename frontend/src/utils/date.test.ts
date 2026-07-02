import { describe, expect, it } from 'vitest';
import { formatDate, formatRelativeDate } from './date';

describe('formatDate', () => {
  it('formats ISO date for Polish locale', () => {
    expect(formatDate('2026-07-02T12:00:00.000Z')).toContain('2026');
  });

  it('formats relative listing age', () => {
    const now = new Date('2026-07-20T12:00:00.000Z');

    expect(formatRelativeDate('2026-07-20T08:00:00.000Z', now)).toBe('dzisiaj');
    expect(formatRelativeDate('2026-07-16T12:00:00.000Z', now)).toBe('4 dni temu');
    expect(formatRelativeDate('2026-07-06T12:00:00.000Z', now)).toBe('2 tygodnie temu');
    expect(formatRelativeDate('2026-06-15T12:00:00.000Z', now)).toBe('miesiąc temu');
  });
});
