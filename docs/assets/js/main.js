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

  // Slide System
  let currentSlide = 0;
  const slides = [];
  let slideContainer, slideWrapper;
  
  const initSlideSystem = () => {
    // Create slide system
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    
    if (!main || !sections.length) return;
    
    // Add slide class to hero and sections
    main.classList.add('slide');
    slides.push(main);
    
    sections.forEach(section => {
      section.classList.add('slide');
      slides.push(section);
    });
    
    // Create slide container and wrapper
    slideContainer = document.createElement('div');
    slideContainer.className = 'slide-container';
    slideWrapper = document.createElement('div');
    slideWrapper.className = 'slide-wrapper';
    
    // Move all slides into wrapper
    slides.forEach(slide => {
      slideWrapper.appendChild(slide);
    });
    
    slideContainer.appendChild(slideWrapper);
    document.body.appendChild(slideContainer);
    
    // Enable slide mode
    document.body.classList.add('slide-mode');
    
    createSlideNavigation();
    createArrowNavigation();
    updateSlidePosition();
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextSlide();
      }
    });
    
    // Handle hash navigation
    updateHashNavigation();
  };
  
  const createSlideNavigation = () => {
    const nav = document.createElement('div');
    nav.className = 'slide-nav';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-prev';
    prevBtn.textContent = '<';
    prevBtn.onclick = goToPrevSlide;
    nav.appendChild(prevBtn);
    
    // Slide indicators
    slides.forEach((_, index) => {
      const btn = document.createElement('button');
      btn.textContent = (index + 1).toString();
      btn.onclick = () => goToSlide(index);
      if (index === 0) btn.classList.add('active');
      nav.appendChild(btn);
    });
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-next';
    nextBtn.textContent = '>';
    nextBtn.onclick = goToNextSlide;
    nav.appendChild(nextBtn);
    
    document.body.appendChild(nav);
  };
  
  const createArrowNavigation = () => {
    // Left arrow
    const leftArrow = document.createElement('button');
    leftArrow.className = 'slide-arrow prev';
    leftArrow.textContent = '<';
    leftArrow.onclick = goToPrevSlide;
    document.body.appendChild(leftArrow);
    
    // Right arrow
    const rightArrow = document.createElement('button');
    rightArrow.className = 'slide-arrow next';
    rightArrow.textContent = '>';
    rightArrow.onclick = goToNextSlide;
    document.body.appendChild(rightArrow);
  };
  
  const goToSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    currentSlide = index;
    updateSlidePosition();
    updateNavigation();
    updateHash();
  };
  
  const goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
  };
  
  const goToNextSlide = () => {
    goToSlide(currentSlide + 1);
  };
  
  const updateSlidePosition = () => {
    if (slideWrapper) {
      slideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  };
  
  const updateNavigation = () => {
    const navButtons = document.querySelectorAll('.slide-nav button:not(.nav-prev):not(.nav-next)');
    const prevBtn = document.querySelector('.slide-nav .nav-prev');
    const nextBtn = document.querySelector('.slide-nav .nav-next');
    const leftArrow = document.querySelector('.slide-arrow.prev');
    const rightArrow = document.querySelector('.slide-arrow.next');
    
    // Update indicators
    navButtons.forEach((btn, index) => {
      btn.classList.toggle('active', index === currentSlide);
    });
    
    // Update arrow states
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
    if (leftArrow) leftArrow.disabled = currentSlide === 0;
    if (rightArrow) rightArrow.disabled = currentSlide === slides.length - 1;
  };
  
  const updateHash = () => {
    const slideId = slides[currentSlide].id;
    if (slideId) {
      history.replaceState(null, null, `#${slideId}`);
    }
  };
  
  const updateHashNavigation = () => {
    // Handle initial hash
    const hash = window.location.hash.slice(1);
    if (hash) {
      const slideIndex = slides.findIndex(slide => slide.id === hash);
      if (slideIndex !== -1) {
        goToSlide(slideIndex);
      }
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.slice(1);
          const slideIndex = slides.findIndex(slide => slide.id === targetId);
          if (slideIndex !== -1) {
            goToSlide(slideIndex);
          }
        }
      });
    });
  };
  
  // Initialize slide system
  initSlideSystem();
  
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
