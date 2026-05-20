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
    // 3. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // 4. Video Parallax & Smooth Loop Logic
    // ==========================================
    const video = document.getElementById('hero-video');
    if (video) {
        // Parallax apenas em desktop — mobile não suporta bem o transform em vídeos
        const isDesktop = window.matchMedia('(min-width: 769px)');

        if (isDesktop.matches) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                video.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }, { passive: true });
        }

        // Smooth fade out before looping to avoid hard cuts
        video.addEventListener('timeupdate', () => {
            const timeRemaining = video.duration - video.currentTime;
            if (timeRemaining <= 1.0 && timeRemaining > 0) {
                video.style.opacity = '0';
            } else if (video.currentTime <= 1.0) {
                video.style.opacity = '1';
            }
        });
    }

    // ==========================================
    // 5. Header Dinâmico (Transparente sobre vídeo / Azul sólido após)
    // ==========================================
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.parallax-hero');

    const updateHeader = () => {
        if (!heroSection) return;
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (heroBottom > 0) {
            // Ainda dentro da área do vídeo: transparente
            header.classList.remove('header-solid');
        } else {
            // Passou o vídeo: azul sólido
            header.classList.add('header-solid');
        }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Roda ao carregar também

});
