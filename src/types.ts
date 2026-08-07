export type Section = 
  | 'juego'
  | 'quienes-somos'
  | 'capacitaciones'
  | 'estadisticas'
  | 'seguimiento'
  | 'consejos'
  | 'noticias'
  | 'apoyar';

export type BinColor = 'blanco' | 'verde' | 'negro' | 'rojo';

export interface WasteItem {
  id: string;
  name: string;
  category: BinColor;
  icon: string;
  description: string;
  tip: string;
  points: number;
}

export interface BinInfo {
  type: BinColor;
  name: string;
  colorName: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  iconName: string;
  itemsAllowed: string[];
  description: string;
}

export interface WorkshopModule {
  id: string;
  title: string;
  duration: string;
  level: string;
  summary: string;
  icon: string;
  videoUrl?: string;
  content: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredXP: number;
}

export interface StudentProfile {
  name: string;
  grade: string;
  school: string;
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  itemsRecycled: number;
  treesPlanted: number;
  completedWorkshops: string[];
  badges: Badge[];
  ecoHeroCharacter?: string;
  ecoHeroScore?: number;
  ecoHeroImage?: string;
  age?: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'escuela' | 'hogar' | 'comunidad';
}

export interface EcoTipItem {
  id: string;
  title: string;
  category: 'agua' | 'energia' | 'residuos' | 'biodiversidad';
  icon: string;
  shortText: string;
  detailedText: string;
  impactScore: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Evento' | 'Noticia' | 'Taller' | 'Logro';
  summary: string;
  content: string;
  image: string;
  location: string;
}

export interface TreeInitiative {
  id: string;
  title: string;
  organization: string;
  region: string;
  department: string;
  description: string;
  impactMetric: string;
  websiteUrl: string;
  image: string;
  speciesPlanted: string[];
  supportOptions: string[];
}

export interface ImpactStatsData {
  studentsBenefited: number;
  workshopsCompleted: number;
  kgRecycledTotal: number;
  treesPlantedTotal: number;
  co2SavedKg: number;
  schoolsPartnered: number;
  monthlyRecycling: {
    month: string;
    organico: number;
    aprovechable: number;
    noAprovechable: number;
  }[];
  categoryBreakdown: {
    name: string;
    value: number;
    color: string;
  }[];
}
