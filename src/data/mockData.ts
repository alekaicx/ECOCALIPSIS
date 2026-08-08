import { 
  WasteItem, 
  BinInfo, 
  WorkshopModule, 
  StudentProfile, 
  DailyChallenge, 
  EcoTipItem, 
  NewsItem, 
  TreeInitiative, 
  ImpactStatsData 
} from '../types';

export const INITIAL_BINS: BinInfo[] = [
  {
    type: 'blanco',
    name: 'Contenedor Blanco',
    colorName: 'Blanco (Aprovechables)',
    bgColor: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-400/30',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    iconName: 'Recycle',
    itemsAllowed: ['Botellas de plástico', 'Cajas de cartón', 'Papel limpio', 'Latas de aluminio', 'Envases de vidrio'],
    description: 'Residuos limpios y secos que pueden transformarse en nuevos productos.'
  },
  {
    type: 'verde',
    name: 'Contenedor Verde',
    colorName: 'Verde (Orgánicos)',
    bgColor: 'from-green-500/20 to-lime-500/10',
    borderColor: 'border-green-400/30',
    glowColor: 'rgba(74, 222, 128, 0.4)',
    iconName: 'Apple',
    itemsAllowed: ['Cáscaras de frutas', 'Restos de comida', 'Hojas secas', 'Desechos de jardín', 'Borra de café'],
    description: 'Materia orgánica biodegradable ideal para compostaje escolar y abono.'
  },
  {
    type: 'negro',
    name: 'Contenedor Negro',
    colorName: 'Negro (No Aprovechables)',
    bgColor: 'from-slate-700/30 to-zinc-800/20',
    borderColor: 'border-zinc-500/30',
    glowColor: 'rgba(161, 161, 170, 0.3)',
    iconName: 'Trash2',
    itemsAllowed: ['Papel higiénico', 'Servilletas usadas', 'Cartón contaminado con grasa', 'Papeles metalizados'],
    description: 'Residuos no reciclables que van al relleno sanitario o disposición final.'
  },
  {
    type: 'rojo',
    name: 'Contenedor Rojo / Especial',
    colorName: 'Rojo (Peligrosos & RAEE)',
    bgColor: 'from-rose-500/20 to-red-600/10',
    borderColor: 'border-rose-400/30',
    glowColor: 'rgba(251, 113, 133, 0.4)',
    iconName: 'AlertTriangle',
    itemsAllowed: ['Pilas alcalinas', 'Baterías de teléfono', 'Bombillos fluorescentes', 'Medicamentos vencidos'],
    description: 'Materiales peligrosos o electrónicos que requieren manejo especial y recolección segura.'
  }
];

export const WASTE_ITEMS_DATABASE: WasteItem[] = [
  {
    id: 'item-1',
    name: 'Botella Plástica PET',
    category: 'blanco',
    icon: '🍾',
    description: 'Botella de agua o gaseosa limpia y aplastada sin tapa.',
    tip: 'Lávala y aplástala para ahorrar espacio antes de depositarla en el contenedor blanco.',
    points: 15
  },
  {
    id: 'item-2',
    name: 'Cáscara de Banano',
    category: 'verde',
    icon: '🍌',
    description: 'Residuo orgánico producido en la lonchera o cafetería.',
    tip: 'Las cáscaras se convierten en abono rico para la huerta escolar de la IED Pío X.',
    points: 10
  },
  {
    id: 'item-3',
    name: 'Servilleta Usada con Grasa',
    category: 'negro',
    icon: '🧻',
    description: 'Servilleta de papel utilizada durante el almuerzo.',
    tip: 'Al estar contaminada con grasa de comida, no se puede reciclar y va a la caneca negra.',
    points: 10
  },
  {
    id: 'item-4',
    name: 'Pila / Batería AA',
    category: 'rojo',
    icon: '🔋',
    description: 'Pila gastada de un juguete o control remoto.',
    tip: 'Las pilas contienen metales pesados como mercurio o cadmio. ¡Van al contenedor especial rojo!',
    points: 25
  },
  {
    id: 'item-5',
    name: 'Caja de Cartón Seca',
    category: 'blanco',
    icon: '📦',
    description: 'Caja limpia desarmada y doblada.',
    tip: 'El cartón limpio se recicla para fabricar nuevos empaques evitando la tala de árboles.',
    points: 15
  },
  {
    id: 'item-6',
    name: 'Cáscara de Manzana y Pera',
    category: 'verde',
    icon: '🍎',
    description: 'Restos de fruta natural.',
    tip: 'En la IED Pío X la convertimos en humus mediante lombricultura.',
    points: 10
  },
  {
    id: 'item-7',
    name: 'Lata de Aluminio',
    category: 'blanco',
    icon: '🥫',
    description: 'Lata limpia de bebida o alimento en conserva.',
    tip: 'El aluminio se puede reciclar infinitas veces sin perder sus propiedades.',
    points: 20
  },
  {
    id: 'item-8',
    name: 'Papel Higiénico Usado',
    category: 'negro',
    icon: '🧻',
    description: 'Residuo del baño no reciclable.',
    tip: 'Por razones sanitarias va directamente a la caneca negra.',
    points: 10
  },
  {
    id: 'item-9',
    name: 'Bombillo de Luz Ahorrador',
    category: 'rojo',
    icon: '💡',
    description: 'Bombillo o tubo fluorescente fuera de uso.',
    tip: 'Debe entregarse en puntos de recolección Lúmina para evitar vapores de mercurio.',
    points: 25
  },
  {
    id: 'item-10',
    name: 'Cuaderno Usado con Hojas Limpias',
    category: 'blanco',
    icon: '📓',
    description: 'Hojas de papel y papel de archivo sin grasa.',
    tip: 'Reciclar 1 tonelada de papel salva aproximadamente 17 árboles adultos.',
    points: 15
  },
  {
    id: 'item-11',
    name: 'Restos de Café / Borra',
    category: 'verde',
    icon: '☕',
    description: 'Desecho vegetal de la cocina.',
    tip: 'Es un excelente fertilizante natural rico en nitrógeno para las plantas.',
    points: 10
  },
  {
    id: 'item-12',
    name: 'Envoltorio Metalizado de Galletas',
    category: 'negro',
    icon: '🍫',
    description: 'Empaque plásticos laminados complejos.',
    tip: 'Estos empaques multicapa van al contenedor negro si no hay proyecto de botellitas de amor.',
    points: 10
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Estudiante',
  grade: '',
  school: '',
  xp: 1420,
  level: 4,
  levelTitle: 'Guardián del Páramo y el Bosque',
  streakDays: 12,
  itemsRecycled: 184,
  treesPlanted: 5,
  completedWorkshops: ['ws-1', 'ws-2'],
  badges: [
    {
      id: 'badge-jugar',
      name: 'Insignia por Jugar 🎮',
      description: 'Otorgada por participar y jugar en los minijuegos ecológicos de Ecocalipsis.',
      icon: 'https://i.ibb.co/fdm5702R/90890f69ab5a4d5fb1a2e1bdd29341de-removebg-preview.png',
      unlocked: false,
      requiredXP: 0
    },
    {
      id: 'badge-lorax',
      name: 'Insignia Taller de Lorax 🌳',
      description: 'Otorgada por completar y responder correctamente la evaluación del Taller de El Lorax.',
      icon: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
      unlocked: false,
      requiredXP: 250
    },
    {
      id: 'badge-reciclaje',
      name: 'Insignia Taller de Reciclaje ♻️',
      description: 'Otorgada por completar y responder correctamente la evaluación del Taller de El Reciclaje.',
      icon: 'https://i.ibb.co/Mx8yc33z/images-removebg-preview-6.png',
      unlocked: false,
      requiredXP: 250
    }
  ]
};

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'ch-1',
    title: 'Lonchera Cero Plástico',
    description: 'Lleva hoy tu merienda a la IED Pío X en recipiente reutilizable sin bolsas de un solo uso.',
    xpReward: 50,
    completed: true,
    category: 'escuela'
  },
  {
    id: 'ch-2',
    title: 'Detective de Residuos',
    description: 'Separa los desechos de tu casa usando la caneca verde para orgánicos y blanca para reciclables.',
    xpReward: 60,
    completed: true,
    category: 'hogar'
  },
  {
    id: 'ch-3',
    title: 'Ahorrador de Energía',
    description: 'Apaga las luces y desconecta cargadores de celular cuando no se estén utilizando.',
    xpReward: 40,
    completed: false,
    category: 'hogar'
  },
  {
    id: 'ch-4',
    title: 'Guardián de la Llave',
    description: 'Cierra el grifo de agua mientras te cepillas los dientes o te enjabonas las manos.',
    xpReward: 50,
    completed: false,
    category: 'escuela'
  }
];

export const WORKSHOP_MODULES: WorkshopModule[] = [
  {
    id: 'ws-lorax',
    title: 'El Lorax',
    duration: '',
    level: '',
    summary: '',
    icon: '🌳',
    videoUrl: 'https://ok.ru/videoembed/7461508024964?nochat=1&hd=1',
    content: [
      '🌳 Introducción: Los árboles son uno de los recursos naturales más importantes para la vida en la Tierra. Nos proporcionan el oxígeno que respiramos, ayudan a regular el clima, protegen las fuentes de agua y sirven de hogar para miles de especies de animales y plantas.',
      'Sin embargo, cada año millones de árboles son talados por la expansión de las ciudades, la agricultura, la minería y la explotación de la madera. Esto provoca la pérdida de biodiversidad y el aumento de la temperatura global.',
      '¿Qué es un árbol?: Un ser vivo que nace de una semilla, crece durante muchos años y cumple funciones fundamentales. Partes: Raíz, Tronco, Ramas, Hojas, Flores y Frutos.',
      '🍃 ¿Por qué son importantes?: Producen oxígeno mediante fotosíntesis, ayudan a combatir el cambio climático almacenando carbono, albergan miles de especies, protegen el agua (infiltración en acuíferos), evitan la erosión y regulan la temperatura.',
      'Colombia biodiversa: Nuestro país posee ecosistemas como la Amazonía, Bosques Andinos, Bosques secos tropicales, Selvas del Chocó y la Orinoquía, todos dependientes de los árboles.',
      'Deforestación y Amenazas: Tala indiscriminada, incendios forestales, minería ilegal y expansión urbana. Consecuencias: sequías, inundaciones, pérdida de especies y aire contaminado.',
      '💛 El Lorax: El Lorax representa la voz de la naturaleza y nos recuerda que los árboles no pueden defenderse solos. Es una profunda reflexión sobre las consecuencias de consumir recursos sin pensar en el futuro.',
      '🎥 Video de Análisis (Farid Dieck): Observa el video integrado de El Lorax para reflexionar sobre nuestras decisiones y la responsabilidad con las futuras generaciones.',
      '🌱 ¿Qué podemos hacer?: Sembrar árboles, no desperdiciar papel, reciclar, cuidar parques, ahorrar agua, enseñar a otros y participar en jornadas ambientales.',
      'Actividad "Adopta un árbol": Elige un árbol cercano a tu casa o colegio durante un mes y registra sus cambios, animales que lo visitan y sus cuidados.',
      'Sabías que... Un árbol adulto produce oxígeno para varias personas al día, y más del 80% de la biodiversidad terrestre vive en los bosques.'
    ],
    quiz: [
      {
        question: '¿Qué función fundamental cumplen las raíces de los árboles en el ciclo del agua?',
        options: [
          'Calientan el suelo de los bosques',
          'Ayudan a infiltrar el agua de lluvia en el suelo y alimentan los acuíferos',
          'Consumen toda el agua potable de la región',
          'Impiden que llueva en las ciudades'
        ],
        correctIndex: 1,
        explanation: '¡Excelente! Las raíces permiten que el agua de lluvia penetre y recargue los acuíferos naturales.'
      },
      {
        question: '¿Qué representa el personaje de El Lorax en la historia?',
        options: [
          'A una máquina cortadora de árboles',
          'A la voz de la naturaleza que nos recuerda cuidar el bosque',
          'A un animal nocturno del desierto',
          'A un guardabosques industrial'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! El Lorax habla en nombre de los árboles porque ellos no pueden defenderse por sí mismos.'
      },
      {
        question: '¿Cuál es una consecuencia directa de la deforestación masiva?',
        options: [
          'Aumento de la biodiversidad',
          'Aire más limpio en las ciudades',
          'Sequías, inundaciones y pérdida de especies',
          'Enfriamiento global del planeta'
        ],
        correctIndex: 2,
        explanation: '¡Muy bien! Cortar bosques sin control genera pérdida de especies, sequías y calentamiento global.'
      }
    ]
  },
  {
    id: 'ws-reciclaje',
    title: 'El Reciclaje',
    duration: '',
    level: '',
    summary: '',
    icon: '♻️',
    videoUrl: 'https://www.youtube.com/embed/VXPLOq92kHI',
    content: [
      '🟢 1. ¿Qué es reciclar?: Reciclar es darle una supersegunda vida a los materiales que ya usamos. En lugar de tirarlos a la basura, los transformamos en materia prima para crear objetos completamente nuevos.',
      '🔵 2. Separar los Residuos: La clave del éxito es la Separación en la Fuente. Usamos canecas de colores: Blanca (Aprovechables limpios), Verde (Orgánicos) y Negra (No aprovechables).',
      '🟡 3. Recolectar: Los recicladores de oficio y camiones de ruta selectiva recogen los materiales separados y los llevan a las Estaciones de Clasificación.',
      '🟠 4. Clasificar: En la planta, se dividen meticulosamente por material: Plásticos PET, Polietileno, Vidrio de colores, Cartón y Metales.',
      '🔴 5. Transformar: Los materiales se lavan, se trituran en pequeñas escamas o se funden para convertirse en materia prima industrial de alta calidad.',
      '🟣 6. Fabricar: Con esa materia prima recuperada fabricamos ropa deportiva, bancas para parques, nuevos empaques, cuadernos y juguetes.',
      '🟢 7. Usar otra vez: Las personas compran y usan los nuevos productos ecológicos, cerrando el ciclo de la Economía Circular.'
    ],
    quiz: [
      {
        question: '¿Qué significa reciclar?',
        options: [
          'Quemar los materiales inservibles en la calle',
          'Convertir materiales que ya usamos en nuevos productos y materia prima',
          'Tirar toda la basura junta al mismo contenedor',
          'Enterrar el plástico en el jardín'
        ],
        correctIndex: 1,
        explanation: '¡Excelente! Reciclar transforma materiales usados en materia prima para fabricar nuevos productos.'
      },
      {
        question: 'En Colombia, ¿en qué caneca van los residuos reciclables limpios (papel, plástico, vidrio, metal)?',
        options: [
          'Caneca Verde',
          'Caneca Blanca',
          'Caneca Negra',
          'Caneca Roja'
        ],
        correctIndex: 1,
        explanation: '¡Muy bien! La Caneca Blanca es para todos los residuos aprovechables, limpios y secos.'
      },
      {
        question: '¿Qué sucede al final en la etapa 7 ("Usar otra vez") del ciclo de reciclaje?',
        options: [
          'Los productos se arrojan a los ríos',
          'Las personas compran y usan los productos reciclados, cerrando la Economía Circular',
          'Se destruyen los contenedores de basura',
          'El proceso se detiene para siempre'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! Las personas compran y usan esos productos sostenibles y el ciclo vuelve a empezar para proteger el planeta.'
      }
    ]
  }
];

export const ECO_TIPS: EcoTipItem[] = [
  {
    id: 'tip-1',
    title: 'El Secreto del Cepillado Eficiente',
    category: 'agua',
    icon: '🪥',
    shortText: 'Usa un vaso con agua al cepillarte los dientes.',
    detailedText: 'Dejar el grifo abierto mientras te cepillas malgasta hasta 12 litros de agua por minuto. Si usas un vaso, solo emplearás 0.25 litros. ¡Un ahorro gigantesco!',
    impactScore: 'Ahorro: ~300 litros/mes'
  },
  {
    id: 'tip-2',
    title: 'Desconecta los "Vampiros de Energía"',
    category: 'energia',
    icon: '🔌',
    shortText: 'Desenchufa los cargadores y electrodomésticos sin usar.',
    detailedText: 'Los cargadores conectados a la pared consumen electricidad aunque el celular no esté conectado. Desenchufarlos protege los aparatos y reduce el consumo familiar.',
    impactScore: 'Ahorro: 10% factura eléctrica'
  },
  {
    id: 'tip-3',
    title: 'Botella de Amor / Eco-Ladrillos',
    category: 'residuos',
    icon: '🍾',
    shortText: 'Empaca plásticos limpios y flexibles en una botella PET.',
    detailedText: 'Rellena botellas de plástico vacías con empaques flexibles bien compactados. Estas botellas sirven para fabricar madera plástica para parques e infraestructura escolar.',
    impactScore: 'Impacto: 500g plástico reutilizado'
  },
  {
    id: 'tip-4',
    title: 'Protege a nuestras Aves y Polinizadores',
    category: 'biodiversidad',
    icon: '🐝',
    shortText: 'Siembra flores nativas en el jardín de la escuela o tu ventana.',
    detailedText: 'Las abejas y colibríes en Colombia necesitan néctar sin insecticidas. Sembrar plantas como el salvión o la maracuyá ayuda a conservar la fauna nativa.',
    impactScore: 'Impacto: Hábitat para abejas'
  }
];

export const NEWS_EVENTS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Jornada Ambiental y Siembratón en la IED Pío X',
    date: '15 de Agosto, 2026',
    category: 'Evento',
    summary: 'Estudiantes, docentes y familias se reunirán para sembrar 80 especies nativas en los jardines escolares.',
    content: 'Con entusiasmo compartimos que la Institución Educativa Departamental Pío X liderará una gran siembratón escolar. Contaremos con la asesoría de biólogos de la región para sembrar chicalás, guayacanes y arbolitos polinizadores.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    location: 'Sede Principal - IED Pío X'
  },
  {
    id: 'news-2',
    title: 'Inauguración del Punto Ecológico Verde y Blanco',
    date: '2 de Agosto, 2026',
    category: 'Logro',
    summary: 'Se instalaron 6 nuevos puntos ecológicos adaptados al código de colores Resolución 2184.',
    content: 'Gracias al esfuerzo del proyecto Ecocalipsis y a la comunidad educativa, los patios de la escuela cuentan con contenedores modernos para incentivar la recolección selectiva.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    location: 'Patios y Comedor Escolar'
  },
  {
    id: 'news-3',
    title: 'Taller Escolar: "De la Lonchera al Compost"',
    date: '22 de Julio, 2026',
    category: 'Taller',
    summary: 'Más de 120 niños aprendieron a clasificar los restos de sus loncheras para enriquecer la huerta.',
    content: 'Los niños de primaria disfrutaron de dinámicas de grupo, juegos de roles y prácticas de separación directa con composteras didácticas transparentes.',
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
    location: 'Aula Máxima IED Pío X'
  }
];

export const TREE_INITIATIVES: TreeInitiative[] = [
  {
    id: 'init-1',
    title: 'Siembra un Árbol Nativo en el Bosque Altoandino',
    organization: 'Fundación Natura Colombia',
    region: 'Andina - Cundinamarca / Boyacá',
    department: 'Cundinamarca',
    description: 'Reforestación con árboles autóctonos como el Guayacán de Manizales, Roble y Palma de Cera en zonas protegidas.',
    impactMetric: '+120,000 Árboles sembrados en bosques de niebla',
    websiteUrl: 'https://www.natura.org.co',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    speciesPlanted: ['Guayacán', 'Roble Andino', 'Chicalá', 'Aliso'],
    supportOptions: [
      'Compromiso de Siembra Virtual',
      'Cuidado de Semillero Escolar',
      'Voluntariado de Reforestación'
    ]
  },
  {
    id: 'init-2',
    title: 'Restauración de Páramos y Frailejones',
    organization: 'Red de Árboles & Conservación Internacional',
    region: 'Páramo de Sumapaz y Chingaza',
    department: 'Cundinamarca & Meta',
    description: 'Proyecto dedicado al vivero y siembra de frailejones y especies de alta montaña para proteger las fuentes hídricas. En el Páramo de Sumapaz la vegetación no se utiliza para fabricar cuadernos ni papel; su única función es cosechar agua dulce y alimentar acuíferos.',
    impactMetric: '+45,000 Frailejones protegidos',
    websiteUrl: 'https://www.reddearboles.org',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    speciesPlanted: ['Frailejón Espeletia', 'Siete Cueros', 'Rastrojo de Montaña'],
    supportOptions: [
      'Adopción Simbólica Escolar',
      'Promoción de Hábitos de Cuidado del Agua',
      'Campaña Cero Plástico'
    ]
  },
  {
    id: 'init-3',
    title: 'Bosques para la Biodiversidad en la IED Pío X',
    organization: 'Comunidad Educativa Pío X & Voluntariado',
    region: 'Entorno Local IED Pío X',
    department: 'Cundinamarca',
    description: 'Siembra directa en los predios escolares y quebradas cercanas para crear corredores biológicos de mariposas y aves.',
    impactMetric: '350 Árboles sembrados por los niños Pío X',
    websiteUrl: '#',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    speciesPlanted: ['Chicalá Amarillo', 'Sangregado', 'Sauce Llorón', 'Hayuelo'],
    supportOptions: [
      'Donación de Abono Orgánico',
      'Participación Estudiantil',
      'Cuidado de Riego Semanal'
    ]
  }
];

export const IMPACT_STATS_DATA: ImpactStatsData = {
  studentsBenefited: 485,
  workshopsCompleted: 42,
  kgRecycledTotal: 1840,
  treesPlantedTotal: 350,
  co2SavedKg: 3120,
  schoolsPartnered: 3,
  monthlyRecycling: [
    { month: 'Ene', organico: 120, aprovechable: 180, noAprovechable: 60 },
    { month: 'Feb', organico: 150, aprovechable: 210, noAprovechable: 50 },
    { month: 'Mar', organico: 190, aprovechable: 260, noAprovechable: 45 },
    { month: 'Abr', organico: 220, aprovechable: 310, noAprovechable: 40 },
    { month: 'May', organico: 280, aprovechable: 390, noAprovechable: 35 },
    { month: 'Jun', organico: 310, aprovechable: 420, noAprovechable: 30 }
  ],
  categoryBreakdown: [
    { name: 'Plástico PET', value: 38, color: '#34d399' },
    { name: 'Orgánicos (Compost)', value: 32, color: '#4ade80' },
    { name: 'Cartón y Papel', value: 20, color: '#38bdf8' },
    { name: 'Vidrio y Aluminio', value: 10, color: '#a78bfa' }
  ]
};
