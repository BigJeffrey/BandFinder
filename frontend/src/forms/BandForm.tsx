import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Textarea } from '../components/Textarea/Textarea';
import { bandSchema } from '../schemas/bandSchemas';
import type { BandInput } from '../types/band';

interface BandFormProps {
  defaultValues?: BandInput;
  isSubmitting: boolean;
  submitLabel: string;
  onSubmit: (values: BandInput) => void;
}

const emptyValues: BandInput = {
  name: '',
  city: '',
  genre: '',
  instrumentNeeded: '',
  description: '',
  contactEmail: '',
};

export function BandForm({ defaultValues = emptyValues, isSubmitting, onSubmit, submitLabel }: BandFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<BandInput>({
    resolver: zodResolver(bandSchema),
    defaultValues,
  });

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Input id="name" label="Nazwa zespołu" {...register('name')} error={errors.name} />
      <div className="form__grid">
        <Input id="city" label="Miasto" {...register('city')} error={errors.city} />
        <Input id="genre" label="Gatunek" {...register('genre')} error={errors.genre} />
      </div>
      <Input
        id="instrumentNeeded"
        label="Poszukiwany instrument"
        {...register('instrumentNeeded')}
        error={errors.instrumentNeeded}
      />
      <Textarea
        id="description"
        label="Opis ogłoszenia"
        rows={6}
        {...register('description')}
        error={errors.description}
      />
      <Input
        id="contactEmail"
        type="email"
        label="Email kontaktowy"
        {...register('contactEmail')}
        error={errors.contactEmail}
      />
      <Button type="submit" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
