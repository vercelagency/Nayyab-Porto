import React from 'react';
import { SectionSettings } from '../types';

export function Publications({ settings }: { settings: SectionSettings }) {
  return (
    <section
      id="publications"
      className="snap-start relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-24 px-6 md:px-12 transition-all duration-700 ease-in-out"
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
      <div className="absolute inset-0 bg-current opacity-[0.03] pointer-events-none noise-bg z-[1]" />

      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        <h2 className="text-[calc(2.25rem*var(--hs))] md:text-[calc(3rem*var(--hs))] italic font-light tracking-wide mb-16 shrink-0 text-center">
          publications
        </h2>

        <div className="w-full flex flex-col gap-12 text-[calc(1rem*var(--ts))] font-light">
          {/* Publication Item 1 */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-current/20 pb-8">
            <div className="w-24 shrink-0 opacity-60 font-mono text-sm tracking-widest">2024</div>
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-[calc(1.25rem*var(--ts))] md:text-[calc(1.5rem*var(--ts))] italic">Defending the Universe</h3>
              <p className="opacity-80 leading-relaxed font-light">Exhibition Catalogue, Studio Press, New York. Essays by leading critics on the intersection of human ecology and cosmology.</p>
            </div>
          </div>

          {/* Publication Item 2 */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-current/20 pb-8">
            <div className="w-24 shrink-0 opacity-60 font-mono text-sm tracking-widest">2023</div>
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-[calc(1.25rem*var(--ts))] md:text-[calc(1.5rem*var(--ts))] italic">Painting Arrives</h3>
              <p className="opacity-80 leading-relaxed font-light">Artist Monograph, Art Books Intl. A comprehensive retrospective featuring over 150 color plates and an interview with the artist.</p>
            </div>
          </div>

          {/* Publication Item 3 */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-current/20 pb-8">
            <div className="w-24 shrink-0 opacity-60 font-mono text-sm tracking-widest">2021</div>
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-[calc(1.25rem*var(--ts))] md:text-[calc(1.5rem*var(--ts))] italic">Poetics of Space</h3>
              <p className="opacity-80 leading-relaxed font-light">Contemporary Art Journal, Vol. 42. Critical essay examining the relational dynamics of public and private spheres in modern installations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
