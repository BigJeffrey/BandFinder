import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, id, label, ...props }, ref) => {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      <textarea
        ref={ref}
        id={id}
        className="field__control field__control--textarea"
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && <span className="field__error">{error.message}</span>}
    </label>
  );
  },
);

Textarea.displayName = 'Textarea';
