import { useState } from 'react';
import type { Concert } from '../data/concerts';

interface ConcertCardProps {
  concert: Concert;
  onClick: () => void;
  index: number;
}

const PALETTES = [
  ["1a1a2e","16213e"],["0f3460","533483"],["2c3e50","1a1a2e"],
  ["1b1b2f","0a0a14"],["162447","1f4068"],["0d0d0d","1a0a00"],
  ["0a1628","162032"],["1c0a00","2d1200"],["001f3f","003366"],
  ["0d1117","161b22"],["1a0533","2d0854"],["001a00","003300"]
];

function FallbackPoster({ concert, index }: { concert: Concert; index: number }) {
  const pal = PALETTES[index % PALETTES.length];
  const headliner = concert.bands[0];
  const supports = concert.bands.slice(1, 4);
  const year = concert.date.split('/')[2];
  const fontSize = headliner.length > 16 ? 22 : headliner.length > 12 ? 26 : 30;

  return (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <radialGradient id={`fg${index}`} cx="50%" cy="25%" r="80%">
          <stop offset="0%" stopColor={`#${pal[0]}`}/>
          <stop offset="100%" stopColor={`#${pal[1]}`}/>
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#fg${index})`}/>
      <text x="20" y="26" fontFamily="'Space Mono',monospace" fontSize="8" fill="#c8ff00" opacity="0.8" letterSpacing="3">
        {year} · LIVE
      </text>
      <rect x="20" y="33" width="260" height="1" fill="#ffffff" opacity="0.07"/>
      <text x="20" y="208" fontFamily="'Bebas Neue',sans-serif" fontSize={fontSize} fill="white" letterSpacing="1.5">
        {headliner.toUpperCase()}
      </text>
      {supports.map((band, i) => (
        <text key={i} x="20" y={230 + i * 15} fontFamily="'Bebas Neue',sans-serif" fontSize="12" fill="#999" letterSpacing="1">
          {band.toUpperCase()}
        </text>
      ))}
      {concert.bands.length > 4 && (
        <text x="20" y={230 + supports.length * 15 + 4} fontFamily="'Space Mono',monospace" fontSize="8" fill="#555">
          +{concert.bands.length - 4} more
        </text>
      )}
      <rect x="0" y="358" width="300" height="42" fill="rgba(0,0,0,0.6)"/>
      <rect x="20" y="358" width="2" height="42" fill="#c8ff00" opacity="0.9"/>
      <text x="30" y="374" fontFamily="'Space Mono',monospace" fontSize="9" fill="#c8ff00" letterSpacing="2">
        {concert.date}
      </text>
      <text x="30" y="389" fontFamily="'Space Mono',monospace" fontSize="7.5" fill="#666" letterSpacing="1">
        {(concert.venue || concert.city).toUpperCase().substring(0, 32)}
      </text>
    </svg>
  );
}

export function ConcertCard({ concert, onClick, index }: ConcertCardProps) {
  const [imageError, setImageError] = useState(false);
  const supports = concert.bands.slice(1);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/40 transition-all duration-300 hover:scale-[1.02] animate-fadeIn"
      style={{ animationDelay: `${(index % 6) * 70}ms` }}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {imageError ? (
          <FallbackPoster concert={concert} index={index} />
        ) : (
          <img
            src={concert.flyer}
            alt={concert.bands[0]}
            className="w-full h-full object-cover object-center"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-primary)] via-[var(--theme-bg-primary)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <div className="font-['Bebas_Neue'] text-2xl text-[var(--theme-text-primary)] mb-1 tracking-wide">
          {concert.bands[0]}
        </div>
        {supports.length > 0 && (
          <div className="font-['Bebas_Neue'] text-sm text-[var(--theme-text-secondary)] mb-3">
            {supports.slice(0, 2).join(' · ')}
            {supports.length > 2 && ` +${supports.length - 2}`}
          </div>
        )}
        <div className="font-['Space_Mono'] text-xs text-[var(--theme-accent)] mb-1">
          {concert.date} · {concert.city}
        </div>
        {concert.venue && (
          <div className="font-['Space_Mono'] text-xs text-[var(--theme-text-secondary)]">
            {concert.venue}
          </div>
        )}
        {concert.average_price && (
          <div className="absolute top-4 right-4 bg-[var(--theme-accent)] text-black px-3 py-1 rounded-full font-['Space_Mono'] text-xs font-bold">
            {concert.average_price}
          </div>
        )}
      </div>
    </div>
  );
}
