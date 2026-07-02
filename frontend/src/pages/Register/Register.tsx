import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../../api/authApi';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../schemas/authSchemas';
import { getApiErrorMessage } from '../../utils/errors';
import type { RegisterInput } from '../../types/auth';

export function Register() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (session) => {
      login(session);
      toast.success('Konto zostało utworzone.');
      navigate('/bands', { replace: true });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  if (token) return <Navigate to="/bands" replace />;

  return (
    <Card className="auth-card">
      <Link to="/" className="auth-card__brand">
        BandFinder
      </Link>
      <h1>Rejestracja</h1>
      <form className="form" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Input id="name" label="Imię" {...register('name')} error={errors.name} />
        <Input id="email" type="email" label="Email" {...register('email')} error={errors.email} />
        <Input id="password" type="password" label="Hasło" {...register('password')} error={errors.password} />
        <Button type="submit" isLoading={mutation.isPending}>
          Utwórz konto
        </Button>
      </form>
      <p className="auth-card__footer">
        Masz konto? <Link to="/login">Zaloguj się</Link>
      </p>
    </Card>
  );
}
