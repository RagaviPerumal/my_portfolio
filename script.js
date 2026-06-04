document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 0. Mobile layout fallback (if responsive.css is cached/old)
    // -------------------------------------------------------------
    function applyMobileLayout() {
        const isMobile = window.innerWidth <= 900;
        document.documentElement.classList.toggle('is-mobile', isMobile);

        const hero = document.querySelector('.hero');
        const heroGrid = document.querySelector('.hero-grid');
        const heroText = document.querySelector('.hero-text');
        const typingWrapper = document.querySelector('.typing-wrapper');
        const typingText = document.querySelector('.typing-text');

        const clear = (el) => el && el.removeAttribute('style');

        if (isMobile) {
            if (hero) {
                hero.style.paddingTop = 'calc(5.25rem + env(safe-area-inset-top, 0px))';
                hero.style.boxSizing = 'border-box';
            }
            [heroGrid, heroText, typingWrapper, typingText].forEach((el) => {
                if (!el) return;
                el.style.maxWidth = '100%';
                el.style.width = '100%';
                el.style.boxSizing = 'border-box';
            });
            if (typingText) {
                typingText.style.display = 'block';
                typingText.style.overflowWrap = 'break-word';
            }
            if (heroText) heroText.style.textAlign = 'center';
        } else {
            [hero, heroGrid, heroText, typingWrapper, typingText].forEach(clear);
        }
    }

    applyMobileLayout();
    window.addEventListener('resize', applyMobileLayout);

    // -------------------------------------------------------------
    // 1. Light/Dark Mode Toggle Switch Logic
    // -------------------------------------------------------------
    const modeToggle = document.getElementById('modeToggle');
    const modeButtons = document.querySelectorAll('.mode-btn');

    function setTheme(mode) {
        modeButtons.forEach((b) => {
            b.classList.toggle('active', b.getAttribute('data-mode') === mode);
        });

        if (mode === 'light') {
            document.documentElement.classList.add('light-theme');
            modeToggle.classList.remove('dark-active');
        } else {
            document.documentElement.classList.remove('light-theme');
            modeToggle.classList.add('dark-active');
        }

        if (typeof renderPods === 'function') {
            renderPods();
        }
    }

    function isPointerOnToggle(clientX, clientY) {
        const rect = modeToggle.getBoundingClientRect();
        const pad = 18;
        return (
            clientX >= rect.left - pad &&
            clientX <= rect.right + pad &&
            clientY >= rect.top - pad &&
            clientY <= rect.bottom + pad
        );
    }

    function handleTogglePointer(e) {
        if (!isPointerOnToggle(e.clientX, e.clientY)) return;
        const isLight = document.documentElement.classList.contains('light-theme');
        setTheme(isLight ? 'dark' : 'light');
    }

    document.addEventListener('pointerdown', handleTogglePointer, true);

    // -------------------------------------------------------------
    // 2. Custom Cursor (yellow) — hide system hand pointer everywhere
    // -------------------------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const INTERACTIVE_SELECTOR = [
        'a[href]',
        'button',
        '[role="button"]',
        'label',
        'input',
        'select',
        'textarea',
        'summary',
        '.nav-link',
        '.navbar-brand',
        '.navbar-resume-btn',
        '.mode-toggle',
        '.mode-btn',
        '.lab-zone',
        '.lab-zone-head',
        '.lab-detail-link',
        '.timeline-item',
        '.timeline-content',
        '.tech-tag',
        '.skill-card-tilt',
        '.spotify-nav-btn',
        '.thulir-play-overlay',
        '.thulir-figma-btn',
        '.thulir-figma-fallback',
        '.poster-frame',
        '.site-footer-email',
        '.site-footer-resume-btn',
        '.site-footer-links a',
        '.note-card',
        '.btn-primary',
        '.btn-secondary',
        '.btn-copy-email',
        '[data-lab-node]',
    ].join(', ');

    function isInteractiveTarget(el) {
        return !!(el && (el.matches(INTERACTIVE_SELECTOR) || el.closest(INTERACTIVE_SELECTOR)));
    }

    const useCustomCursor = cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (useCustomCursor) {
        document.documentElement.classList.add('custom-cursor-active');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            const target = document.elementFromPoint(e.clientX, e.clientY);
            cursor.classList.toggle('hover', isInteractiveTarget(target));
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // Keyboard Typing Animation
    function initTypewriterEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;
        
        const fullText = typingText.textContent;
        typingText.textContent = '';
        const typedContent = document.createElement('span');
        const caret = document.createElement('span');
        caret.className = 'typing-caret';
        typingText.appendChild(typedContent);
        typingText.appendChild(caret);
        let index = 0;
        const typingSpeed = 50; // milliseconds per character
        
        function typeCharacter() {
            if (index < fullText.length) {
                typedContent.textContent += fullText[index];
                index++;
                setTimeout(typeCharacter, typingSpeed);
            }
        }
        
        // Ensure cursor is visible from the start
        typingText.style.opacity = '1';
        typeCharacter();
    }
    
    initTypewriterEffect();

    const avatarCard = document.querySelector('.avatar-card');
    const avatarState = { x: 0, y: 0 };
    const avatarLimit = 8;

    function updateAvatarGaze() {
        if (!avatarCard) return;
        avatarCard.style.setProperty('--eye-x', `${avatarState.x}px`);
        avatarCard.style.setProperty('--eye-y', `${avatarState.y}px`);
        avatarCard.style.setProperty('--brow-x', `${avatarState.x * 0.7}px`);
        avatarCard.style.setProperty('--brow-y', `${Math.min(0, avatarState.y * 0.4)}px`);
        avatarCard.style.setProperty('--brow-rot', `${avatarState.x * 1.5}deg`);
    }

    window.addEventListener('keydown', (event) => {
        const key = event.key;
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) return;
        event.preventDefault();
        switch (key) {
            case 'ArrowLeft':
                avatarState.x = Math.max(-avatarLimit, avatarState.x - 3);
                break;
            case 'ArrowRight':
                avatarState.x = Math.min(avatarLimit, avatarState.x + 3);
                break;
            case 'ArrowUp':
                avatarState.y = Math.max(-avatarLimit, avatarState.y - 3);
                break;
            case 'ArrowDown':
                avatarState.y = Math.min(avatarLimit, avatarState.y + 3);
                break;
        }
        updateAvatarGaze();
    });

    window.addEventListener('keyup', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        avatarState.x = 0;
        avatarState.y = 0;
        updateAvatarGaze();
    });

    // -------------------------------------------------------------
    // 3. Canvas Engine: Cursor Trail and Confetti Bursts
    // -------------------------------------------------------------
    const canvasOverlay = document.getElementById('canvas-overlay');
    const ctxOverlay = canvasOverlay.getContext('2d');
    
    let mouse = { x: -100, y: -100, active: false };
    let particles = [];
    
    function resizeCanvas() {
        canvasOverlay.width = window.innerWidth;
        canvasOverlay.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        // Particle trail disabled
    });

    document.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    class Particle {
        constructor(x, y, type = 'trail', color = null) {
            this.x = x;
            this.y = y;
            this.type = type;
            
            // Fetch current CSS variable color
            const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            this.color = color || accent;
            
            if (this.type === 'trail') {
                this.size = Math.random() * 4 + 1.5;
                this.speedX = (Math.random() - 0.5) * 1;
                this.speedY = (Math.random() - 0.5) * 1;
                this.life = 1; // opacity decays
                this.decay = Math.random() * 0.03 + 0.015;
            } else if (this.type === 'confetti') {
                this.size = Math.random() * 6 + 3;
                this.speedX = (Math.random() - 0.5) * 8;
                this.speedY = (Math.random() - 0.5) * 8 - 3; // explosive upward bias
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.01;
                this.gravity = 0.15;
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.type === 'confetti') {
                this.speedY += this.gravity; // Gravity pull on confetti
            }
            this.life -= this.decay;
        }

        draw() {
            ctxOverlay.save();
            ctxOverlay.globalAlpha = Math.max(this.life, 0);
            ctxOverlay.shadowBlur = this.type === 'trail' ? 5 : 10;
            ctxOverlay.shadowColor = this.color;
            ctxOverlay.fillStyle = this.color;
            ctxOverlay.beginPath();
            ctxOverlay.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctxOverlay.fill();
            ctxOverlay.restore();
        }
    }

    function createConfettiBurst(x, y) {
        const colors = [
            getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim(),
            '#818cf8',
            '#c084fc',
            '#10b981',
            '#f59e0b'
        ];
        for (let i = 0; i < 45; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, 'confetti', randomColor));
        }
    }

    function animateOverlay() {
        ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }
        requestAnimationFrame(animateOverlay);
    }
    animateOverlay();

    // -------------------------------------------------------------
    // 4. Scroll progress / Nav indicators / Reveal triggers
    // -------------------------------------------------------------
    const scrollBar = document.getElementById('scrollBar');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const scrollPercentage = (window.scrollY / totalHeight) * 100;
            scrollBar.style.width = scrollPercentage + '%';
        }
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // About paragraphs: split into visual lines for staggered reveal
    function initAboutLineReveal() {
        const grid = document.querySelector('.about-grid');
        if (!grid) return;

        const paragraphs = grid.querySelectorAll('.about-para');
        if (!paragraphs.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        function splitParagraph(paragraph) {
            const original = (paragraph.dataset.originalText || paragraph.textContent).trim();
            paragraph.dataset.originalText = original;

            const words = original.split(/\s+/).filter(Boolean);
            paragraph.replaceChildren();

            const measureSpans = words.map((word, i) => {
                const span = document.createElement('span');
                span.className = 'about-line-measure';
                span.textContent = word + (i < words.length - 1 ? ' ' : '');
                paragraph.appendChild(span);
                return span;
            });

            const lineTexts = [];
            let currentTop = null;
            let currentText = '';

            measureSpans.forEach((span) => {
                const top = span.offsetTop;
                if (currentTop !== null && top !== currentTop) {
                    lineTexts.push(currentText.trim());
                    currentText = '';
                }
                currentTop = top;
                currentText += span.textContent;
            });
            if (currentText.trim()) lineTexts.push(currentText.trim());

            paragraph.replaceChildren();
            lineTexts.forEach((text) => {
                const line = document.createElement('span');
                line.className = 'about-line';
                line.textContent = text;
                paragraph.appendChild(line);
            });
        }

        function buildLines() {
            const wasActive = grid.classList.contains('active');
            paragraphs.forEach(splitParagraph);

            let index = 0;
            grid.querySelectorAll('.about-line').forEach((line) => {
                line.style.setProperty('--line-i', index++);
            });
            grid.style.setProperty('--about-line-count', index);

            if (wasActive) {
                grid.querySelectorAll('.about-line').forEach((line) => {
                    line.style.opacity = '1';
                    line.style.transform = 'none';
                });
            }
        }

        buildLines();

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(buildLines);
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildLines, 160);
        });
    }

    initAboutLineReveal();

    const reveals = document.querySelectorAll('.reveal');
    const isNarrowViewport = () => window.innerWidth <= 900;

    function activateReveal(el) {
        el.classList.add('active');
    }

    /* Playground must show on mobile — scroll reveal often never fires */
    function ensurePlaygroundVisible() {
        document.querySelectorAll('.playground.lab-os .reveal').forEach(activateReveal);
    }

    if (isNarrowViewport()) {
        ensurePlaygroundVisible();
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateReveal(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: isNarrowViewport() ? 0.02 : 0.1,
        rootMargin: isNarrowViewport() ? '0px 0px 10% 0px' : '0px 0px -50px 0px'
    });

    reveals.forEach(element => revealObserver.observe(element));

    window.addEventListener('resize', () => {
        if (isNarrowViewport()) ensurePlaygroundVisible();
    });

    /* Experience cards: logo reveal on touch (mobile only; desktop keeps :hover) */
    function initTimelineLogoTouch() {
        const cards = document.querySelectorAll('.timeline-content.timeline-card');
        if (!cards.length) return;

        let activeCard = null;

        function clearActive() {
            if (activeCard) activeCard.classList.remove('is-logo-active');
            activeCard = null;
        }

        function setActive(card) {
            if (!isNarrowViewport()) return;
            if (activeCard && activeCard !== card) activeCard.classList.remove('is-logo-active');
            activeCard = card;
            card.classList.add('is-logo-active');
        }

        function onTouch(e) {
            if (!isNarrowViewport()) return;
            const touch = e.touches[0];
            if (!touch) return;
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            const card = target && target.closest('.timeline-content.timeline-card');
            if (card) setActive(card);
            else clearActive();
        }

        cards.forEach((card) => {
            card.addEventListener('touchstart', onTouch, { passive: true });
            card.addEventListener('touchmove', onTouch, { passive: true });
        });

        document.addEventListener('touchend', () => {
            if (isNarrowViewport()) clearActive();
        }, { passive: true });
        document.addEventListener('touchcancel', clearActive, { passive: true });

        window.addEventListener('resize', () => {
            if (!isNarrowViewport()) clearActive();
        });
    }

    initTimelineLogoTouch();

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    function animateStats(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseFloat(target.getAttribute('data-target'));
                const decimals = parseInt(target.getAttribute('data-decimals')) || 0;
                const prefix = target.getAttribute('data-prefix') || '';
                const suffix = target.getAttribute('data-suffix') || '';
                const duration = 2000;
                let startTime = null;

                function countUp(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    const currentVal = progress * endVal;
                    target.textContent = prefix + currentVal.toFixed(decimals) + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(countUp);
                    } else {
                        target.textContent = prefix + endVal.toFixed(decimals) + suffix;
                    }
                }
                requestAnimationFrame(countUp);
                observer.unobserve(target);
            }
        });
    }

    const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
    stats.forEach(stat => statsObserver.observe(stat));

    // About heading: cycle Innovation. → Creation. → Systems. → Scale.
    function initAboutInnovationCycle() {
        const wordEl = document.querySelector('.about-innovation-word');
        const aboutGrid = document.querySelector('.about-grid');
        if (!wordEl || !aboutGrid) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const words = ['Innovation.', 'Creation.', 'Systems.', 'Scale.'];
        const HOLD_MS = 2000;
        const TRANSITION_MS = 650;
        let index = 0;
        let holdTimer = null;
        let transitionTimer = null;

        function clearTimers() {
            if (holdTimer) clearTimeout(holdTimer);
            if (transitionTimer) clearTimeout(transitionTimer);
            holdTimer = null;
            transitionTimer = null;
        }

        function scheduleHold() {
            holdTimer = setTimeout(runTransition, HOLD_MS);
        }

        function runTransition() {
            wordEl.classList.add('is-exiting');
            transitionTimer = setTimeout(() => {
                index = (index + 1) % words.length;
                wordEl.textContent = words[index];
                wordEl.classList.remove('is-exiting');
                wordEl.classList.add('is-entering');
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        wordEl.classList.remove('is-entering');
                        scheduleHold();
                    });
                });
            }, TRANSITION_MS);
        }

        function startCycle() {
            clearTimers();
            index = 0;
            wordEl.textContent = words[0];
            scheduleHold();
        }

        if (aboutGrid.classList.contains('active')) {
            startCycle();
        } else {
            const revealObserver = new MutationObserver(() => {
                if (aboutGrid.classList.contains('active')) {
                    revealObserver.disconnect();
                    startCycle();
                }
            });
            revealObserver.observe(aboutGrid, { attributes: true, attributeFilter: ['class'] });
        }
    }

    initAboutInnovationCycle();

    // About card: glow + subtle mouse-tilt depth (max 2deg X, 3deg Y)
    function initAboutProximityGlow() {
        const card = document.querySelector('.about-grid');
        if (!card) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let glowRaf = null;
        const MAX_ROTATE_X = 2;
        const MAX_ROTATE_Y = 3;

        function setCardInteraction(clientX, clientY) {
            const rect = card.getBoundingClientRect();
            const xPct = ((clientX - rect.left) / rect.width) * 100;
            const yPct = ((clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--glow-x', `${xPct}%`);
            card.style.setProperty('--glow-y', `${yPct}%`);

            const xNorm = (clientX - rect.left) / rect.width - 0.5;
            const yNorm = (clientY - rect.top) / rect.height - 0.5;
            const rotateY = Math.max(-MAX_ROTATE_Y, Math.min(MAX_ROTATE_Y, xNorm * MAX_ROTATE_Y * 2));
            const rotateX = Math.max(-MAX_ROTATE_X, Math.min(MAX_ROTATE_X, -yNorm * MAX_ROTATE_X * 2));
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        card.addEventListener('mouseenter', (e) => {
            card.classList.add('is-glow-active');
            card.style.transition = 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)';
            setCardInteraction(e.clientX, e.clientY);
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-glow-active');
            card.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.transform = '';
            if (glowRaf) cancelAnimationFrame(glowRaf);
            glowRaf = null;
        });

        card.addEventListener('mousemove', (e) => {
            if (glowRaf) cancelAnimationFrame(glowRaf);
            glowRaf = requestAnimationFrame(() => {
                setCardInteraction(e.clientX, e.clientY);
                glowRaf = null;
            });
        });
    }

    initAboutProximityGlow();

    // Technical Arsenal — 3D tilt skill cards (desktop only)
    function initSkillCardTilt() {
        const cards = document.querySelectorAll('.skill-card-tilt');
        if (!cards.length) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

        const MAX_ROTATE = 5;
        const HOVER_SCALE = 1.03;
        const GLOW_ON = 1;
        const GLOW_OFF = 0;

        cards.forEach((card) => {
            let tiltRaf = null;
            let pending = null;

            function applyTilt(clientX, clientY) {
                const rect = card.getBoundingClientRect();
                const xPct = ((clientX - rect.left) / rect.width) * 100;
                const yPct = ((clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--glow-x', `${xPct}%`);
                card.style.setProperty('--glow-y', `${yPct}%`);

                const xNorm = (clientX - rect.left) / rect.width - 0.5;
                const yNorm = (clientY - rect.top) / rect.height - 0.5;
                const rotateY = Math.max(-MAX_ROTATE, Math.min(MAX_ROTATE, xNorm * MAX_ROTATE * 2));
                const rotateX = Math.max(-MAX_ROTATE, Math.min(MAX_ROTATE, -yNorm * MAX_ROTATE * 2));
                card.style.transform = `scale(${HOVER_SCALE}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }

            function scheduleTilt(clientX, clientY) {
                pending = { clientX, clientY };
                if (tiltRaf) return;
                tiltRaf = requestAnimationFrame(() => {
                    if (pending) applyTilt(pending.clientX, pending.clientY);
                    pending = null;
                    tiltRaf = null;
                });
            }

            card.addEventListener('mouseenter', (e) => {
                card.classList.add('is-tilt-active');
                card.style.setProperty('--glow-strength', String(GLOW_ON));
                card.style.transition =
                    'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, border-color 0.45s ease';
                scheduleTilt(e.clientX, e.clientY);
            });

            card.addEventListener('mousemove', (e) => scheduleTilt(e.clientX, e.clientY));

            card.addEventListener('mouseleave', () => {
                card.classList.remove('is-tilt-active');
                card.style.setProperty('--glow-strength', String(GLOW_OFF));
                card.style.transition =
                    'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease, border-color 0.45s ease';
                card.style.transform = '';
                if (tiltRaf) cancelAnimationFrame(tiltRaf);
                tiltRaf = null;
                pending = null;
            });
        });
    }

    initSkillCardTilt();

    function initSkillsHeaderParallax() {
        const section = document.getElementById('skills');
        const header = document.getElementById('skillsHeaderParallax');
        if (!section || !header) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

        const MAX_ROTATE_X = 3;
        const MAX_ROTATE_Y = 4;
        const MAX_SHIFT = 7;

        let parallaxRaf = null;
        let pending = null;

        function applyParallax(clientX, clientY) {
            const rect = section.getBoundingClientRect();
            const xNorm = (clientX - rect.left) / rect.width - 0.5;
            const yNorm = (clientY - rect.top) / rect.height - 0.5;

            const rotateY = Math.max(-MAX_ROTATE_Y, Math.min(MAX_ROTATE_Y, xNorm * MAX_ROTATE_Y * 2));
            const rotateX = Math.max(-MAX_ROTATE_X, Math.min(MAX_ROTATE_X, -yNorm * MAX_ROTATE_X * 2));
            const shiftX = xNorm * MAX_SHIFT * 2;
            const shiftY = yNorm * MAX_SHIFT * 2;

            header.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            section.style.setProperty('--title-shift-x', `${shiftX}px`);
            section.style.setProperty('--title-shift-y', `${shiftY}px`);
        }

        function scheduleParallax(clientX, clientY) {
            pending = { clientX, clientY };
            if (parallaxRaf) return;
            parallaxRaf = requestAnimationFrame(() => {
                if (pending) applyParallax(pending.clientX, pending.clientY);
                pending = null;
                parallaxRaf = null;
            });
        }

        section.addEventListener('mouseenter', (e) => {
            section.classList.add('is-header-active');
            header.style.transition = 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
            scheduleParallax(e.clientX, e.clientY);
        });

        section.addEventListener('mousemove', (e) => scheduleParallax(e.clientX, e.clientY));

        section.addEventListener('mouseleave', () => {
            section.classList.remove('is-header-active');
            header.style.transition = 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)';
            header.style.transform = '';
            section.style.setProperty('--title-shift-x', '0px');
            section.style.setProperty('--title-shift-y', '0px');
            if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
            parallaxRaf = null;
            pending = null;
        });
    }

    initSkillsHeaderParallax();

    // Navigation highlight sync
    const sections = document.querySelectorAll('section, main > div');
    const navLinks = document.querySelectorAll('.nav-link');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -20% 0px' });

    sections.forEach(sec => {
        if (sec.getAttribute('id')) navObserver.observe(sec);
    });

    // Copy to clipboard with confetti trigger
    const copyEmailButtons = document.querySelectorAll('.btn-copy-email');
    copyEmailButtons.forEach(button => {
        const tooltip = button.querySelector('.tooltip');
        const originalTooltipText = tooltip.textContent;
        const email = button.getAttribute('data-email');

        button.addEventListener('click', (e) => {
            navigator.clipboard.writeText(email).then(() => {
                button.classList.add('copied');
                tooltip.textContent = 'Copied!';
                
                // Confetti explosion from button center
                const rect = button.getBoundingClientRect();
                createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
                
                setTimeout(() => {
                    button.classList.remove('copied');
                    tooltip.textContent = originalTooltipText;
                }, 2000);
            }).catch(err => console.error(err));
        });
    });

    // -------------------------------------------------------------
    // 5. Digital Laboratory — interactive workspace
    // -------------------------------------------------------------
    function initLabDashboard() {
        const dashboard = document.querySelector('.lab-dashboard');
        const networkSvg = document.getElementById('labNetwork');
        const networkGroup = document.getElementById('labNetworkLines');
        if (!dashboard) return;

        function drawNetworkLines() {
            if (!networkSvg || !networkGroup || window.matchMedia('(max-width: 960px)').matches) {
                if (networkGroup) networkGroup.innerHTML = '';
                return;
            }

            const dashRect = dashboard.getBoundingClientRect();
            const zoneIds = ['cloud', 'design', 'innovation'];
            const points = {};

            zoneIds.forEach((id) => {
                const el = dashboard.querySelector(`[data-lab-node="${id}"]`);
                if (!el) return;
                const r = el.getBoundingClientRect();
                points[id] = {
                    x: r.left + r.width / 2 - dashRect.left,
                    y: r.top + 24 - dashRect.top,
                };
            });

            const links = [['cloud', 'design'], ['design', 'innovation'], ['cloud', 'innovation']];
            networkGroup.innerHTML = '';
            networkSvg.setAttribute('viewBox', `0 0 ${dashRect.width} ${dashRect.height}`);

            links.forEach(([a, b], i) => {
                if (!points[a] || !points[b]) return;
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const mx = (points[a].x + points[b].x) / 2;
                const my = (points[a].y + points[b].y) / 2 - 40;
                path.setAttribute('d', `M ${points[a].x} ${points[a].y} Q ${mx} ${my} ${points[b].x} ${points[b].y}`);
                path.setAttribute('class', 'lab-network-line');
                path.style.animationDelay = `${i * -5}s`;
                networkGroup.appendChild(path);
            });
        }

        drawNetworkLines();
        let networkTimer;
        window.addEventListener('resize', () => {
            clearTimeout(networkTimer);
            networkTimer = setTimeout(drawNetworkLines, 120);
        });

        const labReveal = dashboard.closest('.reveal');
        if (labReveal) {
            const obs = new MutationObserver(drawNetworkLines);
            obs.observe(labReveal, { attributes: true, attributeFilter: ['class'] });
        }

        const thulirVideo = document.getElementById('thulirPrototypeVideo');
        const thulirPlayBtn = document.getElementById('thulirPlayBtn');
        const thulirCover = document.getElementById('thulirCover');
        if (thulirVideo && thulirPlayBtn) {
            const thulirViewport = thulirVideo.closest('.thulir-screen-viewport');
            let coverCaptured = false;

            function captureThulirCover() {
                if (coverCaptured || !thulirCover || !thulirVideo.videoWidth) return;
                const canvas = document.createElement('canvas');
                canvas.width = thulirVideo.videoWidth;
                canvas.height = thulirVideo.videoHeight;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.drawImage(thulirVideo, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                thulirCover.src = dataUrl;
                thulirVideo.setAttribute('poster', dataUrl);
                coverCaptured = true;
                thulirVideo.pause();
                thulirVideo.currentTime = 0;
            }

            function setThulirPlaying(playing) {
                thulirViewport.classList.toggle('is-playing', playing);
                thulirPlayBtn.setAttribute('aria-label', playing ? 'Pause prototype' : 'Play prototype');
                thulirPlayBtn.querySelector('.thulir-play-icon').textContent = playing ? '❚❚' : '▶';
                thulirPlayBtn.querySelector('.thulir-play-text').textContent = playing ? 'Pause' : 'Play prototype';
            }

            thulirVideo.addEventListener('loadeddata', () => {
                if (!coverCaptured) {
                    thulirVideo.currentTime = 1.2;
                }
            });

            thulirVideo.addEventListener('seeked', () => {
                if (!coverCaptured && thulirVideo.currentTime < 1.5) {
                    captureThulirCover();
                }
            });

            thulirPlayBtn.addEventListener('click', () => {
                if (thulirVideo.paused) {
                    thulirVideo.play();
                    setThulirPlaying(true);
                } else {
                    thulirVideo.pause();
                    setThulirPlaying(false);
                }
            });

            thulirVideo.addEventListener('click', () => thulirPlayBtn.click());
            thulirVideo.addEventListener('ended', () => setThulirPlaying(false));
        }

        const spotifyDevice = document.getElementById('spotifyDevice');
        if (spotifyDevice) {
            const screenImgs = spotifyDevice.querySelectorAll('.spotify-screen-img');
            const navBtns = spotifyDevice.querySelectorAll('.spotify-nav-btn');

            navBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const screen = btn.getAttribute('data-screen');
                    navBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
                    screenImgs.forEach((img) => {
                        img.classList.toggle('is-active', img.getAttribute('data-screen') === screen);
                    });
                });
            });
        }

        document.querySelectorAll('.poster-frame').forEach((frame) => {
            frame.addEventListener('click', () => {
                document.querySelectorAll('.poster-frame').forEach((f) => f.classList.remove('is-focused'));
                frame.classList.add('is-focused');
            });
        });

        initThulirFigmaOpen();
        initWifiLab();
    }

    function initThulirFigmaOpen() {
        const THULIR_FIGMA_URL =
            'https://www.figma.com/design/nIoCYvROh20pg7gQ0swzDz/thulir-App?node-id=1-9&t=VeY06TpmbuoUvhcI-0';

        function openThulirFigma(url) {
            const popup = window.open(url, '_blank');
            if (popup) {
                popup.opener = null;
                return;
            }
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            link.remove();
        }

        const btn = document.getElementById('thulirFigmaBtn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = btn.getAttribute('data-figma-url') || THULIR_FIGMA_URL;
                openThulirFigma(url.replace(/&amp;/g, '&'));
            });
        }

        const fallback = document.getElementById('thulirFigmaLink');
        if (fallback) {
            fallback.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    function initWifiLab() {
        const stream = document.getElementById('wifiStream');
        const alerts = document.getElementById('wifiAlerts');
        const rssi = document.getElementById('wifiRssi');
        const canvas = document.getElementById('wifiMovementCanvas');
        if (!stream || !alerts || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const rooms = [
            { el: document.getElementById('occLiving'), states: ['Occupied', 'Active', 'Occupied'] },
            { el: document.getElementById('occKitchen'), states: ['Empty', 'Empty', 'Motion'] },
            { el: document.getElementById('occBed'), states: ['Motion', 'Empty', 'Occupied'] },
        ];

        function ts() {
            return new Date().toTimeString().slice(0, 8);
        }

        function addStreamLine(text) {
            const line = document.createElement('div');
            line.className = 'wifi-stream-line';
            line.textContent = `[${ts()}] ${text}`;
            stream.prepend(line);
            while (stream.children.length > 6) stream.lastChild.remove();
        }

        function addAlert(text, type) {
            const el = document.createElement('div');
            el.className = `wifi-alert wifi-alert--${type}`;
            el.innerHTML = `<span class="wifi-alert-ts">${ts()}</span>${text}`;
            alerts.prepend(el);
            while (alerts.children.length > 4) alerts.lastChild.remove();
        }

        let movementPhase = 0;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const drawMovement = () => {
                const w = canvas.width;
                const h = canvas.height;
                ctx.clearRect(0, 0, w, h);
                ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                for (let x = 0; x < w; x += 4) {
                    const y = h / 2 + Math.sin((x + movementPhase) * 0.08) * (h * 0.28);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                movementPhase += 2;
                requestAnimationFrame(drawMovement);
            };
            drawMovement();
        }

        setInterval(() => {
            if (rssi) rssi.textContent = String(-52 - Math.floor(Math.random() * 18));
            rooms.forEach((room) => {
                if (!room.el) return;
                const state = room.states[Math.floor(Math.random() * room.states.length)];
                room.el.textContent = state;
                const card = room.el.closest('.occ-room');
                if (card) card.classList.toggle('occ-room--active', state !== 'Empty');
            });
            const events = [
                ['CSI amplitude shift detected', 'info'],
                ['Micro-Doppler signature logged', 'info'],
                ['Movement in bedroom zone', 'motion'],
                ['Occupancy change: living room', 'warn'],
            ];
            const pick = events[Math.floor(Math.random() * events.length)];
            addStreamLine(pick[0]);
            if (Math.random() > 0.55) addAlert(pick[0], pick[1]);
        }, 3200);
    }

    initLabDashboard();

    // -------------------------------------------------------------
    // 6. Cloud Lab — DDoS Mitigation Simulator
    // -------------------------------------------------------------
    const ddosSim = document.getElementById('ddosSim');
    const serverNode = document.getElementById('serverNode');
    const shieldBarrier = document.getElementById('shieldBarrier');
    const btnTriggerAttack = document.getElementById('btnTriggerAttack');
    const btnMitigate = document.getElementById('btnMitigate');
    const mitigationStatus = document.getElementById('mitigationStatus');
    const packetCanvas = document.getElementById('packetCanvas');
    const shieldRing = document.getElementById('shieldRing');
    const filteredCount = document.getElementById('filteredCount');
    const fwStatusText = document.getElementById('fwStatusText');
    const topoStatusNet = document.getElementById('topoStatusNet');
    const topoFw = document.querySelector('.topo-node--fw');

    if (ddosSim && serverNode && shieldBarrier && btnTriggerAttack && btnMitigate && mitigationStatus && packetCanvas) {
    const pCtx = packetCanvas.getContext('2d');

    let attackActive = false;
    let mitigationActive = false;
    let packets = [];
    let animationFrameId = null;
    let filteredTotal = 0;

    function setIngressStatus(text, alert) {
        if (!topoStatusNet) return;
        const strong = topoStatusNet.querySelector('strong');
        if (strong) {
            strong.textContent = text;
            strong.className = alert ? 'status-alert' : 'status-safe';
        }
    }

    function resizePacketCanvas() {
        packetCanvas.width = ddosSim.clientWidth;
        packetCanvas.height = ddosSim.clientHeight;
    }
    resizePacketCanvas();
    window.addEventListener('resize', resizePacketCanvas);

    class Packet {
        constructor() {
            this.reset();
        }

        reset() {
            // Spawn packet randomly from sides or top/bottom edges
            const spawnEdge = Math.floor(Math.random() * 4);
            const w = packetCanvas.width;
            const h = packetCanvas.height;

            if (spawnEdge === 0) { // Top
                this.x = Math.random() * w;
                this.y = -10;
            } else if (spawnEdge === 1) { // Bottom
                this.x = Math.random() * w;
                this.y = h + 10;
            } else if (spawnEdge === 2) { // Left
                this.x = -10;
                this.y = Math.random() * h;
            } else { // Right
                this.x = w + 10;
                this.y = Math.random() * h;
            }

            this.targetX = w / 2;
            this.targetY = h / 2;

            const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
            this.speed = Math.random() * 2 + 2;
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;

            this.size = Math.random() * 3 + 2;
            this.color = '#ef4444'; // Red malicious traffic
            this.mitigated = false;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            const w = packetCanvas.width;
            const h = packetCanvas.height;
            const dx = this.x - w / 2;
            const dy = this.y - h / 2;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Shield mitigation circle (radius 70)
            if (mitigationActive && distance < 70 && !this.mitigated) {
                this.mitigated = true;
                filteredTotal += 1;
                if (filteredCount) filteredCount.textContent = String(filteredTotal);
                const bounceAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.5;
                this.vx = Math.cos(bounceAngle) * (this.speed * 1.5);
                this.vy = Math.sin(bounceAngle) * (this.speed * 1.5);
                this.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#10b981';
            }

            // Hit detection inside central node
            if (distance < 20) {
                if (!mitigationActive) {
                    // Attack hits: shake server node slightly
                    serverNode.style.transform = `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 8}px)`;
                    setTimeout(() => serverNode.style.transform = 'translate(0, 0)', 100);
                }
                this.reset();
            }

            // Boundary cleanups
            if (this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) {
                this.reset();
            }
        }

        draw() {
            pCtx.save();
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            pCtx.fillStyle = this.color;
            pCtx.shadowBlur = 8;
            pCtx.shadowColor = this.color;
            pCtx.fill();
            pCtx.restore();
        }
    }

    function animatePackets() {
        pCtx.clearRect(0, 0, packetCanvas.width, packetCanvas.height);
        
        if (attackActive || packets.length > 0) {
            packets.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animatePackets);
        }
    }

    btnTriggerAttack.addEventListener('click', () => {
        attackActive = !attackActive;
        
        if (attackActive) {
            btnTriggerAttack.textContent = 'Stop Attack';
            mitigationStatus.textContent = 'UNDER ATTACK';
            mitigationStatus.className = 'status-alert';
            setIngressStatus('FLOOD', true);
            
            // Generate red packet stream
            packets = [];
            for (let i = 0; i < 45; i++) {
                packets.push(new Packet());
            }
            if (!animationFrameId) animatePackets();
        } else {
            btnTriggerAttack.textContent = 'Simulate DDoS';
            if (!mitigationActive) {
                mitigationStatus.textContent = 'SAFE';
                mitigationStatus.className = 'status-safe';
            }
            setIngressStatus('NORMAL', false);
            packets = [];
            pCtx.clearRect(0, 0, packetCanvas.width, packetCanvas.height);
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });

    btnMitigate.addEventListener('click', () => {
        mitigationActive = !mitigationActive;
        
        if (mitigationActive) {
            btnMitigate.textContent = 'Deactivate Shield';
            shieldBarrier.classList.add('active');
            if (shieldRing) shieldRing.classList.add('active');
            if (fwStatusText) fwStatusText.textContent = 'FILTERING';
            if (topoFw) topoFw.classList.add('active');
            
            const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            shieldBarrier.style.borderColor = accent;
            shieldBarrier.style.boxShadow = `inset 0 0 20px rgba(16, 185, 129, 0.15), 0 0 20px ${accent}`;
            if (shieldRing) {
                shieldRing.style.borderColor = accent;
                shieldRing.style.boxShadow = `0 0 30px ${accent}33, inset 0 0 20px rgba(16, 185, 129, 0.08)`;
            }

            if (attackActive) {
                mitigationStatus.textContent = 'MITIGATED';
                mitigationStatus.className = 'status-safe';
            }
        } else {
            btnMitigate.textContent = 'Activate Shield';
            shieldBarrier.classList.remove('active');
            if (shieldRing) shieldRing.classList.remove('active');
            if (fwStatusText) fwStatusText.textContent = 'STANDBY';
            if (topoFw) topoFw.classList.remove('active');
            
            if (attackActive) {
                mitigationStatus.textContent = 'UNDER ATTACK';
                mitigationStatus.className = 'status-alert';
            } else {
                mitigationStatus.textContent = 'SAFE';
                mitigationStatus.className = 'status-safe';
            }
        }
    });
    }
});
