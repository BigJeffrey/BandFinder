import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Nie znaleziono strony.</p>
      <Link to="/bands">
        <Button type="button">Wróć do ogłoszeń</Button>
      </Link>
    </section>
  );
}
