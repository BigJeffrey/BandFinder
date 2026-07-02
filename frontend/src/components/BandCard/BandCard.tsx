import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';
import type { Band } from '../../types/band';

interface BandCardProps {
  band: Band;
}

export function BandCard({ band }: BandCardProps) {
  const initials = band.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="band-card">
      <div className="band-card__header">
        <div className="band-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h2>{band.name}</h2>
          <p>{band.city}</p>
        </div>
      </div>
      <div className="band-card__meta">
        <span>{band.genre}</span>
        <span>{band.instrumentNeeded}</span>
      </div>
      <p>{band.description}</p>
      <Link to={`/bands/${band.id}`} className="text-link">
        Zobacz szczegóły
      </Link>
    </Card>
  );
}
