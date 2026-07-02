import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bandsApi } from '../../api/bandsApi';
import { Card } from '../../components/Card/Card';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { Loader } from '../../components/Loader/Loader';
import { BandForm } from '../../forms/BandForm';
import { useAuth } from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../utils/errors';
import type { BandInput } from '../../types/band';

export function EditBand() {
  const { id } = useParams();
  const bandId = Number(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['band', bandId],
    queryFn: () => bandsApi.getById(bandId),
    enabled: Number.isInteger(bandId),
  });

  const mutation = useMutation({
    mutationFn: (values: BandInput) => bandsApi.update(bandId, values),
    onSuccess: (band) => {
      queryClient.invalidateQueries({ queryKey: ['bands'] });
      queryClient.invalidateQueries({ queryKey: ['band', bandId] });
      toast.success('Ogłoszenie zaktualizowane.');
      navigate(`/bands/${band.id}`);
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  if (!Number.isInteger(bandId)) return <Navigate to="/404" replace />;
  if (query.isLoading) return <Loader />;
  if (query.isError) return <ErrorState message={getApiErrorMessage(query.error)} />;
  if (!query.data) return <Navigate to="/404" replace />;
  if (user?.id !== query.data.user.id) return <Navigate to={`/bands/${bandId}`} replace />;

  return (
    <section className="form-page">
      <div className="page-header">
        <p className="eyebrow">Edycja</p>
        <h1>{query.data.name}</h1>
      </div>
      <Card>
        <BandForm
          defaultValues={query.data}
          isSubmitting={mutation.isPending}
          submitLabel="Zapisz zmiany"
          onSubmit={(values) => mutation.mutate(values)}
        />
      </Card>
    </section>
  );
}
