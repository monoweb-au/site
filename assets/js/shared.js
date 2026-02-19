document.addEventListener('DOMContentLoaded', () => {
  const isSimpleNav = document.body.classList.contains('simple-nav');
  const isPricingPage = document.body.classList.contains('options-page');

  const headerFullNav = `
    <nav>
      <a href="index.html" class="logo" aria-label="MonoWeb home">
        <img src="assets/img/mw-logo.png" alt="MonoWeb logo">
      </a>

      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links">
        <li><a href="index.html#services">What You Get</a></li>
        <li><a href="index.html#why-us">Why Choose Us?</a></li>
        <li><a href="index.html#examples">Examples</a></li>
        <li><a href="index.html#process">How It Works</a></li>
        <li><a href="index.html#pricing">Pricing</a></li>
        <li><a href="index.html#faqs">FAQs</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>
    </nav>
  `;

  const headerPricingNav = `
    <nav>
      <a href="index.html" class="logo" aria-label="MonoWeb home">
        <img src="assets/img/mw-logo.png" alt="MonoWeb logo">
      </a>

      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links">
        <li><a href="#step1">Choose Your Plan</a></li>
        <li><a href="#step2">Choose Your Content</a></li>
        <li><a href="#step3">Add Extras</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>
    </nav>
  `;

  const headerSimpleNav = `
    <nav>
      <a href="index.html" class="logo" aria-label="MonoWeb home">
        <img src="assets/img/mw-logo.png" alt="MonoWeb logo">
      </a>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <a href="index.html" class="logo" aria-label="MonoWeb home">
        <img src="assets/img/mw-logo.png" alt="MonoWeb logo">
      </a>

      <p>
        &copy; <span id="year"></span> MonoWeb •
        <a href="privacy.html">Privacy</a> •
        <a href="terms.html">Terms</a>
        <br>
        Empowering local businesses with simple, professional websites.
      </p>
    </footer>
  `;

  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    if (isPricingPage) {
      headerPlaceholder.outerHTML = headerPricingNav;
    } else if (isSimpleNav) {
      headerPlaceholder.outerHTML = headerSimpleNav;
    } else {
      headerPlaceholder.outerHTML = headerFullNav;
    }
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = footerHTML;
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }

  const hamburger = document.querySelector('.hamburger');
  const navLinksEl = document.querySelector('.nav-links');
  if (hamburger && navLinksEl) {
    const closeMenu = () => {
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) closeMenu();
    });
  }

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
  });

  const progressBar = document.getElementById('progressBar');

  let scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('div');
    scrollTopBtn.id = 'scrollTop';
    scrollTopBtn.className = 'scroll-top';
    document.body.appendChild(scrollTopBtn);
  }
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const timeline = document.querySelector('.process-timeline');
  if (timeline) {
    const spark = document.createElement('div');
    spark.className = 'timeline-spark';
    timeline.appendChild(spark);
  }

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href*="#"]');
  let updateActiveNav;
  if (navLinks.length) {
    const sections = Array.from(navLinks)
      .map(link => {
        const hash = link.getAttribute('href').split('#')[1];
        return hash ? document.getElementById(hash) : null;
      })
      .filter(Boolean);

    updateActiveNav = () => {
      const scrollPosition = window.pageYOffset + window.innerHeight / 3;
      let currentSection = null;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section;
        }
      });
      navLinks.forEach(link => {
        const hash = link.getAttribute('href').split('#')[1];
        if (currentSection && hash === currentSection.id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    updateActiveNav();
  }

  window.addEventListener('scroll', () => {
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.transform = `scaleX(${height > 0 ? winScroll / height : 0})`;
    }

    if (window.pageYOffset > 300) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');

    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.5;
      const progress = Math.min(Math.max((triggerPoint - rect.top) / rect.height, 0), 1);
      timeline.style.setProperty('--timeline-fill', progress);
    }

    if (updateActiveNav) updateActiveNav();
  });

  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('services');
      if (!target) return;
      const start = window.pageYOffset;
      const end = target.offsetTop;
      const distance = end - start;
      const duration = 800;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + distance * ease);
        if (elapsed < duration) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  const magneticBtns = document.querySelectorAll('.hero .btn-primary');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card) => {
    card.addEventListener('animationend', () => {
      card.style.animation = 'none';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  const particleSection = document.querySelector('.example-work');
  if (particleSection) {
    const canvas = document.createElement('canvas');
    canvas.className = 'section-particles';
    particleSection.insertBefore(canvas, particleSection.firstChild);
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = particleSection.offsetWidth; canvas.height = particleSection.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * particleSection.offsetWidth,
      y: Math.random() * particleSection.offsetHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    };
    draw();
  }

  const animated = document.querySelectorAll('.service-card, .process-step, .example-card, .pricing-card');
  if (animated.length) {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);

    animated.forEach((el) => observer.observe(el));
  }

  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length) {
    faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach((faqItem) => faqItem.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  const notification = document.getElementById('notification');
  const showNotification = (msg) => {
    if (!notification) return;
    notification.textContent = msg;
    notification.classList.add('show');
    window.setTimeout(() => notification.classList.remove('show'), 5000);
  };

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');

      const existing = form.querySelector('.form-confirmation');
      if (existing) existing.remove();

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        const response = await fetch(form.getAttribute('action'), { method: 'POST', body: formData });
        const data = await response.json();

        if (data.success) {
          form.reset();

          const popup = document.createElement('div');
          popup.className = 'form-confirmation';
          popup.innerHTML = `
            <svg class="form-confirmation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12l3 3 5-5"/>
            </svg>
            <p class="form-confirmation-title">Enquiry sent!</p>
            <p class="form-confirmation-text">Thanks – we'll get back to you shortly.</p>
          `;

          submitButton.insertAdjacentElement('afterend', popup);
          requestAnimationFrame(() => popup.classList.add('show'));

          setTimeout(() => {
            popup.classList.remove('show');
            popup.addEventListener('transitionend', () => popup.remove(), { once: true });
          }, 6000);
        } else {
          showNotification('Something went wrong. Please try again or email hello@monoweb.com.au');
        }
      } catch {
        showNotification('Something went wrong. Please try again or email hello@monoweb.com.au');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Enquiry';
        }
      }
    });
  }
});