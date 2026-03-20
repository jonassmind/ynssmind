/**
 * i18n Logic for YUNESS MIND Portfolio
 */

const translations = {
    fr: {
        'skip-to-content': 'Passer au contenu',
        'nav-work': 'Projets',
        'nav-about': 'À Propos',
        'nav-contact': 'Contact',
        'badge-editor': 'MONTEUR VIDÉO & SPÉCIALISTE',
        'hero-title-index': 'Créateur de <span class="text-gradient">Récits</span> <br> Cinématographiques.',
        'hero-subtitle-index': 'Axé sur le rythme, la couleur et l\'impact visuel. Donner vie aux séquences brutes grâce à un montage de précision et à la narration.',
        'watch-showreel': 'Voir le Showreel',
        'watch-reel': 'Voir le Reel',
        'view-projects': 'Voir les Projets',
        'showreel-title': 'Showreel 2026',
        'showreel-desc': 'Une minute de rythme visuel et de savoir-faire en post-production.',
        'gothic-desc': 'Rythme visuel et précision narrative.',
        'video-placeholder': 'Emplacement pour la Vidéo',
        'work-title': 'Sélections de Montages',
        'work-desc': 'Une immersion dans l\'art narratif et visuel.',
        'project-1-title': 'Publicité : Haute Énergie',
        'project-1-tag': 'Mouvement & Couleur',
        'project-2-title': 'Court-métrage : La Coupe',
        'project-2-tag': 'Drame Narratif',
        'footer-copy': '&copy; 2026 YUNESS MIND. Conçu avec précision.',
        'title-index': 'YUNESS MIND | Monteur Vidéo & Artiste Visuel',
        'description-index': 'Portfolio d\'YUNESS MIND, monteur vidéo et artiste visuel de haute performance spécialisé dans le récit cinématographique et la post-production.',
        // Gothic
        'hero-title-gothic': 'Transformer <br> les Vidéos <br> en <span class="text-gradient">Magie</span>.',
        'hero-subtitle-gothic': 'Transformer les rushs en histoires captivantes. Spécialisé en post-production, étalonnage et rythme narratif.',
        'philosophy': 'Ma Philosophie',
        'case-studies': 'Études de Cas',
        'case-studies-desc': 'Analyse du processus derrière les prises de vue.',
        'project-chronos': 'Projet : Chronos',
        'project-midnight': 'Court : Minuit',
        'sound-rhythm': 'Son & Rythme',
        'concept-color': 'Concept & Couleur',
        'menu-open': 'Ouvrir le menu',
        'menu-close': 'Fermer le menu',
        'title-gothic': 'YUNESS MIND | Monteur Vidéo & Artiste Visuel',
        'description-gothic': 'Portfolio d\'YUNESS MIND, monteur vidéo et artiste visuel de haute performance spécialisé dans la post-production de pointe et le récit visuel.',
        'contact-desc': 'Prêt à collaborer ? Parlons-en.'
    },
    en: {
        'skip-to-content': 'Skip to content',
        'nav-work': 'Work',
        'nav-about': 'About',
        'nav-contact': 'Contact',
        'badge-editor': 'VIDEO EDITOR & SPECIALIST',
        'hero-title-index': 'Crafting <span class="text-gradient">Cinematic</span> <br> Narratives.',
        'hero-subtitle-index': 'Focused on rhythm, color, and visual impact. Bringing raw footage to life through precision editing and storytelling.',
        'watch-showreel': 'Watch Showreel',
        'watch-reel': 'Watch Reel',
        'view-projects': 'View Projects',
        'showreel-title': '2026 Showreel',
        'showreel-desc': 'A minute of visual rhythm and post-production craft.',
        'gothic-desc': 'Visual rhythm and narrative precision.',
        'video-placeholder': 'Video Embed Placeholder',
        'work-title': 'Selected Edits',
        'work-desc': 'A deep dive into narrative and visual craft.',
        'project-1-title': 'Commercial: High Energy',
        'project-1-tag': 'Motion & Color',
        'project-2-title': 'Short Film: The Cut',
        'project-2-tag': 'Narrative Drama',
        'footer-copy': '&copy; 2026 YUNESS MIND. Built with precision.',
        'title-index': 'YUNESS MIND | Video Editor & Visual Artist',
        'description-index': 'Portfolio of YUNESS MIND, a high-performance Video Editor and Visual Artist specializing in cinematic storytelling and post-production.',
        // Gothic
        'hero-title-gothic': 'Turning <br> Videos <br> to <span class="text-gradient">Magic</span>.',
        'hero-subtitle-gothic': 'Elevating raw footage into compelling stories. Specialized in post-production, color grading, and narrative rhythm.',
        'philosophy': 'My Philosophy',
        'case-studies': 'Case Studies',
        'case-studies-desc': 'Breaking down the process behind the shots.',
        'project-chronos': 'Project: Chronos',
        'project-midnight': 'Short: Midnight',
        'sound-rhythm': 'Sound & Rhythm',
        'concept-color': 'Concept & Color',
        'title-gothic': 'YUNESS MIND | Video Editor & Visual Artist',
        'description-gothic': 'Portfolio of YUNESS MIND, a high-performance Video Editor and Visual Artist specializing in cutting-edge post-production and visual storytelling.',
        'contact-desc': 'Ready to collaborate? Let\'s talk.'
    }
};

function applyLanguage(lang) {
    const t = translations[lang] || translations.en;
    
    // Update document language
    document.documentElement.lang = lang;

    // Update Meta Title & Description
    const path = window.location.pathname;
    const isGothic = path.includes('gothic') || path.endsWith('/') || path.endsWith('index.html');
    
    document.title = isGothic ? t['title-gothic'] : t['title-index'];
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isGothic ? t['description-gothic'] : t['description-index'];
    }

    // Update and animate translatable elements
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) {
            // If it's the hero title, we might need special handling for the gradient span
            // But since we store HTML in translations, it should be fine
            el.innerHTML = t[key];
        }
    });

    // Update ARIA labels
    document.querySelectorAll('[data-t-aria]').forEach(el => {
        const key = el.getAttribute('data-t-aria');
        if (t[key]) {
            el.setAttribute('aria-label', t[key]);
        }
    });
}

function detectLanguage() {
    const savedLang = localStorage.getItem('user-lang');
    if (savedLang) return savedLang;

    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('fr') ? 'fr' : 'en';
}

// Export for main.js consumption
document.addEventListener('DOMContentLoaded', () => {
    const lang = detectLanguage();
    applyLanguage(lang);
});
