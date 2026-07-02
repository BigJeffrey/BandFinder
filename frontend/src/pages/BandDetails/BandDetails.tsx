import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bandsApi } from '../../api/bandsApi';
import { Button } from '../../components/Button/Button';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { Loader } from '../../components/Loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/date';
import { getApiErrorMessage } from '../../utils/errors';

export function BandDetails() {
  const { id } = useParams();
  const bandId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const query = useQuery({
    queryKey: ['band', bandId],
    queryFn: () => bandsApi.getById(bandId),
    enabled: Number.isInteger(bandId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => bandsApi.remove(bandId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bands'] });
      toast.success('Ogłoszenie usunięte.');
      navigate('/bands');
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  if (!Number.isInteger(bandId)) return <Navigate to="/404" replace />;
  if (query.isLoading) return <Loader />;
  if (query.isError) return <ErrorState message={getApiErrorMessage(query.error)} />;
  if (!query.data) return <Navigate to="/404" replace />;

  const band = query.data;
  const isOwner = user?.id === band.user.id;

  return (
    <section className="details">
      <div className="details__header">
        <div>
          <p className="eyebrow">{band.genre}</p>
          <h1>{band.name}</h1>
        </div>
        {isOwner && (
          <div className="details__actions">
            <Link to={`/bands/${band.id}/edit`}>
              <Button type="button" variant="secondary">
                Edytuj
              </Button>
            </Link>
            <Button type="button" variant="danger" onClick={() => setConfirmOpen(true)}>
              Usuń
            </Button>
          </div>
        )}
      </div>

      <div className="details__grid">
        <dl>
          <dt>Miasto</dt>
          <dd>{band.city}</dd>
          <dt>Poszukiwany instrument</dt>
          <dd>{band.instrumentNeeded}</dd>
          <dt>Kontakt</dt>
          <dd>
            <a href={`mailto:${band.contactEmail}`}>{band.contactEmail}</a>
          </dd>
          <dt>Autor</dt>
          <dd>{band.user.name}</dd>
          <dt>Dodano</dt>
          <dd>{formatDate(band.createdAt)}</dd>
        </dl>
        <article>
          <h2>Opis</h2>
          <p>{band.description}</p>
        </article>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        isLoading={deleteMutation.isPending}
        title="Usunąć ogłoszenie?"
        description="Tej operacji nie można cofnąć."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </section>
  );
}
