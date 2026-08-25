export interface BadgeItem {
  id: string;
  name: string;
  category: 'juegos' | 'agua' | 'energia' | 'residuos' | 'biodiversidad';
  description: string;
  icon: string;
  unlockCondition: string;
}

export const THREE_BADGES: BadgeItem[] = [
  {
    id: 'badge-jugar',
    name: 'Insignia por Jugar 🎮',
    category: 'juegos',
    description: 'Otorgada por participar y jugar en los minijuegos ecológicos de Ecocalipsis.',
    icon: 'https://i.ibb.co/fdm5702R/90890f69ab5a4d5fb1a2e1bdd29341de-removebg-preview.png',
    unlockCondition: 'Juega una partida en el arcade de Ecocalipsis'
  },
  {
    id: 'badge-lorax',
    name: 'Insignia Taller de Lorax 🌳',
    category: 'biodiversidad',
    description: 'Otorgada por completar y responder correctamente la evaluación del Taller de El Lorax.',
    icon: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
    unlockCondition: 'Aprueba el cuestionario del Taller de El Lorax respondiendo todas las preguntas de forma correcta'
  },
  {
    id: 'badge-reciclaje',
    name: 'Insignia Taller de Reciclaje ♻️',
    category: 'residuos',
    description: 'Otorgada por completar y responder correctamente la evaluación del Taller de El Reciclaje.',
    icon: 'https://i.ibb.co/Mx8yc33z/images-removebg-preview-6.png',
    unlockCondition: 'Aprueba el cuestionario del Taller de El Reciclaje respondiendo todas las preguntas de forma correcta'
  },
  {
    id: 'badge-ecocalipsis',
    name: 'Insignia Oficial Ecocalipsis 🌎',
    category: 'biodiversidad',
    description: 'Otorgada por completar y responder correctamente la evaluación de la Capacitación Ecocalipsis.',
    icon: 'https://i.ibb.co/vx4nhDRR/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png',
    unlockCondition: 'Aprueba el cuestionario de la Capacitación Ecocalipsis respondiendo todas las preguntas de forma correcta'
  }
];

export const FIFTY_BADGES = THREE_BADGES;

