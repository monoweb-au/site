(function() {
    'use strict';

    const sections = [
        {
            id: 'hero',
            name: 'Enhanced Hero Section',
            demo: 'assets/components/hero-section.html',
            description: 'Full-width intro with background image, headline, description, and call-to-action button.'
        },
        {
            id: 'services',
            name: 'Services',
            demo: 'assets/components/services.html',
            description: 'Showcase what you offer with 3-6 service cards, each with icon, title, and description.'
        },
        {
            id: 'about',
            name: 'About / Company Story',
            demo: 'assets/components/about.html',
            description: 'Your story, mission, company history, or what makes you different.'
        },
        {
            id: 'contact',
            name: 'Contact Section',
            demo: 'assets/components/contact.html',
            description: 'Full contact section with form, map, address, and business hours (beyond basic header).'
        },
        {
            id: 'testimonials',
            name: 'Testimonials',
            demo: 'assets/components/testimonials.html',
            description: 'Customer reviews with photos and names (3 reviews in Starter, 6 in Plus).'
        },
        {
            id: 'gallery',
            name: 'Gallery',
            demo: 'assets/components/gallery.html',
            description: 'Photo showcase in a grid layout (5-10 images basic, 20+ extended is addon).'
        },
        {
            id: 'features',
            name: 'Features / Benefits',
            demo: 'assets/components/features.html',
            description: 'Icon grid showing your top benefits and features. Ideal for building credibility and answering "why choose us?"'
        },
        {
            id: 'pricing',
            name: 'Pricing',
            demo: 'assets/components/pricing-table.html',
            description: 'Display your pricing, packages, or services in a clear table format.'
        },
        {
            id: 'team',
            name: 'Team / Meet the Owner',
            demo: 'assets/components/team.html',
            description: 'Staff or owner profiles with photos and bios (1 person spotlight or full team of 3-6 people).'
        },
        {
            id: 'portfolio',
            name: 'Portfolio / Work Examples',
            demo: 'assets/components/portfolio.html',
            description: 'Showcase previous projects or work with images and descriptions (3-6 examples).'
        },
        {
            id: 'menu',
            name: 'Menu List',
            demo: 'assets/components/menu.html',
            description: 'Showcase menu items with descriptions and prices. Great for restaurants, bars and cafes.'
        },
        {
            id: 'events',
            name: 'Events / Calendar',
            demo: 'assets/components/events.html',
            description: 'Showcase upcoming workshops, classes, or special events with dates and registration buttons.'
        },
        {
            id: 'video',
            name: 'Video Showcase',
            demo: 'assets/components/video.html',
            description: 'Embed a YouTube or Vimeo video with supporting text. Great for showcasing your work or story.'
        },
        {
            id: 'faq',
            name: 'FAQ Section',
            demo: 'assets/components/faq.html',
            description: 'Frequently asked questions in an accordion format to address common enquiries.'
        },
        {
            id: 'process',
            name: 'Process / How It Works',
            demo: 'assets/components/process.html',
            description: 'Your workflow or process explained in 3-4 clear steps.'
        },
        {
            id: 'before-after',
            name: 'Before/After Showcase',
            demo: 'assets/components/before-after.html',
            description: 'Interactive slider comparing before and after images (up to 4 sliders).'
        },
        {
            id: 'stats',
            name: 'Stats / Social Proof',
            demo: 'assets/components/stats.html',
            description: 'Numbers that build trust (e.g., years in business, happy customers, projects completed).'
        },
        {
            id: 'featured-products',
            name: 'Featured Products',
            demo: 'assets/components/featured-products.html',
            description: 'Display 3-6 products with images and descriptions (not ecommerce - display only, no shopping cart).'
        },
        {
            id: 'certifications',
            name: 'Certifications / Awards',
            demo: 'assets/components/certifications.html',
            description: 'Display licenses, industry memberships, accreditations, or awards with logos.'
        },
        {
            id: 'timeline',
            name: 'Timeline / History',
            demo: 'assets/components/timeline.html',
            description: 'Tell your brand story chronologically with year badges and milestone descriptions.'
        },
        {
            id: 'service-area',
            name: 'Service Area',
            demo: 'assets/components/service-area.html',
            description: 'Show your coverage area with a map or list of suburbs/regions you serve.'
        },
        {
            id: 'special-offers',
            name: 'Special Offers',
            demo: 'assets/components/special-offers.html',
            description: 'Highlight current promotions, seasonal deals, or limited-time offers.'
        },
        {
            id: 'careers',
            name: 'Careers & Jobs',
            demo: 'assets/components/careers.html',
            description: 'Showcase open positions with job details, requirements, and apply buttons.'
        }
    ];
    
    const styles = `
        .demo-viewer-container {
            width: 100%;
            background: #1f2937;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .demo-viewer-header {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: #111827;
            border-bottom: 1px solid #374151;
        }

        .demo-viewer-select {
            width: 100%;
            max-width: 400px;
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            padding: 12px 18px;
            background: #1f2937;
            color: #ffffff;
            border: 1px solid #374151;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .demo-viewer-select:hover {
            background: #374151;
            border-color: #4b5563;
        }

        .demo-viewer-select:focus {
            outline: none;
            border-color: #60a5fa;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }

        .demo-viewer-description {
            padding: 24px;
            background: #1f2937;
            border-bottom: 1px solid #374151;
            text-align: center;
        }

        .demo-viewer-description p {
            font-family: 'Inter', sans-serif;
            font-size: 1.05rem;
            color: #e5e7eb;
            margin: 0;
            line-height: 1.6;
        }

        .demo-viewer-frame-container {
            position: relative;
            width: 100%;
            height: 60vh;
            max-height: 700px;
            background: #111827;
        }

        .demo-viewer-frame-container iframe {
            width: 125%;
            height: 125%;
            border: none;
            display: block;
            transform: scale(0.8);
            transform-origin: top left;
        } 

        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: none !important;
            align-items: center;
            justify-content: center;
            padding: 100px 30px 60px 30px;
        }

        .demo-modal.active {
            display: flex !important;
        }

        .demo-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            cursor: pointer;
        }

        .demo-modal-content {
            position: relative;
            width: 100%;
            max-width: 1200px;
            max-height: 80dvh;
            background: #1f2937;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            animation: modalSlideUp 0.3s ease-out;
            overflow: hidden;
        }

        @keyframes modalSlideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .demo-modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
            background: rgba(0, 0, 0, 0.5);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            transition: all 0.2s ease;
        }

        .demo-modal-close:hover {
            background: rgba(0, 0, 0, 0.7);
            transform: scale(1.1);
        }

        .demo-modal-close svg {
            stroke: #ffffff;
            stroke-width: 2;
        }

        .demo-modal .demo-viewer-frame-container {
            flex: 1;
            min-height: 0;
            max-height: none;
        }

        @media (max-width: 768px) {
            .demo-viewer-header {
                padding: 12px;
            }

            .demo-viewer-select {
                font-size: 0.9rem;
                padding: 10px 14px;
            }

            .demo-viewer-description {
                padding: 12px 16px;
            }

            .demo-viewer-description p {
                font-size: 0.85rem;
            }

            .demo-viewer-frame-container {
                height: 55dvh;
                max-height: 500px;
            }

            .demo-modal {
                padding: 20px 10px;
            }

            .demo-modal-content {
                max-height: 90dvh;
                max-width: 100%;
            }

            .demo-modal-close {
                top: 12px;
                right: 12px;
                width: 36px;
                height: 36px;
            }
        }

        body.modal-open {
            overflow: hidden;
        }
    `;
    
    let stylesInjected = false;
    function injectStyles() {
        if (stylesInjected) return;
        stylesInjected = true;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    class DemoViewer {
        constructor(containerId) {
            this.containerId = containerId;
            this.currentSection = sections[0];
            this.init();
        }

        init() {
            const container = document.getElementById(this.containerId);
            if (!container) return;

            injectStyles();
            const html = this.generateHTML();
            container.innerHTML = html;

            this.selectElement = container.querySelector('.demo-viewer-select');
            this.descriptionElement = container.querySelector('.demo-viewer-description p');
            this.iframeElement = container.querySelector('.demo-viewer-iframe');

            this.selectElement.addEventListener('change', (e) => this.handleSectionChange(e));
            this.loadSection(this.currentSection);
        }

        generateHTML() {
            const optionsHTML = sections.map(section => 
                `<option value="${section.id}">${section.name}</option>`
            ).join('');

            return `
                <div class="demo-viewer-header">
                    <select class="demo-viewer-select">
                        ${optionsHTML}
                    </select>
                </div>
                <div class="demo-viewer-description">
                    <p></p>
                </div>
                <div class="demo-viewer-frame-container">
                    <iframe class="demo-viewer-iframe" src="" frameborder="0" loading="lazy"></iframe>
                </div>
            `;
        }

        handleSectionChange(e) {
            const sectionId = e.target.value;
            const section = sections.find(s => s.id === sectionId);
            if (section) {
                this.loadSection(section);
                if (typeof gtag === 'function') gtag('event', 'demo_section_change', { section: section.name });
            }
        }

        loadSection(section) {
            this.currentSection = section;
            this.descriptionElement.textContent = section.description;
            this.iframeElement.src = section.demo;
        }
    }

    class DemoModal {
        constructor() {
            this.modal = null;
            this.viewer = null;
            this.init();
        }

        init() {
            const modalHTML = `
                <div id="demoModal" class="demo-modal">
                    <div class="demo-modal-overlay"></div>
                    <div class="demo-modal-content">
                        <button class="demo-modal-close" aria-label="Close demo">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div id="demoModalViewer"></div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            this.modal = document.getElementById('demoModal');
            const overlay = this.modal.querySelector('.demo-modal-overlay');
            const closeBtn = this.modal.querySelector('.demo-modal-close');
            
            overlay.addEventListener('click', () => this.close());
            closeBtn.addEventListener('click', () => this.close());
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.close();
                }
            });

            this.viewer = new DemoViewer('demoModalViewer');
            this.attachTriggers();
        }

        attachTriggers() {
            document.querySelectorAll('[data-demo-modal]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            });
        }

        open() {
            this.modal.classList.add('active');
            document.body.classList.add('modal-open');
            this.viewer.selectElement.value = sections[0].id;
            this.viewer.loadSection(sections[0]);
        }

        close() {
            this.modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            setTimeout(() => {
                this.viewer.iframeElement.src = '';
            }, 300);
        }
    }

    function initDemoViewer() {
        const embeddedContainer = document.getElementById('demoViewerEmbed');
        if (embeddedContainer) {
            new DemoViewer('demoViewerEmbed');
        }

        const modalTrigger = document.querySelector('[data-demo-modal]');
        if (modalTrigger) {
            new DemoModal();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDemoViewer);
    } else {
        initDemoViewer();
    }
})();