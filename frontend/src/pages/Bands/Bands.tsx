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
import type { Band, BandFilters, BandSort } from '../../types/band';

const initialFilters: BandFilters = {
  search: '',
  city: '',
  genre: '',
  instrumentNeeded: '',
  page: 1,
  limit: 9,
};

const optionFilters: BandFilters = {
  search: '',
  city: '',
  genre: '',
  instrumentNeeded: '',
  page: 1,
  limit: 100,
};

const uniqueOptions = (values: string[]) => {
  const options = new Map<string, string>();

  values.forEach((value) => {
    const normalized = value.trim().toLocaleLowerCase('pl-PL');
    if (normalized && !options.has(normalized)) {
      options.set(normalized, value.trim());
    }
  });

  return [...options.values()];
};

const sortBands = (bands: Band[], sort: BandSort) => {
  const sortedBands = [...bands];

  if (sort === 'name-asc') {
    return sortedBands.sort((left, right) => left.name.localeCompare(right.name, 'pl-PL'));
  }

  if (sort === 'name-desc') {
    return sortedBands.sort((left, right) => right.name.localeCompare(left.name, 'pl-PL'));
  }

  return sortedBands.sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
};

const getResultsLabel = (pagination: { limit: number; page: number; total: number }) => {
  if (pagination.total === 0) return 'Brak ogłoszeń dla wybranych filtrów';

  const firstItem = (pagination.page - 1) * pagination.limit + 1;
  const lastItem = Math.min(pagination.page * pagination.limit, pagination.total);

  return `Wyświetlasz ${firstItem}-${lastItem} z ${pagination.total} ogłoszeń`;
};

export function Bands() {
  const [filters, setFilters] = useState<BandFilters>(initialFilters);
  const [sort, setSort] = useState<BandSort>('newest');
  const debouncedFilters = useDebounce(filters, 450);

  const query = useQuery({
    queryKey: ['bands', debouncedFilters],
    queryFn: () => bandsApi.list(debouncedFilters),
  });

  const optionsQuery = useQuery({
    queryKey: ['bands', 'filter-options'],
    queryFn: () => bandsApi.list(optionFilters),
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

  const filterOptions = useMemo(() => {
    const bands = optionsQuery.data?.data ?? [];

    return {
      cities: uniqueOptions(bands.map((band) => band.city)),
      genres: uniqueOptions(bands.map((band) => band.genre)),
      instruments: uniqueOptions(bands.map((band) => band.instrumentNeeded)),
    };
  }, [optionsQuery.data]);

  const sortedBands = useMemo(() => sortBands(query.data?.data ?? [], sort), [query.data, sort]);

  return (
    <section className="stack">
      <div className="page-header page-header--split">
        <div>
          <p className="eyebrow">Ogłoszenia</p>
          <h1>Zespoły szukające muzyków</h1>
        </div>
        <div className="page-header__aside">
          <span>{query.data?.pagination.total ?? 0}</span>
          <strong>aktywnych ogłoszeń</strong>
        </div>
      </div>

      <SearchBar
        filters={searchFilters}
        options={filterOptions}
        sort={sort}
        onChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters, page: 1 }))}
        onSortChange={setSort}
      />

      {query.data && (
        <div className="results-summary">
          <span>{getResultsLabel(query.data.pagination)}</span>
          <span>Na stronie: {query.data.pagination.limit}</span>
        </div>
      )}

      {query.isLoading && <Loader />}
      {query.isError && <ErrorState message={getApiErrorMessage(query.error)} />}
      {query.data?.data.length === 0 && (
        <EmptyState title="Brak wyników" description="Zmień kryteria wyszukiwania lub wróć później." />
      )}
      {query.data && sortedBands.length > 0 && (
        <>
          <div className="band-grid">
            {sortedBands.map((band) => (
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
