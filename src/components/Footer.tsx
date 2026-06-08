import React from 'react';
import { SectionSettings } from '../types';

interface FooterProps {
  settings: SectionSettings;
  onScrollToSection: (id: string) => void;
}

export function Footer({ settings, onScrollToSection }: FooterProps) {
  const contactEmail = settings.contactEmail || "studio@nayyab.com";

  return (
    <footer
      id="contact"
      className="snap-start relative w-full min-h-[35dvh] flex flex-col items-center justify-between py-12 px-6 md:px-12 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: settings.bgColor,
        color: settings.textColor,
        fontFamily: settings.fontFamily,
        backgroundImage: settings.bgImage ? `url(${settings.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '--hs': settings.headingScale || 1,
        '--ts': settings.textScale || 1,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
      
      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex-1 flex flex-col md:flex-row items-center justify-between gap-12 mb-12 px-4 md:px-8">
        <div className="flex flex-col gap-3 font-light max-w-xl text-center md:text-left">
          <h2 className="text-[calc(1.5rem*var(--hs))] md:text-[calc(2rem*var(--hs))] italic tracking-wide font-light m-0">contact</h2>
          <p className="text-[calc(0.875rem*var(--ts))] md:text-[calc(1rem*var(--ts))] leading-relaxed opacity-80 m-0 pt-2">
            For inquiries, commissions, or collaborations, please get in touch.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <a
            href={`mailto:${contactEmail}`}
            className="border border-current px-12 py-3 text-[calc(0.75rem*var(--ts))] tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Email
          </a>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-current/20 px-4 md:px-8">
        
        <div className="flex-1 flex justify-center md:justify-start">
          {settings.footerLogoImage ? (
            <img 
              src={settings.footerLogoImage} 
              alt="Footer Logo" 
              className="w-auto object-contain"
              style={{ height: `${2 * (settings.footerLogoImageScale || 1)}rem` }} 
            />
          ) : (
            <div className="text-[calc(1rem*var(--hs))] md:text-[calc(1.25rem*var(--hs))] tracking-[0.3em] uppercase font-light">
              Nayyab Naveed
            </div>
          )}
        </div>

        <nav className="flex-none">
          <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[calc(0.875rem*var(--ts))] md:text-[calc(1rem*var(--ts))] italic tracking-[0.1em] opacity-80">
            <li><button onClick={() => onScrollToSection('about')} className="hover:opacity-60 transition-opacity cursor-pointer">about</button></li>
            <li><button onClick={() => onScrollToSection('work')} className="hover:opacity-60 transition-opacity cursor-pointer">work</button></li>
            <li><button onClick={() => onScrollToSection('texts')} className="hover:opacity-60 transition-opacity cursor-pointer">texts</button></li>
            <li><button onClick={() => onScrollToSection('publications')} className="hover:opacity-60 transition-opacity cursor-pointer">publications</button></li>
          </ul>
        </nav>

        <div className="flex-1 flex justify-center md:justify-end">
          {settings.footerInsigniaImage ? (
            <img 
              src={settings.footerInsigniaImage} 
              alt="Footer Insignia" 
              className="w-auto object-contain shrink-0"
              style={{ height: `${3 * (settings.footerInsigniaImageScale || 1)}rem` }} 
            />
          ) : (
            <div className="w-12 h-12 border border-current rounded-full flex items-center justify-center opacity-80 shrink-0">
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-transparent border border-current flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-current" />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
