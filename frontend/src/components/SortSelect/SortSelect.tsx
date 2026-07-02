import { useId, useState } from 'react';
import type { BandSort } from '../../types/band';

interface SortOption {
  label: string;
  value: BandSort;
}

interface SortSelectProps {
  value: BandSort;
  onChange: (value: BandSort) => void;
}

const sortOptions: SortOption[] = [
  { label: 'Kiedy dodano', value: 'newest' },
  { label: 'A-Z', value: 'name-asc' },
  { label: 'Z-A', value: 'name-desc' },
];

export function SortSelect({ onChange, value }: SortSelectProps) {
  const labelId = useId();
  const [isOpen, setOpen] = useState(false);
  const selectedOption = sortOptions.find((option) => option.value === value) ?? sortOptions[0];

  return (
    <div className="sort-select">
      <span id={labelId}>Sortowanie</span>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        className="sort-select__trigger"
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onClick={() => setOpen((current) => !current)}
      >
        {selectedOption.label}
        <span aria-hidden="true">v</span>
      </button>
      {isOpen && (
        <div className="sort-select__menu" role="listbox" aria-labelledby={labelId}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
