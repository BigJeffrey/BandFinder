import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export function Home() {
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

        <div className="home__panel" aria-label="Przykładowe ogłoszenie">
          <div className="home__panel-top">
            <span className="status-dot" />
            <span>Aktywny nabór</span>
          </div>
          <h2>Midnight Drive</h2>
          <p>Rock alternatywny • Warszawa</p>
          <div className="home__instrument">Szukamy: gitara basowa</div>
          <div className="home__meter">
            <span />
          </div>
          <div className="home__panel-footer">
            <span>3 próby / miesiąc</span>
            <span>Kontakt email</span>
          </div>
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
