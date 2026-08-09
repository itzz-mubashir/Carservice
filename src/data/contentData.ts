import { ServiceItem, BeforeAfterPair, WhyUsItem, ProcessStep, Testimonial, HeroStage } from '../types';

import heroCarImg from '../assets/images/hero_luxury_supercar_1786105874169.jpg';
import beforePaintImg from '../assets/images/before_paint_dull_1786105888011.jpg';
import afterPaintImg from '../assets/images/after_paint_gloss_1786105901614.jpg';
import interiorCleanImg from '../assets/images/interior_detail_clean_1786105917159.jpg';

export const HERO_CAR_IMAGE = heroCarImg;

export const HERO_STAGES: HeroStage[] = [
  {
    id: 'spray',
    name: '1. High-Pressure Wash',
    badge: 'Deionized Water Jet',
    description: 'Filtered deionized water mist loosening surface contaminants without paint friction.',
  },
  {
    id: 'foam',
    name: '2. Hydrophobic Snow Foam',
    badge: 'pH-Neutral Foam',
    description: 'Ultra-dense foam coating encapsulating road grime and lifting particulate micro-contaminants.',
  },
  {
    id: 'rinse',
    name: '3. Crystal Pure Rinse',
    badge: 'Zero-Spot Water',
    description: 'Spotless cascade rinse leaving hydrophobic micro-droplets sliding seamlessly off clear coat.',
  },
  {
    id: 'gloss',
    name: '4. Ceramic Diamond Gloss',
    badge: '9H Silica Matrix',
    description: 'Deep mirror reflections, 9H ceramic hydrophobic seal, and silk-touch paint finish.',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'exterior-wash',
    title: 'Exterior Wash',
    subtitle: 'Touchless Deionized Hydro-Cleaning',
    description: 'Multi-stage deionized pressure wash with pH-neutral active foam, wheel barrel deep cleansing, and heated spot-free air drying.',
    iconName: 'Droplets',
    features: [
      'Deionized zero-mineral water rinse',
      'pH-neutral snow foam bath',
      'Brake dust wheel barrel extraction',
      'Heated filtered air dry (touchless)'
    ],
    duration: '2.5 Hours',
    tag: 'Signature Precision',
    bgGradient: 'from-sky-50 to-blue-50/50',
    image: heroCarImg,
  },
  {
    id: 'interior-detailing',
    title: 'Interior Detailing',
    subtitle: 'Bespoke Cabin Refinement',
    description: 'Metronomic vacuuming, steam sanitization of vents, leather conditioning with Swissvax cream, and Alcantara fiber restoration.',
    iconName: 'Sparkles',
    features: [
      'Thermal steam ventilation cleansing',
      'Organic Swissvax leather feeding',
      'Micro-particle cabin extraction',
      'Alcantara & suede nap re-grooming'
    ],
    duration: '4 Hours',
    tag: 'Bespoke Comfort',
    bgGradient: 'from-blue-50 to-cyan-50/50',
    image: interiorCleanImg,
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    subtitle: '9H Nanocrystalline Shield',
    description: 'Multi-year liquid glass silica coating creating extreme hydrophobic water beading, chemical resistance, and permanent deep paint gloss.',
    iconName: 'ShieldCheck',
    features: [
      'Multi-stage surface paint decontamination',
      '9H silica quartz bond layer',
      'Self-cleaning hydrophobic tension',
      'UV ray & chemical oxidation barrier'
    ],
    duration: '1-2 Days',
    tag: 'Ultimate Protection',
    bgGradient: 'from-cyan-50 to-sky-50/50',
    image: afterPaintImg,
  },
  {
    id: 'paint-protection',
    title: 'Paint Protection',
    subtitle: 'Self-Healing TPU Film & Correction',
    description: 'Dual-action rotary multi-stage paint correction eliminating 95%+ swirl marks paired with self-healing clear paint protection film.',
    iconName: 'Sparkle',
    features: [
      'Paint depth micro-gauge measuring',
      'Rotary compound swirl removal',
      'Optically clear self-healing TPU film',
      'Custom laser precision computer cut'
    ],
    duration: '2-3 Days',
    tag: 'Mirror Correction',
    bgGradient: 'from-sky-50 to-indigo-50/50',
    image: beforePaintImg,
  },
  {
    id: 'engine-bay-cleaning',
    title: 'Engine Bay Cleaning',
    subtitle: 'Surgical Motor Detailing',
    description: 'Moisture-safe ultrasonic steam cleaning of intake manifolds, engine covers, wiring conduits, finished with non-greasy satin dressing.',
    iconName: 'Cpu',
    features: [
      'Dielectric moisture barrier masking',
      'Ultrasonic gentle steam degreasing',
      'Satin OEM plastic & carbon dress',
      'Exotic manifold polishing'
    ],
    duration: '3 Hours',
    tag: 'Exotic Craft',
    bgGradient: 'from-blue-50 to-slate-50/50',
    image: heroCarImg,
  },
  {
    id: 'headlight-restoration',
    title: 'Headlight Restoration',
    subtitle: 'Optical Lens Clarity & UV Seal',
    description: 'Wet-sanding micro-refinishing of oxidized polycarbonate lenses followed by UV-curable hardcoat ceramic clear sealant.',
    iconName: 'SunMedium',
    features: [
      'Multi-grit wet sand resurfacing',
      'Compound optical lens polishing',
      'UV-curable ceramic hardcoat seal',
      'Maximum lumen output recovery'
    ],
    duration: '1.5 Hours',
    tag: 'Optical Clarity',
    bgGradient: 'from-cyan-50 to-blue-50/50',
    image: afterPaintImg,
  },
];

export const BEFORE_AFTER_DATA: BeforeAfterPair[] = [
  {
    id: 'paint-correction',
    title: 'Multi-Stage Paint Correction & Ceramic Gloss',
    category: 'Paint Refinishing',
    description: 'Severe swirl marks, water etching, and oxidation removed through 3-step rotary correction and sealed with 9H Nano-Ceramic coat.',
    beforeImage: beforePaintImg,
    afterImage: afterPaintImg,
    beforeLabel: '3-Year Swirled & Dull Finish',
    afterLabel: 'Mirror Finish Ceramic Gloss',
    metrics: [
      { label: 'Defect Removal', value: '98.5%' },
      { label: 'Gloss Rating', value: '99.8 GU' },
      { label: 'Hydrophobic Angle', value: '115°' },
    ],
  },
  {
    id: 'interior-leather',
    title: 'Perforated Nappa Leather & Cockpit Renewal',
    category: 'Interior Craft',
    description: 'Deep pore dirt extraction and matte Swissvax oil feeding restoring original factory suppleness without greasy residue.',
    beforeImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    afterImage: interiorCleanImg,
    beforeLabel: 'Worn & Soiled Leather',
    afterLabel: 'Factory Matte Swissvax Finish',
    metrics: [
      { label: 'Bacteria Removal', value: '99.9%' },
      { label: 'Tactile Suppleness', value: '100%' },
      { label: 'Residue Index', value: '0.0%' },
    ],
  },
];

export const WHY_US_DATA: WhyUsItem[] = [
  {
    id: 'equipment',
    title: 'Premium Equipment',
    description: 'State-of-the-art Italian Rupes dual-action polishers, deionized water filtration, and enclosed temperature-controlled clean rooms.',
    iconName: 'Wrench',
    badge: 'Cleanroom Facility',
  },
  {
    id: 'products',
    title: 'Eco-Friendly Products',
    description: 'Biodegradable pH-neutral Swiss formulas that deliver unmatched gloss while safeguarding water tables and delicate vehicle trim.',
    iconName: 'Leaf',
    badge: '100% Biodegradable',
  },
  {
    id: 'process',
    title: 'Paint Safe Process',
    description: 'Touchless wash protocols using ultrasonic grit-guards, double-bucket methods, and paint depth ultrasonic gauge verification.',
    iconName: 'ShieldAlert',
    badge: 'Zero Swirl Guarantee',
  },
  {
    id: 'detail',
    title: 'Attention To Detail',
    description: 'Surgical micro-brushes for badge crevices, lug nut wells, exhaust tip polishing, and interior seam steam extraction.',
    iconName: 'Search',
    badge: 'Master Precision',
  },
  {
    id: 'specialists',
    title: 'Experienced Specialists',
    description: 'Certified Master Detailers trained in Europe with over 15+ years of combined experience on supercars, hypercars, and classics.',
    iconName: 'Award',
    badge: 'Certified Masters',
  },
  {
    id: 'turnaround',
    title: 'Fast Turnaround',
    description: 'Dedicated team allocation guaranteeing on-time white-glove valet delivery with live photo progress updates throughout.',
    iconName: 'Clock',
    badge: 'Punctual Concierge',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Vehicle Inspection',
    subtitle: '360° Paint & Surface Audit',
    description: 'Digital paint thickness assessment, light grid surface analysis, and bespoke consultation tailored to your vehicle condition.',
    iconName: 'ClipboardCheck',
    details: ['Ultrasonic thickness mapping', 'High-CRI defect logging', 'Client goals alignment'],
  },
  {
    stepNumber: '02',
    title: 'Professional Cleaning',
    subtitle: 'Deionized Multi-Stage Hydro-Wash',
    description: 'pH-neutral snow foam bath, iron fallout chemical decontamination, clay bar micro-smoothing, and iron deposit extraction.',
    iconName: 'ShowerHead',
    details: ['Deionized water shower', 'Chemical fallout reaction', 'Medium grade clay bar bath'],
  },
  {
    stepNumber: '03',
    title: 'Detail Finishing',
    subtitle: 'Precision Rotary Polish & Coating',
    description: 'Multi-stage paint correction, leather feeding, ceramic coating application, and IR heat lamp curing in cleanroom booths.',
    iconName: 'Sparkles',
    details: ['Rupes dual-action compound', '9H ceramic seal application', 'Infrared lamp thermal cure'],
  },
  {
    stepNumber: '04',
    title: 'Final Quality Check',
    subtitle: 'White-Glove Handover Audit',
    description: 'Double-blind 120-point inspection under high intensity LED light tunnels before enclosed transport or concierge handover.',
    iconName: 'CheckCircle2',
    details: ['120-point light tunnel audit', 'Concierge photo certificate', 'White-glove key delivery'],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Alexander Sterling',
    role: 'Private Collector',
    vehicle: 'Porsche 911 GT3 RS',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'The level of craftsmanship is peerless. My GT3 RS looked better than the day it rolled off the Zuffenhausen factory line. Their ceramic coating hydrophobic beading is unreal.',
    rating: 5,
    date: '2 days ago',
    verified: true,
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Automotive Journalist',
    vehicle: 'Ferrari 488 Pista',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quote: 'AURA treated my 488 Pista with the reverence usually reserved for fine art. The paint correction eliminated every single micro-swirl. Pure mastery.',
    rating: 5,
    date: '1 week ago',
    verified: true,
  },
  {
    id: '3',
    name: 'Marcus Vance',
    role: 'Tech Executive',
    vehicle: 'Aston Martin DBS Superleggera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'The interior leather restoration smells like fresh bespoke Italian luggage. Friendly specialists, spotless facility, and immaculate turnaround times.',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: '4',
    name: 'Julian Thorne',
    role: 'Motorsport Enthusiast',
    vehicle: 'McLaren 720S Spider',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: 'I travel 80 miles specifically for AURA. Their deionized wash process guarantees zero water spots on my carbon fiber aero components.',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
  },
  {
    id: '5',
    name: 'Sophia Chen',
    role: 'Venture Partner',
    vehicle: 'Bentley Continental GT',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'White-glove service from start to finish. The team sent live high-res video updates during the ceramic curing process. Worth every single penny.',
    rating: 5,
    date: '1 month ago',
    verified: true,
  },
];
