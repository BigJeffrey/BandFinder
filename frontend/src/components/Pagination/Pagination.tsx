import { Button } from '../Button/Button';
import type { Pagination as PaginationType } from '../../types/band';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export function Pagination({ onPageChange, pagination }: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Paginacja">
      <Button
        type="button"
        variant="secondary"
        disabled={pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        Poprzednia
      </Button>
      <span>
        Strona {pagination.page} z {pagination.totalPages}
      </span>
      <Button
        type="button"
        variant="secondary"
        disabled={pagination.page >= pagination.totalPages}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Następna
      </Button>
    </nav>
  );
}
