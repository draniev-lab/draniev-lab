const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const themeButton = document.querySelector('.theme-toggle');
const root = document.documentElement;
const darkTheme = {'--bg':'#080b12','--surface':'#0d121b','--surface-2':'#111824','--surface-3':'#151e2b','--text':'#f4f7fb','--muted':'#9aa7b7','--line':'rgba(255,255,255,.09)','--accent':'#67e8f9','--success':'#5ee7a5'};
const lightTheme = {'--bg':'#f5f7fa','--surface':'#ffffff','--surface-2':'#eef2f7','--surface-3':'#e7edf5','--text':'#111827','--muted':'#5d6878','--line':'rgba(15,23,42,.12)','--accent':'#087f95','--success':'#15803d'};

function applyTheme(mode) {
  const palette = mode === 'light' ? lightTheme : darkTheme;
  Object.entries(palette).forEach(([key, value]) => root.style.setProperty(key, value));
  root.dataset.theme = mode;
  if (themeButton) {
    themeButton.querySelector('span').textContent = mode === 'light' ? '☀' : '◐';
    themeButton.setAttribute('aria-label', mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.title = mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
  }
  localStorage.setItem('portfolio-theme', mode);
}

if (themeButton) {
  const saved = localStorage.getItem('portfolio-theme');
  applyTheme(saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 12 ? '0 12px 35px rgba(0,0,0,.18)' : 'none';
  }, { passive: true });
}
