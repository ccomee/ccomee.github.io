# Project: Maman chercheuse

## Overview
"Maman chercheuse" is a single-page React application designed for a YouTube channel focused on scientific research. The design aesthetic mimics a researcher's notebook, featuring doodle-style graphics, handwriting fonts, and a warm, paper-like color palette.

## Current Implementation Status

### Core Architecture
- **Framework**: React 18+ with TypeScript.
- **Styling**: Tailwind CSS for responsive layout and utility classes.
- **Entry Point**: Standard Vite-compatible `index.html` and `index.tsx` bootstrapping.

### Key Features
1.  **Navigation System**:
    -   Four primary sections: *Accueil*, *Épisodes*, *Chercheuses*, *À propos*.
    -   Custom `Navbar` component with active state indicators and focus rings for accessibility.

2.  **Dynamic Visuals (The "Notebook" Feel)**:
    -   **Fonts**: Integrated Google Fonts 'Kalam' (handwriting) for titles and 'Poppins' (sans-serif) for body text via Tailwind configuration.
    -   **Header Animation**: A unique, synchronized animation system. The header consists of a transparent PNG overlay (doodle) sitting on top of a 400% width linear gradient. As the user navigates between tabs, the gradient background shifts horizontally to a specific percentage, creating a "turning page" or "progression" effect tailored to each section.

3.  **Page Transitions**:
    -   Implemented a custom state machine for page transitions (`visible` -> `fading-out` -> `fading-in`).
    -   Ensures content fully exits before new content enters, preventing layout shifts and jarring user experiences.

## Technical Challenges & Solutions

### 1. Synchronized Background Animation
**Problem**: We needed the background gradient in the header to scroll smoothly to a specific position based on the selected tab, while simultaneously fading out the old page content and fading in the new content.
**Solution**:
-   We avoided heavy animation libraries to keep the bundle small.
-   Instead, we implemented a custom `requestAnimationFrame` loop in `App.tsx`.
-   We used a damped harmonic oscillator formula (`0.5 * (1 - Math.cos(Math.PI * progress))`) for smooth easing.
-   We decoupled `activePage` (what the user clicked) from `displayedPage` (what is currently rendering) to handle the exit animations gracefully.

### 2. Header Aspect Ratio
**Problem**: The header doodle is a raster image that needs to scale perfectly without distortion across mobile and desktop, while maintaining alignment with the CSS gradient behind it.
**Solution**:
-   Used the "Padding-Bottom Hack" in `Header.tsx`. We calculated the exact aspect ratio of the source image (`(270 / 1341) * 100`) and applied it to a container to force the browser to reserve the exact space required before the image loads.

### 3. Asset Management (Current Limitation)
**Problem**: The header image is currently embedded directly into `Header.tsx` as a large Base64 string.
**Impact**: While this prevents "FOUC" (Flash of Unstyled Content) and eliminates an HTTP request, it bloats the JavaScript bundle size and makes the file difficult to edit.
**Future Recommendation**: Move this asset to the `/public` folder and reference it via URL, or implement a proper asset pipeline during the build step.

## Next Steps for Google Anti Gravity Export
-   Verify all hardcoded Base64 strings are converted to optimized assets if file size becomes a constraint.
-   Ensure `metadata.json` permissions align with the target hosting environment (currently requests no frame permissions).
