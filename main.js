/**
 * YUNESS MIND Portfolio | Core Interaction Logic
 * Adheres to Agent Quality Standards (AGENTS.md)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State Setup
    document.body.classList.remove('no-js');

    // 2. Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3. Page Loader
    initPageLoader();

    // 4. Custom Cursor
    if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        initCustomCursor();
    }

    // 5. Theme Toggle
    initThemeToggle();

    // 6. Parallax Scrolling
    if (!prefersReducedMotion) {
        initParallax();
    }

    // 7. Page Transitions & Section Animations
    if (!prefersReducedMotion) {
        initPageTransitions();
        initSectionAnimations();
    }

    // 8. Counter Animations
    if (!prefersReducedMotion) {
        initCounterAnimations();
    }

    // 9. Keyboard Navigation - Enhance Tab Focus
    enhanceKeyboardNavigation();

    // 10. Mobile Menu
    initMobileMenu();

    // 11. Editor Scroll Animation
    initEditorScroll(prefersReducedMotion);

    // 12. Editor Playback Animation (Active editing simulation)
    if (!prefersReducedMotion) {
        initEditorPlayback();
    }

    // 13. Waveform Animation
    if (!prefersReducedMotion) {
        initWaveformAnimation();
    }

    // 14. Split Preview Toggle
    initSplitPreview();

    // 15. Lazy Loading
    initLazyLoading();

    // 16. Micro-interactions
    initMicroInteractions();

    // 17. Cinematic Grains
    if (!prefersReducedMotion) {
        initCinematicGrains();
    }

    // 18. Magnetic Buttons
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        initMagneticButtons();
    }

    // 19. Scroll Progress
    initScrollProgress();
});

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        bar.style.width = percent + '%';
    }, { passive: true });
}

/**
 * Page Loader Animation
 */
function initPageLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Hide loader after animation completes
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2200);
    });
}

/**
 * Custom Cursor
 */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');

    if (!cursor || !cursorDot) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        dotX += (cursorX - dotX) * 0.2;
        dotY += (cursorY - dotY) * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states for interactive elements
    const hoverTargets = 'a, button, .project-card, .panel-item, .clip, .preview-btn, .pb-btn';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

/**
 * Theme Toggle - Light/Dark Mode
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Parallax Scrolling Effect
 */
function initParallax() {
    const parallaxLayers = document.querySelectorAll('[data-parallax]');

    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                parallaxLayers.forEach(layer => {
                    const speed = parseFloat(layer.getAttribute('data-parallax')) || 0.5;
                    const yPos = -(scrollY * speed);
                    layer.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Page Transitions
 */
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            // Add leaving class for exit animation
            document.body.classList.add('is-leaving');

            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }

                // Remove classes after transition
                setTimeout(() => {
                    document.body.classList.remove('is-leaving', 'is-transitioning');
                }, 100);
            }, 500);
        });
    });
}

/**
 * Section Animations on Scroll
 */
function initSectionAnimations() {
    const animatedElements = document.querySelectorAll('.section-animated, [data-animate]');

    if (animatedElements.length === 0) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a text element, we can do more sophisticated reveals
                if (entry.target.classList.contains('hero-title')) {
                    // Title reveal logic could go here if needed
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        sectionObserver.observe(el);
    });
}

/**
 * Counter Animations
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || 0;
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        const currentValue = Math.floor(easedProgress * target);
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    requestAnimationFrame(updateCounter);
}

/**
 * Waveform Animation
 */
function initWaveformAnimation() {
    const waveforms = document.querySelectorAll('.waveform-svg');

    waveforms.forEach(waveform => {
        // Add random animation delays for each bar
        const bars = waveform.querySelectorAll('rect');
        bars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.05}s`;
        });
    });
}

/**
 * Enhances keyboard navigation by ensuring focus rings are crisp and logical
 */
function enhanceKeyboardNavigation() {
    // Listen for tab key to show focus rings only for keyboard users
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });

    window.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
    });
}

/**
 * Mobile Menu - Keyboard accessible hamburger menu
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    const toggleMenu = () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
        navLinks.classList.toggle('is-open', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    };

    // Close on click outside
    navLinks.addEventListener('click', (e) => {
        if (e.target === navLinks) {
            toggleMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.focus();
            toggleMenu();
        }
    });

    // Close on link click (for single-page navigation)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    menuToggle.addEventListener('click', toggleMenu);
}

/**
 * Editor Scroll Animation
 * As user scrolls: editor window fades out
 */
function initEditorScroll(prefersReducedMotion) {
    const editorWindow = document.getElementById('editor-window');
    const scrollHint = document.getElementById('scroll-hint');

    if (!editorWindow) return;

    // If reduced motion, just skip animations
    if (prefersReducedMotion) {
        editorWindow.style.opacity = '1';
        return;
    }

    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const vh = window.innerHeight;

                // Phase 1: Editor fade out (0 → 0.5vh scroll)
                const editorEnd = vh * 0.5;
                const editorProgress = Math.min(scrollY / editorEnd, 1);

                const editorOpacity = 1 - editorProgress;
                const editorScale = 1 - (editorProgress * 0.12);
                editorWindow.style.opacity = editorOpacity;
                editorWindow.style.transform = 'scale(' + editorScale + ')';

                // Scroll hint: fade out quickly
                if (scrollHint) {
                    scrollHint.style.opacity = Math.max(0.5 - editorProgress * 2, 0);
                }

                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on load
}

/**
 * Editor Playback Animation — Cinematic Choreography
 * Simulates realistic video editing with visual feedback on every interaction.
 */
function initEditorPlayback() {
    const playhead = document.querySelector('.timeline-playhead');
    const timecode = document.querySelector('.preview-timecode');
    const previewLogo = document.querySelector('.preview-logo');
    const previewCanvas = document.querySelector('.preview-canvas');
    const cursor = document.getElementById('editor-cursor');
    const ripple = document.querySelector('.cursor-ripple');

    // Grab interactive elements
    const panelThumbs = document.querySelectorAll('.panel-thumb');
    const panelItems = document.querySelectorAll('.panel-item');
    const propVals = document.querySelectorAll('.prop-val');
    const sliderFills = document.querySelectorAll('.slider-fill');
    const clips = document.querySelectorAll('.clip');
    const playOverlay = document.querySelector('.preview-overlay');
    
    if (!playhead || !timecode || !cursor) return;

    const durationMs = 20000;
    let startTime = performance.now();
    let lastActionName = '';

    const choreography = [
        // SCENE 1: Import media
        { p: 0.00, x: 60, y: 50, action: 'idle' },
        { p: 0.03, x: 14, y: 22, action: 'hover-media' },
        { p: 0.05, x: 12, y: 28, action: 'select-thumb', click: true },
        { p: 0.06, x: 12, y: 28, action: 'hold-thumb' },
        { p: 0.10, x: 30, y: 82, action: 'drag-to-timeline' },
        { p: 0.12, x: 30, y: 82, action: 'drop-on-timeline', click: true },
        
        // SCENE 2: Apply effect
        { p: 0.16, x: 12, y: 42, action: 'hover-effects' },
        { p: 0.18, x: 13, y: 46, action: 'select-glow', click: true },
        { p: 0.19, x: 13, y: 46, action: 'hold-effect' },
        { p: 0.24, x: 50, y: 87, action: 'drag-effect-to-v2' },
        { p: 0.26, x: 50, y: 87, action: 'drop-effect', click: true },

        // SCENE 3: Play and scrub
        { p: 0.30, x: 50, y: 40, action: 'hover-preview' },
        { p: 0.32, x: 50, y: 40, action: 'click-play', click: true },
        { p: 0.36, x: 50, y: 40, action: 'watching' },
        { p: 0.40, x: 35, y: 93, action: 'scrub-start' },
        { p: 0.44, x: 60, y: 93, action: 'scrubbing' },
        { p: 0.46, x: 45, y: 93, action: 'scrub-back', click: true },

        // SCENE 4: Adjust properties
        { p: 0.50, x: 90, y: 25, action: 'hover-scale' },
        { p: 0.52, x: 92, y: 25, action: 'adjust-scale', click: true },
        { p: 0.56, x: 90, y: 31, action: 'hover-opacity' },
        { p: 0.58, x: 95, y: 31, action: 'grab-opacity' },
        { p: 0.63, x: 82, y: 31, action: 'drag-opacity-down' },
        { p: 0.66, x: 93, y: 31, action: 'drag-opacity-up' },
        { p: 0.67, x: 93, y: 31, action: 'release-opacity', click: true },

        // SCENE 5: Color grading
        { p: 0.71, x: 88, y: 50, action: 'hover-exposure' },
        { p: 0.73, x: 93, y: 50, action: 'drag-exposure', click: true },
        { p: 0.77, x: 88, y: 55, action: 'hover-saturation' },
        { p: 0.79, x: 82, y: 55, action: 'drag-sat-left' },
        { p: 0.82, x: 92, y: 55, action: 'drag-sat-right', click: true },

        // SCENE 6: Add keyframe and finish
        { p: 0.86, x: 55, y: 78, action: 'hover-clip-1' },
        { p: 0.88, x: 55, y: 78, action: 'right-click-clip', click: true },
        { p: 0.90, x: 55, y: 78, action: 'add-keyframe', click: true },
        { p: 0.94, x: 50, y: 40, action: 'return-to-preview' },
        { p: 1.00, x: 60, y: 50, action: 'idle' },
    ];

    function easeInOutQuint(t) {
        return t < 0.5
            ? 16 * t * t * t * t * t
            : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }

    function getInterpolated(p) {
        for (let i = 0; i < choreography.length - 1; i++) {
            const k1 = choreography[i];
            const k2 = choreography[i + 1];
            if (p >= k1.p && p <= k2.p) {
                const t = (p - k1.p) / (k2.p - k1.p);
                const e = easeInOutQuint(t);
                return {
                    x: k1.x + (k2.x - k1.x) * e,
                    y: k1.y + (k2.y - k1.y) * e,
                    action: k1.action,
                    click: k1.click || false,
                    idx: i,
                };
            }
        }
        const last = choreography[choreography.length - 1];
        return { x: last.x, y: last.y, action: last.action, click: false, idx: choreography.length - 1 };
    }

    function clearHighlights() {
        panelThumbs.forEach(function(el) { el.classList.remove('is-active'); });
        panelItems.forEach(function(el) { el.classList.remove('is-active'); });
        clips.forEach(function(el) { el.classList.remove('is-hovered', 'is-selected'); });
        propVals.forEach(function(el) { el.classList.remove('is-editing'); });
    }

    let lastIdx = -1;
    let keyframeDots = [];

    function triggerRipple() {
        if (!ripple) return;
        ripple.classList.remove('click');
        void ripple.offsetWidth;
        ripple.classList.add('click');
    }

    function addKeyframeDot(parentSelector, leftPercent) {
        const parent = document.querySelector(parentSelector);
        if (!parent) return;
        const dot = document.createElement('div');
        dot.className = 'keyframe-dot appear';
        dot.style.left = leftPercent + '%';
        parent.appendChild(dot);
        keyframeDots.push(dot);
        if (keyframeDots.length > 8) {
            const old = keyframeDots.shift();
            old.classList.add('fade-out');
            setTimeout(function() { old.remove(); }, 500);
        }
    }

    function updatePlayback(currentTime) {
        var elapsed = currentTime - startTime;
        var progress = (elapsed % durationMs) / durationMs;

        if (progress < 0.01 && lastIdx > choreography.length - 3) {
            clearHighlights();
            keyframeDots.forEach(function(d) { d.remove(); });
            keyframeDots = [];
            lastActionName = '';
            // Reset property values
            if (propVals[0]) propVals[0].textContent = '100%';
            if (propVals[2]) propVals[2].textContent = '100%';
            if (sliderFills[0]) sliderFills[0].style.width = '';
            if (sliderFills[2]) sliderFills[2].style.width = '';
        }

        var current = getInterpolated(progress);

        cursor.style.left = current.x + '%';
        cursor.style.top = current.y + '%';

        if (current.click && current.idx !== lastIdx) {
            triggerRipple();
        }

        // Playhead
        if (current.action.startsWith('scrub')) {
            var scrubX = Math.max(15, Math.min(85, current.x * 1.2));
            playhead.style.left = scrubX + '%';
        } else {
            playhead.style.left = 15 + 70 * progress + '%';
        }

        // Timecode
        var totalSeconds = 84 + (progress * 20);
        var mins = Math.floor(totalSeconds / 60);
        var secs = Math.floor(totalSeconds % 60);
        var frames = Math.floor((totalSeconds % 1) * 24);
        var pad = function(n) { return n.toString().padStart(2, '0'); };
        timecode.textContent = '00:' + pad(mins) + ':' + pad(secs) + ':' + pad(frames);

        var action = current.action;

        // Action-specific visual feedback (fires once per action change)
        if (action !== lastActionName) {
            clearHighlights();

            switch (action) {
                case 'hover-media':
                    if (panelThumbs[0]) panelThumbs[0].classList.add('is-active');
                    break;
                case 'select-thumb':
                case 'hold-thumb':
                    if (panelThumbs[1]) panelThumbs[1].classList.add('is-active');
                    break;
                case 'drag-to-timeline':
                    if (panelThumbs[1]) panelThumbs[1].classList.add('is-active');
                    if (clips[0]) clips[0].classList.add('is-hovered');
                    break;
                case 'drop-on-timeline':
                    if (clips[0]) clips[0].classList.add('is-selected');
                    addKeyframeDot('.track-clips', 25);
                    break;
                case 'hover-effects':
                case 'select-glow':
                case 'hold-effect':
                    if (panelItems[0]) panelItems[0].classList.add('is-active');
                    break;
                case 'drag-effect-to-v2':
                    if (panelItems[0]) panelItems[0].classList.add('is-active');
                    if (clips[3]) clips[3].classList.add('is-hovered');
                    break;
                case 'drop-effect':
                    if (clips[3]) clips[3].classList.add('is-selected');
                    addKeyframeDot('.track-video-2 .track-clips', 40);
                    break;
                case 'click-play':
                    if (playOverlay) playOverlay.style.opacity = '1';
                    break;
                case 'watching':
                    if (playOverlay) playOverlay.style.opacity = '0.3';
                    break;
                case 'adjust-scale':
                    if (propVals[0]) {
                        propVals[0].classList.add('is-editing');
                        propVals[0].textContent = '115%';
                    }
                    addKeyframeDot('.track-clips', 50);
                    break;
                case 'hover-opacity':
                case 'grab-opacity':
                    if (propVals[2]) propVals[2].classList.add('is-editing');
                    break;
                case 'hover-clip-1':
                    if (clips[2]) clips[2].classList.add('is-hovered');
                    break;
                case 'right-click-clip':
                    if (clips[2]) clips[2].classList.add('is-selected');
                    break;
                case 'add-keyframe':
                    addKeyframeDot('.track-clips', 70);
                    if (clips[2]) clips[2].classList.add('is-selected');
                    break;
            }
            lastActionName = action;
        }

        // Continuous: Opacity value follows cursor drag
        if (propVals[2] && ['grab-opacity', 'drag-opacity-down', 'drag-opacity-up', 'release-opacity'].indexOf(action) !== -1) {
            propVals[2].classList.add('is-editing');
            var localP = Math.max(0, (progress - 0.56) / 0.11);
            var opVal = Math.floor(100 - Math.sin(Math.min(localP, 1) * Math.PI) * 25);
            propVals[2].textContent = opVal + '%';
        }

        // Continuous: Slider fills during color grading
        if (sliderFills[0] && ['hover-exposure', 'drag-exposure'].indexOf(action) !== -1) {
            var expP = Math.min((progress - 0.71) / 0.04, 1);
            sliderFills[0].style.width = (55 + expP * 15) + '%';
        }
        if (sliderFills[2] && ['hover-saturation', 'drag-sat-left', 'drag-sat-right'].indexOf(action) !== -1) {
            var satP = (progress - 0.77) / 0.05;
            if (satP >= 0 && satP <= 1) {
                sliderFills[2].style.width = (70 - Math.sin(satP * Math.PI) * 25) + '%';
            }
        }

        // Ken Burns on preview: slow zoom + pan
        if (previewLogo) {
            var zoom = 1 + Math.sin(progress * Math.PI * 2) * 0.06;
            var panX = Math.sin(progress * Math.PI * 1.5) * 3;
            previewLogo.style.transform = 'scale(' + zoom + ') translateX(' + panX + '%)';
        }

        // Preview canvas tint during color grading
        if (previewCanvas) {
            if (['drag-exposure', 'drag-sat-left', 'drag-sat-right'].indexOf(action) !== -1) {
                previewCanvas.style.boxShadow = 'inset 0 0 60px hsl(var(--accent) / 0.15)';
            } else {
                previewCanvas.style.boxShadow = '';
            }
        }

        lastIdx = current.idx;
        requestAnimationFrame(updatePlayback);
    }

    requestAnimationFrame(updatePlayback);
}

/**
 * Split Screen Preview Toggle
 */
function initSplitPreview() {
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewCanvas = document.querySelector('.preview-canvas');

    if (!previewBtns.length || !previewCanvas) return;

    previewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            previewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle split view
            if (btn.textContent === 'Split') {
                if (!previewCanvas.querySelector('.split-preview')) {
                    const splitHTML = `
                        <div class="split-preview">
                            <div class="split-left">
                                <span class="split-label">Before</span>
                            </div>
                            <div class="split-divider"></div>
                            <div class="split-right">
                                <span class="split-label">After</span>
                            </div>
                        </div>
                    `;
                    previewCanvas.insertAdjacentHTML('beforeend', splitHTML);
                }
            } else {
                const splitPreview = previewCanvas.querySelector('.split-preview');
                if (splitPreview) splitPreview.remove();
            }
        });
    });
}

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

/**
 * Micro-interactions on buttons and links
 */
function initMicroInteractions() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: hsl(0 0% 100% / 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/**
 * Cinematic Grains Generation
 */
function initCinematicGrains() {
    const container = document.createElement('div');
    container.className = 'cinematic-grains';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    const grainCount = 30;
    
    for (let i = 0; i < grainCount; i++) {
        const grain = document.createElement('div');
        grain.className = 'grain';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size and duration
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;
        
        grain.style.left = `${x}%`;
        grain.style.top = `${y}%`;
        grain.style.width = `${size}px`;
        grain.style.height = `${size}px`;
        grain.style.animationDuration = `${duration}s`;
        grain.style.animationDelay = `${delay}s`;
        
        container.appendChild(grain);
    }
}

/**
 * Magnetic Buttons Interaction
 */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .logo a');
    const projectCards = document.querySelectorAll('.project-card');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        magneticElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            const triggerDistance = 80;
            
            if (distance < triggerDistance) {
                const strength = 0.3;
                const x = distanceX * strength;
                const y = distanceY * strength;
                el.style.transform = `translate(${x}px, ${y}px)`;
            } else {
                el.style.transform = '';
            }
        });

        // Glass Sheen tracking for cards
        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            card.style.setProperty('--sheen-x', `${x - rect.width}px`);
            card.style.setProperty('--sheen-y', `${y - rect.height}px`);
        });
    });
}
