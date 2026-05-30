interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'Curitiba-PR', label: 'Curitiba' },
  { id: 'São Paulo-SP', label: 'São Paulo' },
  { id: 'Florianópolis-SC', label: 'Floripa' },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            px-5 py-2 rounded-full font-['Space_Mono'] text-sm transition-all
            ${activeFilter === filter.id
              ? 'bg-[var(--theme-accent)] text-black font-bold'
              : 'bg-[var(--theme-card-hover)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] hover:bg-[var(--theme-accent-dim)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
