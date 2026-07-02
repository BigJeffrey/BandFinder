import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export function Home() {
  return (
    <section className="home">
      <div className="home__content">
        <p className="eyebrow">Muzycy, zespoły, ogłoszenia</p>
        <h1>Znajdź właściwą osobę do kolejnej próby.</h1>
        <p>
          Przeglądaj aktywne ogłoszenia zespołów, filtruj po mieście, gatunku i instrumencie
          albo dodaj własne ogłoszenie w kilka minut.
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
      <div className="home__panel" aria-hidden="true">
        <span>Rock</span>
        <span>Jazz</span>
        <span>Bas</span>
        <span>Wokal</span>
      </div>
    </section>
  );
}
