export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));

const pluralize = (value: number, one: string, few: string, many: string) => {
  if (value === 1) return one;
  if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 12 || value % 100 > 14)) return few;
  return many;
};

export const formatRelativeDate = (value: string, now = new Date()) => {
  const createdAt = new Date(value);
  const diffMs = now.getTime() - createdAt.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / 86_400_000));

  if (diffDays === 0) return 'dzisiaj';
  if (diffDays < 7) return `${diffDays} ${pluralize(diffDays, 'dzień', 'dni', 'dni')} temu`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return diffWeeks === 1 ? 'tydzień temu' : `${diffWeeks} tygodnie temu`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return diffMonths === 1 ? 'miesiąc temu' : `${diffMonths} miesięcy temu`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? 'rok temu' : `${diffYears} lata temu`;
};
