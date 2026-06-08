import React, { useState, useEffect, useMemo } from 'react';
import { SectionSettings, Slide, SubSlide } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Work({ settings }: { settings: SectionSettings }) {
  const slides = settings.slides && settings.slides.length > 0
    ? settings.slides
    : [
        { id: '1', title: 'go to the limits of your longing', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' }
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const activeSlide = slides[currentIndex];
  // Calculate total images for active slide
  const activeSlideImages = useMemo(() => [activeSlide.image, ...(activeSlide.subSlides?.map(s => s.image) || [])], [activeSlide]);

  useEffect(() => {
    const duration = (settings.slideDuration || 5) * 1000;
    const timer = setInterval(() => {
      if (subIndex + 1 < activeSlideImages.length) {
        setSubIndex(subIndex + 1);
      } else {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setSubIndex(0);
      }
    }, duration);
    return () => clearInterval(timer);
  }, [currentIndex, subIndex, slides.length, settings.slideDuration, activeSlideImages.length]);

  const handleNext = () => {
    if (subIndex + 1 < activeSlideImages.length) {
      setSubIndex(subIndex + 1);
    } else {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setSubIndex(0);
    }
  };

  const handlePrev = () => {
    if (subIndex > 0) {
      setSubIndex(subIndex - 1);
    } else {
      const prevMainIndex = (currentIndex - 1 + slides.length) % slides.length;
      setCurrentIndex(prevMainIndex);
      const prevImagesCount = 1 + (slides[prevMainIndex].subSlides?.length || 0);
      setSubIndex(prevImagesCount - 1);
    }
  };

  return (
    <section
      id="work"
      className="snap-start relative w-full h-[100dvh] flex flex-col items-center justify-between py-12 px-6 md:px-12 transition-all duration-700 ease-in-out overflow-hidden"
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
      <div className="absolute inset-0 bg-current opacity-5 pointer-events-none noise-bg z-[1]" />

      {/* Main Artwork Showcase (Full Bleed) */}
      <div className="absolute inset-0 w-full h-full bg-black/10 overflow-hidden z-0">
        <AnimatePresence>
          <motion.img 
            key={`${slides[currentIndex].id}-${subIndex}`}
            src={activeSlideImages[subIndex]} 
            alt={slides[currentIndex].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Gradient overlay on the bottom 30% */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {slides.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-black/20 rounded-full transition-all backdrop-blur-md z-20 mix-blend-difference">
              <ArrowLeft size={28} strokeWidth={1} />
            </button>
            <button onClick={handleNext} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-black/20 rounded-full transition-all backdrop-blur-md z-20 mix-blend-difference">
              <ArrowRight size={28} strokeWidth={1} />
            </button>
          </>
        )}
      </div>

      <h2 className="text-[calc(2.25rem*var(--hs))] md:text-[calc(3rem*var(--hs))] italic font-light tracking-wide relative z-10 mix-blend-difference text-white">
        work
      </h2>

      <div 
        className="w-full relative z-10 mb-4 text-white drop-shadow-md transition-transform duration-300"
        style={{ transform: `translateY(${settings.navOffsetY || 0}px)` }}
      >
        {/* Carousel Text Nav */}
        <nav className="w-full overflow-x-auto pb-4 hide-scrollbar flex justify-center">
          <ul className="flex items-start justify-start md:justify-center min-w-max gap-8 md:gap-12 text-[calc(0.875rem*var(--ts))] md:text-[calc(1.125rem*var(--ts))] italic tracking-wider whitespace-nowrap">
            {slides.map((slide, i) => {
              const slideImagesCount = 1 + (slide.subSlides?.length || 0);
              return (
                <li key={slide.id} className="flex flex-col items-center gap-2">
                  <span
                    onClick={() => {
                      setCurrentIndex(i);
                      setSubIndex(0);
                    }}
                    className={`cursor-pointer transition-opacity duration-300 ${i === currentIndex ? 'opacity-100 font-medium' : 'opacity-60'}`}
                  >
                    {slide.title}
                  </span>
                  {/* Dots container below title */}
                  {slideImagesCount > 1 && (
                    <div className={`flex gap-1.5 transition-opacity duration-300 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                      {Array.from({ length: slideImagesCount }).map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          onClick={() => {
                            if (i === currentIndex) {
                              setSubIndex(dotIdx);
                            } else {
                              setCurrentIndex(i);
                              setSubIndex(dotIdx);
                            }
                          }}
                          className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === currentIndex && dotIdx === subIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                        />
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
