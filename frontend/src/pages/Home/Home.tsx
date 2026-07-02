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

      <section className="home__guide" aria-labelledby="home-guide-title">
        <div className="home__guide-header">
          <p className="eyebrow">Szybki start</p>
          <h2 id="home-guide-title">Od znalezienia ogłoszenia do kontaktu w kilku krokach.</h2>
        </div>

        <ol className="home__steps">
          <li>
            <span>01</span>
            <strong>Wybierz miasto, gatunek albo instrument</strong>
            <p>Filtry zawężają listę od razu, a po wejściu w szczegóły wrócisz do tych samych ustawień.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Sprawdź najnowsze aktywne nabory</strong>
            <p>Karty pokazują zespół, lokalizację, potrzebny instrument i krótki opis bez przeklikiwania.</p>
          </li>
          <li>
            <span>03</span>
            <strong>Dodaj własne ogłoszenie zespołu</strong>
            <p>Opisz skład, styl grania i kontakt, żeby właściwi muzycy mogli szybko odpowiedzieć.</p>
          </li>
        </ol>
      </section>
    </section>
  );
}
