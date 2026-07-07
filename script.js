/* =========================================================
   AARAV MEHTA PORTFOLIO — script.js
   Vanilla JS only. Organized by feature, each self-contained.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. LOADING SCREEN ---------- */
  (function loader(){
    const loaderEl = document.getElementById('loader');
    const progressEl = document.getElementById('loaderProgress');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => loaderEl.classList.add('hidden'), 300);
      }
      progressEl.style.width = progress + '%';
    }, 150);
  })();

  /* ---------- 2. CUSTOM CURSOR ---------- */
  (function cursor(){
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring || window.matchMedia('(hover: none)').matches) return;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      ringX = e.clientX; ringY = e.clientY;
    });
    (function loop(){
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .masonry-item, .faq-question, input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  })();

  /* ---------- 3. SCROLL PROGRESS BAR + NAVBAR STATE + BACK TO TOP ---------- */
  (function scrollFx(){
    const progressBar = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';

      navbar.classList.toggle('scrolled', scrollTop > 40);
      backToTop.classList.toggle('visible', scrollTop > 500);
    });

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

  /* ---------- 4. MOBILE MENU ---------- */
  (function mobileMenu(){
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  })();

  /* ---------- 5. DARK / LIGHT THEME TOGGLE ---------- */
  (function themeToggle(){
    const btn = document.getElementById('themeToggle');
    const icon = btn.querySelector('i');
    const saved = localStorageSafeGet('theme');
    if (saved === 'light') {
      document.body.classList.add('light-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      icon.classList.toggle('fa-moon', !isLight);
      icon.classList.toggle('fa-sun', isLight);
      localStorageSafeSet('theme', isLight ? 'light' : 'dark');
    });
  })();

  // Safe localStorage wrapper (falls back gracefully if unavailable, e.g. sandboxed preview)
  function localStorageSafeGet(key){ try { return localStorage.getItem(key); } catch(e){ return null; } }
  function localStorageSafeSet(key, val){ try { localStorage.setItem(key, val); } catch(e){ /* no-op */ } }

  /* ---------- 6. HERO TYPING EFFECT ---------- */
  (function typingEffect(){
    const el = document.getElementById('typedText');
    const words = ['pixel-perfect edits.', 'cinematic color grades.', 'scroll-stopping designs.', 'stories worth sharing.'];
    let wordIndex = 0, charIndex = 0, deleting = false;

    function tick(){
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 65);
    }
    tick();
  })();

  /* ---------- 7. SCROLL REVEAL ANIMATIONS ---------- */
  (function scrollReveal(){
    const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => observer.observe(t));
  })();

  /* ---------- 8. ANIMATED STAT COUNTERS ---------- */
  (function counters(){
    const counterEls = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const duration = 1600;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;
        const update = () => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(() => setTimeout(update, stepTime));
          }
        };
        update();
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => observer.observe(el));
  })();

  /* ---------- 9. SKILL BARS ---------- */
  (function skillBars(){
    const bars = document.querySelectorAll('.skill-bar span');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => observer.observe(b));
  })();

  /* ---------- 10. PORTFOLIO FILTER ---------- */
  (function portfolioFilter(){
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.masonry-item');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const match = filter === 'all' || item.dataset.cat === filter;
          item.classList.toggle('hide', !match);
        });
      });
    });
  })();

  /* ---------- 11. LIGHTBOX PREVIEW ---------- */
  (function lightbox(){
    const items = Array.from(document.querySelectorAll('.masonry-item img'));
    const lightboxEl = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    let currentIndex = 0;

    function openLightbox(index){
      currentIndex = index;
      lightboxImg.src = items[index].src;
      lightboxImg.alt = items[index].alt;
      lightboxEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightboxEl.classList.remove('active');
      document.body.style.overflow = '';
    }
    function showRelative(delta){
      currentIndex = (currentIndex + delta + items.length) % items.length;
      lightboxImg.src = items[currentIndex].src;
      lightboxImg.alt = items[currentIndex].alt;
    }

    items.forEach((img, i) => img.closest('.masonry-item').addEventListener('click', () => openLightbox(i)));
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showRelative(-1));
    nextBtn.addEventListener('click', () => showRelative(1));
    lightboxEl.addEventListener('click', (e) => { if (e.target === lightboxEl) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightboxEl.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showRelative(-1);
      if (e.key === 'ArrowRight') showRelative(1);
    });
  })();

  /* ---------- 12. BEFORE / AFTER COMPARE SLIDER ---------- */
  (function compareSlider(){
    const slider = document.getElementById('compareSlider');
    const afterWrap = slider.querySelector('.compare-after-wrap');
    const handle = document.getElementById('compareHandle');
    let dragging = false;

    function setPosition(clientX){
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      afterWrap.style.width = pct + '%';
      handle.style.left = pct + '%';
    }

    handle.style.left = '50%';

    slider.addEventListener('mousedown', (e) => { dragging = true; setPosition(e.clientX); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);

    slider.addEventListener('touchstart', (e) => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchmove', (e) => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchend', () => dragging = false);
  })();

  /* ---------- 13. VIDEO REEL PLAY/PAUSE ---------- */
  (function reels(){
    document.querySelectorAll('.reel-card').forEach(card => {
      const video = card.querySelector('video');
      const btn = card.querySelector('.play-btn');
      const icon = btn.querySelector('i');
      btn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          icon.classList.replace('fa-play', 'fa-pause');
        } else {
          video.pause();
          icon.classList.replace('fa-pause', 'fa-play');
        }
      });
    });
  })();

  /* ---------- 14. TESTIMONIAL CAROUSEL (auto-sliding) ---------- */
  (function testimonials(){
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const dotsWrap = document.getElementById('testimonialDots');
    let index = 0;
    let autoTimer;

    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('span');

    function goTo(i){
      index = i;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
      restartAuto();
    }
    function next(){ goTo((index + 1) % cards.length); }
    function restartAuto(){
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 5000);
    }
    restartAuto();
  })();

  /* ---------- 15. FAQ ACCORDION ---------- */
  (function faq(){
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  })();

  /* ---------- 16. CONTACT FORM (client-side validation + demo submit) ---------- */
  (function contactForm(){
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Sending message...';
      setTimeout(() => {
        status.textContent = `Thanks! I'll get back to you within 24 hours at ${form.email.value}.`;
        form.reset();
      }, 900);
    });
  })();

  /* ---------- 17. NEWSLETTER FORM ---------- */
  (function newsletter(){
    const form = document.getElementById('newsletterForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      form.reset();
      setTimeout(() => btn.textContent = originalText, 2400);
    });
  })();

  /* ---------- 18. RESUME BUTTON (demo — no file attached) ---------- */
  (function resume(){
    const btn = document.getElementById('resumeBtn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Resume download would start here — attach your PDF and update this link to enable it.');
    });
  })();

  /* ---------- 19. FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 20. FLOATING PARTICLES (canvas) ---------- */
  (function particles(){
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particlesArr = [];
    const count = window.innerWidth < 768 ? 35 : 70;

    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    function createParticles(){
      particlesArr = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.6,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        hue: Math.random() > 0.5 ? '79,141,255' : '164,91,255',
        alpha: Math.random() * 0.5 + 0.2
      }));
    }
    function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArr.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    resize();
    createParticles();
    animate();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  })();

  /* ---------- 21. SMOOTH ANCHOR SCROLL (with sticky navbar offset) ---------- */
  (function smoothAnchors(){
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  })();

  /* ---------- 22. PAGE TRANSITION OVERLAY ON INTERNAL LINK NAV ---------- */
  (function pageTransition(){
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
    // Triggered subtly on hash-based section jumps for a cinematic feel
    let lastHash = '';
    window.addEventListener('hashchange', () => {
      if (window.location.hash !== lastHash) {
        lastHash = window.location.hash;
        overlay.classList.remove('run');
        void overlay.offsetWidth; // restart animation
        overlay.classList.add('run');
      }
    });
  })();

});
