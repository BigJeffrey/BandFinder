import { Button } from '../Button/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  isLoading?: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  description,
  isLoading = false,
  isOpen,
  onCancel,
  onConfirm,
  title,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">{title}</h2>
        <p>{description}</p>
        <div className="modal__actions">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="button" variant="danger" isLoading={isLoading} onClick={onConfirm}>
            Usuń
          </Button>
        </div>
      </div>
    </div>
  );
}
