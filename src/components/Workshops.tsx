import React, { useState } from 'react';
import { WorkshopModule, StudentProfile } from '../types';
import { WORKSHOP_MODULES } from '../data/mockData';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  CheckCircle, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Play,
  PlayCircle,
  TreePine,
  ShieldCheck,
  Heart,
  HelpCircle,
  Smile,
  Leaf,
  Droplets,
  Wind,
  Tv,
  Factory,
  Vote,
  Lightbulb,
  HandHeart,
  Users,
  Building2,
  Droplet,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { EcocalipsisWorkshopPresentation, ECOCALIPSIS_PRESENTATION_QUIZ } from './EcocalipsisWorkshopPresentation';

interface WorkshopsProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
  onWorkshopOpenChange?: (isOpen: boolean) => void;
  onNavigate?: (section: any) => void;
}

export const Workshops: React.FC<WorkshopsProps> = ({ 
  student, 
  setStudent, 
  onTriggerBadgeAction, 
  onWorkshopOpenChange,
  onNavigate 
}) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopModule | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // 0: Video, 1: Intro, 2: Importance, 3: Threats, 4: Lorax Action, 5: Quiz
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [plantedSeeds, setPlantedSeeds] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [forestBloomed, setForestBloomed] = useState(false);
  const [userPledge, setUserPledge] = useState('Proteger las plantas y árboles de mi entorno');
  const [pledgeSigned, setPledgeSigned] = useState(false);
  const [dilemmaAnswers, setDilemmaAnswers] = useState<Record<number, number>>({});
  const [colombiaStep, setColombiaStep] = useState(0);
  const [reflectionAudience, setReflectionAudience] = useState<'kids' | 'youth' | null>(null);
  const [activeYouthTab, setActiveYouthTab] = useState<number>(0);

  // Reciclaje interactive states
  const [reciclajeAnswer1, setReciclajeAnswer1] = useState<string>('');
  const [reciclajeAnswer2, setReciclajeAnswer2] = useState<number | null>(null);
  const [reciclajeAnswer3, setReciclajeAnswer3] = useState<string | null>(null);
  const [reciclajeAnswer4, setReciclajeAnswer4] = useState<string | null>(null);
  const [reciclajeAnswer5, setReciclajeAnswer5] = useState<string | null>(null);
  const [reciclajeAnswer6, setReciclajeAnswer6] = useState<string>('');
  const [reciclajeAnswer7, setReciclajeAnswer7] = useState<string | null>(null);

  const handleFinishAndReturnToStart = () => {
    setSelectedWorkshop(null);
    setCurrentSlide(0);
    setReflectionAudience(null);
    setActiveYouthTab(0);
    onWorkshopOpenChange?.(false);
    confetti({ particleCount: 90, spread: 80 });
    if (onNavigate) {
      onNavigate('quienes-somos');
    }
  };

  React.useEffect(() => {
    onWorkshopOpenChange?.(selectedWorkshop !== null);
  }, [selectedWorkshop, onWorkshopOpenChange]);

  const handleStartWorkshop = (ws: WorkshopModule) => {
    setSelectedWorkshop(ws);
    setCurrentSlide(0);
    setUserAnswers([]);
    setQuizSubmitted(false);
    setQuizScore(0);
    setWaterLevel(0);
    setPlantedSeeds([]);
    setRevealedCards([]);
    setForestBloomed(false);
    setPledgeSigned(false);
    setDilemmaAnswers({});
    setColombiaStep(0);
    setReflectionAudience(null);
    setActiveYouthTab(0);
    setReciclajeAnswer1('');
    setReciclajeAnswer2(null);
    setReciclajeAnswer3(null);
    setReciclajeAnswer4(null);
    setReciclajeAnswer5(null);
    setReciclajeAnswer6('');
    setReciclajeAnswer7(null);
  };

  const handleAnswerSelect = (optionIdx: number, questionIdx: number) => {
    const updated = [...userAnswers];
    updated[questionIdx] = optionIdx;
    setUserAnswers(updated);
  };

  const handleResetQuiz = () => {
    setQuizSubmitted(false);
    setUserAnswers([]);
    setQuizScore(0);
  };

  const handleFinishQuiz = () => {
    if (!selectedWorkshop) return;
    let correctCount = 0;
    selectedWorkshop.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    setQuizScore(correctCount);
    setQuizSubmitted(true);

    if (correctCount === selectedWorkshop.quiz.length) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      setStudent((prev) => ({
        ...prev,
        xp: prev.xp + 250,
        completedWorkshops: Array.from(new Set([...prev.completedWorkshops, selectedWorkshop.id]))
      }));
      if (selectedWorkshop.id === 'ws-reciclaje') {
        onTriggerBadgeAction?.('reciclaje_quiz_passed');
      } else if (selectedWorkshop.id === 'ws-ecocalipsis') {
        onTriggerBadgeAction?.('ecocalipsis_quiz_passed');
      } else {
        onTriggerBadgeAction?.('biodiversity_quiz_correct');
      }
    }
  };

  const slidesCount = selectedWorkshop?.id === 'ws-ecocalipsis' ? 15 : selectedWorkshop?.id === 'ws-reciclaje' ? 9 : 8;
  const quizSlideIndex = selectedWorkshop?.id === 'ws-ecocalipsis' ? 14 : selectedWorkshop?.id === 'ws-reciclaje' ? 8 : 7;

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl backdrop-blur-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#00ff88] tracking-tight">
              Aula Virtual
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Explora nuestros talleres interactivos de educación ambiental.
            </p>
          </div>
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="space-y-4">
        {WORKSHOP_MODULES.map((ws) => {
          const isCompleted = student.completedWorkshops.includes(ws.id);
          const isReciclaje = ws.id === 'ws-reciclaje';
          const isEcocalipsis = ws.id === 'ws-ecocalipsis';
          const cardImg = isEcocalipsis 
            ? "https://i.ibb.co/vx4nhDRR/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png"
            : isReciclaje 
              ? "https://i.ibb.co/Mx8yc33z/images-removebg-preview-6.png" 
              : "https://i.ibb.co/dwZmXvkD/Stickers-for-Sale-removebg-preview.png";

          return (
            <motion.div
              key={ws.id}
              whileHover={{ scale: 1.01, rotate: -0.5 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleStartWorkshop(ws)}
              className="p-5 sm:p-6 rounded-[34px_14px_28px_16px] bg-gradient-to-br from-[#163625] via-[#0f281b] to-[#0a1b12] border-2 border-amber-400/60 shadow-[0_10px_30px_rgba(245,158,11,0.15)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.25)] cursor-pointer transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-amber-400/90"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>

              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.img 
                    src={cardImg} 
                    alt={ws.title} 
                    animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-2xl shrink-0 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    {!isReciclaje && !isEcocalipsis && ws.level && ws.duration && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-[#00ff88] border border-[#00ff88]/30">
                        {ws.level} • {ws.duration}
                      </span>
                    )}
                    {isEcocalipsis && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-[#00ff88] border border-[#00ff88]/30">
                        Presentación Oficial • 14 Diapositivas
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight mt-1">
                      {ws.title}
                    </h3>
                    {ws.summary && (
                      <p className="text-xs text-amber-200/80 font-medium mt-1">
                        {ws.summary}
                      </p>
                    )}
                  </div>
                </div>

                {isCompleted && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#00ff88] bg-[#00ff88]/20 px-3 py-1 rounded-full border border-[#00ff88]/30 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" /> ¡Completado!
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-end text-xs text-slate-300 font-medium relative z-10">
                <span className="font-extrabold text-slate-950 flex items-center gap-1.5 bg-amber-400 px-4 py-2 rounded-[12px_6px_14px_8px] shadow-md hover:bg-amber-300 transition-all">
                  Iniciar <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Immersive Full-Screen / Modal Presentation */}
      <AnimatePresence>
        {selectedWorkshop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#06140e] bg-gradient-to-b from-[#0c2016] via-[#08170f] to-[#040c08] overflow-y-auto flex flex-col min-h-screen w-full text-left"
          >
            <div className="w-full min-h-screen flex flex-col p-4 sm:p-8 md:p-12 relative text-left space-y-6 pb-28 max-w-6xl mx-auto justify-between">
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#183225]/80 hover:bg-[#204432] text-white flex items-center justify-center text-lg font-bold border border-[#00ff88]/40 shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-110"
                title="Cerrar"
              >
                ✕
              </button>

              {/* Progress bar */}
              <div className="w-full bg-[#132a1e] h-2.5 rounded-full overflow-hidden border border-[#00ff88]/20">
                <div 
                  className="bg-gradient-to-r from-[#00ff88] to-[#10b981] h-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / slidesCount) * 100}%` }}
                ></div>
              </div>

              {/* Slides Content - Spacious & Scrollable */}
              <div className="space-y-6 pb-8 flex-1">
                {/* ECOCALIPSIS WORKSHOP PRESENTATION (ws-ecocalipsis) */}
                {selectedWorkshop.id === 'ws-ecocalipsis' ? (
                  <EcocalipsisWorkshopPresentation
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    onFinishQuiz={handleFinishQuiz}
                    quizSubmitted={quizSubmitted}
                    quizScore={quizScore}
                    userAnswers={userAnswers}
                    handleAnswerSelect={handleAnswerSelect}
                    onResetQuiz={handleResetQuiz}
                    onClose={() => setSelectedWorkshop(null)}
                  />
                ) : (
                  <>
                    {/* Slide 0: Clean Expanded Movie / Video Presentation */}
                    {currentSlide === 0 && (
                      selectedWorkshop.id === 'ws-reciclaje' ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-4xl sm:max-w-5xl mx-auto text-center flex flex-col items-center">
                          <div className="space-y-3 max-w-2xl mx-auto text-center">
                            <h4 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-[#00ff88] to-teal-200 tracking-tight drop-shadow-md">
                              El Reciclaje
                            </h4>
                            <p className="text-sm sm:text-lg font-semibold text-emerald-100/90 max-w-xl mx-auto leading-relaxed tracking-wide">
                              Aprende el ciclo de transformación de los materiales, cómo separar adecuadamente y proteger nuestro planeta.
                            </p>
                          </div>

                          {/* Embedded YouTube Video Container */}
                          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-[#00ff88]/80 shadow-[0_20px_50px_rgba(0,255,136,0.25)] bg-black/90 group">
                            <iframe
                              className="w-full h-full"
                              src="https://www.youtube.com/embed/VXPLOq92kHI"
                              title="El Reciclaje"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>

                          <div className="pt-2">
                            <p className="text-base sm:text-xl font-extrabold text-[#00ff88] tracking-wide inline-flex items-center gap-2 drop-shadow-md">
                              Pon atención, toma apuntes y disfruta
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-4xl sm:max-w-5xl mx-auto text-center flex flex-col items-center">
                          <div className="space-y-3 max-w-2xl mx-auto text-center">
                            <h4 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 tracking-tight drop-shadow-md">
                              El Lorax
                            </h4>
                            <p className="text-sm sm:text-lg font-semibold text-amber-100/90 max-w-xl mx-auto leading-relaxed tracking-wide">
                              "Hablo por los árboles, ya que los árboles no tienen lenguas." ¡Disfruta la película y descubre la magia de la naturaleza!
                            </p>
                          </div>

                          {/* Embedded OK.ru Video Player */}
                          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-amber-400/80 shadow-[0_20px_50px_rgba(245,158,11,0.3)] bg-black">
                            <iframe
                              className="w-full h-full"
                              src="https://ok.ru/videoembed/7461508024964?nochat=1&hd=1"
                              title="El Lorax"
                              frameBorder="0"
                              allow="autoplay; encrypted-media; fullscreen"
                              allowFullScreen
                            ></iframe>
                          </div>

                          {/* Message below the movie */}
                          <div className="pt-2">
                            <p className="text-base sm:text-xl font-extrabold text-amber-300 tracking-wide inline-flex items-center gap-2 drop-shadow-md">
                              Pon atención, toma apuntes y disfruta
                            </p>
                          </div>
                        </motion.div>
                      )
                    )}

                {/* ==================== EL RECICLAJE SLIDES (ws-reciclaje) ==================== */}
                {/* Reciclaje Slide 1: 🟢 1. Separar los residuos */}
                {currentSlide === 1 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-[#00ff88] tracking-tight">
                      1. Separar los Residuos 🗑️
                    </h4>

                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-1 cursor-pointer"
                    >
                      <img
                        src="https://i.ibb.co/Mx8yc33z/images-removebg-preview-6.png"
                        alt="Reciclar"
                        className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(0,255,136,0.5)]"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      Todo comienza cuando decides <strong className="text-[#00ff88]">separar correctamente los residuos</strong>. No todos los desechos son iguales: en la fuente encontramos{' '}
                      <strong className="text-amber-300">📄 Papel</strong>,{' '}
                      <strong className="text-sky-300">🧴 Plástico</strong>,{' '}
                      <strong className="text-emerald-300">🍾 Vidrio</strong>,{' '}
                      <strong className="text-rose-300">🥫 Metal</strong> y{' '}
                      <strong className="text-lime-300">🍌 Orgánicos</strong>. Si los mezclamos se contaminan, ¡pero si los separamos desde el inicio el proceso es súper rápido!
                    </p>

                    {/* Interactive Question Box */}
                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-[#00ff88]/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-amber-300 flex items-center gap-2">
                        ¿Qué cosas has reciclado en tu casa?
                      </h5>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: 'Botellas 🧴', key: 'botellas' },
                          { label: 'Papel/Cartón 📄', key: 'papel' },
                          { label: 'Latas 🥫', key: 'latas' },
                          { label: 'Vidrio 🍾', key: 'vidrio' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => {
                              setReciclajeAnswer1(item.label);
                              confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                            }}
                            className={`p-3 rounded-2xl text-xs font-black transition-all border cursor-pointer ${
                              reciclajeAnswer1.includes(item.label)
                                ? 'bg-[#00ff88] text-slate-950 border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-[#00ff88]/50'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <input
                          type="text"
                          value={reciclajeAnswer1}
                          onChange={(e) => setReciclajeAnswer1(e.target.value)}
                          placeholder="Escribe lo que has reciclado en tu casa..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-[#00ff88]/40 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reciclaje Slide 2: 🔵 2. Recolección */}
                {currentSlide === 2 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-sky-300 tracking-tight">
                      2. Recolección 🚛
                    </h4>

                    <motion.div
                      animate={{ x: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="text-7xl py-1 drop-shadow-[0_10px_20px_rgba(56,189,248,0.4)]"
                    >
                      🚛
                    </motion.div>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      Una vez separados, los materiales son recogidos por un{' '}
                      <strong className="text-amber-300">🚛 Camión de Reciclaje</strong> o por los recicladores de oficio. Ellos realizan la{' '}
                      <strong className="text-sky-300">Recolección</strong> selectiva y los llevan a la{' '}
                      <strong className="text-emerald-300">🏭 Planta de Reciclaje</strong>. ¡Los residuos deben estar siempre <strong className="text-sky-300 underline decoration-sky-400">limpios y secos</strong>!
                    </p>

                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-sky-400/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-sky-300">
                        ¿En qué caneca depositarías este residuo aprovechable limpio?
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 0, name: '⚪ Caneca Blanca', desc: 'Reciclables limpios (Papel, plástico, vidrio, metal)', correct: true },
                          { id: 1, name: '🟢 Caneca Verde', desc: 'Orgánicos (restos de comida)', correct: false },
                          { id: 2, name: '⬛ Caneca Negra', desc: 'Residuos no aprovechables (papel usado)', correct: false }
                        ].map((caneca) => (
                          <button
                            key={caneca.id}
                            onClick={() => {
                              setReciclajeAnswer2(caneca.id);
                              if (caneca.correct) confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                            }}
                            className={`p-4 rounded-2xl text-left font-bold text-xs transition-all border-l-4 cursor-pointer ${
                              reciclajeAnswer2 === caneca.id
                                ? caneca.correct 
                                  ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                                  : 'bg-rose-500/20 border-rose-400 text-rose-200'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-sky-400'
                            }`}
                          >
                            <div className="font-black text-sm">{caneca.name}</div>
                            <div className="text-[11px] font-normal text-slate-300 mt-1">{caneca.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reciclaje Slide 3: 🟡 3. Clasificación */}
                {currentSlide === 3 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight">
                      3. Clasificación 🏭
                    </h4>

                    <div className="flex gap-4 text-5xl py-1">
                      <span>⚙️</span>
                      <span>🏭</span>
                      <span>📦</span>
                    </div>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      Al llegar a la planta, se realiza la{' '}
                      <strong className="text-orange-300">Clasificación</strong>. Allí, trabajadores expertos y{' '}
                      <strong className="text-yellow-300">⚙️ Máquinas Especializadas</strong> separan cada residuo según su tipo, tamaño, color y <strong className="text-amber-300">material</strong> (plásticos PET, polietileno, vidrio de colores y metales).
                    </p>

                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-amber-400/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-amber-300">
                        ¿Cómo recolectan el reciclaje en tu barrio o colegio?
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          '🚛 ¡Sí, pasa por mi calle o colegio!',
                          '♻️ Le entregamos las bolsas a los recicladores de oficio',
                          '📦 Llevamos el reciclaje a un punto limpio de la ciudad',
                          '🤔 Todavía no, pero aprenderé sus horarios'
                        ].map((ans, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setReciclajeAnswer3(ans);
                              confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                            }}
                            className={`p-4 rounded-2xl text-xs font-bold text-left transition-all border-l-4 cursor-pointer ${
                              reciclajeAnswer3 === ans
                                ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-400/60'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reciclaje Slide 4: 🟠 4. Limpieza */}
                {currentSlide === 4 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-orange-300 tracking-tight">
                      4. Limpieza Profunda 🧼
                    </h4>

                    <div className="flex gap-4 text-5xl py-1">
                      <span>💧</span>
                      <span>🧼</span>
                      <span>✨</span>
                    </div>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      Después de clasificar, es necesario pasar por la{' '}
                      <strong className="text-sky-300">💧 Limpieza</strong>. Con el uso de{' '}
                      <strong className="text-blue-300">Agua</strong> y procesos especiales se remueven restos de comida, tierra y etiquetas. Un{' '}
                      <strong className="text-rose-300">Residuo Limpio</strong> garantiza materia prima pura y de la más alta calidad.
                    </p>

                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-orange-400/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-orange-300">
                        ¿Qué material crees que tarda más en clasificarse?
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            type: 'Plástico 🧴',
                            detail: 'El plástico tarda más porque hay muchos tipos (PET, PEAD, etc.) y colores diferentes.'
                          },
                          {
                            type: 'Papel 📄',
                            detail: 'El papel se separa de forma más directa por cartón, archivo blanco y periódico.'
                          }
                        ].map((mat, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setReciclajeAnswer4(mat.type);
                              confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
                            }}
                            className={`p-4 rounded-2xl text-left font-bold text-xs transition-all border-l-4 cursor-pointer ${
                              reciclajeAnswer4 === mat.type
                                ? 'bg-orange-400/20 border-orange-400 text-orange-300 shadow-[0_0_20px_rgba(251,146,60,0.3)]'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-orange-400/60'
                            }`}
                          >
                            <div className="font-black text-sm">{mat.type}</div>
                            <div className="text-[11px] font-normal text-slate-300 mt-1">{mat.detail}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reciclaje Slide 5: 🔴 5. Transformación */}
                {currentSlide === 5 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-rose-300 tracking-tight">
                      5. Transformación ⚙️
                    </h4>

                    <div className="flex gap-4 text-5xl py-1">
                      <span>🧪</span>
                      <span>🔥</span>
                      <span>🌀</span>
                    </div>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      ¡Comienza la transformación en{' '}
                      <strong className="text-rose-300">🌱 Materia Prima</strong>! El plástico se puede{' '}
                      <strong className="text-amber-300">🔥 Derretir</strong> para formar esferas (pellets). El papel se mezcla con agua para crear pasta nueva, mientras el vidrio y el metal se funden para renacer.
                    </p>

                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-rose-400/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-rose-300">
                        ¿Qué productos se pueden fabricar con botellas de plástico recicladas?
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          '👕 Ropa y fibra sintética',
                          '🪑 Bancas de parque de madera plástica',
                          '🧴 Nuevas botellas para bebidas',
                          '✨ ¡Todas las anteriores!'
                        ].map((ans, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setReciclajeAnswer5(ans);
                              confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
                            }}
                            className={`p-4 rounded-2xl text-xs font-bold text-left transition-all border-l-4 cursor-pointer ${
                              reciclajeAnswer5 === ans
                                ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-rose-400/60'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reciclaje Slide 6: 🟣 6. Fabricación */}
                {currentSlide === 6 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-purple-300 tracking-tight">
                      6. Fabricación 🧸
                    </h4>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      Con la materia prima reciclada se inicia la{' '}
                      <strong className="text-purple-300">Fabricación</strong> de nuevos objetos ecológicos como{' '}
                      <strong className="text-indigo-300">📚 Cuadernos</strong>,{' '}
                      <strong className="text-pink-300">👕 Ropa</strong>,{' '}
                      <strong className="text-[#00ff88]">🪑 Bancas</strong> y{' '}
                      <strong className="text-amber-300">🧸 Juguetes</strong>.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
                      {[
                        { title: 'Cuadernos 📚' },
                        { title: 'Botellas 🧴' },
                        { title: 'Bancas 🪑' },
                        { title: 'Juguetes 🧸' },
                        { title: 'Ropa 👕' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-400/40 flex flex-col items-center justify-center text-center">
                          <span className="text-sm font-black text-purple-200">{item.title}</span>
                        </div>
                      ))}
                    </div>

                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-purple-400/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-purple-300">
                        Crea tu invento ecológico: Escribe un objeto nuevo hecho con reciclaje
                      </h5>

                      <input
                        type="text"
                        value={reciclajeAnswer6}
                        onChange={(e) => setReciclajeAnswer6(e.target.value)}
                        placeholder="Escribe tu idea de invento con reciclaje..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-purple-400/40 text-xs text-white focus:outline-none focus:border-purple-300"
                      />

                      {reciclajeAnswer6 && (
                        <p className="text-xs text-purple-300 font-bold bg-purple-500/10 p-3 rounded-xl border border-purple-400/30">
                          ✨ ¡Increíble invento!: "{reciclajeAnswer6}"
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Reciclaje Slide 7: 🟢 7. Un nuevo comienzo */}
                {currentSlide === 7 && selectedWorkshop.id === 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center w-full">
                    <h4 className="text-3xl sm:text-5xl font-black text-[#00ff88] tracking-tight">
                      7. Un Nuevo Comienzo 🛍️
                    </h4>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="text-7xl py-1"
                    >
                      ♻️
                    </motion.div>

                    <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-center">
                      Cuando esos productos llegan a las tiendas, las personas los compran y los utilizan. Al terminar su vida útil se vuelven a{' '}
                      <strong className="text-[#00ff88]">Reutilizar</strong> y{' '}
                      <strong className="text-emerald-300">Reciclar</strong>. Esto es la{' '}
                      <strong className="text-teal-300">🌀 Economía Circular</strong>, protegiendo nuestro planeta.
                    </p>

                    <div className="w-full p-6 rounded-3xl bg-slate-950/70 border-2 border-[#00ff88]/30 space-y-4 text-left">
                      <h5 className="text-base font-black text-[#00ff88]">
                        ¿Qué acción vas a realizar desde hoy para proteger el planeta?
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          'Separar la basura en mi casa 🏠',
                          'Usar botellas reutilizables 🧴',
                          'Enseñar a mis amigos a reciclar 🎒'
                        ].map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setReciclajeAnswer7(action);
                              confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
                            }}
                            className={`p-4 rounded-2xl text-xs font-bold text-left transition-all border-l-4 cursor-pointer ${
                              reciclajeAnswer7 === action
                                ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-[#00ff88]/50'
                            }`}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setCurrentSlide(8);
                          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
                        }}
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                      >
                        🏆 Continuar al Cuestionario de Reciclaje y Ganar Insignia ✨ ➡️
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ==================== LORAX SLIDES (ws-lorax) ==================== */}
                {/* Slide 1: Reflexión Parte 1 - Secciones Niños y Jóvenes con Selección de Nivel */}
                {currentSlide === 1 && selectedWorkshop.id !== 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto text-center flex flex-col items-center w-full">
                    
                    {/* IF NO AUDIENCE SELECTED, SHOW CHOOSING SCREEN */}
                    {reflectionAudience === null ? (
                      <div className="space-y-6 w-full max-w-3xl py-6">
                        <div className="space-y-2 text-center">
                          <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/15 border border-[#00ff88]/30">
                            🌱 Selecciona tu Nivel
                          </span>
                          <h4 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Reflexión Ambiental
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4">
                          {/* Kids Card - Green Liquid Glass */}
                          <motion.div
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setReflectionAudience('kids');
                              confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                            }}
                            className="p-8 rounded-3xl bg-emerald-950/30 backdrop-blur-xl border-2 border-[#00ff88]/40 hover:border-[#00ff88] cursor-pointer shadow-[0_15px_35px_rgba(0,255,136,0.2)] text-center flex flex-col items-center justify-between group transition-all relative overflow-hidden"
                          >
                            <div className="space-y-4 flex flex-col items-center w-full">
                              <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                className="w-36 h-36 flex items-center justify-center my-2"
                              >
                                <img
                                  src="https://i.ibb.co/dwZmXvkD/Stickers-for-Sale-removebg-preview.png"
                                  alt="Niños"
                                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,255,136,0.4)] group-hover:scale-110 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>

                              <h5 className="text-4xl font-black text-[#00ff88] tracking-tight">
                                Niños
                              </h5>
                            </div>
                            <div className="pt-6 w-full">
                              <span className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#00ff88]/20 group-hover:bg-[#00ff88] group-hover:text-slate-950 text-[#00ff88] text-sm font-black border border-[#00ff88]/40 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                                Ingresar ✨
                              </span>
                            </div>
                          </motion.div>

                          {/* Youth Card - Reddish / Rose Translucent Liquid Glass */}
                          <motion.div
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setReflectionAudience('youth');
                              setActiveYouthTab(0);
                              confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                            }}
                            className="p-8 rounded-3xl bg-rose-950/30 backdrop-blur-xl border-2 border-rose-500/40 hover:border-rose-400 cursor-pointer shadow-[0_15px_35px_rgba(244,63,94,0.2)] text-center flex flex-col items-center justify-between group transition-all relative overflow-hidden"
                          >
                            <div className="space-y-4 flex flex-col items-center w-full">
                              <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                                className="w-36 h-36 flex items-center justify-center my-2"
                              >
                                <img
                                  src="https://i.ibb.co/ycs8vhKm/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png"
                                  alt="Jóvenes"
                                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(244,63,94,0.4)] group-hover:scale-110 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>

                              <h5 className="text-4xl font-black text-rose-300 tracking-tight">
                                Jóvenes
                              </h5>
                            </div>
                            <div className="pt-6 w-full">
                              <span className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-500/20 group-hover:bg-rose-500 group-hover:text-white text-rose-300 text-sm font-black border border-rose-400/40 transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                                Ingresar 🚀
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full space-y-4 flex flex-col items-center">
                        {/* Discreet level switcher back button */}
                        <div className="w-full flex items-center justify-start">
                          <button
                            onClick={() => setReflectionAudience(null)}
                            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            ← Cambiar nivel
                          </button>
                        </div>

                        {/* KIDS PATHWAY */}
                        {reflectionAudience === 'kids' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6 max-w-2xl mx-auto flex flex-col items-center"
                          >
                            <h4 className="text-3xl sm:text-4xl font-black text-[#00ff88] tracking-tight">
                              El Mensaje Real detrás de la Película
                            </h4>

                            {/* Floating Lorax Sticker Card */}
                            <motion.div
                              animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                              className="relative cursor-pointer group my-2 p-4 rounded-3xl bg-slate-950/60 border border-emerald-500/20 shadow-2xl"
                              onClick={() => {
                                setForestBloomed(!forestBloomed);
                                confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                              }}
                            >
                              <img
                                src="https://i.ibb.co/dwZmXvkD/Stickers-for-Sale-removebg-preview.png"
                                alt="El Lorax"
                                className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-[0_15px_30px_rgba(0,255,136,0.4)] group-hover:scale-105 transition-transform"
                                referrerPolicy="no-referrer"
                              />
                            </motion.div>

                            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans max-w-xl">
                              <strong className="text-[#00ff88]">El Lorax</strong> nos advierte que el progreso sin conciencia destruye lo más valioso: los árboles que nos dan oxígeno, limpian el aire y protegen las fuentes de agua. ¡Cada árbol que cuidamos ayuda a salvar animales y mantener con vida el planeta!
                            </p>

                            {/* Interactive Bloom Button */}
                            <button
                              onClick={() => {
                                setForestBloomed(true);
                                confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
                              }}
                              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00ff88]/25 via-emerald-950/40 to-transparent border-l-4 border-[#00ff88] text-[#00ff88] font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(0,255,136,0.25)] hover:scale-105 active:scale-95"
                            >
                              {forestBloomed ? '✨ ¡El bosque ha florecido con tu ayuda!' : '🌱 Toca para hacer florecer el bosque de Truffula'}
                            </button>
                          </motion.div>
                        )}

                        {/* YOUTH PATHWAY */}
                        {reflectionAudience === 'youth' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8 max-w-4xl mx-auto flex flex-col items-center w-full relative"
                          >
                            {/* Header */}
                            <div className="text-center space-y-2">
                              <h4 className="text-3xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-[#00ff88] to-cyan-300 tracking-tight">
                                Análisis Crítico: Industrias, Agua y Conciencia Ciudadana
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
                                Una ruta reflexiva sobre la crisis ambiental y el poder juvenil
                              </p>
                            </div>

                            {/* Slide-by-Slide Paginated Window Display */}
                            <div className="w-full min-h-[380px] relative">
                              <AnimatePresence mode="wait">
                                {/* PAGE 0: VIDEO EDUCATIVO */}
                                {activeYouthTab === 0 && (
                                  <motion.div
                                    key="page-0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 relative"
                                  >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#00ff88]/10 blur-[120px] pointer-events-none" />
                                    
                                    <div className="flex items-center gap-3 border-b border-[#00ff88]/20 pb-3">
                                      <div className="p-2.5 rounded-xl bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                                        <Tv className="w-6 h-6" />
                                      </div>
                                      <h5 className="text-2xl sm:text-3xl font-black text-[#00ff88] tracking-tight">
                                        Video Educativo Recomendado
                                      </h5>
                                    </div>

                                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
                                      Observa con atención este video reflexivo para analizar cómo las <span className="text-[#00ff88] font-bold underline decoration-[#00ff88]/40 underline-offset-4">decisiones colectivas e industriales</span> impactan la naturaleza:
                                    </p>

                                    {/* Video Frame */}
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,255,136,0.15)] border border-[#00ff88]/30 bg-black/80 backdrop-blur-xl">
                                      <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/EVp6n1Myd6o"
                                        title="Reflexión ambiental sobre la naturaleza y el impacto humano"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  </motion.div>
                                )}

                                {/* PAGE 1: IMPACTO INDUSTRIAL */}
                                {activeYouthTab === 1 && (
                                  <motion.div
                                    key="page-1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 relative"
                                  >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-500/10 blur-[120px] pointer-events-none" />

                                    <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                        <Factory className="w-6 h-6" />
                                      </div>
                                      <h5 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
                                        Impacto de la Actividad Industrial
                                      </h5>
                                    </div>

                                    <p className="text-lg sm:text-xl text-slate-100 leading-relaxed font-sans font-light">
                                      Las grandes corporaciones consumen y contaminan enormes volúmenes de recursos comunitarios diariamente. Al igual que el personaje del <span className="text-amber-300 font-bold underline decoration-amber-400/40 underline-offset-4">Once-ler (Una-Vez)</span> en El Lorax, la ambición y el progreso sin regulación sacrifican <span className="text-amber-200 font-semibold">bosques enteros y cuencas hídricas</span> para maximizar la producción, acelerando la pérdida irremediable de biodiversidad y alterando el equilibrio natural de la Tierra.
                                    </p>

                                    {/* Fluid Accent Quote */}
                                    <div className="pl-6 border-l-4 border-amber-400 space-y-2 my-6">
                                      <div className="flex items-center gap-2 text-amber-400">
                                        <Lightbulb className="w-6 h-6" />
                                        <span className="text-xs uppercase font-black tracking-widest text-amber-400/80">Reflexión Clave</span>
                                      </div>
                                      <p className="text-base sm:text-xl text-amber-200 font-medium italic leading-relaxed">
                                        "Si no hay leyes claras y estrictamente aplicadas, el progreso desmedido de hoy será la escasez absoluta del mañana."
                                      </p>
                                    </div>
                                  </motion.div>
                                )}

                                {/* PAGE 2: PRIVATIZACIÓN Y CRISIS */}
                                {activeYouthTab === 2 && (
                                  <motion.div
                                    key="page-2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 relative"
                                  >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[120px] pointer-events-none" />

                                    <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
                                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                        <Droplets className="w-6 h-6" />
                                      </div>
                                      <h5 className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight">
                                        Privatización del Agua y Racionamiento
                                      </h5>
                                    </div>

                                    <p className="text-lg sm:text-xl text-slate-100 leading-relaxed font-sans font-light">
                                      En Colombia, diversas fuentes hídricas que solían ser públicas hoy enfrentan privatizaciones y concesiones muy reservadas. Un ejemplo crítico es <span className="text-cyan-300 font-bold underline decoration-cyan-400/40 underline-offset-4">Bogotá</span>, que sufrió un severo racionamiento debido a la desecación y alteración ecológica de sus páramos de origen (como <span className="text-cyan-200 font-semibold">Chingaza</span>), demostrando que lo que considerábamos ilimitado es en realidad frágil.
                                    </p>

                                    {/* Fluid Accent Data */}
                                    <div className="pl-6 border-l-4 border-cyan-400 space-y-2 my-6">
                                      <div className="flex items-center gap-2 text-cyan-400">
                                        <Droplet className="w-6 h-6" />
                                        <span className="text-xs uppercase font-black tracking-widest text-cyan-400/80">Dato Ecológico</span>
                                      </div>
                                      <p className="text-base sm:text-xl text-cyan-200 font-medium italic leading-relaxed">
                                        "¿Sabías que los páramos colombianos producen más del <strong className="text-cyan-300 not-italic font-black text-2xl">70% del agua potable</strong> del país, pero sufren constantes amenazas de minería y ganadería extensiva?"
                                      </p>
                                    </div>
                                  </motion.div>
                                )}

                                {/* PAGE 3: ACCIONES CLAVE Y VOTO CONSCIENTE */}
                                {activeYouthTab === 3 && (
                                  <motion.div
                                    key="page-3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8 relative"
                                  >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#00ff88]/10 blur-[120px] pointer-events-none" />

                                    <div className="flex items-center gap-3 border-b border-[#00ff88]/20 pb-3">
                                      <div className="p-2.5 rounded-xl bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                                        <Vote className="w-6 h-6" />
                                      </div>
                                      <h5 className="text-2xl sm:text-3xl font-black text-[#00ff88] tracking-tight">
                                        Acciones Clave y Voto Consciente
                                      </h5>
                                    </div>

                                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
                                      Para generar un cambio real y duradero frente a la crisis del agua, nuestra acción colectiva e individual debe centrarse en los siguientes <span className="text-[#00ff88] font-bold">pilares de participación cívica</span>:
                                    </p>

                                    {/* Fluid 3 Pillars with Left Borders */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
                                      <div className="space-y-3 border-l-2 border-emerald-400 pl-5 py-1 text-left">
                                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit border border-emerald-500/20">
                                          <Vote className="w-5 h-5" />
                                        </div>
                                        <h6 className="text-white font-black text-sm uppercase tracking-wide">
                                          Elección de Gobernantes
                                        </h6>
                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                          Votar con convicción por líderes con propuestas ecológicas reales que defiendan las fuentes de agua sobre intereses industriales.
                                        </p>
                                      </div>

                                      <div className="space-y-3 border-l-2 border-teal-400 pl-5 py-1 text-left">
                                        <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 w-fit border border-teal-500/20">
                                          <Users className="w-5 h-5" />
                                        </div>
                                        <h6 className="text-white font-black text-sm uppercase tracking-wide">
                                          Conciencia Colectiva
                                        </h6>
                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                          Fomentar una mente social donde el agua se respete como un derecho humano y un bien común inestimable.
                                        </p>
                                      </div>

                                      <div className="space-y-3 border-l-2 border-cyan-400 pl-5 py-1 text-left">
                                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/20">
                                          <Droplet className="w-5 h-5" />
                                        </div>
                                        <h6 className="text-white font-black text-sm uppercase tracking-wide">
                                          Ahorro Activo de Agua
                                        </h6>
                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                          Tomar medidas directas en casa, en el colegio y en la comunidad para conservar de forma proactiva cada gota de agua.
                                        </p>
                                      </div>
                                    </div>

                                    {/* Commitment Action Button */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                      <button
                                        onClick={() => {
                                          setForestBloomed(true);
                                          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
                                        }}
                                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                      >
                                        <Sparkles className="w-5 h-5 text-slate-950" />
                                        <span>
                                          {forestBloomed ? '¡Compromiso de Voto Verde Firmado! ✨' : 'Firmar Compromiso de Conciencia Colectiva y Voto Verde'}
                                        </span>
                                      </button>
                                    </div>
                                  </motion.div>
                                )}

                                {/* PAGE 4: SI QUIERES INVESTIGAR MÁS */}
                                {activeYouthTab === 4 && (
                                  <motion.div
                                    key="page-4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 relative text-left"
                                  >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#00ff88]/10 blur-[120px] pointer-events-none" />

                                    <div className="flex items-center gap-3 border-b border-[#00ff88]/20 pb-3">
                                      <div className="p-2.5 rounded-xl bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                                      </div>
                                      <h5 className="text-xl sm:text-3xl font-black text-[#00ff88] tracking-tight">
                                        Si quieres investigar más 📚
                                      </h5>
                                    </div>

                                    <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-sans">
                                      Profundiza en la realidad ecológica y científica con las siguientes investigaciones y lecturas oficiales recomendadas:
                                    </p>

                                    {/* Transparent Glass Cards without Heavy Box Borders */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                                      {/* Link 1: WWF Colombia */}
                                      <a
                                        href="https://www.wwf.org.co/?386550/deforestacion-colombia-causas-consecuencias"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-5 sm:p-7 rounded-3xl bg-white/[0.02] sm:bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-2xl transition-all group flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
                                      >
                                        <div className="space-y-3">
                                          <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#00ff88] bg-[#00ff88]/10">
                                              🐼 WWF Colombia
                                            </span>
                                            <ExternalLink className="w-4 h-4 text-[#00ff88] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                          </div>
                                          <h6 className="text-lg sm:text-2xl font-black text-white group-hover:text-[#00ff88] transition-colors leading-snug tracking-tight font-sans">
                                            Deforestación en Colombia: Causas y Consecuencias
                                          </h6>
                                          <p className="text-xs sm:text-sm text-slate-300/80 font-light leading-relaxed font-sans">
                                            Análisis sobre los factores de pérdida de bosque, impacto en los ecosistemas y acciones urgentes de conservación en el territorio nacional.
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#00ff88] group-hover:underline pt-2">
                                          <span>Leer informe en WWF Colombia</span>
                                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                      </a>

                                      {/* Link 2: National Geographic */}
                                      <a
                                        href="https://www.nationalgeographicla.com/medio-ambiente/2022/05/los-bosques-no-pueden-compensar-el-carbono-que-emiten-las-empresas-contaminantes"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-5 sm:p-7 rounded-3xl bg-white/[0.02] sm:bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-2xl transition-all group flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
                                      >
                                        <div className="space-y-3">
                                          <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/10">
                                              🌍 National Geographic
                                            </span>
                                            <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                          </div>
                                          <h6 className="text-lg sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug tracking-tight font-sans">
                                            Los bosques no pueden compensar el carbono de las empresas
                                          </h6>
                                          <p className="text-xs sm:text-sm text-slate-300/80 font-light leading-relaxed font-sans">
                                            Artículo de investigación científica sobre por qué la siembra masiva no reemplaza la reducción directa de emisiones contaminantes.
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-400 group-hover:underline pt-2">
                                          <span>Leer artículo en NatGeo</span>
                                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                         </div>
                                       </a>
                                     </div>

                                     {/* Action to complete & return to start */}
                                     <div className="pt-6 flex justify-center">
                                       <button
                                         onClick={handleFinishAndReturnToStart}
                                         className="px-6 py-3.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                                       >
                                         <span>Sección Finalizada — Volver al Inicio ✨</span>
                                       </button>
                                     </div>
                                   </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Slide 2: Realidad Ambiental en Colombia 🇨🇴 (Ventana Completa Pantalla por Pantalla) */}
                {currentSlide === 2 && selectedWorkshop.id !== 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-4xl w-full mx-auto text-center flex flex-col items-center">
                    
                    {/* Topic Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl">
                      {[
                        { id: 0, label: '1. Amazonía 🌳', color: 'text-amber-300 bg-amber-400/10 border-amber-400/30' },
                        { id: 1, label: '2. Fauna 🐆', color: 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/30' },
                        { id: 2, label: '3. Bosques y Páramos 💧', color: 'text-sky-300 bg-sky-400/10 border-sky-400/30' },
                        { id: 3, label: '4. Acciones 🌱', color: 'text-teal-300 bg-teal-400/10 border-teal-400/30' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setColombiaStep(tab.id)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
                            colombiaStep === tab.id
                              ? `${tab.color} scale-105 shadow-md`
                              : 'text-slate-400 bg-slate-900/60 border-slate-800 hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Full Screen Slide Step Content (Without Box Borders, Floating Character PNGs) */}
                    {(() => {
                      const colombiaTopics = [
                        {
                          id: 0,
                          badge: '🇨🇴 Deforestación • Caquetá, Guaviare y Meta',
                          badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
                          title: '🌳 Amazonía y Deforestación en Colombia',
                          titleColor: 'text-amber-300',
                          body: 'En regiones como Caquetá, Guaviare y Meta perdemos más de 100,000 hectáreas de selva tropical cada año por tala ilegal e incendios. La destrucción de bosques nativos libera toneladas de CO2 al ambiente y amenaza el clima del país.',
                          img: 'https://i.ibb.co/dwZmXvkD/Stickers-for-Sale-removebg-preview.png',
                          glow: 'drop-shadow-[0_20px_45px_rgba(245,158,11,0.5)]',
                          btnBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]',
                          nextLabel: 'Siguiente: Fauna Nativa ➡️'
                        },
                        {
                          id: 1,
                          badge: '🇨🇴 Biodiversidad • Especies en Peligro',
                          badgeColor: 'text-[#00ff88] bg-[#00ff88]/15 border-[#00ff88]/30',
                          title: '🐆 Fauna y Especies en Riesgo',
                          titleColor: 'text-[#00ff88]',
                          body: 'Colombia es el 2° país más biodiverso del planeta. Cuando cortamos árboles, animales emblemáticos como el Jaguar, el Oso de Anteojos, la Danta y las Guacamayas pierden su hábitat natural y sufren el riesgo de extinción.',
                          img: 'https://i.ibb.co/fdm5702R/90890f69ab5a4d5fb1a2e1bdd29341de-removebg-preview.png',
                          glow: 'drop-shadow-[0_20px_45px_rgba(0,255,136,0.6)]',
                          btnBg: 'bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(0,255,136,0.4)]',
                          nextLabel: 'Siguiente: Páramos y Agua ➡️'
                        },
                        {
                          id: 2,
                          badge: '🇨🇴 Fuentes Hídricas • Fábricas de Agua',
                          badgeColor: 'text-sky-300 bg-sky-500/15 border-sky-400/30',
                          title: '💧 Bosques y Páramos',
                          titleColor: 'text-sky-300',
                          body: 'Nuestros bosques andinos de niebla y los frailejones del Páramo de Sumapaz atrapan las nubes y nutren las fuentes de agua dulce. Es importante recordar que en el Páramo de Sumapaz los árboles y plantas no se utilizan para fabricar cuadernos ni papel; su única y sagrada misión es capturar la niebla y abastecer de agua pura a millones de personas.',
                          img: 'https://i.ibb.co/ycs8vhKm/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png',
                          glow: 'drop-shadow-[0_20px_45px_rgba(56,189,248,0.5)]',
                          btnBg: 'bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]',
                          nextLabel: 'Siguiente: Reforestación ➡️'
                        },
                        {
                          id: 3,
                          badge: '🇨🇴 Solución Escolar • Guardianes Ecológicos',
                          badgeColor: 'text-teal-300 bg-teal-500/15 border-teal-400/30',
                          title: '🌱 Reforestación y Compromiso Escolar',
                          titleColor: 'text-teal-300',
                          body: 'Al reciclar hojas de cuaderno y papel evitamos talar bosques comerciales de celulosa. Por su parte, los ecosistemas protegidos de Bosques y Páramos en Sumapaz no proveen madera industrial, sino agua y biodiversidad intacta.',
                          img: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
                          glow: 'drop-shadow-[0_20px_45px_rgba(45,212,191,0.6)]',
                          btnBg: 'bg-gradient-to-r from-teal-300 via-emerald-400 to-[#00ff88] text-slate-950 shadow-[0_0_25px_rgba(45,212,191,0.5)]',
                          nextLabel: 'Continuar a Dilemas del Guardián ➡️'
                        }
                      ];

                      const currentTopic = colombiaTopics[colombiaStep];

                      return (
                        <motion.div
                          key={colombiaStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6 flex flex-col items-center py-4 w-full"
                        >
                          {/* Character Floating Illustration (No Box Frame) */}
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="relative my-2 cursor-pointer"
                            onClick={() => {
                              if (colombiaStep < 3) {
                                setColombiaStep(colombiaStep + 1);
                              } else {
                                setCurrentSlide(3);
                              }
                            }}
                          >
                            <img
                              src={currentTopic.img}
                              alt={currentTopic.title}
                              className={`w-44 h-44 sm:w-56 sm:h-56 object-contain transition-all hover:scale-110 ${currentTopic.glow}`}
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>

                          {/* Topic Title & Body */}
                          <div className="space-y-3 max-w-2xl px-2">
                            <h4 className={`text-3xl sm:text-5xl font-black tracking-tight ${currentTopic.titleColor}`}>
                              {currentTopic.title}
                            </h4>
                            <p className="text-sm sm:text-lg text-slate-200 font-sans leading-relaxed">
                              {currentTopic.body}
                            </p>
                          </div>

                          {/* Full Screen Interactive Siguiente Button */}
                          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                            {colombiaStep > 0 && (
                              <button
                                onClick={() => setColombiaStep(colombiaStep - 1)}
                                className="px-5 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-slate-700"
                              >
                                ⬅️ Tema Anterior
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (colombiaStep < 3) {
                                  setColombiaStep(colombiaStep + 1);
                                  confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                                } else {
                                  setCurrentSlide(3);
                                  confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
                                }
                              }}
                              className={`px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 ${currentTopic.btnBg}`}
                            >
                              {currentTopic.nextLabel}
                            </button>
                          </div>
                        </motion.div>
                      );
                    })()}

                    {/* Bottom quote */}
                    <p className="text-xs italic text-slate-400 pt-2 font-serif">
                      "Si alguien como tú no se preocupa de verdad, nada va a mejorar, jamás." — El Lorax
                    </p>
                  </motion.div>
                )}

                {/* Slide 3: Dilemas del Guardián (Toma de Decisiones Educativas) */}
                {currentSlide === 3 && selectedWorkshop.id !== 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-2xl mx-auto text-center flex flex-col items-center">
                    <h4 className="text-2xl sm:text-3xl font-black text-sky-300 tracking-tight">
                      ¿Qué harías tú en estas situaciones reales?
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-lg">
                      Pon a prueba tu criterio ecológico. Toca la mejor opción para cada caso:
                    </p>

                    <div className="space-y-4 w-full text-left">
                      {[
                        {
                          id: 0,
                          situation: '1. En tu colegio ves hojas de papel arrugadas tiradas en la basura general.',
                          options: [
                            { text: 'A) Ignorarlo y dejar que se pierdan.', correct: false, note: '❌ Las hojas vienen de los árboles. ¡Aprovechar el papel salva bosques!' },
                            { text: 'B) Reciclar el papel seco o usar la cara limpia para borradores.', correct: true, note: '✅ ¡Excelente! Reducir el gasto de papel evita que se corten más árboles.' }
                          ]
                        },
                        {
                          id: 1,
                          situation: '2. Un grupo va a encender una fogata cerca de la hierba seca en una excursión.',
                          options: [
                            { text: 'A) Avisar a un adulto para evitar un incendio forestal.', correct: true, note: '✅ ¡Muy bien! Gran parte de los incendios en Colombia nacen de fogatas descardadas.' },
                            { text: 'B) Unirte a la fogata sin importar el riesgo.', correct: false, note: '❌ Un descuido con fuego destruye la flora y fauna en minutos.' }
                          ]
                        }
                      ].map((dilemma) => (
                        <div key={dilemma.id} className="p-4 rounded-2xl bg-[#0e1d15] border border-sky-500/30 space-y-2">
                          <h5 className="text-xs font-black text-sky-200">{dilemma.situation}</h5>
                          <div className="grid grid-cols-1 gap-2">
                            {dilemma.options.map((opt, optIdx) => {
                              const isSelected = dilemmaAnswers[dilemma.id] === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setDilemmaAnswers({ ...dilemmaAnswers, [dilemma.id]: optIdx });
                                    if (opt.correct) {
                                      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                                    }
                                  }}
                                  className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border-l-4 cursor-pointer ${
                                    isSelected
                                      ? opt.correct 
                                        ? 'bg-gradient-to-r from-[#00ff88]/25 via-emerald-950/40 to-transparent border-[#00ff88] text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.25)]' 
                                        : 'bg-gradient-to-r from-rose-500/25 via-rose-950/40 to-transparent border-rose-400 text-rose-200'
                                      : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700 hover:border-sky-400/60 text-slate-300'
                                  }`}
                                >
                                  {opt.text}
                                  {isSelected && (
                                    <p className="mt-1 text-[11px] font-medium leading-snug">{opt.note}</p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Slide 4: Cuidado y Siembra (Las 3 Semillas del Lorax) */}
                {currentSlide === 4 && selectedWorkshop.id !== 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto text-center flex flex-col items-center">
                    <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      ¡Haz Florecer el Árbol del Futuro!
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg leading-relaxed">
                      Siembra las <strong className="text-[#00ff88]">3 promesas fundamentales</strong> del Lorax para transformar tu colegio y planeta:
                    </p>

                    {/* Clean Borderless Lorax Tree */}
                    <div className="relative py-2 flex flex-col items-center justify-center">
                      <motion.div
                        key={plantedSeeds.length}
                        initial={{ scale: 0.85 }}
                        animate={{ 
                          scale: plantedSeeds.length === 0 ? 0.95 : plantedSeeds.length === 1 ? 1.05 : plantedSeeds.length === 2 ? 1.15 : 1.28,
                          rotate: plantedSeeds.length === 3 ? [0, 2, -2, 0] : 0
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative"
                      >
                        <img
                          src="https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png"
                          alt="El Lorax y el Árbol de Truffula"
                          className={`w-36 h-36 sm:w-44 sm:h-44 object-contain transition-all duration-500 ${
                            plantedSeeds.length === 3 
                              ? 'drop-shadow-[0_20px_50px_rgba(250,204,21,0.95)] filter animate-pulse' 
                              : plantedSeeds.length > 0 
                                ? 'drop-shadow-[0_15px_30px_rgba(0,255,136,0.7)]' 
                                : 'opacity-75 grayscale-[20%]'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>

                      <div className="mt-2 text-xs font-black tracking-wider text-[#00ff88] bg-[#00ff88]/10 px-4 py-1 rounded-full border border-[#00ff88]/20 backdrop-blur-sm">
                        {plantedSeeds.length === 0 && '🌱 Toca las 3 semillas abajo para sembrarlas'}
                        {plantedSeeds.length === 1 && '🌿 ¡1. Semilla Sembrada! El árbol empieza a brotar'}
                        {plantedSeeds.length === 2 && '🌳 ¡2. Semilla Sembrada! El árbol se llena de hojas'}
                        {plantedSeeds.length === 3 && '✨ ¡3. SEMILLAS SEMBRADAS: EL BOSQUE HA FLORECIDO!'}
                      </div>
                    </div>

                    {/* Sleek Borderless Seeds List */}
                    <div className="grid grid-cols-1 gap-3.5 w-full text-left pt-1">
                      {[
                        {
                          id: 1,
                          seedName: 'SEMILLA 1 • ÁRBOLES',
                          promise: 'Prometo cuidar los árboles',
                          icon: '🌳',
                          gradient: 'from-emerald-500/20 to-teal-500/10'
                        },
                        {
                          id: 2,
                          seedName: 'SEMILLA 2 • AGUA',
                          promise: 'Prometo cuidar el agua y no gastarla',
                          icon: '💧',
                          gradient: 'from-sky-500/20 to-blue-500/10'
                        },
                        {
                          id: 3,
                          seedName: 'SEMILLA 3 • PAPEL Y RECICLAJE',
                          promise: 'Prometo no gastar tanto papel y reciclar',
                          icon: '📄',
                          gradient: 'from-amber-500/20 to-yellow-500/10'
                        }
                      ].map((seed) => {
                        const isPlanted = plantedSeeds.includes(seed.id);
                        return (
                          <motion.div
                            key={seed.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (!isPlanted) {
                                const newSeeds = [...plantedSeeds, seed.id];
                                setPlantedSeeds(newSeeds);
                                confetti({ 
                                  particleCount: newSeeds.length === 3 ? 120 : 45, 
                                  spread: 70, 
                                  origin: { y: 0.6 } 
                                });
                              }
                            }}
                            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-4 group ${
                              isPlanted
                                ? 'bg-gradient-to-r from-[#00ff88]/25 via-emerald-950/40 to-transparent border-l-4 border-[#00ff88] shadow-[0_0_25px_rgba(0,255,136,0.2)]'
                                : 'bg-slate-900/60 hover:bg-slate-800/80 border-l-4 border-slate-700 hover:border-[#00ff88]/60'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <span className={`text-2xl transition-transform duration-300 ${isPlanted ? 'scale-125' : 'group-hover:scale-110'}`}>
                                {seed.icon}
                              </span>
                              <div>
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#00ff88] block">
                                  {seed.seedName}
                                </span>
                                <h5 className="text-sm sm:text-base font-black text-white">
                                  "{seed.promise}"
                                </h5>
                              </div>
                            </div>

                            <button
                              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                                isPlanted
                                  ? 'bg-[#00ff88] text-slate-950 shadow-[0_0_15px_rgba(0,255,136,0.6)]'
                                  : 'bg-slate-800 text-slate-300 group-hover:bg-[#00ff88]/20 group-hover:text-[#00ff88]'
                              }`}
                            >
                              {isPlanted ? '¡Sembrada! ✨' : 'Sembrar 🌱'}
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Celebration Message & Direct Next Step */}
                    {plantedSeeds.length === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full pt-2 text-center"
                      >
                        <p className="text-xs font-black text-amber-300 bg-amber-400/10 py-2.5 px-4 rounded-full border border-amber-400/30 inline-block shadow-lg">
                          🎉 ¡Has cumplido las 3 promesas del Lorax! Pasa al siguiente paso para dejar tu huella.
                        </p>
                      </motion.div>
                    )}

                    <div className="pt-4 flex justify-center w-full">
                      <button
                        onClick={() => {
                          setCurrentSlide(5);
                          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                        }}
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00ff88] via-[#2effa0] to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        Siguiente: Estampar mi Huella Ecológica 🐾 ➡️
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Slide 5: Deja tu Huella Verde por Colombia 🐾🌿 */}
                {currentSlide === 5 && selectedWorkshop.id !== 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-2xl mx-auto text-center flex flex-col items-center">
                    <div className="space-y-2 max-w-lg">
                      <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        Firma tu Compromiso Ecológico
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        Selecciona o escribe el compromiso que vas a cumplir en tu vida diaria para proteger la naturaleza en Colombia:
                      </p>
                    </div>

                    {!pledgeSigned ? (
                      <div className="space-y-4 w-full max-w-lg">
                        {/* Preset Commitments */}
                        <div className="grid grid-cols-1 gap-2 text-left">
                          {[
                            '🌱 Cuidar los árboles y plantas de mi entorno',
                            '📄 Reciclar las hojas de cuaderno y gastar menos papel',
                            '💧 Apagar los grifos y no desperdiciar agua dulce',
                            '🚮 Clasificar la basura y evitar usar plásticos de un solo uso'
                          ].map((pledgeOption, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => setUserPledge(pledgeOption)}
                              className={`p-3.5 rounded-2xl text-xs font-bold transition-all border-l-4 text-left cursor-pointer ${
                                userPledge === pledgeOption
                                  ? 'bg-gradient-to-r from-[#00ff88]/25 via-emerald-950/40 to-transparent border-[#00ff88] text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.25)]'
                                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700 hover:border-[#00ff88]/60 text-slate-300'
                              }`}
                            >
                              {pledgeOption}
                            </button>
                          ))}
                        </div>

                        {/* Custom Input */}
                        <div className="pt-2 text-left space-y-1">
                          <label className="text-[11px] font-bold text-slate-300">O escribe tu propio compromiso:</label>
                          <input
                            type="text"
                            value={userPledge}
                            onChange={(e) => setUserPledge(e.target.value)}
                            placeholder="Ej: Sembrar una planta con mi familia en casa..."
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                          />
                        </div>

                        {/* Stamp Button */}
                        <button
                          onClick={() => {
                            setPledgeSigned(true);
                            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
                          }}
                          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00ff88] via-[#2effa0] to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer w-full mt-2"
                        >
                          🐾 ¡Estampar mi Huella Verde por Colombia! 🇨🇴
                        </button>
                      </div>
                    ) : (
                      /* Stamped Green Footprint Certificate Badge */
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-6 rounded-3xl bg-gradient-to-br from-[#0c2016] via-[#08170f] to-[#12281c] border-2 border-[#00ff88]/60 shadow-2xl space-y-4 max-w-lg w-full text-center relative overflow-hidden">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00ff88]">
                            Mural de Huellas Ecológicas • Colombia 🇨🇴
                          </span>
                          <h5 className="text-xl font-black text-white">
                            Huella Estampada con Éxito
                          </h5>
                        </div>

                        {/* Green Paw/Leaf Graphic */}
                        <div className="flex justify-center py-2 relative">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className="w-24 h-24 rounded-full bg-[#00ff88]/20 border-2 border-[#00ff88] flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(0,255,136,0.5)]"
                          >
                            🐾
                          </motion.div>
                        </div>

                        <div className="space-y-2 p-4 rounded-2xl bg-slate-950/80 border border-[#00ff88]/30 text-left">
                          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                            <span className="text-[11px] font-black text-[#00ff88]">{student?.name || 'Estudiante Ecológico'}</span>
                            <span className="text-[10px] text-amber-300 font-mono">{student?.school ? `${student.school.toUpperCase()} • COLOMBIA 🇨🇴` : 'COLOMBIA 🇨🇴'}</span>
                          </div>
                          <p className="text-xs text-slate-100 font-bold italic pt-1">
                            "{userPledge}"
                          </p>
                        </div>

                        <div className="pt-2 flex flex-col items-center gap-3">
                          <button
                            onClick={() => {
                              setCurrentSlide(6);
                              confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                            }}
                            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer w-full"
                          >
                            Siguiente: Ver Video "La Importancia de los Árboles" 📺 ➡️
                          </button>

                          <button
                            onClick={() => setPledgeSigned(false)}
                            className="text-[11px] text-slate-400 underline hover:text-slate-200 cursor-pointer"
                          >
                            Cambiar o editar mi compromiso
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Slide 6: Videos de YouTube "Sigue aprendiendo" (solo Lorax) */}
                {currentSlide === 6 && selectedWorkshop.id !== 'ws-reciclaje' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <div className="space-y-2">
                      <h4 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 tracking-tight drop-shadow-md">
                        Sigue aprendiendo: Videos Educativos
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-2">
                      {/* Video 1 */}
                      <div className="space-y-3 p-4 rounded-3xl bg-slate-950/80 border border-amber-400/40 shadow-xl flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-base sm:text-lg font-black text-amber-300">
                            1. La Importancia de los Árboles 🌳
                          </h5>
                          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-amber-400/60 shadow-md">
                            <iframe
                              className="w-full h-full"
                              src="https://www.youtube.com/embed/Hc5FXw1StqM"
                              title="La importancia de los árboles"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                        <a
                          href="https://youtu.be/Hc5FXw1StqM?si=bW_CigkHOiXAmiId"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-extrabold border border-red-500/40 transition-all shadow-md"
                        >
                          📺 Ver Video 1 en YouTube
                        </a>
                      </div>

                      {/* Video 2 */}
                      <div className="space-y-3 p-4 rounded-3xl bg-slate-950/80 border border-amber-400/40 shadow-xl flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-base sm:text-lg font-black text-amber-300">
                            2. ¿Qué pasaría si NO hubiera árboles? 🚫🌳
                          </h5>
                          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-amber-400/60 shadow-md">
                            <iframe
                              className="w-full h-full"
                              src="https://www.youtube.com/embed/pwQtXMhSfAU"
                              title="¿Qué pasaría si no hubiera árboles?"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                        <a
                          href="https://youtu.be/pwQtXMhSfAU?si=hgqOYGHMRJm8YUGr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-extrabold border border-red-500/40 transition-all shadow-md"
                        >
                          📺 Ver Video 2 en YouTube
                        </a>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setCurrentSlide(7);
                          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
                        }}
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                      >
                        🏆 Continuar al Cuestionario y Ganar Insignia ✨ ➡️
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Slide Quiz & Certificate */}
                {currentSlide === quizSlideIndex && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
                    {!quizSubmitted ? (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <h4 className="text-2xl font-black text-white">Demuestra lo que aprendiste</h4>
                          <p className="text-xs text-slate-300">Responde las preguntas para recibir tu Insignia oficial de Guardián y +250 XP.</p>
                        </div>

                        <div className="space-y-6">
                          {selectedWorkshop.quiz.map((q, qIdx) => (
                            <div key={qIdx} className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/70 to-[#142b1f] border-2 border-emerald-500/40 space-y-3 shadow-xl">
                              <h5 className="text-sm font-black text-emerald-200">
                                {qIdx + 1}. {q.question}
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt, optIdx) => {
                                  const isSelected = userAnswers[qIdx] === optIdx;
                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleAnswerSelect(optIdx, qIdx)}
                                      className={`text-left p-3.5 rounded-2xl text-xs font-bold transition-all border-l-4 cursor-pointer ${
                                        isSelected 
                                          ? 'bg-gradient-to-r from-[#00ff88]/30 via-emerald-950/60 to-transparent border-[#00ff88] text-[#00ff88] font-black shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                                          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700 hover:border-[#00ff88]/60 text-slate-200'
                                      }`}
                                    >
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
                            disabled={userAnswers.length < selectedWorkshop.quiz.length || userAnswers.includes(undefined as any)}
                            onClick={handleFinishQuiz}
                            className={`px-8 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all flex items-center gap-3 ${
                              userAnswers.length === selectedWorkshop.quiz.length && !userAnswers.includes(undefined as any)
                                ? 'bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 shadow-emerald-400/40 cursor-pointer animate-pulse scale-105'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                            }`}
                          >
                            🏆 ¡Finalizar Taller y Obtener Insignia! ✨
                          </button>
                        </div>
                      </div>
                    ) : (
                      (() => {
                        const isPassed = quizScore === selectedWorkshop.quiz.length;

                        if (isPassed) {
                          return (
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 rounded-[36px] bg-gradient-to-br from-amber-950/80 via-emerald-950/70 to-emerald-900/60 border-4 border-amber-400 shadow-2xl text-center space-y-6 relative overflow-hidden">
                              <div className="absolute top-4 right-4 text-4xl animate-bounce">🎖️</div>
                              <div className="space-y-2">
                                <h4 className="text-3xl font-black text-white">¡Insignia Oficial Desbloqueada! 🏅</h4>
                                <p className="text-xs text-amber-200 max-w-md mx-auto">
                                  Has respondido correctamente <strong className="text-amber-300">todas las preguntas</strong> del taller de <strong className="text-amber-300">{selectedWorkshop.title}</strong> (+250 XP).
                                </p>
                              </div>

                              {/* Official Badge Display */}
                              <div className="flex justify-center py-4">
                                <img 
                                  src={selectedWorkshop.id === 'ws-reciclaje' ? "https://i.ibb.co/Mx8yc33z/images-removebg-preview-6.png" : "https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png"} 
                                  alt={selectedWorkshop.id === 'ws-reciclaje' ? "Insignia El Reciclaje" : "Insignia El Lorax"} 
                                  className="w-40 h-40 sm:w-52 sm:h-52 object-contain drop-shadow-[0_10px_35px_rgba(0,255,136,0.7)] animate-pulse" 
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <div className="flex flex-wrap justify-center gap-4 pt-2">
                                <button
                                  onClick={() => {
                                    setSelectedWorkshop(null);
                                    setQuizSubmitted(false);
                                    setUserAnswers([]);
                                    setCurrentSlide(0);
                                  }}
                                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xl transition-all cursor-pointer flex items-center gap-2"
                                >
                                  🎉 Volver al Inicio
                                </button>
                              </div>
                            </motion.div>
                          );
                        }

                        return (
                          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 rounded-[36px] bg-gradient-to-br from-rose-950/90 via-slate-950/95 to-red-950/80 border-4 border-rose-500/80 shadow-2xl text-center space-y-6 relative overflow-hidden">
                            <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-3xl mx-auto shadow-xl">
                              ❌
                            </div>
                            <div className="space-y-2">
                              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-400/40">
                                Respuestas Correctas: {quizScore} de {selectedWorkshop.quiz.length}
                              </span>
                              <h4 className="text-2xl font-black text-white">¡Casi lo logras!</h4>
                              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                                Para obtener la <strong className="text-amber-300">Insignia Oficial</strong> debes responder todas las preguntas correctamente. ¡Inténtalo de nuevo!
                              </p>
                            </div>
                            <div className="pt-2">
                              <button
                                onClick={() => {
                                  setQuizSubmitted(false);
                                  setUserAnswers([]);
                                }}
                                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-black text-xs shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
                              >
                                🔄 Reintentar Cuestionario
                              </button>
                            </div>
                          </motion.div>
                        );
                      })()
                    )}
                  </motion.div>
                )}
                </>
              )}

              </div>

              {/* Navigation Footer - Single Unified Navigation Bar */}
              <div className="flex items-center justify-between border-t border-[#00ff88]/20 pt-4 mt-8">
                <button
                  disabled={currentSlide === 0 && (selectedWorkshop.id === 'ws-ecocalipsis' || selectedWorkshop.id === 'ws-reciclaje' || colombiaStep === 0)}
                  onClick={() => {
                    if (selectedWorkshop.id !== 'ws-reciclaje' && selectedWorkshop.id !== 'ws-ecocalipsis' && currentSlide === 1 && reflectionAudience === 'youth' && activeYouthTab > 0) {
                      setActiveYouthTab((prev) => prev - 1);
                    } else if (selectedWorkshop.id !== 'ws-reciclaje' && selectedWorkshop.id !== 'ws-ecocalipsis' && currentSlide === 2 && colombiaStep > 0) {
                      setColombiaStep((prev) => prev - 1);
                    } else {
                      setCurrentSlide((prev) => Math.max(0, prev - 1));
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#142b1f] hover:bg-[#1a3828] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-200 transition-all border border-[#00ff88]/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>

                {/* Step Indicator Dots */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {selectedWorkshop.id !== 'ws-reciclaje' && selectedWorkshop.id !== 'ws-ecocalipsis' && currentSlide === 1 && reflectionAudience === 'youth' ? (
                    [0, 1, 2, 3, 4].map((stepIdx) => (
                      <button
                        key={stepIdx}
                        onClick={() => {
                          setActiveYouthTab(stepIdx);
                          confetti({ particleCount: 15, spread: 40 });
                        }}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeYouthTab === stepIdx
                            ? 'w-8 bg-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.8)]'
                            : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                        }`}
                        title={`Análisis Jóvenes: Parte ${stepIdx + 1}`}
                      />
                    ))
                  ) : (
                    Array.from({ length: slidesCount }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentSlide(idx);
                          if (idx === 2) setColombiaStep(0);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          currentSlide === idx ? 'bg-[#00ff88] w-6' : 'bg-slate-600'
                        }`}
                        title={`Paso ${idx + 1}`}
                      ></button>
                    ))
                  )}
                </div>

                {currentSlide < slidesCount - 1 && (
                  <button
                    onClick={() => {
                      if (selectedWorkshop.id !== 'ws-reciclaje' && selectedWorkshop.id !== 'ws-ecocalipsis' && currentSlide === 1 && reflectionAudience === 'youth') {
                        if (activeYouthTab < 4) {
                          setActiveYouthTab((prev) => prev + 1);
                          confetti({ particleCount: 25, spread: 40 });
                        } else {
                          // Section finished - return to start
                          handleFinishAndReturnToStart();
                        }
                      } else if (selectedWorkshop.id !== 'ws-reciclaje' && selectedWorkshop.id !== 'ws-ecocalipsis' && currentSlide === 2 && colombiaStep < 3) {
                        setColombiaStep((prev) => prev + 1);
                        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                      } else {
                        setCurrentSlide((prev) => Math.min(slidesCount - 1, prev + 1));
                      }
                    }}
                    className="px-5 sm:px-6 py-2.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-[#00ff88]/20 flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>
                      {selectedWorkshop.id !== 'ws-reciclaje' && selectedWorkshop.id !== 'ws-ecocalipsis' && currentSlide === 1 && reflectionAudience === 'youth' && activeYouthTab === 4
                        ? 'Sección Finalizada ✨'
                        : 'Siguiente'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


