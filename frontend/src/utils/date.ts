export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
