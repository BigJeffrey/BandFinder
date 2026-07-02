import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { bandsApi } from '../../api/bandsApi';
import { BandCard } from '../../components/BandCard/BandCard';
import { Button } from '../../components/Button/Button';
import type { BandFilters } from '../../types/band';

const latestBandFilters: BandFilters = {
  search: '',
  city: '',
  genre: '',
  instrumentNeeded: '',
  page: 1,
  limit: 1,
};

export function Home() {
  const homeBandsQuery = useQuery({
    queryKey: ['bands', 'home-latest'],
    queryFn: () => bandsApi.list(latestBandFilters),
  });

  const latestBand = homeBandsQuery.data?.data[0];
  const activeListingsCount = homeBandsQuery.data?.pagination.total ?? 0;

  return (
    <section className="home stack">
      <div className="home__hero">
        <div className="home__content">
          <p className="eyebrow">Muzycy, zespoły, ogłoszenia</p>
          <h1>Znajdź muzyka, który pasuje do brzmienia zespołu.</h1>
          <p>
            Przeglądaj aktualne ogłoszenia, szukaj po mieście, gatunku i instrumencie albo opublikuj
            własny nabór z kompletnymi danymi kontaktowymi.
          </p>
          <div className="home__actions">
            <Link to="/bands">
              <Button type="button">Przeglądaj ogłoszenia</Button>
            </Link>
            <Link to="/bands/new" className="text-link">
              Dodaj ogłoszenie
            </Link>
          </div>
        </div>

        <div className="home__aside">
          <div className="home__active-count" aria-label="Liczba aktywnych ogłoszeń">
            <span>{homeBandsQuery.isLoading ? '...' : activeListingsCount}</span>
            <strong>aktywnych ogłoszeń</strong>
            <small>czeka teraz na muzyków</small>
          </div>

          {latestBand ? (
            <BandCard band={latestBand} />
          ) : (
            <div className="home__empty-card">
              <strong>Brak ogłoszeń</strong>
              <span>Dodaj pierwsze ogłoszenie w BandFinder.</span>
              <Link to="/bands/new" className="text-link">
                Dodaj ogłoszenie
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="home__stats" aria-label="Najważniejsze skróty">
        <div>
          <strong>4 filtry</strong>
          <span>miasto, gatunek, instrument i nazwa</span>
        </div>
        <div>
          <strong>JWT auth</strong>
          <span>bezpieczne dodawanie i edycja własnych ofert</span>
        </div>
        <div>
          <strong>REST API</strong>
          <span>dane pobierane bez filtrowania po stronie klienta</span>
        </div>
      </div>

      <div className="home__categories" aria-label="Popularne kierunki">
        <div>
          <span>Rock</span>
          <strong>Gitary, bas, perkusja</strong>
        </div>
        <div>
          <span>Jazz</span>
          <strong>Saksofon, kontrabas, piano</strong>
        </div>
        <div>
          <span>Wokal</span>
          <strong>Frontman, backing vocals</strong>
        </div>
        <div>
          <span>Elektronika</span>
          <strong>Produkcja, live act</strong>
        </div>
      </div>
    </section>
  );
}
