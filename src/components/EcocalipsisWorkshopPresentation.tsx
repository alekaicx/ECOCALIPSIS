import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  Leaf, 
  Droplets, 
  Recycle, 
  TreePine, 
  Bird, 
  Gamepad2, 
  Palette, 
  Video, 
  Trophy, 
  Users, 
  Home, 
  School, 
  Globe, 
  HelpCircle,
  Lightbulb,
  Check,
  RotateCcw,
  Maximize,
  Minimize
} from 'lucide-react';

interface EcocalipsisWorkshopPresentationProps {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  onFinishQuiz: () => void;
  quizSubmitted: boolean;
  quizScore: number;
  userAnswers: number[];
  handleAnswerSelect: (optIdx: number, qIdx: number) => void;
  onResetQuiz: () => void;
  onClose: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const ECOCALIPSIS_PRESENTATION_QUIZ = [
  {
    question: '¿Cuál es el lema principal y la misión del proyecto Ecocalipsis?',
    options: [
      'Memorizar libros y teorías científicas difíciles',
      '“Somos la última generación que puede salvar el planeta” y transformar el conocimiento en acciones',
      'Construir fábricas e industrias gigantes en los bosques',
      'Tirar los residuos en cualquier lugar del colegio'
    ],
    correctIndex: 1,
    explanation: '¡Excelente! En Ecocalipsis creemos que las pequeñas acciones de hoy generan grandes cambios y que aprender significa actuar.'
  },
  {
    question: 'En la filosofía de Ecocalipsis, ¿qué significa "Aprender haciendo"?',
    options: [
      'Solo escuchar charlas largas sin participar',
      'Cerrar la llave, separar residuos, sembrar plantas y aplicar buenos hábitos en el colegio y el hogar',
      'Aprender únicamente para los exámenes y luego olvidarlo',
      'No cuidar los recursos naturales'
    ],
    correctIndex: 1,
    explanation: '¡Muy bien! No buscamos que los niños solo memoricen, sino que apliquen hábitos sostenibles todos los días.'
  },
  {
    question: '¿Por qué el proyecto está enfocado principalmente en los estudiantes de tercer grado de la IED Pío X?',
    options: [
      'Porque en la infancia se forman los hábitos, valores y se convierten en pequeños líderes y agentes de cambio',
      'Porque es el único grado que existe en la institución',
      'Porque no les gusta jugar ni aprender',
      'Porque no pueden enseñar a sus familias'
    ],
    correctIndex: 0,
    explanation: '¡Correcto! Los niños son el presente y el futuro: un niño que aprende a cuidar puede inspirar y transformar a toda su familia y comunidad.'
  }
];

export const EcocalipsisWorkshopPresentation: React.FC<EcocalipsisWorkshopPresentationProps> = ({
  currentSlide,
  setCurrentSlide,
  onFinishQuiz,
  quizSubmitted,
  quizScore,
  userAnswers,
  handleAnswerSelect,
  onResetQuiz,
  onClose,
  isFullscreen,
  onToggleFullscreen
}) => {
  // Interactive states for slide 8 tabs
  const [activeTabTema, setActiveTabTema] = useState(0);

  return (
    <div className="w-full min-h-full flex flex-col justify-between max-w-5xl mx-auto py-2">
      {/* SLIDE 0: PORTADA */}
      {currentSlide === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4 }}
          className="space-y-6 text-center flex flex-col items-center py-4"
        >
          <div className="text-emerald-400 text-sm sm:text-base font-bold tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00ff88]" /> Proyecto de Grado • Educación Ambiental IED Pío X
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-emerald-300 to-teal-200 tracking-tight">
              ECOCALIPSIS 🌎🌱
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-200">
              Aprender, cuidar y actuar por nuestro planeta
            </p>
          </div>

          <p className="text-xl sm:text-2xl font-black text-amber-300 italic max-w-2xl">
            “Somos la última generación que puede salvar el planeta”
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
            <img 
              src="https://i.ibb.co/vx4nhDRR/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png" 
              alt="Logo Ecocalipsis" 
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-[0_10px_30px_rgba(0,255,136,0.4)]"
            />
            <div className="text-center sm:text-left space-y-1 max-w-md">
              <h4 className="text-xl font-black text-white">Presentación Oficial del Proyecto</h4>
              <p className="text-base text-emerald-300 font-medium">Diseñado especialmente para estudiantes de Tercer Grado de Primaria</p>
              <p className="text-sm text-slate-300 pt-2 font-normal leading-relaxed">
                Una propuesta pedagógica juvenil, dinámica y transformadora para formar una cultura ambiental activa desde la infancia.
              </p>

              {onToggleFullscreen && (
                <div className="pt-3">
                  <button
                    onClick={onToggleFullscreen}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/15 hover:bg-[#00ff88]/25 text-[#00ff88] border border-[#00ff88]/40 text-xs sm:text-sm font-black transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize className="w-4 h-4" /> Restaurar Pantalla
                      </>
                    ) : (
                      <>
                        <Maximize className="w-4 h-4" /> ⛶ Agrandar a Pantalla Completa
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* SLIDE 1: ¿QUÉ ES ECOCALIPSIS? */}
      {currentSlide === 1 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Diapositiva 2 • Introducción
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#00ff88] tracking-tight">
              ¿Qué es Ecocalipsis? 🌱
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl text-left">
            <p className="text-xl sm:text-2xl text-emerald-100 font-medium leading-relaxed">
              <strong className="text-[#00ff88] font-black">Ecocalipsis</strong> es un proyecto de <strong className="text-amber-300 font-black">educación ambiental</strong> que busca enseñar a los niños a cuidar el planeta mediante juegos, actividades, experiencias vivenciales, recursos audiovisuales y participación activa.
            </p>

            <div className="space-y-1">
              <p className="text-lg sm:text-xl text-slate-200 font-semibold">
                🎯 Dirigido especialmente a estudiantes de <strong className="text-[#00ff88]">tercer grado</strong>, porque desde pequeños se construyen hábitos que perduran toda la vida.
              </p>
            </div>

            <p className="text-xl sm:text-2xl font-black text-amber-300 italic pt-2">
              ✨ "No queremos solo enseñar sobre el medio ambiente. Queremos que los niños se conviertan en protagonistas de su cuidado."
            </p>

            <div className="flex flex-wrap gap-4 pt-4 justify-start">
              <span className="text-base font-bold text-slate-200 flex items-center gap-2">🎮 Juegos</span>
              <span className="text-slate-500">•</span>
              <span className="text-base font-bold text-slate-200 flex items-center gap-2">🎬 Videos</span>
              <span className="text-slate-500">•</span>
              <span className="text-base font-bold text-slate-200 flex items-center gap-2">🌱 Siembra</span>
              <span className="text-slate-500">•</span>
              <span className="text-base font-bold text-slate-200 flex items-center gap-2">♻️ Reciclaje</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* SLIDE 2: EL PROBLEMA */}
      {currentSlide === 2 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-rose-400">
              Diapositiva 3 • Diagnóstico
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-rose-300 tracking-tight">
              El Problema ⚠️
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              Muchas veces la información ambiental se queda únicamente en la teoría.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full text-left pt-2">
            <div>
              <h4 className="text-lg font-black text-rose-200 flex items-center gap-2">
                🌎 Conocemos los problemas
              </h4>
              <p className="text-sm text-slate-300 mt-1">Sabemos que el planeta se está calentando.</p>
            </div>
            <div>
              <h4 className="text-lg font-black text-rose-200 flex items-center gap-2">
                ♻️ Sabemos que hay que reciclar
              </h4>
              <p className="text-sm text-slate-300 mt-1">Reconocemos las canecas y los residuos.</p>
            </div>
            <div>
              <h4 className="text-lg font-black text-rose-200 flex items-center gap-2">
                💧 Sabemos cuidar el agua
              </h4>
              <p className="text-sm text-slate-300 mt-1">Entendemos que el agua potable es limitada.</p>
            </div>
            <div>
              <h4 className="text-lg font-black text-rose-200 flex items-center gap-2">
                🌳 Sabemos proteger la naturaleza
              </h4>
              <p className="text-sm text-slate-300 mt-1">Admiramos la riqueza de los bosques.</p>
            </div>
          </div>

          <div className="space-y-3 max-w-2xl pt-4">
            <p className="text-lg sm:text-xl font-bold text-slate-200">
              Pero... <span className="text-amber-300 font-black">¿Realmente aplicamos esos conocimientos todos los días?</span>
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300">
              🎯 Nuestro reto es transformar el conocimiento en acciones.
            </h3>
          </div>
        </motion.div>
      )}

      {/* SLIDE 3: NUESTRO OBJETIVO */}
      {currentSlide === 3 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Diapositiva 4 • Propósito
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#00ff88] tracking-tight">
              ¿Qué queremos lograr? 🎯
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Fomentar en tercer grado una comprensión profunda y significativa del medio ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full text-left pt-2">
            <div>
              <h4 className="text-lg font-black text-[#00ff88] flex items-center gap-2">
                🌱 Conciencia ambiental
              </h4>
              <p className="text-sm text-slate-200 mt-1">Entender el impacto de nuestras elecciones diarias.</p>
            </div>
            <div>
              <h4 className="text-lg font-black text-[#00ff88] flex items-center gap-2">
                ♻️ Hábitos sostenibles
              </h4>
              <p className="text-sm text-slate-200 mt-1">Separar residuos de forma automática y constante.</p>
            </div>
            <div>
              <h4 className="text-lg font-black text-[#00ff88] flex items-center gap-2">
                💧 Responsabilidad
              </h4>
              <p className="text-sm text-slate-200 mt-1">Cuidado riguroso del agua y recursos naturales.</p>
            </div>
            <div>
              <h4 className="text-lg font-black text-[#00ff88] flex items-center gap-2">
                🌎 Sentido de pertenencia
              </h4>
              <p className="text-sm text-slate-200 mt-1">Amor y orgullo por nuestro entorno escolar y local.</p>
            </div>
            <div className="sm:col-span-2">
              <h4 className="text-lg font-black text-[#00ff88] flex items-center gap-2">
                🏠 Acción en colegio y hogar
              </h4>
              <p className="text-sm text-slate-200 mt-1">Llevar los buenos hábitos y valores a las familias.</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 italic">
              “Aprender para transformar. Transformar para cuidar.” ✨
            </p>
          </div>
        </motion.div>
      )}

      {/* SLIDE 4: NUESTRA MISIÓN */}
      {currentSlide === 4 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Diapositiva 5 • Misión Institucional
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight">
              Nuestra Misión 🎯
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl text-left">
            <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed">
              La misión de <strong className="text-[#00ff88] font-black">Ecocalipsis</strong> es desarrollar procesos de educación ambiental para los estudiantes de tercer grado mediante 5 pilares metodológicos:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <span className="text-base font-bold text-amber-200">Juegos interactivos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎥</span>
                <span className="text-base font-bold text-amber-200">Recursos audiovisuales</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <span className="text-base font-bold text-amber-200">Actividades pedagógicas</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <span className="text-base font-bold text-amber-200">Experiencias prácticas</span>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <span className="text-2xl">🙋</span>
                <span className="text-base font-bold text-amber-200">Participación activa</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-emerald-300 font-semibold pt-4">
              ✨ <strong className="text-white">Propósito:</strong> Fortalecer sus conocimientos, promover prácticas sostenibles y formar una cultura ambiental desde la infancia.
            </p>
          </div>
        </motion.div>
      )}

      {/* SLIDE 5: NUESTRA VISIÓN */}
      {currentSlide === 5 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Diapositiva 6 • Visión 2026
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-sky-300 tracking-tight">
              Nuestra Visión 🔭🌎
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl text-left">
            <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed">
              Para finalizar el <strong className="text-sky-300 font-black">año 2026</strong>, queremos que Ecocalipsis sea reconocido como un proyecto que haya fortalecido profundamente la conciencia ambiental de los estudiantes de tercer grado de la <strong className="text-[#00ff88] font-black">IED Pío X</strong>.
            </p>

            <h3 className="text-2xl sm:text-3xl font-black text-sky-200 italic text-center sm:text-left">
              “Las pequeñas acciones pueden generar grandes cambios.”
            </h3>

            <div className="pt-2">
              <p className="text-base font-bold text-slate-300 mb-3">
                Nuestro sueño es que los estudiantes se conviertan en promotores del cuidado ambiental en:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl mb-1">🏫</div>
                  <div className="text-base font-black text-sky-200">El colegio</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">🏠</div>
                  <div className="text-base font-black text-sky-200">Sus hogares</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">👨‍👩‍👧</div>
                  <div className="text-base font-black text-sky-200">Sus familias</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">🌎</div>
                  <div className="text-base font-black text-sky-200">Su comunidad</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SLIDE 6: NUESTRA FILOSOFÍA */}
      {currentSlide === 6 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Diapositiva 7 • El Corazón del Proyecto
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#00ff88] tracking-tight">
              Nuestra Filosofía 🌱
            </h2>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-amber-300 max-w-2xl leading-tight">
            NO QUEREMOS QUE LOS NIÑOS SOLO MEMORICEN.<br />QUEREMOS QUE APLIQUEN.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full text-left pt-2">
            <div className="space-y-1">
              <p className="text-sm text-slate-400">No es suficiente: <span className="line-through">Saber que el agua es importante</span></p>
              <p className="text-base font-black text-sky-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                Cerrar la llave cuando no la necesita 💧
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-400">No es suficiente: <span className="line-through">Aprender qué es reciclar</span></p>
              <p className="text-base font-black text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                Separar correctamente los residuos ♻️
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-400">No es suficiente: <span className="line-through">Aprender qué es la reforestación</span></p>
              <p className="text-base font-black text-lime-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
                Sembrar, cuidar y proteger una planta 🌱
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-400">No es suficiente: <span className="line-through">Aprender sobre los animales</span></p>
              <p className="text-base font-black text-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                Respetar y proteger la vida silvestre 🐾
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="text-2xl sm:text-3xl font-black text-[#00ff88]">
              En Ecocalipsis, aprender significa actuar. ✨
            </h4>
          </div>
        </motion.div>
      )}

      {/* SLIDE 7: ¿CÓMO ENSEÑAMOS? */}
      {currentSlide === 7 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-purple-400">
              Diapositiva 8 • Metodología Dinámica
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-purple-300 tracking-tight">
              Aprender Haciendo 🎮🌱
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Utilizamos una metodología interactiva y participativa pensada en la infancia.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl w-full text-center pt-2">
            <div>
              <span className="text-4xl">🎭</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Juegos y dinámicas</h4>
            </div>
            <div>
              <span className="text-4xl">🎬</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Videos y animaciones</h4>
            </div>
            <div>
              <span className="text-4xl">🧸</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Personajes interactivos</h4>
            </div>
            <div>
              <span className="text-4xl">🎨</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Actividades artísticas</h4>
            </div>
            <div>
              <span className="text-4xl">🌱</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Experiencias prácticas</h4>
            </div>
            <div>
              <span className="text-4xl">🤝</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Trabajo en equipo</h4>
            </div>
            <div>
              <span className="text-4xl">🙋</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Participación activa</h4>
            </div>
            <div>
              <span className="text-4xl">🏆</span>
              <h4 className="text-sm sm:text-base font-black text-purple-200 mt-2">Retos e insignias</h4>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xl sm:text-2xl font-black text-amber-200 italic max-w-2xl">
              “Cuando un niño participa, experimenta y se divierte, el aprendizaje se vuelve significativo.”
            </p>
          </div>
        </motion.div>
      )}

      {/* SLIDE 8: NUESTROS TEMAS */}
      {currentSlide === 8 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Diapositiva 9 • Cuatro Misiones
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#00ff88] tracking-tight">
              Nuestras Misiones Ambientales 🌎
            </h2>
          </div>

          {/* Clean minimal text selector */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 w-full">
            {[
              { id: 0, icon: '♻️', label: '1. Residuos' },
              { id: 1, icon: '💧', label: '2. Agua' },
              { id: 2, icon: '🌳', label: '3. Plantas' },
              { id: 3, icon: '🐦', label: '4. Biodiversidad' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabTema(tab.id);
                  confetti({ particleCount: 20, spread: 40 });
                }}
                className={`text-sm sm:text-base font-black transition-all cursor-pointer pb-1 border-b-2 ${
                  activeTabTema === tab.id
                    ? 'text-[#00ff88] border-[#00ff88] scale-105'
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Active Mission Details */}
          <div className="max-w-3xl text-left space-y-4 pt-2">
            {activeTabTema === 0 && (
              <>
                <h4 className="text-2xl sm:text-3xl font-black text-emerald-300 flex items-center gap-2">
                  ♻️ 1. Separación de Residuos
                </h4>
                <p className="text-lg text-slate-200 leading-relaxed font-medium">
                  Aprender a diferenciar y clasificar correctamente los residuos aprovechables (blanca), orgánicos (verde) y no aprovechables (negra).
                </p>
                <p className="text-base text-[#00ff88] font-bold">
                  🌟 Meta: Cero basura mezclada en los salones y patios del colegio.
                </p>
              </>
            )}
            {activeTabTema === 1 && (
              <>
                <h4 className="text-2xl sm:text-3xl font-black text-sky-300 flex items-center gap-2">
                  💧 2. El Cuidado del Agua
                </h4>
                <p className="text-lg text-slate-200 leading-relaxed font-medium">
                  Comprender que cada gota cuenta y aprender acciones cotidianas para evitar el desperdicio al lavarse las manos o cepillarse los dientes.
                </p>
                <p className="text-base text-sky-300 font-bold">
                  🌟 Meta: Guardianes de la llave en baños y lavamanos.
                </p>
              </>
            )}
            {activeTabTema === 2 && (
              <>
                <h4 className="text-2xl sm:text-3xl font-black text-lime-300 flex items-center gap-2">
                  🌳 3. Reforestación y Cuidado de las Plantas
                </h4>
                <p className="text-lg text-slate-200 leading-relaxed font-medium">
                  Sembrar, cuidar y crear un vínculo de respeto con la naturaleza, conociendo el valor de los árboles como pulmones del planeta.
                </p>
                <p className="text-base text-lime-300 font-bold">
                  🌟 Meta: Adopta y cuida una planta escolar.
                </p>
              </>
            )}
            {activeTabTema === 3 && (
              <>
                <h4 className="text-2xl sm:text-3xl font-black text-amber-300 flex items-center gap-2">
                  🐦 4. Fauna y Flora Silvestre
                </h4>
                <p className="text-lg text-slate-200 leading-relaxed font-medium">
                  Reconocer y proteger la inmensa biodiversidad de aves, insectos polinizadores y animales que habitan en nuestra región.
                </p>
                <p className="text-base text-amber-300 font-bold">
                  🌟 Meta: Proteger a los polinizadores y aves nativas.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* SLIDE 9: NUESTRA FORMA DE CAPACITAR */}
      {currentSlide === 9 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Diapositiva 10 • Metodología Vivencial
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight">
              No son solo charlas…<br />Son Experiencias 🌟
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full text-left pt-2">
            <div>
              <h4 className="text-base font-black text-amber-200 flex items-center gap-2">
                <span>🗑️</span> Juegos de clasificación
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Dinámicas con canecas reales y virtuales</p>
            </div>
            <div>
              <h4 className="text-base font-black text-amber-200 flex items-center gap-2">
                <span>🎮</span> Retos interactivos
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Misiones sobre el ahorro de agua y energía</p>
            </div>
            <div>
              <h4 className="text-base font-black text-amber-200 flex items-center gap-2">
                <span>🌱</span> Siembra y huerta
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Siembra práctica en los jardines escolares</p>
            </div>
            <div>
              <h4 className="text-base font-black text-amber-200 flex items-center gap-2">
                <span>🎨</span> Murales y arte
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Expresión artística y carteles ecológicos</p>
            </div>
            <div>
              <h4 className="text-base font-black text-amber-200 flex items-center gap-2">
                <span>🎥</span> Videos animados
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Historias audiovisuales de reflexión</p>
            </div>
            <div>
              <h4 className="text-base font-black text-amber-200 flex items-center gap-2">
                <span>🏆</span> Premios e insignias
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Insignias oficiales de Guardián</p>
            </div>
          </div>

          <div className="pt-4 max-w-2xl">
            <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
              “Cada capacitación busca que los niños <strong className="text-[#00ff88] font-black">participen activamente</strong> y tengan la oportunidad de poner en práctica lo aprendido inmediatamente.”
            </p>
          </div>
        </motion.div>
      )}

      {/* SLIDE 10: DEL CONOCIMIENTO A LA ACCIÓN */}
      {currentSlide === 10 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-[#00ff88]">
              Diapositiva 11 • Ruta Formativa
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#00ff88] tracking-tight">
              Del Conocimiento a la Acción 🚀
            </h2>
          </div>

          {/* Process Flow Clean */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-3xl w-full text-center">
            <div className="space-y-1">
              <span className="text-3xl">🧠</span>
              <h4 className="text-base font-black text-[#00ff88]">1. CONOCER</h4>
              <p className="text-xs text-slate-300">Primero enseñamos</p>
            </div>
            <span className="text-emerald-400 font-bold text-xl hidden sm:inline">➔</span>
            <div className="space-y-1">
              <span className="text-3xl">💡</span>
              <h4 className="text-base font-black text-[#00ff88]">2. COMPRENDER</h4>
              <p className="text-xs text-slate-300">Ayudamos a entender</p>
            </div>
            <span className="text-emerald-400 font-bold text-xl hidden sm:inline">➔</span>
            <div className="space-y-1">
              <span className="text-3xl">💚</span>
              <h4 className="text-base font-black text-[#00ff88]">3. SENTIR</h4>
              <p className="text-xs text-slate-300">Conexión emocional</p>
            </div>
            <span className="text-emerald-400 font-bold text-xl hidden sm:inline">➔</span>
            <div className="space-y-1">
              <span className="text-3xl">🌱</span>
              <h4 className="text-base font-black text-[#00ff88]">4. ACTUAR</h4>
              <p className="text-xs text-slate-300">Transformación real</p>
            </div>
          </div>

          {/* Concrete Examples Clean */}
          <div className="space-y-4 max-w-3xl w-full text-left pt-4">
            <div className="space-y-1">
              <p className="text-sm text-slate-400">No solo saber que el plástico contamina</p>
              <p className="text-base font-black text-[#00ff88]">➔ Decidir no botarlo al suelo y reciclarlo 🚯</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-400">No solo saber que el agua es importante</p>
              <p className="text-base font-black text-[#00ff88]">➔ Cerrar la llave mientras nos enjabonamos 💧</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-400">No solo saber qué es reciclar</p>
              <p className="text-base font-black text-[#00ff88]">➔ Separar correctamente en la caneca blanca ⚪</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* SLIDE 11: ¿POR QUÉ NIÑOS DE TERCERO? */}
      {currentSlide === 11 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Diapositiva 12 • Población Objetivo
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight">
              ¿Por qué niños de Tercero? 🎒
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl">
              La infancia es una etapa fundamental para formar hábitos, valores y actitudes que perduran toda la vida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full text-left pt-2">
            <div>
              <h4 className="text-lg font-black text-amber-200 flex items-center gap-2">
                <span>🌱</span> Pequeños Líderes Ambientales
              </h4>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Tienen curiosidad natural, entusiasmo y deseo de proteger la naturaleza.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-black text-amber-200 flex items-center gap-2">
                <span>🏠</span> Replicadores en sus Hogares
              </h4>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Enseñan a sus padres, hermanos y abuelos a no botar basura ni malgastar agua.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-black text-amber-200 flex items-center gap-2">
                <span>🏫</span> Ejemplo para Otros Estudiantes
              </h4>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Inspiran a compañeros de otros grados con sus buenas prácticas en los recreos.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-black text-amber-200 flex items-center gap-2">
                <span>🌎</span> Agentes de Cambio
              </h4>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Son la generación que crecerá con una cultura de sostenibilidad consolidada.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* SLIDE 12: NUESTRO IMPACTO */}
      {currentSlide === 12 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Diapositiva 13 • Huella Positiva
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#00ff88] tracking-tight">
              ¿Qué queremos dejar? 🌟
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Queremos generar transformaciones reales y sostenibles en la IED Pío X.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full text-left pt-2">
            <div>
              <h4 className="text-base font-black text-emerald-200 flex items-center gap-2">
                <span>♻️</span> Mejor manejo de residuos
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Separación adecuada en todas las aulas</p>
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-200 flex items-center gap-2">
                <span>💧</span> Mayor cuidado del agua
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Uso racional y sin desperdicios</p>
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-200 flex items-center gap-2">
                <span>🌱</span> Respeto por las plantas
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Jardines cuidados y arbolitos protegidos</p>
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-200 flex items-center gap-2">
                <span>🐾</span> Valoración de fauna y flora
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Protección de aves y polinizadores</p>
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-200 flex items-center gap-2">
                <span>🏫</span> Cultura ambiental escolar
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Comunidad educativa comprometida</p>
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-200 flex items-center gap-2">
                <span>🏠</span> Hábitos en las familias
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Hogares más limpios y conscientes</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-2xl sm:text-3xl font-black text-amber-300 italic">
              “Un niño que aprende a cuidar puede inspirar a toda una familia.”
            </h3>
          </div>
        </motion.div>
      )}

      {/* SLIDE 13: MENSAJE FINAL */}
      {currentSlide === 13 && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center flex flex-col items-center py-4">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Diapositiva 14 • Compromiso
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-[#00ff88] tracking-tight">
              El Futuro del Planeta También Está en Sus Manos 🌎🤲
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            <p className="text-xl sm:text-2xl text-emerald-100 font-semibold leading-relaxed">
              Nosotros capacitamos a los niños.<br />
              <strong className="text-amber-300 font-black text-2xl sm:text-3xl">Pero queremos que ellos sean quienes continúen el cambio.</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <span className="text-base font-black text-[#00ff88]">🌱 Forma hábitos</span>
              <span className="text-slate-600">•</span>
              <span className="text-base font-black text-amber-300">💡 Despierta conciencia</span>
              <span className="text-slate-600">•</span>
              <span className="text-base font-black text-teal-300">🚀 Transforma acciones</span>
            </div>

            <div className="pt-4">
              <h3 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-emerald-300 to-amber-300 leading-tight">
                🌱 PEQUEÑAS ACCIONES HOY,<br />GRANDES CAMBIOS MAÑANA. 🌎
              </h3>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentSlide(14);
                confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-300 hover:from-[#2effa0] hover:to-teal-200 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,136,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              🏆 Ir a la Evaluación y Ganar la Insignia Ecocalipsis 🎖️ ➡️
            </button>
          </div>
        </motion.div>
      )}

      {/* SLIDE 14: EVALUACIÓN Y CERTIFICACIÓN OFICIAL */}
      {currentSlide === 14 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl mx-auto w-full py-4">
          {!quizSubmitted ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-[#00ff88]">
                  Evaluación Final • Capacitación Ecocalipsis
                </span>
                <h4 className="text-3xl sm:text-4xl font-black text-white">Demuestra lo que aprendiste</h4>
                <p className="text-base text-slate-300">
                  Responde las 3 preguntas para recibir tu <strong className="text-amber-300">Insignia Oficial de Ecocalipsis</strong> y +250 XP.
                </p>
              </div>

              <div className="space-y-6">
                {ECOCALIPSIS_PRESENTATION_QUIZ.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-3 text-left">
                    <h5 className="text-base sm:text-lg font-black text-emerald-200">
                      {qIdx + 1}. {q.question}
                    </h5>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[qIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswerSelect(optIdx, qIdx)}
                            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'text-[#00ff88] font-black'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#00ff88] bg-[#00ff88]' : 'border-slate-500'
                            }`} />
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  disabled={userAnswers.length < ECOCALIPSIS_PRESENTATION_QUIZ.length || userAnswers.includes(undefined as any)}
                  onClick={onFinishQuiz}
                  className={`px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-3 ${
                    userAnswers.length === ECOCALIPSIS_PRESENTATION_QUIZ.length && !userAnswers.includes(undefined as any)
                      ? 'bg-gradient-to-r from-amber-400 to-[#00ff88] hover:from-amber-300 hover:to-[#2effa0] text-slate-950 cursor-pointer scale-105'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  🏆 ¡Finalizar Capacitación y Desbloquear Insignia! ✨
                </button>
              </div>
            </div>
          ) : (
            (() => {
              const isPassed = quizScore === ECOCALIPSIS_PRESENTATION_QUIZ.length;

              if (isPassed) {
                return (
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
                    <div className="text-5xl animate-bounce">🎖️</div>
                    <div className="space-y-2">
                      <h4 className="text-3xl sm:text-4xl font-black text-white">¡Insignia Oficial Ecocalipsis Desbloqueada! 🏅</h4>
                      <p className="text-base text-amber-200 max-w-md mx-auto">
                        Has aprobado la evaluación con <strong className="text-amber-300">3 de 3 correctas</strong>. Eres oficialmente un <strong className="text-[#00ff88]">Líder Ambiental Ecocalipsis</strong> (+250 XP).
                      </p>
                    </div>

                    <div className="flex justify-center py-4">
                      <img 
                        src="https://i.ibb.co/vx4nhDRR/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png" 
                        alt="Insignia Ecocalipsis" 
                        className="w-48 h-48 sm:w-60 sm:h-60 object-contain drop-shadow-[0_10px_35px_rgba(0,255,136,0.8)]" 
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        onClick={onClose}
                        className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer"
                      >
                        🎉 Volver al Inicio
                      </button>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
                  <div className="text-4xl">❌</div>
                  <div className="space-y-2">
                    <span className="text-sm font-black uppercase text-rose-300">
                      Respuestas Correctas: {quizScore} de {ECOCALIPSIS_PRESENTATION_QUIZ.length}
                    </span>
                    <h4 className="text-3xl font-black text-white">¡Casi lo logras!</h4>
                    <p className="text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                      Para obtener la <strong className="text-amber-300">Insignia Oficial</strong> debes responder todas las preguntas correctamente. ¡Inténtalo de nuevo!
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={onResetQuiz}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      🔄 Reintentar Evaluación
                    </button>
                  </div>
                </motion.div>
              );
            })()
          )}
        </motion.div>
      )}
    </div>
  );
};
