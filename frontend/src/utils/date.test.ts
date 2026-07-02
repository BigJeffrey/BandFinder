import { describe, expect, it } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('formats ISO date for Polish locale', () => {
    expect(formatDate('2026-07-02T12:00:00.000Z')).toContain('2026');
  });
});
