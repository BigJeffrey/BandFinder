import { z } from 'zod';

export const bandSchema = z.object({
  name: z.string().min(1, 'Nazwa zespołu jest wymagana.'),
  city: z.string().min(1, 'Miasto jest wymagane.'),
  genre: z.string().min(1, 'Gatunek jest wymagany.'),
  instrumentNeeded: z.string().min(1, 'Poszukiwany instrument jest wymagany.'),
  description: z.string().min(1, 'Opis jest wymagany.'),
  contactEmail: z.string().email('Podaj poprawny email kontaktowy.'),
});
