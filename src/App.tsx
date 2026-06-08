/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { defaultSettings, SiteSettings } from './types';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Texts } from './components/Texts';
import { Publications } from './components/Publications';
import { Footer } from './components/Footer';

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isSnapping, setIsSnapping] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Attempt to load settings from Express server first
    fetch('/api/settings')
      .then((res) => {
        if (!res.ok) throw new Error('Not running on fullstack server');
        return res.json();
      })
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => {
        console.log('Loading local fallback settings:', err.message);
        const saved = localStorage.getItem('nayyab-site-settings');
        if (saved) {
          try {
            setSettings(JSON.parse(saved));
          } catch (e) {
            console.error('Failed to parse from localStorage:', e);
          }
        }
      });
  }, []);

  const handleUpdateSettings = (section: keyof SiteSettings, newSettings: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: newSettings,
    }));
  };

  const handleSave = async () => {
    setToast('Saving and hardcoding changes...');
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.settings) {
          // Update settings with the converted local file links
          setSettings(result.settings);
          localStorage.setItem('nayyab-site-settings', JSON.stringify(result.settings));
          setToast('Settings saved & hardcoded successfully!');
        } else {
          throw new Error('Server save result was unsuccessful');
        }
      } else {
        throw new Error('Server returned non-ok status');
      }
    } catch (err) {
      console.warn('Backend save failed, using browser storage fallback:', err);
      try {
        localStorage.setItem('nayyab-site-settings', JSON.stringify(settings));
        setToast('Saved to browser fallback!');
      } catch (storageErr) {
        console.error('LocalStorage quota exceeded:', storageErr);
        setToast('Error: File too large to save locally.');
      }
    }

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const container = document.getElementById('main-container');
    const element = document.getElementById(id);
    if (container && element) {
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
      setIsSnapping(false);

      const targetTop = element.getBoundingClientRect().top + container.scrollTop - container.getBoundingClientRect().top;

      container.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      snapTimeoutRef.current = setTimeout(() => {
        setIsSnapping(true);
      }, 1000);
    }
  };

  return (
    <div 
      id="main-container" 
      className={`relative h-[100dvh] w-full overflow-y-auto overflow-x-hidden ${isSnapping ? 'snap-y snap-mandatory' : ''} scroll-smooth hide-scrollbar bg-black`}
    >
      <Sidebar settings={settings} onUpdate={handleUpdateSettings} onSave={handleSave} />
      
      <main>
        <Hero settings={settings.hero} onScrollToSection={scrollToSection} />
        <About settings={settings.about} />
        <Work settings={settings.work} />
        <Texts settings={settings.texts} />
        <Publications settings={settings.publications} />
      </main>

      <Footer settings={settings.footer} onScrollToSection={scrollToSection} />

      {/* Modern, Elegant Custom Toast Notification */}
      <div 
        className={`fixed bottom-6 right-6 z-50 bg-zinc-900/95 border border-white/15 px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 transition-all duration-300 transform ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm font-sans font-medium text-white/90 tracking-wide">{toast}</span>
      </div>
    </div>
  );
}
