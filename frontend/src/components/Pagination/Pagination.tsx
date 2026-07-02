import type { Pagination as PaginationType } from '../../types/band';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
};

export function Pagination({ onPageChange, pagination }: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  const visiblePages = getVisiblePages(pagination.page, pagination.totalPages);

  return (
    <nav className="pagination" aria-label="Paginacja">
      <button
        type="button"
        className="pagination__button pagination__button--wide"
        disabled={pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        Poprzednia
      </button>

      <div className="pagination__pages">
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showGap = previousPage !== undefined && page - previousPage > 1;

          return (
            <span key={page} className="pagination__item">
              {showGap && <span className="pagination__gap">...</span>}
              <button
                type="button"
                className="pagination__button"
                aria-current={page === pagination.page ? 'page' : undefined}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </span>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination__button pagination__button--wide"
        disabled={pagination.page >= pagination.totalPages}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Następna
      </button>
    </nav>
  );
}
