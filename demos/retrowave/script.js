/* ============================================================
   NEON WAVE — RETROWAVE INTERACTIVE ENGINE
   ============================================================ */

(function () {
    'use strict';

    // ---- STAR FIELD GENERATOR ----
    function createStars() {
        const container = document.getElementById('stars');
        if (!container) return;

        const count = 200;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2 + 0.5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 4;
            const brightness = Math.random() * 0.6 + 0.4;

            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                background: rgba(255, 255, 255, ${brightness});
                border-radius: 50%;
                animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, ${brightness * 0.3});
            `;
            fragment.appendChild(star);
        }

        // Add a few colored stars for that synthwave feel
        const colors = [
            { color: '255, 42, 109', shadow: 'rgba(255, 42, 109, 0.5)' },  // pink
            { color: '5, 217, 232', shadow: 'rgba(5, 217, 232, 0.5)' },    // cyan
            { color: '123, 47, 247', shadow: 'rgba(123, 47, 247, 0.5)' },  // purple
        ];

        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            const c = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 60; // Keep colored stars in upper portion
            const duration = Math.random() * 5 + 3;
            const delay = Math.random() * 5;

            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                background: rgba(${c.color}, 0.8);
                border-radius: 50%;
                animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite;
                box-shadow: 0 0 ${size * 4}px ${c.shadow};
            `;
            fragment.appendChild(star);
        }

        container.appendChild(fragment);

        // Inject the twinkle keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
            }
        `;
        document.head.appendChild(style);
    }


    // ---- NAVIGATION ----
    function initNav() {
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('navToggle');
        const links = document.getElementById('navLinks');

        // Scroll behavior
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            lastScroll = current;
        }, { passive: true });

        // Mobile toggle
        if (toggle && links) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                links.classList.toggle('open');
            });

            // Close on link click
            links.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    links.classList.remove('open');
                });
            });
        }

        // Active link tracking
        const sections = document.querySelectorAll('section[id]');
        const navAnchors = document.querySelectorAll('.nav-links a');

        function setActiveLink() {
            const scrollPos = window.scrollY + window.innerHeight / 3;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navAnchors.forEach(a => a.classList.remove('active'));
                    const active = document.querySelector(`.nav-links a[href="#${id}"]`);
                    if (active) active.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', setActiveLink, { passive: true });
    }


    // ---- CURSOR GLOW ----
    function initCursorGlow() {
        const glow = document.getElementById('cursorGlow');
        if (!glow || window.innerWidth < 768) return;

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function animate() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    }


    // ---- SCROLL REVEAL ----
    function initScrollReveal() {
        // Add reveal class to elements
        const revealSelectors = [
            '.section-header',
            '.about-image',
            '.about-content',
            '.service-card',
            '.portfolio-item',
            '.testimonial-card',
            '.contact-info',
            '.contact-form',
        ];

        revealSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add('reveal');
                if (i < 5) el.classList.add(`reveal-delay-${Math.min(i + 1, 4)}`);
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }


    // ---- COUNTER ANIMATION ----
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const ease = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * ease);

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(update);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }


    // ---- CARD TILT EFFECT ----
    function initTilt() {
        if (window.innerWidth < 768) return;

        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
                card.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }


    // ---- SMOOTH SCROLL ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const y = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        });
    }


    // ---- FORM HANDLING ----
    function initForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.querySelector('.btn-text').textContent;

            btn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            btn.disabled = true;
            btn.style.opacity = '0.6';

            // Simulate transmission
            setTimeout(() => {
                btn.querySelector('.btn-text').textContent = 'TRANSMISSION COMPLETE ✓';
                btn.style.opacity = '1';
                btn.style.background = 'linear-gradient(135deg, #00ff88, #05d9e8)';

                setTimeout(() => {
                    form.reset();
                    btn.querySelector('.btn-text').textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }


    // ---- PARALLAX EFFECT ----
    function initParallax() {
        const sun = document.querySelector('.retro-sun');
        const mountains = document.querySelector('.mountains');
        const heroContent = document.querySelector('.hero-content');
        const gridFloor = document.querySelector('.hero-grid-floor');

        if (!sun) return;

        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            const heroHeight = window.innerHeight;

            if (scroll < heroHeight) {
                const ratio = scroll / heroHeight;
                sun.style.transform = `translateX(-50%) translateY(${scroll * 0.3}px)`;
                sun.style.opacity = 1 - ratio * 1.2;
                mountains.style.transform = `translateY(${scroll * 0.15}px)`;
                heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
                heroContent.style.opacity = 1 - ratio * 1.5;
                gridFloor.style.opacity = 1 - ratio * 1.5;
            }
        }, { passive: true });
    }


    // ---- VHS RANDOM GLITCH ----
    function initVHSGlitch() {
        const overlay = document.querySelector('.vhs-overlay');
        if (!overlay) return;

        // Random chromatic aberration glitch on hero title
        const title = document.querySelector('.hero-title');
        if (!title) return;

        setInterval(() => {
            if (Math.random() > 0.92) {
                title.style.textShadow = `
                    ${Math.random() * 6 - 3}px ${Math.random() * 4 - 2}px 0 rgba(5, 217, 232, 0.7),
                    ${Math.random() * -6 + 3}px ${Math.random() * 4 - 2}px 0 rgba(255, 42, 109, 0.7)
                `;
                setTimeout(() => {
                    title.style.textShadow = '';
                }, 100 + Math.random() * 200);
            }
        }, 200);

        // Occasional horizontal displacement (VHS tracking error)
        setInterval(() => {
            if (Math.random() > 0.95) {
                const el = document.querySelector('.hero-content');
                if (el) {
                    const offset = (Math.random() * 6 - 3);
                    el.style.transform = `translateX(${offset}px)`;
                    setTimeout(() => {
                        el.style.transform = '';
                    }, 50 + Math.random() * 100);
                }
            }
        }, 300);
    }


    // ---- TYPING EFFECT ON SECTION NUMBERS ----
    function initTypingNumbers() {
        const numbers = document.querySelectorAll('.section-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    el.textContent = '';
                    el.style.borderRight = '2px solid var(--hot-pink)';

                    let i = 0;
                    const interval = setInterval(() => {
                        el.textContent += text[i];
                        i++;
                        if (i >= text.length) {
                            clearInterval(interval);
                            setTimeout(() => {
                                el.style.borderRight = 'none';
                            }, 500);
                        }
                    }, 100);

                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.8 });

        numbers.forEach(n => observer.observe(n));
    }


    // ---- SHOOTING STARS ----
    function initShootingStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;

        function createShootingStar() {
            const star = document.createElement('div');
            const startX = Math.random() * 100;
            const startY = Math.random() * 40;
            const length = Math.random() * 100 + 50;
            const angle = Math.random() * 20 + 20;

            star.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                width: ${length}px;
                height: 1px;
                background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
                transform: rotate(${angle}deg);
                animation: shootingStar 1s linear forwards;
                pointer-events: none;
            `;

            starsContainer.appendChild(star);
            setTimeout(() => star.remove(), 1000);
        }

        // Inject shooting star animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shootingStar {
                0%   { opacity: 1; transform: rotate(25deg) translateX(0); }
                100% { opacity: 0; transform: rotate(25deg) translateX(300px); }
            }
        `;
        document.head.appendChild(style);

        setInterval(() => {
            if (Math.random() > 0.6) createShootingStar();
        }, 3000);
    }


    // ---- INITIALIZE EVERYTHING ----
    document.addEventListener('DOMContentLoaded', () => {
        createStars();
        initNav();
        initCursorGlow();
        initScrollReveal();
        initCounters();
        initTilt();
        initSmoothScroll();
        initForm();
        initParallax();
        initVHSGlitch();
        initTypingNumbers();
        initShootingStars();
    });

})();
