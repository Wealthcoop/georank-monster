export interface BusinessInfo {
  name: string;
  niche: string;
  primaryService: string;
  logoUrl?: string;
}

export interface City {
  name: string;
  slug: string;
  state: string;
  county?: string;
  isPillar?: boolean;
}

export interface Service {
  name: string;
  slug: string;
  description?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address?: string;
  ghlFormUrl?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  fontFamily: string;
}

export interface Project {
  id: string;
  business: BusinessInfo;
  cities: City[];
  services: Service[];
  contact: ContactInfo;
  theme: ThemeConfig;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingState {
  currentStep: number;
  data: Partial<Project>;
}
