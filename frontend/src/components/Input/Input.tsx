import type { InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export function Input({ error, id, label, ...props }: InputProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      <input id={id} className="field__control" aria-invalid={Boolean(error)} {...props} />
      {error && <span className="field__error">{error.message}</span>}
    </label>
  );
}
