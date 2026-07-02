import type { ChangeEvent } from 'react';
import type { BandFilters } from '../../types/band';

type SearchFilters = Pick<BandFilters, 'search' | 'city' | 'genre' | 'instrumentNeeded'>;

interface SearchBarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export function SearchBar({ filters, onChange }: SearchBarProps) {
  const update = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <section className="search-panel" aria-label="Filtry ogłoszeń">
      <input name="search" placeholder="Szukaj zespołu" value={filters.search} onChange={update} />
      <input name="city" placeholder="Miasto" value={filters.city} onChange={update} />
      <input name="genre" placeholder="Gatunek" value={filters.genre} onChange={update} />
      <input
        name="instrumentNeeded"
        placeholder="Instrument"
        value={filters.instrumentNeeded}
        onChange={update}
      />
    </section>
  );
}
