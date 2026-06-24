document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Logic
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and x
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ==========================================
    // 2. Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 3. Scroll Spy (Active Menu Indicator)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.nav-links a');

    const scrollSpy = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy, { passive: true });
    scrollSpy(); // Run on load too

    // ==========================================
    // 4. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // 5. Hero Mouse Parallax (Interactive Background)
    // ==========================================
    const hero = document.getElementById('inicio');
    const shapeContainers = document.querySelectorAll('.parallax-container');
    const glows = [document.querySelector('.hero-glow-1'), document.querySelector('.hero-glow-2')];

    if (hero && window.matchMedia('(min-width: 769px)').matches) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;

            // Move the containers slightly to offset the CSS floating animation inside
            shapeContainers.forEach((container, index) => {
                const speed = (index + 1) * 35; // Different depth weights
                const x = mouseX * speed;
                const y = mouseY * speed;
                container.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });

            // Move the glowing backdrops slightly opposite
            glows.forEach((glow, index) => {
                if (glow) {
                    const speed = (index + 1) * -45;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                }
            });
        }, { passive: true });
    }

    // ==========================================
    // 6. Bento Card Cursor Spotlight Glow Effect
    // ==========================================
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }, { passive: true });
    });

    // ==========================================
    // 7. Interactive Magnetic Elements
    // ==========================================
    const magneticElements = document.querySelectorAll('.btn, .footer-socials a, .mobile-toggle');
    if (window.matchMedia('(min-width: 769px)').matches) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Pull element slightly towards mouse coordinates
                el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0) scale(1.02)`;
                if (el.classList.contains('btn-primary')) {
                    el.style.boxShadow = `0 8px 30px rgba(41, 182, 232, 0.7)`;
                }
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                // Reset positions smoothly with CSS transition
                el.style.transform = 'translate3d(0, 0, 0) scale(1)';
                if (el.classList.contains('btn-primary')) {
                    el.style.boxShadow = '';
                }
            });
        });
    }

    // ==========================================
    // 8. Header Dinâmico (Transparent -> Dark Solid)
    // ==========================================
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.parallax-hero');

    const updateHeader = () => {
        if (!heroSection) return;
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (heroBottom > 0) {
            header.classList.remove('header-solid');
        } else {
            header.classList.add('header-solid');
        }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

});
