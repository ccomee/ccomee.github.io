import React from 'react';
import type { Page } from '../types';
import { PAGES } from '../types';

interface PageFooterImageProps {
    activePage: Page;
    contentState: 'visible' | 'fading-out' | 'fading-in';
}

const FOOTER_OVERLAP: Record<Page, string> = {
    'Accueil': 'min(180px, 13vw)',
    'Épisodes': 'min(300px, 21vw)',
    'Chercheuses': 'min(300px, 21vw)',
    'À propos': 'min(180px, 13vw)',
};

const PageFooterImage: React.FC<PageFooterImageProps> = ({ activePage, contentState }) => {
    const getImageSrc = (page: Page) => {
        switch (page) {
            case 'Accueil': return '/images/Fond_p1.png';
            case 'Épisodes': return '/images/Fond_p2.png';
            case 'Chercheuses': return '/images/Fond_p3.png';
            case 'À propos': return '/images/Fond_p4.png';
            default: return '/images/Fond_p1.png';
        }
    };

    // Determine opacity based on contentState
    // When fading out, we hide the footer.
    // When fading in, we show it (it will effectively fade in because it was hidden).
    // When visible, it's visible.
    const containerOpacity = contentState === 'fading-out' ? 'opacity-0' : 'opacity-100';

    return (
        <div
            className={`w-full mt-auto relative overflow-hidden transition-opacity duration-300 ${containerOpacity}`}
            style={{ marginTop: `calc(-1 * ${FOOTER_OVERLAP[activePage]})` }}
        >
            {PAGES.map((page) => {
                const isActive = activePage === page;
                return (
                    <img
                        key={page}
                        src={getImageSrc(page)}
                        alt={`Illustration de bas de page pour ${page}`}
                        // Use relative for the active image to set container height, absolute for others to overlay
                        className={`w-full h-auto object-cover block ${isActive
                            ? 'relative z-0 opacity-100'
                            : 'absolute top-0 left-0 z-0 opacity-0'
                            }`}
                    />
                );
            })}

            <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col items-center justify-end pb-4 pointer-events-none">
                <div className="flex gap-4 mb-3 pointer-events-auto">
                    <a href="https://www.youtube.com/@MamanChercheuse" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                        <img src="/images/logo_youtube.png" alt="YouTube" className="h-12 w-auto object-contain drop-shadow-md" />
                    </a>
                    <a href="https://www.linkedin.com/company/maman-chercheuse/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                        <img src="/images/logo_linkedin.png" alt="LinkedIn" className="h-12 w-auto object-contain drop-shadow-md" />
                    </a>
                    <a href="https://www.instagram.com/maman_chercheuse/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                        <img src="/images/logo_instagram.png" alt="Instagram" className="h-12 w-auto object-contain drop-shadow-md" />
                    </a>
                </div>
                <p className="text-white text-sm font-sans drop-shadow-md bg-black/10 px-2 rounded">
                    &copy; {new Date().getFullYear()} Maman chercheuse. Tous droits réservés.
                </p>
            </div>
        </div>
    );
};

export default PageFooterImage;
