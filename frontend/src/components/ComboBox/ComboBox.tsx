import { useId, useMemo, useState } from 'react';

interface ComboBoxProps {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const shuffleOptions = (options: string[]) =>
  [...options]
    .map((option) => ({ option, sort: Math.random() }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ option }) => option);

export function ComboBox({ label, name, onChange, options, placeholder, value }: ComboBoxProps) {
  const inputId = useId();
  const [isOpen, setOpen] = useState(false);

  const defaultOptions = useMemo(() => shuffleOptions(options), [options]);
  const visibleOptions = useMemo(() => {
    const normalizedValue = value.trim().toLocaleLowerCase('pl-PL');
    if (!normalizedValue) return defaultOptions;

    return options.filter((option) => option.toLocaleLowerCase('pl-PL').includes(normalizedValue));
  }, [defaultOptions, options, value]);

  return (
    <div className="combobox">
      <label htmlFor={inputId}>{label}</label>
      <input
        autoComplete="off"
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {isOpen && visibleOptions.length > 0 && (
        <div className="combobox__menu" role="listbox">
          {visibleOptions.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option.toLocaleLowerCase('pl-PL') === value.toLocaleLowerCase('pl-PL')}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
