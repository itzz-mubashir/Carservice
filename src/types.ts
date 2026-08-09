export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  duration: string;
  tag: string;
  bgGradient: string;
  image: string;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  vehicle: string;
  avatar: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface HeroStage {
  id: 'spray' | 'foam' | 'rinse' | 'gloss';
  name: string;
  badge: string;
  description: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceRequested: string;
  vehicleDetails: string;
  message: string;
}
