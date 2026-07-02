import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__content">
        <p className="eyebrow">404 • Strona poza setlistą</p>
        <h1>Nie ma tu żadnego ogłoszenia.</h1>
        <p>
          Ten adres nie prowadzi do aktywnej strony BandFinder. Wróć do listy zespołów albo zacznij
          od strony głównej.
        </p>
        <div className="not-found__actions">
          <Link to="/bands">
            <Button type="button">Wróć do ogłoszeń</Button>
          </Link>
          <Link to="/" className="text-link">
            Strona główna
          </Link>
        </div>
      </div>

      <div className="not-found__panel" aria-hidden="true">
        <span>404</span>
        <div>
          <strong>Nieznany adres</strong>
          <p>Sprawdź link lub wybierz jedną z dostępnych sekcji.</p>
        </div>
      </div>
    </section>
  );
}
