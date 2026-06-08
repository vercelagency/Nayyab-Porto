import React from 'react';
import { SectionSettings } from '../types';

interface HeroProps {
  settings: SectionSettings;
  onScrollToSection: (id: string) => void;
}

export function Hero({ settings, onScrollToSection }: HeroProps) {
  return (
    <section
      id="hero"
      className="snap-start relative w-full min-h-[100dvh] flex flex-col items-center justify-between py-12 px-6 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: settings.bgColor,
        color: settings.textColor,
        fontFamily: settings.fontFamily,
        backgroundImage: settings.bgImage ? `url(${settings.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        '--hs': settings.headingScale || 1,
        '--ts': settings.textScale || 1,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />
      
      <div className="relative z-10 w-full flex justify-center mt-8">
        {settings.logoImage ? (
          <img 
            src={settings.logoImage} 
            alt="Logo" 
            className="object-contain drop-shadow-sm" 
            style={{ width: `${4 * (settings.logoImageScale || 1)}rem`, height: `${4 * (settings.logoImageScale || 1)}rem` }} 
          />
        ) : (
          <div className="w-16 h-16 border rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5 border-white/20">
            <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-current" />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-4">
        {settings.titleImage ? (
           <img 
              src={settings.titleImage} 
              alt="Nayyab Naveed" 
              className="w-full object-contain drop-shadow-lg transition-transform" 
              style={{ transform: `scale(${settings.titleImageScale || 1})`, maxWidth: '100%', maxHeight: '40vh' }}
            />
        ) : (
          <h1 className="text-[calc(2.25rem*var(--hs))] md:text-[calc(3.75rem*var(--hs))] lg:text-[calc(6rem*var(--hs))] tracking-widest uppercase text-center font-light drop-shadow-lg break-words max-w-full">
            Nayyab Naveed
          </h1>
        )}
      </div>

      <nav className="relative z-10 w-full max-w-4xl pt-6 mt-8">
        <ul className="flex flex-wrap justify-between items-center gap-4 text-[calc(0.875rem*var(--ts))] md:text-[calc(1.125rem*var(--ts))] italic tracking-wider">
          <li><button onClick={() => onScrollToSection('about')} className="hover:opacity-70 transition-opacity cursor-pointer">about</button></li>
          <li><button onClick={() => onScrollToSection('work')} className="hover:opacity-70 transition-opacity cursor-pointer">work</button></li>
          <li><button onClick={() => onScrollToSection('texts')} className="hover:opacity-70 transition-opacity cursor-pointer">texts</button></li>
          <li><button onClick={() => onScrollToSection('publications')} className="hover:opacity-70 transition-opacity cursor-pointer">publications</button></li>
          <li><button onClick={() => onScrollToSection('contact')} className="hover:opacity-70 transition-opacity cursor-pointer">contact</button></li>
        </ul>
      </nav>
    </section>
  );
}
