import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-between px-4 py-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg hover:border-[var(--theme-accent)] transition-all group"
      aria-label="Toggle theme"
    >
      <span className="font-['Space_Mono'] text-xs text-[var(--theme-muted)] group-hover:text-[var(--theme-accent)]">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
      <div className="relative w-12 h-6 bg-[var(--theme-border)] rounded-full transition-colors group-hover:bg-[var(--theme-accent)]/20">
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-[var(--theme-accent)] rounded-full transition-transform duration-300 flex items-center justify-center ${
            theme === 'light' ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {theme === 'dark' ? (
            <Moon className="w-3 h-3 text-black" />
          ) : (
            <Sun className="w-3 h-3 text-black" />
          )}
        </div>
      </div>
    </button>
  );
}
