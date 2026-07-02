import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../../api/authApi';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../schemas/authSchemas';
import { getApiErrorMessage } from '../../utils/errors';
import type { LoginInput } from '../../types/auth';

interface LocationState {
  from?: { pathname?: string };
}

export function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/bands';

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (session) => {
      login(session);
      toast.success('Zalogowano pomyślnie.');
      navigate(from, { replace: true });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  if (token) return <Navigate to="/bands" replace />;

  return (
    <Card className="auth-card">
      <Link to="/" className="auth-card__brand">
        BandFinder
      </Link>
      <h1>Logowanie</h1>
      <form className="form" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Input id="email" type="email" label="Email" {...register('email')} error={errors.email} />
        <Input id="password" type="password" label="Hasło" {...register('password')} error={errors.password} />
        <Button type="submit" isLoading={mutation.isPending}>
          Zaloguj
        </Button>
      </form>
      <p className="auth-card__footer">
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </p>
    </Card>
  );
}
