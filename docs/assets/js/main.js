(function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const opened = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(opened));
    });
    // Close when clicking a link (mobile)
    navList.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.tagName === 'A') {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle (dark/light)
  const root = document.documentElement;
  const THEME_KEY = 'portfolio:theme';
  const applyTheme = (mode) => {
    if (mode === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
  };
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') applyTheme(saved);
  } catch {}
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
    });
  }

  // Copy page link
  const copyLink = document.getElementById('copy-link');
  if (copyLink) {
    copyLink.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        copyLink.textContent = '복사됨!';
        setTimeout(() => (copyLink.textContent = '페이지 링크 복사'), 1200);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(ta);
        copyLink.textContent = '복사됨!';
        setTimeout(() => (copyLink.textContent = '페이지 링크 복사'), 1200);
      }
    });
  }
})();
