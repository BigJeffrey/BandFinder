import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';
import type { Band } from '../../types/band';
import { formatRelativeDate } from '../../utils/date';

interface BandCardProps {
  band: Band;
}

const DESCRIPTION_PREVIEW_LENGTH = 160;

const getDescriptionPreview = (description: string) => {
  if (description.length <= DESCRIPTION_PREVIEW_LENGTH) return description;

  return `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trim()}...`;
};

export function BandCard({ band }: BandCardProps) {
  const initials = band.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="band-card">
      <div className="band-card__status">
        <span className="status-dot" />
        <span>Aktywne ogłoszenie</span>
      </div>

      <div className="band-card__header">
        <div className="band-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h2>{band.name}</h2>
          <p>
            {band.city} • {formatRelativeDate(band.createdAt)}
          </p>
        </div>
      </div>

      <div className="band-card__meta">
        <span>{band.genre}</span>
      </div>

      <div className="band-card__instrument">Szukamy: {band.instrumentNeeded}</div>
      <p className="band-card__description">{getDescriptionPreview(band.description)}</p>

      <Link to={`/bands/${band.id}`} className="text-link">
        Zobacz szczegóły
      </Link>
    </Card>
  );
}
