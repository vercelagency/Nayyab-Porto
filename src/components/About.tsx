import React from 'react';
import { SectionSettings } from '../types';

export function About({ settings }: { settings: SectionSettings }) {
  // Using generic unsplash URLs since custom user uploads aren't supported without backend storage yet.
  const defaultBg = 'https://images.unsplash.com/photo-1495422964230-6b4eaca104c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
  const bg = settings.bgImage || defaultBg;
  const profileImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <section
      id="about"
      className="snap-start relative w-full min-h-[100dvh] flex flex-col md:flex-row overflow-hidden transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: settings.bgColor,
        color: settings.textColor,
        fontFamily: settings.fontFamily,
        backgroundImage: bg ? `url(${bg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '--hs': settings.headingScale || 1,
        '--ts': settings.textScale || 1,
      } as React.CSSProperties}
    >
      {/* Background Dark Overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Left Pane (Transparent, showing unified bg) */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center min-h-[50vh] md:min-h-screen z-10">
        <h2 className="relative z-10 text-[calc(3rem*var(--hs))] md:text-[calc(4.5rem*var(--hs))] lg:text-[calc(8rem*var(--hs))] italic font-light tracking-wide text-white drop-shadow-xl">
          about
        </h2>
      </div>

      {/* Right Pane (Transparent, showing unified bg) */}
      <div className="relative w-full md:w-1/2 p-12 md:p-24 flex items-center min-h-[50vh] md:min-h-screen z-10">
        <div className="relative z-10 max-w-sm ml-auto space-y-6 text-[calc(0.875rem*var(--ts))] md:text-[calc(1rem*var(--ts))] leading-relaxed italic text-zinc-100 drop-shadow">
          <p>
            Nayyab's practice is grounded in an inquiry into the relational dynamics between the human and more-than-human world. Drawing on South Asian cultural and mystical traditions, her work engages with questions of embodied experience, ecological entanglement, and spiritual cosmology.
          </p>
        </div>
      </div>

      {/* Center overlapping image and paragraph */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20 w-64 md:w-80 lg:w-96 text-center">
        <div className="w-full aspect-square shadow-2xl grayscale transition-all hover:grayscale-0 duration-700 overflow-hidden bg-zinc-900 border border-white/10 rounded">
          <img 
            src={settings.titleImage || profileImg} 
            alt="Nayyab Naveed Portrait" 
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${settings.titleImageScale || 1})` }}
          />
        </div>
        <p className="max-w-xs md:max-w-sm text-[calc(0.75rem*var(--ts))] md:text-[calc(0.875rem*var(--ts))] leading-relaxed italic drop-shadow" style={{ color: settings.textColor }}>
          Her artistic process translates lived experience into a sustained and evolving visual language; one that positions ecology not merely as subject matter, but as a structuring principle of the work itself.
        </p>
      </div>
    </section>
  );
}
