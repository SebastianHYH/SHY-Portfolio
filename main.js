// Portfolio interactions — vanilla JS, no dependencies.
(() => {
    'use strict';

    /* Current year in footer */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Mobile nav toggle */
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-nav');

    if (toggle && nav) {
        const setOpen = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            nav.classList.toggle('open', open);
        };

        toggle.addEventListener('click', () => {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // Close the menu after picking a link
        nav.querySelectorAll('a').forEach((link) =>
            link.addEventListener('click', () => setOpen(false))
        );

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setOpen(false);
        });
    }

    /* Scroll-reveal via IntersectionObserver */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    // Stagger project cards
    document.querySelectorAll('.projects-grid .project').forEach((card, i) => {
        card.style.setProperty('--i', i);
    });

    /* Scroll-spy: highlight the active nav link */
    const links = Array.from(document.querySelectorAll('.sidebar-links a'));
    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach((l) =>
                        l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
                    );
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach((s) => spy.observe(s));
    }
})();
