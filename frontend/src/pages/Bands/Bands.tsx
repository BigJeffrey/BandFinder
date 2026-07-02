import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bandsApi } from '../../api/bandsApi';
import { BandCard } from '../../components/BandCard/BandCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useDebounce } from '../../hooks/useDebounce';
import { getApiErrorMessage } from '../../utils/errors';
import type { BandFilters } from '../../types/band';

const initialFilters: BandFilters = {
  search: '',
  city: '',
  genre: '',
  instrumentNeeded: '',
  page: 1,
  limit: 9,
};

export function Bands() {
  const [filters, setFilters] = useState<BandFilters>(initialFilters);
  const debouncedFilters = useDebounce(filters, 450);

  const query = useQuery({
    queryKey: ['bands', debouncedFilters],
    queryFn: () => bandsApi.list(debouncedFilters),
  });

  const searchFilters = useMemo(
    () => ({
      search: filters.search,
      city: filters.city,
      genre: filters.genre,
      instrumentNeeded: filters.instrumentNeeded,
    }),
    [filters],
  );

  return (
    <section className="stack">
      <div className="page-header">
        <p className="eyebrow">Ogłoszenia</p>
        <h1>Zespoły szukające muzyków</h1>
      </div>

      <SearchBar
        filters={searchFilters}
        onChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters, page: 1 }))}
      />

      {query.isLoading && <Loader />}
      {query.isError && <ErrorState message={getApiErrorMessage(query.error)} />}
      {query.data?.data.length === 0 && (
        <EmptyState title="Brak wyników" description="Zmień kryteria wyszukiwania lub wróć później." />
      )}
      {query.data && query.data.data.length > 0 && (
        <>
          <div className="band-grid">
            {query.data.data.map((band) => (
              <BandCard key={band.id} band={band} />
            ))}
          </div>
          <Pagination
            pagination={query.data.pagination}
            onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
          />
        </>
      )}
    </section>
  );
}
