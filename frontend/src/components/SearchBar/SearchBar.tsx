import type { ChangeEvent } from 'react';
import { ComboBox } from '../ComboBox/ComboBox';
import type { BandFilters, BandSort } from '../../types/band';

type SearchFilters = Pick<BandFilters, 'search' | 'city' | 'genre' | 'instrumentNeeded'>;

interface SearchBarProps {
  filters: SearchFilters;
  options: {
    cities: string[];
    genres: string[];
    instruments: string[];
  };
  sort: BandSort;
  onChange: (filters: SearchFilters) => void;
  onSortChange: (sort: BandSort) => void;
}

export function SearchBar({ filters, onChange, onSortChange, options, sort }: SearchBarProps) {
  const update = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <section className="search-panel" aria-label="Filtry ogłoszeń">
      <label>
        <span>Szukaj</span>
        <input name="search" placeholder="Szukaj zespołu" value={filters.search} onChange={update} />
      </label>
      <ComboBox
        label="Miasto"
        name="city"
        placeholder="Wpisz lub wybierz miasto"
        value={filters.city}
        options={options.cities}
        onChange={(city) => onChange({ ...filters, city })}
      />
      <ComboBox
        label="Gatunek"
        name="genre"
        placeholder="Wpisz lub wybierz gatunek"
        value={filters.genre}
        options={options.genres}
        onChange={(genre) => onChange({ ...filters, genre })}
      />
      <ComboBox
        label="Instrument"
        name="instrumentNeeded"
        placeholder="Wpisz lub wybierz instrument"
        value={filters.instrumentNeeded}
        options={options.instruments}
        onChange={(instrumentNeeded) => onChange({ ...filters, instrumentNeeded })}
      />
      <label>
        <span>Sortowanie</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value as BandSort)}>
          <option value="newest">Kiedy dodano</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </label>
    </section>
  );
}
