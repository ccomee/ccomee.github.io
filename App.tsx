import React, { useState, useEffect, useRef } from 'react';
import type { Page } from './types';
import { PAGES } from './types';
import Navbar from './components/Navbar';
import PageContent from './components/PageContent';
import Header from './components/Header';
import PageFooterImage from './components/PageFooterImage';


// Map each page to a specific percentage position for the animation.
const pagePositions: Record<Page, number> = {
  'Accueil': 0,
  'Épisodes': 100 / 3,
  'Chercheuses': 200 / 3,
  'À propos': 100,
};

type ContentState = 'visible' | 'fading-out' | 'fading-in';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Accueil');
  const [displayedPage, setDisplayedPage] = useState<Page>('Accueil');
  const [contentState, setContentState] = useState<ContentState>('fading-in');

  const [bgPosition, setBgPosition] = useState<number>(pagePositions.Accueil);

  const bgPositionRef = useRef<number>(pagePositions.Accueil);
  const prevIndexRef = useRef<number>(PAGES.indexOf('Accueil'));
  const animationFrameId = useRef<number | null>(null);
  const fadeInTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    // Don't do anything if the page isn't actually changing.
    if (activePage === displayedPage) {
      return;
    }

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    fadeInTriggeredRef.current = false;
    setContentState('fading-out');

    const newIndex = PAGES.indexOf(activePage);
    const prevIndex = prevIndexRef.current;
    const distance = Math.abs(newIndex - prevIndex);

    const duration = 300 + 700 * Math.sqrt(distance);
    const FADE_IN_OFFSET = 400;

    const startPosition = bgPositionRef.current;
    const endPosition = pagePositions[activePage];
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      if (!fadeInTriggeredRef.current && (duration - elapsedTime) <= FADE_IN_OFFSET) {
        fadeInTriggeredRef.current = true;
        setDisplayedPage(activePage);
        setContentState('fading-in');
      }

      const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress));
      const currentPosition = startPosition + (endPosition - startPosition) * easedProgress;

      setBgPosition(currentPosition);
      bgPositionRef.current = currentPosition;

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        if (!fadeInTriggeredRef.current) {
          setDisplayedPage(activePage);
          setContentState('fading-in');
        }
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
    prevIndexRef.current = newIndex;

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [activePage]);

  // This effect resets the animation state to 'visible' after the fade-in is complete.
  useEffect(() => {
    if (contentState === 'fading-in') {
      // Duration is based on the longest fade-in animation (400ms duration + 100ms delay for paragraphs).
      const timer = setTimeout(() => {
        setContentState('visible');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [contentState]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased">
      <header>
        <Header bgPosition={bgPosition} />
        <div className="sticky top-0 bg-brand-bg/80 backdrop-blur-sm z-10 shadow-sm">
          <Navbar activePage={activePage} setActivePage={setActivePage} />
        </div>
      </header>

      <main className="p-3 sm:p-6 md:p-8 flex-grow relative z-10">
        <div className="max-w-4xl mx-auto">
          <PageContent activePage={displayedPage} contentState={contentState} />
        </div>
      </main>

      <PageFooterImage activePage={displayedPage} contentState={contentState} />
    </div>
  );
};

export default App;
