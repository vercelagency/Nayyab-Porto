import React from 'react';
import { SectionSettings } from '../types';

export function Texts({ settings }: { settings: SectionSettings }) {
  const paperLight = 'https://images.unsplash.com/photo-1603504104279-796726f1c4e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const paperDark = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  
  const shadowStyle = {
    boxShadow: `${settings.cardShadowX ?? 0}px ${settings.cardShadowY ?? 25}px ${settings.cardShadowBlur ?? 50}px ${settings.cardShadowSpread ?? -12}px ${settings.cardShadowColor ?? 'rgba(0,0,0,0.25)'}`
  };

  return (
    <section
      id="texts"
      className="snap-start relative w-full h-[100dvh] flex flex-col items-center py-12 px-6 md:px-12 transition-all duration-700 ease-in-out overflow-hidden"
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
      <h2 className="text-[calc(2.25rem*var(--hs))] md:text-[calc(3rem*var(--hs))] italic font-light tracking-wide mb-6 md:mb-12 shrink-0 relative z-10">
        texts
      </h2>

      <div className="w-full max-w-6xl flex-1 flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center relative z-10 overflow-hidden min-h-0">
        
        {/* Card 1 */}
        <div 
          className="relative w-full max-w-[400px] aspect-[5/7] transition-transform hover:-translate-y-2 duration-500 flex shrink-0"
        >
          {settings.card1Image ? (
            <img 
              src={settings.card1Image} 
              alt="Card 1" 
              className="w-full h-full object-cover" 
              style={shadowStyle}
            />
          ) : (
            <div className="w-full h-full p-8 md:p-12 flex flex-col justify-center items-center text-center overflow-hidden relative" style={shadowStyle}>
              <div 
                className="absolute inset-0 z-0 opacity-90"
                style={{ backgroundImage: `url(${paperLight})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="relative z-10 text-zinc-800 flex flex-col h-full justify-center overflow-y-auto hide-scrollbar">
                <h3 className="text-[calc(1.25rem*var(--hs))] md:text-[calc(1.875rem*var(--hs))] italic font-medium mb-4 leading-relaxed shrink-0">
                  defending the <br/> universe
                </h3>
                <p className="text-[calc(0.75rem*var(--ts))] md:text-[calc(1rem*var(--ts))] italic leading-relaxed md:leading-loose font-light px-2 md:px-4 opacity-80 text-[#6d790d] mt-auto md:mt-4">
                   Nayyab's practice is grounded in an inquiry into the relational dynamics between the human and more-than-human world.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Card 2 */}
        <div 
          className="relative w-full max-w-[400px] aspect-[5/7] transition-transform hover:-translate-y-2 duration-500 flex shrink-0"
        >
          {settings.card2Image ? (
            <img 
              src={settings.card2Image} 
              alt="Card 2" 
              className="w-full h-full object-cover" 
              style={shadowStyle}
            />
          ) : (
            <div className="w-full h-full p-8 md:p-12 flex flex-col justify-center items-center text-center overflow-hidden relative" style={shadowStyle}>
              <div 
                className="absolute inset-0 z-0 opacity-95 grayscale mix-blend-multiply bg-zinc-600"
                style={{ backgroundImage: `url(${paperDark})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-slate-900/40 mix-blend-overlay z-0" />
              <div className="relative z-10 text-zinc-100 flex flex-col h-full justify-center overflow-y-auto hide-scrollbar">
                <h3 className="text-[calc(1.25rem*var(--hs))] md:text-[calc(1.875rem*var(--hs))] italic font-medium mb-4 leading-relaxed drop-shadow-md shrink-0">
                  painting <br/> arrives
                </h3>
                <p className="text-[calc(0.75rem*var(--ts))] md:text-[calc(1rem*var(--ts))] italic leading-relaxed md:leading-loose font-light px-2 md:px-4 opacity-90 mt-auto md:mt-4">
                   Nayyab's practice is grounded in an inquiry into the relational dynamics between the human and more-than-human world.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
