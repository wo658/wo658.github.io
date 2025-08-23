document.addEventListener('DOMContentLoaded', function() {
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

  // SPA Page System - 완전한 풀스크린 페이지 전환
  let currentPage = 0;
  const pages = [];
  let pageContainer, pageWrapper;
  
  const initSPASystem = () => {
    console.log('Initializing SPA system...');
    
    // 페이지 요소들 수집
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    
    console.log('Found main:', main);
    console.log('Found sections:', sections.length);
    
    if (!main || !sections.length) {
      console.error('Main element or sections not found');
      return;
    }
    
    // 각 페이지에 클래스 추가
    main.classList.add('page', 'hero');
    pages.push(main);
    
    sections.forEach((section, index) => {
      section.classList.add('page');
      // 각 섹션에 특별한 클래스 추가
      if (section.id === 'projects') section.classList.add('projects');
      else if (section.id === 'skills') section.classList.add('skills');
      else if (section.id === 'architecture') section.classList.add('architecture');
      pages.push(section);
    });
    
    // 컨테이너 생성
    pageContainer = document.createElement('div');
    pageContainer.className = 'page-container';
    pageWrapper = document.createElement('div');
    pageWrapper.className = 'page-wrapper';
    
    // 모든 페이지를 래퍼에 이동
    pages.forEach(page => {
      pageWrapper.appendChild(page);
    });
    
    pageContainer.appendChild(pageWrapper);
    document.body.appendChild(pageContainer);
    
    // SPA 모드 활성화
    document.body.classList.add('spa-mode');
    
    // 네비게이션 생성
    createPageNavigation();
    createArrowNavigation();
    updatePagePosition();
    
    // 키보드 네비게이션
    document.addEventListener('keydown', handleKeyNavigation);
    
    // 해시 네비게이션 설정
    setupHashNavigation();
    
    // 스와이프 네비게이션 (터치)
    setupSwipeNavigation();
  };
  
  const createPageNavigation = () => {
    const nav = document.createElement('div');
    nav.className = 'page-nav';
    
    // 각 페이지마다 도트 생성
    pages.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      if (index === 0) dot.classList.add('active');
      dot.onclick = () => goToPage(index);
      nav.appendChild(dot);
    });
    
    document.body.appendChild(nav);
  };
  
  const createArrowNavigation = () => {
    // 왼쪽 화살표
    const leftArrow = document.createElement('button');
    leftArrow.className = 'page-arrow prev';
    leftArrow.innerHTML = '‹';
    leftArrow.onclick = goToPrevPage;
    document.body.appendChild(leftArrow);
    
    // 오른쪽 화살표
    const rightArrow = document.createElement('button');
    rightArrow.className = 'page-arrow next';
    rightArrow.innerHTML = '›';
    rightArrow.onclick = goToNextPage;
    document.body.appendChild(rightArrow);
  };
  
  const goToPage = (index) => {
    if (index < 0 || index >= pages.length) return;
    if (index === currentPage) return;
    
    currentPage = index;
    updatePagePosition();
    updateNavigation();
    updateHash();
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };
  
  const updatePagePosition = () => {
    if (pageWrapper) {
      pageWrapper.style.transform = `translateX(-${currentPage * 100}%)`;
    }
  };
  
  const updateNavigation = () => {
    // 도트 네비게이션 업데이트
    const dots = document.querySelectorAll('.page-nav .nav-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });
    
    // 화살표 상태 업데이트
    const prevArrow = document.querySelector('.page-arrow.prev');
    const nextArrow = document.querySelector('.page-arrow.next');
    
    if (prevArrow) {
      prevArrow.disabled = currentPage === 0;
      prevArrow.style.opacity = currentPage === 0 ? '0.2' : '0.7';
    }
    if (nextArrow) {
      nextArrow.disabled = currentPage === pages.length - 1;
      nextArrow.style.opacity = currentPage === pages.length - 1 ? '0.2' : '0.7';
    }
  };
  
  const updateHash = () => {
    const pageId = pages[currentPage].id;
    if (pageId) {
      history.replaceState(null, null, `#${pageId}`);
    }
  };
  
  const handleKeyNavigation = (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevPage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNextPage();
        break;
    }
  };
  
  const setupHashNavigation = () => {
    // 초기 해시 처리
    const hash = window.location.hash.slice(1);
    if (hash) {
      const pageIndex = pages.findIndex(page => page.id === hash);
      if (pageIndex !== -1) {
        goToPage(pageIndex);
      }
    }
    
    // 네비게이션 링크 처리
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.slice(1);
          const pageIndex = pages.findIndex(page => page.id === targetId);
          if (pageIndex !== -1) {
            goToPage(pageIndex);
          }
        }
      });
    });
  };
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  const setupSwipeNavigation = () => {
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  };
  
  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 = 다음 페이지
        goToNextPage();
      } else {
        // 오른쪽으로 스와이프 = 이전 페이지
        goToPrevPage();
      }
    }
  };
  
  // SPA 시스템 초기화
  setTimeout(initSPASystem, 100);
  
  // Fallback - 만약 위가 실행되지 않으면
  setTimeout(() => {
    if (!document.body.classList.contains('spa-mode')) {
      console.log('Fallback initialization...');
      initSPASystem();
    }
  }, 1000);
});