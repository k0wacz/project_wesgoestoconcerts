import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Sidebar } from '../components/Sidebar';
import { concerts } from '../data/concerts';
import { useTheme } from '../contexts/ThemeContext';

// Registrar componentes do Chart.js
Chart.register(...registerables);

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

// Helpers
function parsePrice(s: string): number {
  if (!s) return 0;
  return parseFloat(s.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
}

function parseDate(s: string) {
  const [d, m, y] = s.split('/');
  return { day: +d, month: +m, year: +y };
}

export function Stats() {
  const { theme } = useTheme();
  const chartSpendYearRef = useRef<HTMLCanvasElement>(null);
  const chartGenresRef = useRef<HTMLCanvasElement>(null);
  const chartVenuesRef = useRef<HTMLCanvasElement>(null);
  const chartMonthsRef = useRef<HTMLCanvasElement>(null);
  const chartCumulativeRef = useRef<HTMLCanvasElement>(null);

  // Colors dinâmicas baseadas no tema
  const ACCENT = theme === 'dark' ? '#c8ff00' : '#9fd600';
  const ACCENT_ALT = theme === 'dark' ? '#1c3800' : '#d4e87c';
  const ACCENT_BORDER = theme === 'dark' ? '#2d5500' : '#88b000';
  const GRID_CLR = theme === 'dark' ? '#161616' : '#e8e8e8';
  const MUTED = theme === 'dark' ? '#444' : '#888';
  const CHART_BG = theme === 'dark' ? '#0a0a0a' : '#ffffff';
  const GENRE_COLORS = theme === 'dark'
    ? ['#c8ff00', '#6db300', '#4a8800', '#2d5500', '#1a3300', '#0f2000', '#0a1400', '#050a00']
    : ['#9fd600', '#88b000', '#719900', '#5a7d00', '#446000', '#2e4300', '#1d2b00', '#111800'];

  useEffect(() => {
    // Processar dados
    const prices = concerts.map(s => parsePrice(s.average_price));
    const dates = concerts.map(s => parseDate(s.date));
    const total = prices.reduce((a, b) => a + b, 0);
    const avg = total / concerts.length;

    // Bandas únicas
    const bandCount: Record<string, number> = {};
    concerts.forEach(s => s.bands.forEach(b => {
      bandCount[b] = (bandCount[b] || 0) + 1;
    }));
    const uniqueBands = Object.keys(bandCount).length;

    // Show mais caro
    const maxIdx = prices.indexOf(Math.max(...prices));

    // Por ano
    const byYear: Record<number, number> = {};
    concerts.forEach((s, i) => {
      const y = dates[i].year;
      byYear[y] = (byYear[y] || 0) + prices[i];
    });
    const years = Object.keys(byYear).sort().map(Number);

    // Por gênero
    const genreCount: Record<string, number> = {};
    concerts.forEach(s => s.genre.forEach(g => {
      genreCount[g] = (genreCount[g] || 0) + 1;
    }));
    const topGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);

    // Por venue
    const venueCount: Record<string, number> = {};
    concerts.forEach(s => {
      const v = s.venue || '?';
      venueCount[v] = (venueCount[v] || 0) + 1;
    });
    const topVenues = Object.entries(venueCount).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Por mês
    const byMonth = Array(12).fill(0);
    concerts.forEach((s, i) => {
      byMonth[dates[i].month - 1]++;
    });

    // Gasto acumulado
    const sortedShows = concerts.map((s, i) => ({ ...s, price: prices[i], ...dates[i] }))
      .sort((a, b) => a.year * 10000 + a.month * 100 + a.day - (b.year * 10000 + b.month * 100 + b.day));
    let cum = 0;
    const cumLabels: string[] = [];
    const cumData: number[] = [];
    sortedShows.forEach(s => {
      cum += s.price;
      cumLabels.push(`${String(s.month).padStart(2, '0')}/${s.year}`);
      cumData.push(Math.round(cum));
    });

    // KPIs
    const kpis = [
      { label: 'Total gasto', value: `R$ ${Math.round(total).toLocaleString('pt-BR')}`, sub: 'em 15 anos' },
      { label: 'Shows', value: concerts.length, sub: '2010 → 2025' },
      { label: 'Bandas únicas', value: uniqueBands, sub: 'ao vivo' },
      { label: 'Ticket médio', value: `R$ ${Math.round(avg).toLocaleString('pt-BR')}`, sub: 'por show' },
      { label: 'Show mais caro', value: `R$ ${Math.round(Math.max(...prices)).toLocaleString('pt-BR')}`, sub: concerts[maxIdx].bands[0] },
    ];

    // Renderizar KPIs
    const kpiGrid = document.getElementById('kpi-grid');
    if (kpiGrid) {
      kpiGrid.innerHTML = '';
      kpis.forEach((k, i) => {
        const el = document.createElement('div');
        const cardBg = theme === 'dark' ? '#111111' : '#fafafa';
        const borderClr = theme === 'dark' ? '#1e1e1e' : '#e0e0e0';
        const mutedText = theme === 'dark' ? '#555' : '#888';
        const subtleText = theme === 'dark' ? '#333' : '#bbb';
        el.className = 'border relative overflow-hidden';
        el.style.backgroundColor = cardBg;
        el.style.borderColor = borderClr;
        el.style.padding = '1rem';
        el.style.animation = `fadeUp 0.4s ease both ${i * 0.07}s`;
        el.innerHTML = `
          <div class="font-['Space_Mono'] text-[8px] tracking-widest uppercase mb-2" style="color:${mutedText}">${k.label}</div>
          <div class="font-['Bebas_Neue'] text-[32px] leading-none" style="color:${ACCENT}">${k.value}</div>
          <div class="font-['Space_Mono'] text-[9px] mt-1" style="color:${subtleText}">${k.sub}</div>
        `;
        kpiGrid.appendChild(el);
      });
    }

    // Total badge
    const totalBadge = document.getElementById('total-badge');
    if (totalBadge) {
      totalBadge.textContent = `total: R$ ${Math.round(total).toLocaleString('pt-BR')}`;
    }

    // Configuração padrão dos charts
    const gridOpts = { color: GRID_CLR, lineWidth: 0.5 };
    const tickStyle = { color: MUTED };
    const borderStyle = { color: theme === 'dark' ? '#1e1e1e' : '#d0d0d0' };

    // Chart 1: Gasto por ano
    if (chartSpendYearRef.current) {
      new Chart(chartSpendYearRef.current, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            data: years.map(y => Math.round(byYear[y])),
            backgroundColor: years.map(y => byYear[y] > 1000 ? ACCENT : ACCENT_ALT),
            borderColor: years.map(y => byYear[y] > 1000 ? ACCENT : ACCENT_BORDER),
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`
              }
            }
          },
          scales: {
            x: { grid: gridOpts, ticks: { ...tickStyle, autoSkip: false }, border: borderStyle },
            y: { grid: gridOpts, ticks: { ...tickStyle, callback: (v) => `R$${v}` }, border: borderStyle }
          }
        }
      });
    }

    // Chart 2: Gêneros (doughnut)
    const topG = topGenres.slice(0, 7);
    const otherCount = topGenres.slice(7).reduce((a, b) => a + b[1], 0);
    const gLabels = topG.map(g => g[0]);
    const gData = topG.map(g => g[1]);
    if (otherCount > 0) {
      gLabels.push('outros');
      gData.push(otherCount);
    }

    // Genre legend
    const legendEl = document.getElementById('genre-legend');
    if (legendEl) {
      const mutedText = theme === 'dark' ? '#555' : '#888';
      const borderClr = theme === 'dark' ? '#1e1e1e' : '#e0e0e0';
      legendEl.innerHTML = '';
      gLabels.forEach((g, i) => {
        const span = document.createElement('span');
        span.className = 'font-["Space_Mono"] text-[8px] tracking-wider px-2 py-[3px] border uppercase flex items-center gap-[5px]';
        span.style.borderColor = borderClr;
        span.style.color = mutedText;
        span.innerHTML = `<span class="w-[6px] h-[6px] rounded-full" style="background:${GENRE_COLORS[i] || ACCENT_ALT}"></span>${g}`;
        legendEl.appendChild(span);
      });
    }

    if (chartGenresRef.current) {
      new Chart(chartGenresRef.current, {
        type: 'doughnut',
        data: {
          labels: gLabels,
          datasets: [{
            data: gData,
            backgroundColor: GENRE_COLORS.slice(0, gLabels.length),
            borderColor: CHART_BG,
            borderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${ctx.parsed}x`
              }
            }
          }
        }
      });
    }

    // Chart 3: Venues
    if (chartVenuesRef.current) {
      new Chart(chartVenuesRef.current, {
        type: 'bar',
        data: {
          labels: topVenues.map(v => v[0].length > 18 ? v[0].substring(0, 18) + '…' : v[0]),
          datasets: [{
            data: topVenues.map(v => v[1]),
            backgroundColor: topVenues.map((_, i) => i === 0 ? ACCENT : ACCENT_ALT),
            borderColor: topVenues.map((_, i) => i === 0 ? ACCENT : ACCENT_BORDER),
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.parsed.x} show${ctx.parsed.x > 1 ? 's' : ''}`
              }
            }
          },
          scales: {
            x: { grid: gridOpts, ticks: { ...tickStyle, stepSize: 1 }, border: borderStyle },
            y: { grid: { display: false }, ticks: tickStyle, border: borderStyle }
          }
        }
      });
    }

    // Ranking de bandas
    const topBands = Object.entries(bandCount).sort((a, b) => b[1] - a[1]).filter(b => b[1] > 1).slice(0, 10);
    const maxBandCount = topBands[0]?.[1] || 1;
    const rankingEl = document.getElementById('bands-ranking');
    if (rankingEl) {
      const subtleText = theme === 'dark' ? '#333' : '#bbb';
      const primaryText = theme === 'dark' ? '#e8e8e8' : '#0a0a0a';
      const mutedText = theme === 'dark' ? '#555' : '#888';
      const barBg = theme === 'dark' ? '#1e1e1e' : '#e0e0e0';
      rankingEl.innerHTML = '';
      topBands.forEach(([name, count], i) => {
        const row = document.createElement('div');
        row.className = 'flex items-center gap-3 font-["Space_Mono"] text-[10px]';
        const pct = Math.round((count / maxBandCount) * 100);
        row.innerHTML = `
          <span style="color:${subtleText}" class="min-w-[18px]">${String(i + 1).padStart(2, '0')}</span>
          <span style="color:${primaryText}" class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">${name}</span>
          <div class="w-[100px] h-1 flex-shrink-0" style="background:${barBg}">
            <div class="h-full transition-all duration-600" style="width:${pct}%; background:${ACCENT}"></div>
          </div>
          <span style="color:${mutedText}" class="min-w-[16px] text-right">${count}x</span>
        `;
        rankingEl.appendChild(row);
      });
    }

    // Chart 4: Sazonalidade
    if (chartMonthsRef.current) {
      new Chart(chartMonthsRef.current, {
        type: 'bar',
        data: {
          labels: MONTHS,
          datasets: [{
            data: byMonth,
            backgroundColor: byMonth.map(v =>
              v >= 3 ? ACCENT :
              v >= 2 ? (theme === 'dark' ? '#4a8800' : '#c0db60') :
              v >= 1 ? ACCENT_ALT :
              (theme === 'dark' ? '#111' : '#f5f5f5')
            ),
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.parsed.y} show${ctx.parsed.y !== 1 ? 's' : ''}`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { ...tickStyle, autoSkip: false }, border: borderStyle },
            y: { grid: gridOpts, ticks: { ...tickStyle, stepSize: 1 }, border: borderStyle }
          }
        }
      });
    }

    // Heatmap
    const allYears = [...new Set(dates.map(d => d.year))].sort((a, b) => a - b);
    const heatData: Record<string, number> = {};
    concerts.forEach((s, i) => {
      const key = `${dates[i].year}-${dates[i].month}`;
      heatData[key] = (heatData[key] || 0) + 1;
    });

    const table = document.getElementById('heatmap');
    if (table) {
      const mutedText = theme === 'dark' ? '#555' : '#888';
      const cellBg = theme === 'dark' ? '#141414' : '#fafafa';
      const cellBorder = theme === 'dark' ? '#1a1a1a' : '#e0e0e0';
      const heatColors = theme === 'dark'
        ? {
            level1: { bg: '#1a3300', border: '#243d00' },
            level2: { bg: '#2d5500', border: '#3a6b00' },
            level3: { bg: '#4a8800', border: '#5ca800' },
            level4: { bg: '#6db300', border: ACCENT }
          }
        : {
            level1: { bg: '#e8f5d0', border: '#d0e8a8' },
            level2: { bg: '#d4e87c', border: '#c0db60' },
            level3: { bg: '#b8d64a', border: '#a8c840' },
            level4: { bg: '#9fd600', border: '#88b000' }
          };

      table.innerHTML = '';
      
// Heatmap
    const allYears = [...new Set(dates.map(d => d.year))].sort((a, b) => a - b);
    const heatData: Record<string, number> = {};
    concerts.forEach((s, i) => {
      const key = `${dates[i].year}-${dates[i].month}`;
      heatData[key] = (heatData[key] || 0) + 1;
    });

    const table = document.getElementById('heatmap');
    if (table) {
      const mutedText = theme === 'dark' ? '#555' : '#888';
      const cellBg = theme === 'dark' ? '#141414' : '#f0f0f0';
      const cellBorder = theme === 'dark' ? '#1a1a1a' : '#e0e0e0';
      const heatColors = theme === 'dark'
        ? {
            level1: { bg: '#1a3300', border: '#243d00' },
            level2: { bg: '#2d5500', border: '#3a6b00' },
            level3: { bg: '#4a8800', border: '#5ca800' },
            level4: { bg: '#6db300', border: ACCENT }
          }
        : {
            level1: { bg: '#d4e87c', border: '#c0db60' },
            level2: { bg: '#b8d64a', border: '#a8c840' },
            level3: { bg: '#9fd600', border: '#88b000' },
            level4: { bg: '#7ab800', border: '#5a9000' }
          };

      table.innerHTML = '';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const emptyTh = document.createElement('th');
      emptyTh.style.cssText = 'width:36px; padding-right:8px;';
      headerRow.appendChild(emptyTh);
      MONTHS.forEach(m => {
        const th = document.createElement('th');
        th.textContent = m;
        th.style.cssText = `text-align:center; font-family:'Space Mono',monospace; font-size:8px; letter-spacing:0.08em; padding-bottom:6px; color:${mutedText}; font-weight:400;`;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      allYears.forEach(y => {
        const tr = document.createElement('tr');

        const yearTh = document.createElement('th');
        yearTh.textContent = String(y);
        yearTh.style.cssText = `text-align:right; padding-right:8px; font-family:'Space Mono',monospace; font-size:8px; letter-spacing:0.08em; color:${mutedText}; font-weight:400; white-space:nowrap;`;
        tr.appendChild(yearTh);

        for (let m = 1; m <= 12; m++) {
          const td = document.createElement('td');
          td.style.cssText = `height:20px; border-radius:3px; text-align:center; font-size:9px; color:transparent; cursor:default; transition:border-color 0.15s; background:${cellBg}; border:1px solid ${cellBorder};`;

          const val = heatData[`${y}-${m}`] || 0;
          if (val > 0) {
            let color = heatColors.level1;
            if (val >= 4) color = heatColors.level4;
            else if (val >= 3) color = heatColors.level3;
            else if (val >= 2) color = heatColors.level2;

            td.style.background = color.bg;
            td.style.borderColor = color.border;
            td.title = `${MONTHS[m - 1]} ${y}: ${val} show${val > 1 ? 's' : ''}`;

            td.onmouseenter = () => {
              td.style.borderColor = ACCENT;
              td.style.color = ACCENT;
            };
            td.onmouseleave = () => {
              td.style.borderColor = color.border;
              td.style.color = 'transparent';
            };
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
    }

    // Chart 5: Acumulado
    if (chartCumulativeRef.current) {
      const fillColor = theme === 'dark' ? 'rgba(200,255,0,0.04)' : 'rgba(159,214,0,0.08)';
      new Chart(chartCumulativeRef.current, {
        type: 'line',
        data: {
          labels: cumLabels,
          datasets: [{
            data: cumData,
            borderColor: ACCENT,
            borderWidth: 1.5,
            pointBackgroundColor: ACCENT,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
            backgroundColor: fillColor,
            tension: 0.3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`
              }
            }
          },
          scales: {
            x: { grid: gridOpts, ticks: { ...tickStyle, maxTicksLimit: 10 }, border: borderStyle },
            y: { grid: gridOpts, ticks: { ...tickStyle, callback: (v) => `R$${Number(v).toLocaleString('pt-BR')}` }, border: borderStyle }
          }
        }
      });
    }

    // Cleanup
    return () => {
      Chart.getChart(chartSpendYearRef.current!)?.destroy();
      Chart.getChart(chartGenresRef.current!)?.destroy();
      Chart.getChart(chartVenuesRef.current!)?.destroy();
      Chart.getChart(chartMonthsRef.current!)?.destroy();
      Chart.getChart(chartCumulativeRef.current!)?.destroy();
    };
  }, [theme]);

const totalShows = concerts.length;
const totalBands = new Set(concerts.flatMap(c => c.bands).map(b => b.toLowerCase().trim())).size;
const totalCities = new Set(concerts.map(c => c.city)).size;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] transition-colors">
      <Sidebar
        totalShows={totalShows}
        totalBands={totalBands}
        totalCities={totalCities}
        activePage="stats"
      />

      <main className="flex-1 p-6 md:p-9 overflow-y-auto">
        <div className="page-header flex items-baseline justify-between mb-9 border-b border-[var(--theme-border)] pb-5">
          <div>
            <div className="font-['Bebas_Neue'] text-5xl tracking-wide leading-none">
              Show <span className="text-[var(--theme-accent)]">Stats</span>
            </div>
            <div className="font-['Space_Mono'] text-[10px] text-[var(--theme-text-muted)] tracking-[0.2em] uppercase mt-1">
              2010 → 2025 · todos os números
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div id="kpi-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8"></div>

        {/* Gasto por ano */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                gasto por ano (R$)
              </span>
              <span id="total-badge" className="font-['Space_Mono'] text-[8px] tracking-wider px-2 py-[2px] border border-[var(--theme-border)] text-[var(--theme-text-muted)] uppercase">
                total: —
              </span>
            </div>
            <div className="h-[200px]">
              <canvas ref={chartSpendYearRef}></canvas>
            </div>
          </div>
        </div>

        {/* Gêneros + Venues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                gêneros
              </span>
            </div>
            <div id="genre-legend" className="flex flex-wrap gap-2 mb-4"></div>
            <div className="h-[220px]">
              <canvas ref={chartGenresRef}></canvas>
            </div>
          </div>

          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                venues mais visitados
              </span>
            </div>
            <div className="h-[260px]">
              <canvas ref={chartVenuesRef}></canvas>
            </div>
          </div>
        </div>

        {/* Bandas + Sazonalidade */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                bandas mais vistas
              </span>
            </div>
            <div id="bands-ranking" className="flex flex-col gap-2"></div>
          </div>

          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                sazonalidade · shows por mês
              </span>
            </div>
            <div className="h-[220px]">
              <canvas ref={chartMonthsRef}></canvas>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                heatmap de atividade · ano × mês
              </span>
              <span className="font-['Space_Mono'] text-[8px] tracking-wider px-2 py-[2px] border border-[var(--theme-border)] text-[var(--theme-text-muted)] uppercase">
                1 quadrado = 1 show
              </span>
            </div>
      <div className="overflow-x-auto pb-1">
  <table
    id="heatmap"
    style={{
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '3px',
      tableLayout: 'fixed',
    }}
  ></table>
</div>
          </div>
        </div>

        {/* Gasto acumulado */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
                gasto acumulado ao longo do tempo
              </span>
            </div>
            <div className="h-[180px]">
              <canvas ref={chartCumulativeRef}></canvas>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
