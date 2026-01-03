
export const PAGES = ['Accueil', 'Épisodes', 'Chercheuses', 'À propos'] as const;
export type Page = typeof PAGES[number];

export const PAGE_COLORS: Record<Page, string> = {
    'Accueil': '#FF0151',
    'Épisodes': '#7CB342', // Adjusted for readability against white
    'Chercheuses': '#207EF8',
    'À propos': '#C300B4',
};
