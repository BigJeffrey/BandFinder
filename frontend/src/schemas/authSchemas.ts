import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Podaj poprawny adres email.'),
  password: z.string().min(1, 'Hasło jest wymagane.'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, 'Imię jest wymagane.'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków.'),
});
