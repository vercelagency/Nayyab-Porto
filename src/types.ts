export interface SubSlide {
  id: string;
  image: string;
}

export interface Slide {
  id: string;
  title: string;
  image: string;
  subSlides?: SubSlide[];
}

export interface SectionSettings {
  bgColor: string;
  bgImage: string;
  fontFamily: string;
  textColor: string;
  titleImage?: string;
  logoImage?: string;
  headingScale?: number;
  textScale?: number;
  titleImageScale?: number;
  logoImageScale?: number;
  slides?: Slide[];
  slideDuration?: number;
  navOffsetY?: number;
  footerLogoImage?: string;
  footerLogoImageScale?: number;
  footerInsigniaImage?: string;
  footerInsigniaImageScale?: number;
  card1Image?: string;
  card2Image?: string;
  card3Image?: string;
  cardShadowX?: number;
  cardShadowY?: number;
  cardShadowBlur?: number;
  cardShadowSpread?: number;
  cardShadowColor?: string;
  contactEmail?: string;
}

export type SiteSettings = {
  hero: SectionSettings;
  about: SectionSettings;
  work: SectionSettings;
  texts: SectionSettings;
  publications: SectionSettings;
  footer: SectionSettings;
};

import defaultSettingsData from './settings-data.json';

export const defaultSettings: SiteSettings = defaultSettingsData as SiteSettings;
