// Charts.js - All data visualizations for GeoPolIB
// Uses Chart.js loaded via CDN in each page

document.addEventListener('DOMContentLoaded', () => {

  // ─── HOME PAGE CHARTS ───────────────────────────────────────────────────────

  // GDP Share Chart (World Bank 2024 data, % of world GDP)
  const gdpEl = document.getElementById('gdpChart');
  if (gdpEl) {
    new Chart(gdpEl, {
      type: 'doughnut',
      data: {
        labels: ['USA', 'China', 'EU', 'India', 'Japan', 'UK', 'Russia', 'Rest of World'],
        datasets: [{
          data: [25.3, 18.9, 17.8, 8.2, 4.0, 3.1, 1.9, 20.8],
          backgroundColor: [
            '#3b82f6', '#ef4444', '#10b981',
            '#f59e0b', '#8b5cf6', '#06b6d4',
            '#f97316', '#6b7280'
          ],
          borderWidth: 2,
          borderColor: '#1e293b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#fff', font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}% of world GDP`
            }
          }
        }
      }
    });
  }

  // Active Conflicts by Region (ACLED 2026 data)
  const conflictEl = document.getElementById('conflictChart');
  if (conflictEl) {
    new Chart(conflictEl, {
      type: 'bar',
      data: {
        labels: ['Middle East', 'Sub-Saharan Africa', 'Europe (Ukraine)', 'South Asia', 'East Asia', 'Latin America', 'Central Asia'],
        datasets: [{
          label: 'Active Conflict Zones',
          data: [12, 28, 1, 5, 3, 4, 2],
          backgroundColor: [
            '#ef4444', '#f97316', '#3b82f6',
            '#8b5cf6', '#f59e0b', '#10b981', '#06b6d4'
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { color: '#fff', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.1)' } },
          y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
        }
      }
    });
  }

  // Democracy Index (Freedom House 2025)
  const democEl = document.getElementById('democracyChart');
  if (democEl) {
    new Chart(democEl, {
      type: 'pie',
      data: {
        labels: ['Free (87)', 'Partly Free (54)', 'Not Free (54)'],
        datasets: [{
          data: [44.6, 27.7, 27.7],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 2,
          borderColor: '#1e293b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#fff', font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}% of countries`
            }
          }
        }
      }
    });
  }

  // ─── GLOBAL ACTORS / M5 CHARTS ───────────────────────────────────────────────

  // Military Expenditure (SIPRI 2024, USD billions)
  const milEl = document.getElementById('militaryChart');
  if (milEl) {
    new Chart(milEl, {
      type: 'bar',
      data: {
        labels: ['USA', 'China', 'Russia', 'India', 'Saudi Arabia', 'UK', 'Germany', 'France', 'Ukraine', 'Israel'],
        datasets: [{
          label: 'Military Spending (USD Billions)',
          data: [916, 296, 109, 83, 76, 68, 66, 57, 65, 28],
          backgroundColor: ['#3b82f6','#ef4444','#f97316','#f59e0b','#10b981','#06b6d4','#8b5cf6','#ec4899','#84cc16','#14b8a6'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `$${ctx.parsed.x}B (SIPRI 2024)`
            }
          }
        },
        scales: {
          x: { ticks: { color: '#333' }, grid: { color: 'rgba(0,0,0,0.1)' } },
          y: { ticks: { color: '#333' } }
        }
      }
    });
  }

  // Nuclear Warheads (SIPRI 2025 estimate)
  const nuclearEl = document.getElementById('nuclearChart');
  if (nuclearEl) {
    new Chart(nuclearEl, {
      type: 'doughnut',
      data: {
        labels: ['Russia', 'USA', 'China', 'France', 'UK', 'Pakistan', 'India', 'Israel (est)', 'North Korea'],
        datasets: [{
          data: [5580, 5044, 500, 290, 225, 170, 164, 90, 50],
          backgroundColor: ['#f97316','#3b82f6','#ef4444','#2563eb','#1d4ed8','#10b981','#f59e0b','#8b5cf6','#64748b'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ~${ctx.parsed.toLocaleString()} warheads`
            }
          }
        }
      }
    });
  }

  // UN Security Council Veto Usage (1946-2026)
  const vetoEl = document.getElementById('vetoChart');
  if (vetoEl) {
    new Chart(vetoEl, {
      type: 'bar',
      data: {
        labels: ['Russia/USSR', 'USA', 'UK', 'China', 'France'],
        datasets: [{
          label: 'Vetoes Used (1946-2026)',
          data: [143, 89, 32, 19, 18],
          backgroundColor: ['#f97316','#3b82f6','#06b6d4','#ef4444','#2563eb'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#333' } },
          y: { ticks: { color: '#333' }, grid: { color: 'rgba(0,0,0,0.1)' } }
        }
      }
    });
  }

  // Global Inequality - Gini Coefficients
  const giniEl = document.getElementById('giniChart');
  if (giniEl) {
    new Chart(giniEl, {
      type: 'bar',
      data: {
        labels: ['South Africa (0.63)', 'Brazil (0.53)', 'Mexico (0.46)', 'USA (0.41)', 'China (0.38)', 'UK (0.35)', 'Germany (0.31)', 'Denmark (0.28)', 'Norway (0.25)'],
        datasets: [{
          label: 'Gini Coefficient (0=equal, 1=max inequality)',
          data: [0.63, 0.53, 0.46, 0.41, 0.38, 0.35, 0.31, 0.28, 0.25],
          backgroundColor: (ctx) => {
            const v = ctx.raw;
            if (v > 0.5) return '#ef4444';
            if (v > 0.4) return '#f97316';
            if (v > 0.35) return '#f59e0b';
            return '#10b981';
          },
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 0.7, ticks: { color: '#333' } },
          y: { ticks: { color: '#333', font: { size: 10 } } }
        }
      }
    });
  }

  // Refugee & Displacement Data (UNHCR 2025)
  const refugeeEl = document.getElementById('refugeeChart');
  if (refugeeEl) {
    new Chart(refugeeEl, {
      type: 'line',
      data: {
        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2023', '2024'],
        datasets: [{
          label: 'Forcibly Displaced People (millions)',
          data: [41.8, 42.5, 59.5, 65.6, 70.8, 82.4, 108.4, 117.3, 122.6],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.15)',
          tension: 0.3,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#ef4444'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#333' } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.y}M displaced (UNHCR)`
            }
          }
        },
        scales: {
          x: { ticks: { color: '#333' } },
          y: { ticks: { color: '#333' }, grid: { color: 'rgba(0,0,0,0.1)' } }
        }
      }
    });
  }

  // CO2 Emissions by Country (IEA 2023, billion tonnes)
  const co2El = document.getElementById('co2Chart');
  if (co2El) {
    new Chart(co2El, {
      type: 'doughnut',
      data: {
        labels: ['China', 'USA', 'India', 'EU', 'Russia', 'Japan', 'Rest of World'],
        datasets: [{
          data: [32.5, 14.9, 8.7, 6.8, 5.4, 2.9, 29.8],
          backgroundColor: ['#ef4444','#3b82f6','#f59e0b','#10b981','#f97316','#8b5cf6','#6b7280'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}% of global CO₂`
            }
          }
        }
      }
    });
  }

  // Timeline of major events - M8 Power Transition
  const powerEl = document.getElementById('powerTransitionChart');
  if (powerEl) {
    new Chart(powerEl, {
      type: 'line',
      data: {
        labels: ['1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025', '2030*'],
        datasets: [
          {
            label: 'USA GDP Share (%)',
            data: [26, 25, 30, 28, 23, 24, 25, 25, 22],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            tension: 0.3
          },
          {
            label: 'China GDP Share (%)',
            data: [2, 3, 4, 6, 10, 15, 18, 19, 22],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            tension: 0.3
          },
          {
            label: 'EU GDP Share (%)',
            data: [26, 26, 23, 28, 22, 18, 17, 18, 16],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.1)',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#333' } } },
        scales: {
          x: { ticks: { color: '#333' } },
          y: { ticks: { color: '#333' }, title: { display: true, text: '% of World GDP', color: '#333' } }
        }
      }
    });
  }

});
