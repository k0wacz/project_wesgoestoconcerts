import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Concert } from '../data/concerts';

interface LightboxProps {
  concert: Concert | null;
  onClose: () => void;
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
        <radialGradient id={`fglb${index}`} cx="50%" cy="25%" r="80%">
          <stop offset="0%" stopColor={`#${pal[0]}`}/>
          <stop offset="100%" stopColor={`#${pal[1]}`}/>
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#fglb${index})`}/>
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

export function Lightbox({ concert, onClose, index }: LightboxProps) {
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    setImageError(false);
    setIsFlipped(false);
  }, [concert]);

  if (!concert) return null;

  const supports = concert.bands.slice(1);
  const year = concert.date.split('/')[2];

  return (
    <div
      className="fixed inset-0 bg-[var(--theme-bg-primary)]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="fixed top-4 md:top-6 right-4 md:right-6 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] font-['Space_Mono'] text-sm flex items-center gap-2 transition-colors z-10"
      >
        <X className="w-4 h-4" />
        [ fechar ]
      </button>

      <div
        className="max-w-4xl w-full bg-[var(--theme-bg-secondary)] rounded-xl overflow-hidden border border-[var(--theme-border)] flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Poster com efeito flip */}
        <div
          className="relative w-full md:w-[300px] flex-shrink-0 cursor-pointer group perspective-1000"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div
            className={`relative w-full aspect-[3/4] transition-transform duration-700 preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Frente */}
            <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border border-[var(--theme-border)]">
              {imageError ? (
                <FallbackPoster concert={concert} index={index} />
              ) : (
                <img
                  src={concert.flyer}
                  alt={concert.bands[0]}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>

            {/* Verso */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14] rounded-lg border border-[var(--theme-accent)]/20 p-6 flex flex-col justify-center">
              <div className="font-['Space_Mono'] text-xs text-[var(--theme-accent)] mb-2 tracking-wider">
                {year} · LIVE
              </div>
              <div className="font-['Bebas_Neue'] text-3xl text-white mb-2 tracking-wide">
                {concert.bands[0]}
              </div>
              {concert.tour && (
                <div className="font-['Space_Mono'] text-xs text-gray-400 mb-4">
                  {concert.tour}
                </div>
              )}
              <div className="h-px bg-[var(--theme-accent)]/20 my-4"></div>
              {concert.memory && (
                <p className="font-['DM_Sans'] text-sm text-gray-300 leading-relaxed italic">
                  "{concert.memory}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          {concert.tour ? (
            <div className="font-['Space_Mono'] text-xs text-[var(--theme-accent)] mb-2 uppercase tracking-wider">
              {concert.tour}
            </div>
          ) : (
            <div className="font-['Space_Mono'] text-xs text-[var(--theme-accent)] mb-2 uppercase tracking-wider">
              Show
            </div>
          )}

          <h2 className="font-['Bebas_Neue'] text-4xl text-[var(--theme-text-primary)] mb-4 tracking-wide">
            {concert.bands[0]}
          </h2>

          {supports.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {supports.map((band, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[var(--theme-card-hover)] border border-[var(--theme-border)] rounded-full font-['Bebas_Neue'] text-sm text-[var(--theme-text-secondary)]"
                >
                  {band}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--theme-card-hover)] rounded-lg p-4 border border-[var(--theme-border)]">
              <div className="font-['Space_Mono'] text-xs text-[var(--theme-text-muted)] mb-1">Data</div>
              <div className="font-['Bebas_Neue'] text-xl text-[var(--theme-text-primary)]">{concert.date}</div>
            </div>
            <div className="bg-[var(--theme-card-hover)] rounded-lg p-4 border border-[var(--theme-border)]">
              <div className="font-['Space_Mono'] text-xs text-[var(--theme-text-muted)] mb-1">Cidade</div>
              <div className="font-['Bebas_Neue'] text-xl text-[var(--theme-text-primary)]">{concert.city}</div>
            </div>
            {concert.venue && (
              <div className="bg-[var(--theme-card-hover)] rounded-lg p-4 border border-[var(--theme-border)]">
                <div className="font-['Space_Mono'] text-xs text-[var(--theme-text-muted)] mb-1">Local</div>
                <div className="font-['Bebas_Neue'] text-xl text-[var(--theme-text-primary)]">{concert.venue}</div>
              </div>
            )}
            {concert.average_price && (
              <div className="bg-[var(--theme-card-hover)] rounded-lg p-4 border border-[var(--theme-border)]">
                <div className="font-['Space_Mono'] text-xs text-[var(--theme-text-muted)] mb-1">Ingresso</div>
                <div className="font-['Bebas_Neue'] text-xl text-[var(--theme-accent)]">{concert.average_price}</div>
              </div>
            )}
          </div>

          {concert.genre && concert.genre.length > 0 && (
            <div>
              <div className="font-['Space_Mono'] text-xs text-[var(--theme-text-muted)] mb-2">Gêneros</div>
              <div className="flex flex-wrap gap-2">
                {concert.genre.map((g, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[var(--theme-accent-dim)] border border-[var(--theme-accent)]/20 rounded font-['Space_Mono'] text-xs text-[var(--theme-accent)]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}