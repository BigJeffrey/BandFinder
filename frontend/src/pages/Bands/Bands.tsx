import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const DEFAULT_LIMIT = 9;
const sortValues: BandSort[] = ['newest', 'name-asc', 'name-desc'];

const initialFilters: BandFilters = {
  search: '',
  city: '',
  genre: '',
  instrumentNeeded: '',
  page: 1,
  limit: DEFAULT_LIMIT,
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

const parsePage = (value: string | null) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const parseSort = (value: string | null): BandSort =>
  sortValues.includes(value as BandSort) ? (value as BandSort) : 'newest';

const getFiltersFromParams = (params: URLSearchParams): BandFilters => ({
  search: params.get('search') ?? initialFilters.search,
  city: params.get('city') ?? initialFilters.city,
  genre: params.get('genre') ?? initialFilters.genre,
  instrumentNeeded: params.get('instrumentNeeded') ?? initialFilters.instrumentNeeded,
  page: parsePage(params.get('page')),
  limit: DEFAULT_LIMIT,
});

const getNextParams = (filters: BandFilters, sort: BandSort) => {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.city) params.set('city', filters.city);
  if (filters.genre) params.set('genre', filters.genre);
  if (filters.instrumentNeeded) params.set('instrumentNeeded', filters.instrumentNeeded);
  if (filters.page > 1) params.set('page', String(filters.page));
  if (sort !== 'newest') params.set('sort', sort);

  return params;
};

export function Bands() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => getFiltersFromParams(searchParams), [searchParams]);
  const sort = useMemo(() => parseSort(searchParams.get('sort')), [searchParams]);
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

  const updateFilters = (nextFilters: BandFilters, nextSort = sort) => {
    setSearchParams(getNextParams(nextFilters, nextSort), { replace: true });
  };

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
        onChange={(nextFilters) => updateFilters({ ...filters, ...nextFilters, page: 1 })}
        onSortChange={(nextSort) => updateFilters({ ...filters, page: 1 }, nextSort)}
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
            onPageChange={(page) => updateFilters({ ...filters, page })}
          />
        </>
      )}
    </section>
  );
}
