import React from 'react';
import type { Page } from '../types';
import { PAGES, PAGE_COLORS } from '../types';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="flex justify-center items-center h-auto min-h-[4rem] py-2 max-w-4xl mx-auto px-2 sm:px-4">
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-8">
        {PAGES.map((page) => {
          const color = PAGE_COLORS[page];
          const isActive = activePage === page;

          return (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              style={{
                color: isActive ? color : undefined,
                '--hover-color': color
              } as React.CSSProperties}
              className={`px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-base font-semibold rounded-md transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg ${isActive
                ? ''
                : 'text-brand-text hover:bg-brand-primary/10'
                }`}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = color;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '';
              }}
            >
              {page}
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
