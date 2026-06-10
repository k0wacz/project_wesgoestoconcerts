import { Instagram, Twitter, Youtube } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  totalShows: number;
  totalBands: number;
  totalCities: number;
  activePage?: 'flyers' | 'stats';
}

export function Sidebar({ totalShows, totalBands, totalCities, activePage = 'flyers' }: SidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)] p-6 flex flex-col gap-6 border-b lg:border-r lg:border-b-0 border-[var(--theme-border)] overflow-y-auto lg:h-screen lg:sticky lg:top-0 transition-colors">
      <div className="text-3xl font-['Bebas_Neue'] tracking-wider">Concerts</div>

      <div className="w-full rounded-lg overflow-hidden border-2 border-[var(--theme-accent-dim)] avatar-pic">
  <ImageWithFallback
      src="https://placecats.com/300/200"
    alt="Wes"
    className="w-full h-auto object-cover"
  />
</div>


      <div>
        <div className="text-xl font-['Bebas_Neue'] tracking-wider mb-2">WES</div>
        <p className="text-sm text-[var(--theme-text-secondary)] font-['DM_Sans'] leading-relaxed">
          i believe with all my heart that we cannot become better version of ourselves without going through something terrible
        </p>
      </div>

      <div className="h-px bg-[var(--theme-border)]"></div>

      <ThemeToggle />

      <div className="h-px bg-[var(--theme-border)]"></div>

      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className={`font-['Space_Mono'] text-sm hover:translate-x-1 transition-transform ${
            activePage === 'flyers' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
          }`}
        >
          ⟶ Flyers
        </Link>
        <Link
          to="/stats"
          className={`font-['Space_Mono'] text-sm hover:translate-x-1 transition-transform ${
            activePage === 'stats' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
          }`}
        >
          ⟶ Stats
        </Link>
      </nav>

      <div className="h-px bg-[var(--theme-border)]"></div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--theme-card-hover)] rounded-lg p-3 border border-[var(--theme-border)]">
          <div className="text-xs text-[var(--theme-text-muted)] font-['Space_Mono'] mb-1">Shows</div>
          <div className="text-2xl font-['Bebas_Neue'] text-[var(--theme-accent)]">{totalShows}</div>
        </div>
        <div className="bg-[var(--theme-card-hover)] rounded-lg p-3 border border-[var(--theme-border)]">
          <div className="text-xs text-[var(--theme-text-muted)] font-['Space_Mono'] mb-1">Bandas</div>
          <div className="text-2xl font-['Bebas_Neue'] text-[var(--theme-accent)]">{totalBands}</div>
        </div>
        <div className="bg-[var(--theme-card-hover)] rounded-lg p-3 border border-[var(--theme-border)]">
          <div className="text-xs text-[var(--theme-text-muted)] font-['Space_Mono'] mb-1">Cidades</div>
          <div className="text-2xl font-['Bebas_Neue'] text-[var(--theme-accent)]">{totalCities}</div>
        </div>
        <div className="bg-[var(--theme-card-hover)] rounded-lg p-3 border border-[var(--theme-border)]">
          <div className="text-xs text-[var(--theme-text-muted)] font-['Space_Mono'] mb-1">Desde</div>
          <div className="text-2xl font-['Bebas_Neue'] text-[var(--theme-accent)]">2010</div>
        </div>
      </div>

      <div className="h-px bg-[var(--theme-border)]"></div>

      <div className="flex flex-col gap-3">
        <a href="#" className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors font-['Space_Mono']">
          <Instagram className="w-4 h-4" />
          <span>@instagram</span>
        </a>
        <a href="#" className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors font-['Space_Mono']">
          <Twitter className="w-4 h-4" />
          <span>@twitter</span>
        </a>
        <a href="#" className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors font-['Space_Mono']">
          <Youtube className="w-4 h-4" />
          <span>@youtube</span>
        </a>
      </div>
    </aside>
  );
}
