import type { ChangeEvent } from 'react';
import { ComboBox } from '../ComboBox/ComboBox';
import { SortSelect } from '../SortSelect/SortSelect';
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
        placeholder="Wpisz miasto"
        value={filters.city}
        options={options.cities}
        onChange={(city) => onChange({ ...filters, city })}
      />
      <ComboBox
        label="Gatunek"
        name="genre"
        placeholder="Wpisz gatunek"
        value={filters.genre}
        options={options.genres}
        onChange={(genre) => onChange({ ...filters, genre })}
      />
      <ComboBox
        label="Instrument"
        name="instrumentNeeded"
        placeholder="Wpisz instrument"
        value={filters.instrumentNeeded}
        options={options.instruments}
        onChange={(instrumentNeeded) => onChange({ ...filters, instrumentNeeded })}
      />
      <SortSelect value={sort} onChange={onSortChange} />
    </section>
  );
}
