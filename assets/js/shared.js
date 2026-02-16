// Shared components + site-wide behaviour for MonoWeb
document.addEventListener('DOMContentLoaded', () => {
  const isSimpleNav = document.body.classList.contains('simple-nav');
  const isPricingPage = document.body.classList.contains('options-page');

  // Header: full nav (index) vs pricing nav vs simple logo-only (legal pages)
  const headerFullNav = `
    <nav>
      <a href="index.html" class="logo" aria-label="MonoWeb home">
        <img src="assets/img/mw-logo.png" alt="MonoWeb logo">
      </a>

      <ul class="nav-links">
        <li><a href="index.html#services">What You Get</a></li>
        <li><a href="index.html#process">How It Works</a></li>
        <li><a href="index.html#pricing">Pricing</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>
    </nav>
  `;

  const headerPricingNav = `
    <nav>
      <a href="index.html" class="logo" aria-label="MonoWeb home">
        <img src="assets/img/mw-logo.png" alt="MonoWeb logo">
      </a>

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

  // Cursor tracking for the subtle gradient (safe on all pages)
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
  });

  // Scroll progress bar (index only)
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) : 0;
      progressBar.style.transform = `scaleX(${scrolled})`;
    });
  }

  // Scroll-to-top button (now on all pages)
  let scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) {
    // Create the scroll-to-top button if it doesn't exist
    scrollTopBtn = document.createElement('div');
    scrollTopBtn.id = 'scrollTop';
    scrollTopBtn.className = 'scroll-top';
    document.body.appendChild(scrollTopBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  });

  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Process timeline fill on scroll
  const timeline = document.querySelector('.process-timeline');
  if (timeline) {
    const spark = document.createElement('div');
    spark.className = 'timeline-spark';
    timeline.appendChild(spark);

    window.addEventListener('scroll', () => {
      const rect = timeline.getBoundingClientRect();
      const timelineTop = rect.top;
      const timelineHeight = rect.height;
      const triggerPoint = window.innerHeight * 0.5;
      const progress = Math.min(Math.max((triggerPoint - timelineTop) / timelineHeight, 0), 1);
      timeline.style.setProperty('--timeline-fill', progress);
    });
  }

  // Intersection Observer animations (index only)
  const animated = document.querySelectorAll('.service-card, .process-step, .testimonial-card, .pricing-card');
  if (animated.length) {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);

    animated.forEach((el) => observer.observe(el));
  }

  // FAQ accordion (index only)
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

  // Notification helper (index only)
  const notification = document.getElementById('notification');
  const showNotification = (msg) => {
    if (!notification) return;
    notification.textContent = msg;
    notification.classList.add('show');
    window.setTimeout(() => notification.classList.remove('show'), 5000);
  };

  // Contact form handler (index only; progressive enhancement)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        const response = await fetch(form.getAttribute('action'), { method: 'POST', body: formData });
        const data = await response.json();

        if (data.success) {
          showNotification("Thanks — your enquiry has been sent. We'll get back to you shortly.");
          form.reset();
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