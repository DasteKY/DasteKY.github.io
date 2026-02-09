/* ===================================
   Gerardo Dasti — Portfolio Script
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Typing Effect ──────────────────────────────
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Full Stack Developer',
        'React & Next.js Enthusiast',
        'Node.js Backend Builder',
        'Laravel Artisan',
        'UI/UX Thinker'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ── Navbar Scroll Effect ───────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ── Mobile Nav Toggle ──────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ── Scroll Reveal Animation ────────────────────
    const revealElements = document.querySelectorAll('.reveal');
    const revealCards = document.querySelectorAll('.reveal-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Staggered card reveal
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all sibling cards in the same grid
                const grid = entry.target.closest('.skills-grid');
                if (grid) {
                    const cards = grid.querySelectorAll('.reveal-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                    // Unobserve all cards in this grid
                    cards.forEach(card => cardObserver.unobserve(card));
                } else {
                    entry.target.classList.add('visible');
                    cardObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealCards.forEach(el => cardObserver.observe(el));

    // ── Skill Progress Bars ────────────────────────
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ── Active Nav Link Highlight ──────────────────
    const sections = document.querySelectorAll('section[id]');

    const navHighlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (navLink) {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => navHighlightObserver.observe(section));

    // ── Smooth scroll for nav links ────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Parallax subtle on hero orbs ───────────────
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    }, { passive: true });

    // ── Console Easter Egg ─────────────────────────
    console.log(
        '%c👋 Hey! Like what you see?',
        'font-size: 18px; font-weight: bold; color: #06b6d4;'
    );
    console.log(
        '%cBuilt with ❤️ by Gerardo Dasti',
        'font-size: 14px; color: #8b5cf6;'
    );
});
