// =========================================================
// PORTFOLIO SCRIPT — Kiruthiga Vijayaraghavan
// Handles: mobile nav toggle, smooth scroll, scroll fade-ins,
// active nav-link highlighting, terminal typing effect, footer year.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu after clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth scroll for in-page links ---------- */
  // (CSS `scroll-behavior: smooth` already handles this, but we
  // account for the fixed navbar height so sections aren't hidden under it)
  const navbarHeight = document.getElementById('navbar').offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll-triggered fade-in animations ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ---------- Active nav-link highlighting on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: `-${navbarHeight + 20}px 0px -60% 0px`, threshold: 0 });

  sections.forEach(section => highlightObserver.observe(section));

  /* ---------- Terminal typing effect (hero) ---------- */
  const typedTextEl = document.getElementById('typedText');
  const linesToType = [
    'whoami',
    'kiruthiga_v --role "cyber security engineer, in progress"'
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentLine = linesToType[lineIndex];

    if (!deleting) {
      typedTextEl.textContent = currentLine.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentLine.length) {
        deleting = true;
        setTimeout(typeLoop, 1400); // pause at full line
        return;
      }
    } else {
      typedTextEl.textContent = currentLine.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % linesToType.length;
      }
    }

    setTimeout(typeLoop, deleting ? 35 : 65);
  }

  // Respect reduced-motion users: just show the first line statically
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    typedTextEl.textContent = linesToType[0];
  } else {
    typeLoop();
  }

  /* ---------- Contact form (front-end only) ---------- */
  // TODO: wire this up to Formspree or EmailJS so messages actually send
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = "This form isn't connected to a backend yet — hook it up to Formspree or EmailJS to receive messages.";
    contactForm.reset();
  });
  /* ---------- Interactive Skills ---------- */

});



/* =========================================================
   MAGICAL INTERACTION LAYER
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- TRUE LUMOS LIGHTING INTRO ---------- */
  const loader = document.createElement('div');
  loader.id = 'magic-loader';
  loader.innerHTML = `
    <div class="loader-core">
      <div class="loader-ring"></div>
      <div class="loader-label">LUMOS</div>
    </div>`;
  document.body.prepend(loader);

  const finishLumos = () => {
    if (reduceMotion) {
      loader.classList.add('hidden');
      document.body.classList.add('lumos-awake');
      return;
    }
    /* Let the light fully bloom first, then remove the dark veil. */
    window.setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('lumos-awake');
    }, 1450);
    window.setTimeout(() => loader.remove(), 2550);
  };

  if (document.readyState === 'complete') {
    finishLumos();
  } else {
    window.addEventListener('load', finishLumos, { once: true });
  }

  /* ---------- Floating magical dust ---------- */
  if (!reduceMotion) {
    const field = document.createElement('div');
    field.className = 'magic-particles';
    for (let i = 0; i < 38; i++) {
      const p = document.createElement('span');
      p.className = 'magic-particle';
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${15 + Math.random() * 80}%`;
      p.style.setProperty('--duration', `${7 + Math.random() * 10}s`);
      p.style.setProperty('--delay', `${Math.random() * -12}s`);
      p.style.setProperty('--drift', `${-30 + Math.random() * 60}px`);
      field.appendChild(p);
    }
    document.body.appendChild(field);

    /* ---------- Tiny wand-spark cursor trail ---------- */
    let lastSpark = 0;
    document.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpark < 95) return;
      lastSpark = now;

      if (Math.random() > 0.48) {
        const spark = document.createElement('span');
        spark.className = 'magic-spark';
        spark.style.left = `${e.clientX - 2}px`;
        spark.style.top = `${e.clientY - 2}px`;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 750);
      }
    }, { passive: true });
  }

  /* ---------- Scroll reveal with slight stagger ---------- */
  const revealTargets = document.querySelectorAll('.section-inner, .skill-row, .edu-card, .timeline-item');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = `${Math.min((entry.target.dataset.revealIndex || 0) * 70, 280)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el, index) => {
    if (!el.classList.contains('fade-in')) el.classList.add('fade-in');
    el.dataset.revealIndex = index % 5;
    revealObserver.observe(el);
  });

  /* ---------- KV. hidden Easter egg ---------- */
  const logo = document.querySelector('.logo');
  let clicks = [];
  if (logo) {
    logo.addEventListener('click', (event) => {
      clicks.push(Date.now());
      clicks = clicks.filter(t => Date.now() - t < 1400);

      if (clicks.length === 3) {
        event.preventDefault();
        openMagicModal();
        clicks = [];
      }
    });
  }

  function openMagicModal() {
    if (document.querySelector('.magic-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'magic-modal';
    modal.innerHTML = `
      <div class="magic-panel" role="dialog" aria-modal="true" aria-label="Choose your path">
        <h3>Choose Your Path</h3>
        <p>A small secret for curious visitors.</p>
        <div class="magic-choices">
          <button class="magic-choice">Courage</button>
          <button class="magic-choice">Curiosity</button>
          <button class="magic-choice">Ambition</button>
          <button class="magic-choice">Loyalty</button>
        </div>
        <div class="magic-message"></div>
      </div>`;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('open'));

    const message = modal.querySelector('.magic-message');
    const messages = {
      Courage: 'Brave enough to build what others only imagine.',
      Curiosity: 'Always learning. Always exploring.',
      Ambition: 'Keep building — the next level is yours.',
      Loyalty: 'Good work is better when it helps others.'
    };

    modal.querySelectorAll('.magic-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        message.textContent = messages[btn.textContent];
        if (!reduceMotion) {
          for (let i = 0; i < 12; i++) {
            const spark = document.createElement('span');
            spark.className = 'magic-spark';
            spark.style.left = `${window.innerWidth / 2 + (Math.random() - .5) * 240}px`;
            spark.style.top = `${window.innerHeight / 2 + (Math.random() - .5) * 120}px`;
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 750);
          }
        }
        setTimeout(() => {
          modal.classList.remove('open');
          setTimeout(() => modal.remove(), 350);
        }, 1150);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        setTimeout(() => modal.remove(), 350);
      }
    });
  }
});


/* Final Lumos flash timing */
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('magic-loader');
  if (!loader) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    loader.classList.add('hidden');
    return;
  }

  // The flash itself lasts under half a second; the page is never held behind a loader.
  setTimeout(() => loader.classList.add('hidden'), 470);
});


/* =========================================================
   Ink reveal micro-sparkles
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const points = [
    { x: .16, y: .30 },
    { x: .82, y: .26 },
    { x: .70, y: .72 }
  ];

  points.forEach((p, i) => {
    setTimeout(() => {
      const spark = document.createElement('span');
      spark.className = 'ink-spark';
      spark.style.left = `${window.innerWidth * p.x}px`;
      spark.style.top = `${window.innerHeight * p.y}px`;
      document.body.appendChild(spark);

      requestAnimationFrame(() => spark.classList.add('show'));
      setTimeout(() => spark.remove(), 750);
    }, 520 + i * 210);
  });
});


/* =========================================================
   FIXED INK REVEAL SPARKLES
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // The hero CSS performs the main reveal. These three sparks are
  // only a tiny accent so the effect remains elegant.
  const sparkPositions = [
    [0.18, 0.28],
    [0.80, 0.24],
    [0.72, 0.68]
  ];

  sparkPositions.forEach(function (pos, index) {
    window.setTimeout(function () {
      const spark = document.createElement('span');
      spark.className = 'ink-spark';
      spark.style.left = (window.innerWidth * pos[0]) + 'px';
      spark.style.top = (window.innerHeight * pos[1]) + 'px';
      document.body.appendChild(spark);

      requestAnimationFrame(function () {
        spark.classList.add('show');
      });

      window.setTimeout(function () {
        spark.remove();
      }, 750);
    }, 850 + index * 230);
  });
});
