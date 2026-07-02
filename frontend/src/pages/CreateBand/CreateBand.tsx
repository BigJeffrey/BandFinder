import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bandsApi } from '../../api/bandsApi';
import { Card } from '../../components/Card/Card';
import { BandForm } from '../../forms/BandForm';
import { getApiErrorMessage } from '../../utils/errors';
import type { BandInput } from '../../types/band';

export function CreateBand() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: bandsApi.create,
    onSuccess: (band) => {
      queryClient.invalidateQueries({ queryKey: ['bands'] });
      toast.success('Ogłoszenie dodane.');
      navigate(`/bands/${band.id}`);
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  return (
    <section className="form-page">
      <div className="page-header">
        <p className="eyebrow">Nowe ogłoszenie</p>
        <h1>Dodaj zespół</h1>
      </div>
      <Card>
        <BandForm
          isSubmitting={mutation.isPending}
          submitLabel="Dodaj ogłoszenie"
          onSubmit={(values: BandInput) => mutation.mutate(values)}
        />
      </Card>
    </section>
  );
}
