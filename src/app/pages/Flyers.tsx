import { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from '../components/Sidebar';
import { FilterBar } from '../components/FilterBar';
import { ConcertCard } from '../components/ConcertCard';
import { Lightbox } from '../components/Lightbox';
import { concerts, type Concert } from '../data/concerts';

const PER_PAGE = 6;

export function Flyers() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayedConcerts, setDisplayedConcerts] = useState<Concert[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filtrar shows
  const filteredConcerts = activeFilter === 'all'
    ? concerts
    : concerts.filter(c => c.city === activeFilter);

  // Carregar mais shows
  const loadMore = useCallback(() => {
    if (loading) return;
    
    const start = page * PER_PAGE;
    if (start >= filteredConcerts.length) return;

    setLoading(true);
    
    setTimeout(() => {
      const newConcerts = filteredConcerts.slice(start, start + PER_PAGE);
      setDisplayedConcerts(prev => [...prev, ...newConcerts]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 350);
  }, [page, loading, filteredConcerts]);

  // Reset ao mudar filtro
  useEffect(() => {
    setDisplayedConcerts([]);
    setPage(0);
    setLoading(false);
  }, [activeFilter]);

  // Carregar primeiro lote
  useEffect(() => {
    if (displayedConcerts.length === 0 && !loading) {
      loadMore();
    }
  }, [displayedConcerts.length, loading, loadMore]);

  // Intersection Observer para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  // Calcular stats
  const totalShows = concerts.length;
  const totalBands = new Set(
  concerts.flatMap(c => c.bands).map(b => b.toLowerCase().trim())
).size;
  const totalCities = new Set(concerts.map(c => c.city)).size;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] transition-colors">
      <Sidebar
        totalShows={totalShows}
        totalBands={totalBands}
        totalCities={totalCities}
        activePage="flyers"
      />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-['Bebas_Neue'] text-4xl md:text-5xl mb-6 tracking-wide">
              Wes goes to <span className="text-[var(--theme-accent)]">concerts</span>
            </h1>
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedConcerts.map((concert, index) => (
              <ConcertCard
                key={`${concert.date}-${concert.bands[0]}`}
                concert={concert}
                onClick={() => setSelectedConcert(concert)}
                index={index}
              />
            ))}
          </div>

          {/* Sentinel para infinite scroll */}
          <div
            ref={sentinelRef}
            className="flex flex-col items-center justify-center py-12"
          >
            {loading && (
              <div className="w-8 h-8 border-2 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin mb-4"></div>
            )}
            {displayedConcerts.length >= filteredConcerts.length && filteredConcerts.length > 0 && (
              <div className="font-['Space_Mono'] text-sm text-[var(--theme-text-muted)]">
                — {filteredConcerts.length} shows no arquivo —
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedConcert && (
        <Lightbox
          concert={selectedConcert}
          onClose={() => setSelectedConcert(null)}
          index={concerts.indexOf(selectedConcert)}
        />
      )}
    </div>
  );
}
