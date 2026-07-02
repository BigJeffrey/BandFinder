import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';
import type { Band } from '../../types/band';

interface BandCardProps {
  band: Band;
}

export function BandCard({ band }: BandCardProps) {
  return (
    <Card className="band-card">
      <div className="band-card__meta">
        <span>{band.genre}</span>
        <span>{band.city}</span>
      </div>
      <h2>{band.name}</h2>
      <p className="band-card__instrument">Szukamy: {band.instrumentNeeded}</p>
      <p>{band.description}</p>
      <Link to={`/bands/${band.id}`} className="text-link">
        Zobacz szczegóły
      </Link>
    </Card>
  );
}
