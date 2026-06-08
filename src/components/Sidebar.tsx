import React, { useState } from 'react';
import { Settings2, X, Save, Image as ImageIcon } from 'lucide-react';
import { SiteSettings, SectionSettings } from '../types';

interface SidebarProps {
  settings: SiteSettings;
  onUpdate: (section: keyof SiteSettings, newSettings: SectionSettings) => void;
  onSave: () => void;
}

export function Sidebar({ settings, onUpdate, onSave }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<keyof SiteSettings>('hero');

  const fonts = [
    { label: 'Serif (Playfair Display)', value: '"Playfair Display", serif' },
    { label: 'Sans (Inter)', value: '"Inter", sans-serif' },
    { label: 'Mono (JetBrains Mono)', value: '"JetBrains Mono", monospace' },
  ];

  const sections = Object.keys(settings) as Array<keyof SiteSettings>;

  const handleChange = (field: keyof SectionSettings, value: string | number) => {
    onUpdate(activeSection, { ...settings[activeSection], [field]: value });
  };

  const handleImageUpload = (field: keyof SectionSettings, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full shadow-lg transition-colors group cursor-pointer text-white mix-blend-difference"
      >
        <Settings2 size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 flex flex-col supports-backdrop-blur:bg-zinc-900/90 backdrop-blur-xl">
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <h2 className="text-lg font-medium text-white tracking-tight">Theme Editor</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Section</label>
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value as keyof SiteSettings)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
              >
                {sections.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Typography</label>
                <select
                  value={settings[activeSection].fontFamily}
                  onChange={(e) => handleChange('fontFamily', e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                >
                  {fonts.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings[activeSection].bgColor}
                    onChange={(e) => handleChange('bgColor', e.target.value)}
                    className="w-10 h-10 rounded border border-zinc-700 cursor-pointer bg-transparent p-1"
                  />
                  <input
                    type="text"
                    value={settings[activeSection].bgColor}
                    onChange={(e) => handleChange('bgColor', e.target.value)}
                    className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Text Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings[activeSection].textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="w-10 h-10 rounded border border-zinc-700 cursor-pointer bg-transparent p-1"
                  />
                  <input
                    type="text"
                    value={settings[activeSection].textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Heading Scale</span>
                  <span className="text-xs font-mono">{settings[activeSection].headingScale || 1}x</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings[activeSection].headingScale || 1}
                  onChange={(e) => handleChange('headingScale', parseFloat(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Text Scale</span>
                  <span className="text-xs font-mono">{settings[activeSection].textScale || 1}x</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings[activeSection].textScale || 1}
                  onChange={(e) => handleChange('textScale', parseFloat(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Background Image</span>
                  <ImageIcon size={14} />
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={settings[activeSection].bgImage || ''}
                    onChange={(e) => handleChange('bgImage', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('bgImage', e)}
                    className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                  />
                </div>
              </div>

              {(activeSection === 'hero' || activeSection === 'about') && (
                <>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>{activeSection === 'about' ? 'Center Image (Subject)' : 'Title Image (SVG/PNG)'}</span>
                      <ImageIcon size={14} />
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={settings[activeSection].titleImage || ''}
                        onChange={(e) => handleChange('titleImage', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('titleImage', e)}
                        className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>{activeSection === 'about' ? 'Center Image Scale' : 'Title Image Scale'}</span>
                      <span className="text-xs font-mono">{settings[activeSection].titleImageScale || 1}x</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.05"
                      value={settings[activeSection].titleImageScale || 1}
                      onChange={(e) => handleChange('titleImageScale', parseFloat(e.target.value))}
                      className="w-full accent-white"
                    />
                  </div>
                </>
              )}

              {activeSection === 'hero' && (
                <>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Logo Image</span>
                      <ImageIcon size={14} />
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={settings[activeSection].logoImage || ''}
                        onChange={(e) => handleChange('logoImage', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('logoImage', e)}
                        className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                      />
                    </div>
                  </div>

                  {settings[activeSection].logoImage && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Logo Image Scale</span>
                        <span className="text-xs font-mono">{settings[activeSection].logoImageScale || 1}x</span>
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={settings[activeSection].logoImageScale || 1}
                        onChange={(e) => handleChange('logoImageScale', parseFloat(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>
                  )}
                </>
              )}

              {activeSection === 'footer' && (
                <>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Footer Logo</span>
                      <ImageIcon size={14} />
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={settings[activeSection].footerLogoImage || ''}
                        onChange={(e) => handleChange('footerLogoImage', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('footerLogoImage', e)}
                        className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                      />
                    </div>
                  </div>

                  {settings[activeSection].footerLogoImage && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Footer Logo Scale</span>
                        <span className="text-xs font-mono">{settings[activeSection].footerLogoImageScale || 1}x</span>
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={settings[activeSection].footerLogoImageScale || 1}
                        onChange={(e) => handleChange('footerLogoImageScale', parseFloat(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>
                  )}

                  <div className="space-y-3 border-t border-zinc-800 pt-6">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Footer Right Insignia</span>
                      <ImageIcon size={14} />
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={settings[activeSection].footerInsigniaImage || ''}
                        onChange={(e) => handleChange('footerInsigniaImage', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('footerInsigniaImage', e)}
                        className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                      />
                    </div>
                  </div>

                  {settings[activeSection].footerInsigniaImage && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Footer Insignia Scale</span>
                        <span className="text-xs font-mono">{settings[activeSection].footerInsigniaImageScale || 1}x</span>
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={settings[activeSection].footerInsigniaImageScale || 1}
                        onChange={(e) => handleChange('footerInsigniaImageScale', parseFloat(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>
                  )}

                  <div className="space-y-3 border-t border-zinc-800 pt-6">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Contact Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="studio@nayyab.com"
                      value={settings[activeSection].contactEmail || ''}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                    />
                  </div>
                </>
              )}

              {activeSection === 'texts' && (
                <>
                  <div className="space-y-3 border-t border-zinc-800 pt-6">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Card 1 Image</span>
                      <ImageIcon size={14} />
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={settings[activeSection].card1Image || ''}
                        onChange={(e) => handleChange('card1Image', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('card1Image', e)}
                        className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Card 2 Image</span>
                      <ImageIcon size={14} />
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="url"
                        placeholder="https://..."
                        value={settings[activeSection].card2Image || ''}
                        onChange={(e) => handleChange('card2Image', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('card2Image', e)}
                        className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-zinc-800 pt-6">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Card Shadow Color</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings[activeSection].cardShadowColor || '#000000'}
                        onChange={(e) => handleChange('cardShadowColor', e.target.value)}
                        className="w-10 h-10 rounded border border-zinc-700 cursor-pointer bg-transparent p-1"
                      />
                      <input
                        type="text"
                        value={settings[activeSection].cardShadowColor || 'rgba(0,0,0,0.25)'}
                        onChange={(e) => handleChange('cardShadowColor', e.target.value)}
                        className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-2.5 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Card Shadow Offset (X/Y)</span>
                      <span className="text-xs font-mono">{settings[activeSection].cardShadowX || 0}px / {settings[activeSection].cardShadowY ?? 25}px</span>
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={settings[activeSection].cardShadowX || 0}
                        onChange={(e) => handleChange('cardShadowX', parseInt(e.target.value, 10))}
                        className="w-full accent-white"
                        title="Offset X"
                      />
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={settings[activeSection].cardShadowY ?? 25}
                        onChange={(e) => handleChange('cardShadowY', parseInt(e.target.value, 10))}
                        className="w-full accent-white"
                        title="Offset Y"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Card Shadow Blur & Spread</span>
                      <span className="text-xs font-mono">{settings[activeSection].cardShadowBlur ?? 50}px / {settings[activeSection].cardShadowSpread ?? -12}px</span>
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={settings[activeSection].cardShadowBlur ?? 50}
                        onChange={(e) => handleChange('cardShadowBlur', parseInt(e.target.value, 10))}
                        className="w-full accent-white"
                        title="Blur Radius"
                      />
                      <input
                        type="range"
                        min="-50"
                        max="100"
                        step="1"
                        value={settings[activeSection].cardShadowSpread ?? -12}
                        onChange={(e) => handleChange('cardShadowSpread', parseInt(e.target.value, 10))}
                        className="w-full accent-white"
                        title="Spread Radius"
                      />
                    </div>
                  </div>
                </>
              )}

              {(activeSection === 'work' || activeSection === 'publications') && (
                <div className="space-y-4 border-t border-zinc-800 pt-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Slides</label>
                    <button 
                      onClick={() => {
                        const newSlides = [...(settings[activeSection].slides || [])];
                        newSlides.push({ id: Date.now().toString(), title: 'New Slide', image: '' });
                        handleChange('slides', newSlides as any);
                      }}
                      className="text-xs bg-zinc-800 text-white px-2 py-1 rounded hover:bg-zinc-700"
                    >
                      + Add Slide
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(settings[activeSection].slides || []).map((slide, index) => (
                      <div key={slide.id} className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg space-y-3 relative group">
                        <button
                          onClick={() => {
                            const newSlides = settings[activeSection].slides!.filter((_, i) => i !== index);
                            handleChange('slides', newSlides as any);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const newSlides = [...settings[activeSection].slides!];
                            newSlides[index] = { ...newSlides[index], title: e.target.value };
                            handleChange('slides', newSlides as any);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg p-2 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                          placeholder="Slide title"
                        />
                        <div className="flex flex-col gap-2">
                          <input
                            type="url"
                            placeholder="Image URL"
                            value={slide.image || ''}
                            onChange={(e) => {
                              const newSlides = [...settings[activeSection].slides!];
                              newSlides[index] = { ...newSlides[index], image: e.target.value };
                              handleChange('slides', newSlides as any);
                            }}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg p-2 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const newSlides = [...settings[activeSection].slides!];
                                  newSlides[index] = { ...newSlides[index], image: reader.result as string };
                                  handleChange('slides', newSlides as any);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full text-xs text-zinc-400 file:cursor-pointer file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-700 file:text-zinc-300 hover:file:bg-zinc-600"
                          />
                        </div>

                        {/* Sub slides section */}
                        <div className="pt-2 mt-2 border-t border-zinc-700/50 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-400">Sub-Slides ({(slide.subSlides?.length || 0)}/4)</span>
                            {(slide.subSlides?.length || 0) < 4 && (
                              <button
                                onClick={() => {
                                  const newSlides = [...settings[activeSection].slides!];
                                  const subSlides = newSlides[index].subSlides || [];
                                  newSlides[index] = {
                                    ...newSlides[index],
                                    subSlides: [...subSlides, { id: Date.now().toString(), image: '' }]
                                  };
                                  handleChange('slides', newSlides as any);
                                }}
                                className="text-[10px] bg-zinc-700 text-white px-2 py-0.5 rounded hover:bg-zinc-600"
                              >
                                + Add Image
                              </button>
                            )}
                          </div>
                          
                          {slide.subSlides?.map((subSlide, subIndex) => (
                            <div key={subSlide.id} className="flex gap-2 items-center">
                              <div className="flex-1 flex flex-col gap-1">
                                <input
                                  type="url"
                                  placeholder="Sub-Image URL"
                                  value={subSlide.image || ''}
                                  onChange={(e) => {
                                    const newSlides = [...settings[activeSection].slides!];
                                    newSlides[index].subSlides![subIndex].image = e.target.value;
                                    handleChange('slides', newSlides as any);
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-700 text-white text-xs rounded p-1.5 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        const newSlides = [...settings[activeSection].slides!];
                                        newSlides[index].subSlides![subIndex].image = reader.result as string;
                                        handleChange('slides', newSlides as any);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="w-full text-[10px] text-zinc-400 file:cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-700 file:text-zinc-300 hover:file:bg-zinc-600"
                                />
                              </div>
                              <button
                                onClick={() => {
                                  const newSlides = [...settings[activeSection].slides!];
                                  newSlides[index].subSlides = newSlides[index].subSlides!.filter((_, i) => i !== subIndex);
                                  handleChange('slides', newSlides as any);
                                }}
                                className="text-red-500 p-1 hover:bg-red-500/20 rounded"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Slide Duration (Seconds)</span>
                      <span className="text-xs font-mono">{settings[activeSection].slideDuration || 5}s</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={settings[activeSection].slideDuration || 5}
                      onChange={(e) => handleChange('slideDuration', parseInt(e.target.value, 10))}
                      className="w-full accent-white"
                    />
                  </div>

                  <div className="space-y-3 pt-4">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Navigation Offset Y</span>
                      <span className="text-xs font-mono">{settings[activeSection].navOffsetY || 0}px</span>
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={settings[activeSection].navOffsetY || 0}
                      onChange={(e) => handleChange('navOffsetY', parseInt(e.target.value, 10))}
                      className="w-full accent-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-zinc-800">
            <button
              onClick={onSave}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <Save size={18} />
              Save & Hardcode Layout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
