import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { saveSurveyResult, auth, googleProvider, signInWithPopup } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  HelpCircle, 
  ClipboardCheck, 
  ChevronRight, 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  CheckCircle,
  GraduationCap,
  Building,
  User,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EcoSurveyProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  isOpen: boolean;
  onClose: () => void;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
    points: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Cuando terminas una botella o un envase plástico...",
    options: [
      { letter: 'A', text: "Lo reutilizo o lo deposito en el recipiente de reciclaje.", points: 4 },
      { letter: 'B', text: "Intento reciclarlo cuando encuentro un punto adecuado.", points: 3 },
      { letter: 'C', text: "Lo boto en la basura común.", points: 2 },
      { letter: 'D', text: "Lo dejo en cualquier lugar.", points: 1 }
    ]
  },
  {
    id: 2,
    text: "Cuando sales de una habitación...",
    options: [
      { letter: 'A', text: "Siempre apago la luz y los aparatos que no se usan.", points: 4 },
      { letter: 'B', text: "Casi siempre los apago.", points: 3 },
      { letter: 'C', text: "A veces se me olvida.", points: 2 },
      { letter: 'D', text: "Casi nunca los apago.", points: 1 }
    ]
  },
  {
    id: 3,
    text: "Mientras te cepillas los dientes...",
    options: [
      { letter: 'A', text: "Siempre cierro la llave del agua.", points: 4 },
      { letter: 'B', text: "La cierro la mayor parte del tiempo.", points: 3 },
      { letter: 'C', text: "Solo algunas veces.", points: 2 },
      { letter: 'D', text: "La dejo abierta todo el tiempo.", points: 1 }
    ]
  },
  {
    id: 4,
    text: "Si ves basura en el piso...",
    options: [
      { letter: 'A', text: "La recojo y la deposito en la caneca.", points: 4 },
      { letter: 'B', text: "La recojo si está cerca de una caneca.", points: 3 },
      { letter: 'C', text: "Pienso recogerla, pero casi nunca lo hago.", points: 2 },
      { letter: 'D', text: "La ignoro.", points: 1 }
    ]
  },
  {
    id: 5,
    text: "En tu casa separan los residuos...",
    options: [
      { letter: 'A', text: "Siempre.", points: 4 },
      { letter: 'B', text: "Casi siempre.", points: 3 },
      { letter: 'C', text: "Algunas veces.", points: 2 },
      { letter: 'D', text: "Nunca.", points: 1 }
    ]
  },
  {
    id: 6,
    text: "Cuando utilizas papel...",
    options: [
      { letter: 'A', text: "Aprovecho ambas caras y solo uso lo necesario.", points: 4 },
      { letter: 'B', text: "Intento ahorrar papel.", points: 3 },
      { letter: 'C', text: "A veces desperdicio hojas.", points: 2 },
      { letter: 'D', text: "No me importa gastar papel.", points: 1 }
    ]
  },
  {
    id: 7,
    text: "Si alguien tira basura al suelo...",
    options: [
      { letter: 'A', text: "Le hablo con respeto y doy ejemplo.", points: 4 },
      { letter: 'B', text: "Le digo que no lo haga.", points: 3 },
      { letter: 'C', text: "Solo lo pienso, pero no digo nada.", points: 2 },
      { letter: 'D', text: "Me da igual.", points: 1 }
    ]
  },
  {
    id: 8,
    text: "¿Qué tanto conoces sobre el reciclaje?",
    options: [
      { letter: 'A', text: "Sé separar correctamente la mayoría de los residuos.", points: 4 },
      { letter: 'B', text: "Conozco lo básico.", points: 3 },
      { letter: 'C', text: "Sé muy poco.", points: 2 },
      { letter: 'D', text: "No sé nada.", points: 1 }
    ]
  },
  {
    id: 9,
    text: "Cuando vas a comprar algo...",
    options: [
      { letter: 'A', text: "Prefiero productos que generen menos residuos.", points: 4 },
      { letter: 'B', text: "A veces me fijo en eso.", points: 3 },
      { letter: 'C', text: "Casi nunca lo pienso.", points: 2 },
      { letter: 'D', text: "Nunca me importa.", points: 1 }
    ]
  },
  {
    id: 10,
    text: "¿Qué haces para cuidar los árboles y las plantas?",
    options: [
      { letter: 'A', text: "Los cuido y participo en actividades para protegerlos.", points: 4 },
      { letter: 'B', text: "Evito dañarlos.", points: 3 },
      { letter: 'C', text: "No hago mucho por ellos.", points: 2 },
      { letter: 'D', text: "Me es indiferente.", points: 1 }
    ]
  },
  {
    id: 11,
    text: "Si participas en una actividad ambiental del colegio...",
    options: [
      { letter: 'A', text: "Lo hago con entusiasmo e invito a otros.", points: 4 },
      { letter: 'B', text: "Participo con gusto.", points: 3 },
      { letter: 'C', text: "Voy solo si me toca.", points: 2 },
      { letter: 'D', text: "Prefiero no participar.", points: 1 }
    ]
  },
  {
    id: 12,
    text: "Cuando ves un río, un parque o un bosque...",
    options: [
      { letter: 'A', text: "Pienso en cómo ayudar a conservarlo.", points: 4 },
      { letter: 'B', text: "Me gusta que esté limpio.", points: 3 },
      { letter: 'C', text: "Solo lo observo.", points: 2 },
      { letter: 'D', text: "No me interesa.", points: 1 }
    ]
  },
  {
    id: 13,
    text: "¿Qué haces con las pilas o residuos electrónicos?",
    options: [
      { letter: 'A', text: "Los llevo a puntos de recolección.", points: 4 },
      { letter: 'B', text: "Intento buscar dónde entregarlos.", points: 3 },
      { letter: 'C', text: "Los mezclo con la basura porque no sé qué hacer.", points: 2 },
      { letter: 'D', text: "Los boto sin pensar.", points: 1 }
    ]
  },
  {
    id: 14,
    text: "¿Qué haces cuando aprendes algo nuevo sobre el cuidado del ambiente?",
    options: [
      { letter: 'A', text: "Lo comparto con mi familia y amigos.", points: 4 },
      { letter: 'B', text: "Intento ponerlo en práctica.", points: 3 },
      { letter: 'C', text: "Lo olvido con facilidad.", points: 2 },
      { letter: 'D', text: "No me interesa aprender más.", points: 1 }
    ]
  },
  {
    id: 15,
    text: "¿Qué tan importante es para ti cuidar el planeta?",
    options: [
      { letter: 'A', text: "Es una de mis prioridades y trato de actuar todos los días.", points: 4 },
      { letter: 'B', text: "Es importante y procuro ayudar cuando puedo.", points: 3 },
      { letter: 'C', text: "Es importante, pero casi no hago acciones para cuidarlo.", points: 2 },
      { letter: 'D', text: "No creo que sea un tema importante.", points: 1 }
    ]
  }
];

export const EcoSurvey: React.FC<EcoSurveyProps> = ({ student, setStudent, isOpen, onClose, onTriggerBadgeAction }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [participantName, setParticipantName] = useState(student.name);
  const [age, setAge] = useState<number>(10);
  const [school, setSchool] = useState(student.school || 'IED Pío X');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { letter: string; points: number; text: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Results State
  const [totalScore, setTotalScore] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [characterImage, setCharacterImage] = useState('');
  const [characterMessage, setCharacterMessage] = useState('');

  // Sync profile data when student state changes
  useEffect(() => {
    if (student.name) {
      setParticipantName(student.name);
    }
    if (student.school) {
      setSchool(student.school);
    }
  }, [student]);

  const handleGoogleLoginInSurvey = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const loggedInName = result.user.displayName || result.user.email || 'Estudiante Pío X';
        setParticipantName(loggedInName);
        setStudent(prev => ({
          ...prev,
          name: loggedInName
        }));
        localStorage.setItem('eco_auto_login', 'google');
        confetti({ particleCount: 60, spread: 50 });
      }
    } catch (err) {
      console.error("Error signing in with Google inside survey:", err);
    }
  };

  const handleStartSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName.trim() || !school.trim()) return;
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswerSelect = (letter: 'A' | 'B' | 'C' | 'D', points: number, text: string) => {
    const updatedAnswers = {
      ...answers,
      [QUESTIONS[currentQuestionIndex].id]: { letter, points, text }
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results
      let score = 0;
      Object.keys(updatedAnswers).forEach(key => {
        const numKey = Number(key);
        const ans = (updatedAnswers as any)[numKey];
        if (ans && typeof ans.points === 'number') {
          score += ans.points;
        }
      });
      setTotalScore(score);

      // Classification Logic
      let charName = '';
      let charMsg = '';
      let charImg = '';

      if (score >= 53) {
        charName = "Dinosaurio – Guardián Supremo del Planeta";
        charImg = "https://i.ibb.co/ycs8vhKm/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png";
        charMsg = "¡Increíble! Eres un verdadero Guardián Supremo del Planeta. Tus hábitos ambientales son excelentes y eres un gran ejemplo para los demás. Sigue inspirando a tu familia, amigos y comunidad con tus acciones.";
      } else if (score >= 44) {
        charName = "Zorro – Protector Inteligente";
        charImg = "https://i.ibb.co/v4YMZGBx/Chat-GPT-Image-28-jul-2026-18-17-33-removebg-preview.png";
        charMsg = "¡Vas por muy buen camino! Ya tienes excelentes hábitos ambientales y entiendes la importancia de cuidar la naturaleza. Con pequeños cambios podrás convertirte en un gran Guardián Supremo.";
      } else if (score >= 34) {
        charName = "Tiburón – Explorador Ambiental";
        charImg = "https://i.ibb.co/LdY1tpYj/Chat-GPT-Image-28-jul-2026-18-16-00-removebg-preview.png";
        charMsg = "Cada día aprendes más sobre cómo cuidar el planeta. Ya realizas varias acciones positivas, pero aún puedes mejorar. Sigue participando en Ecocalipsis y conviértete en un gran protector del ambiente.";
      } else {
        charName = "Conejo – Ecohéroe en Entrenamiento";
        charImg = "https://i.ibb.co/pvxLf1zm/Chat-GPT-Image-28-jul-2026-18-19-44-removebg-preview.png";
        charMsg = "Todos los grandes héroes comienzan aprendiendo. Hoy es el inicio de tu aventura para cuidar el planeta. Con las capacitaciones y tus nuevas acciones podrás subir de nivel y convertirte en un verdadero Ecohéroe.";
      }

      setCharacterName(charName);
      setCharacterMessage(charMsg);
      setCharacterImage(charImg);
      setStep('results');

      // Trigger Confetti!
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });

      // Trigger active badge unlocks based on survey characters
      if (charName.includes("Dinosaurio")) {
        onTriggerBadgeAction?.('survey_character_paramo');
      } else if (charName.includes("Tiburón")) {
        onTriggerBadgeAction?.('survey_character_shark');
      }

      // Save to database
      saveResultsToDatabase(score, charName, updatedAnswers);
    }
  };

  const saveResultsToDatabase = async (score: number, charName: string, finalAnswers: any) => {
    setIsSaving(true);
    const dateStr = new Date().toISOString();
    
    // Prepare Firestore survey payload
    const surveyPayload = {
      uid: auth.currentUser?.uid || null,
      participantName,
      age: Number(age),
      school,
      date: dateStr,
      totalScore: score,
      characterObtained: charName,
      answers: Object.entries(finalAnswers).reduce((acc, [qid, data]: any) => {
        acc[qid] = {
          letter: data.letter,
          points: data.points,
          text: data.text
        };
        return acc;
      }, {} as any)
    };

    try {
      await saveSurveyResult(surveyPayload);

      // Update student profile locally and in Firestore if logged in
      setStudent(prev => ({
        ...prev,
        ecoHeroCharacter: charName,
        ecoHeroScore: score,
        ecoHeroImage: charName.includes("Dinosaurio") 
          ? "https://i.ibb.co/ycs8vhKm/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png"
          : charName.includes("Zorro")
          ? "https://i.ibb.co/v4YMZGBx/Chat-GPT-Image-28-jul-2026-18-17-33-removebg-preview.png"
          : charName.includes("Tiburón")
          ? "https://i.ibb.co/LdY1tpYj/Chat-GPT-Image-28-jul-2026-18-16-00-removebg-preview.png"
          : "https://i.ibb.co/pvxLf1zm/Chat-GPT-Image-28-jul-2026-18-19-44-removebg-preview.png",
        age: Number(age)
      }));
    } catch (err) {
      console.error("Error saving survey results:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    const shareText = `¡Acabo de descubrir qué Ecohéroe de Ecocalipsis soy! 🦖🦊🦈🐰
Soy un: ${characterName} (${totalScore}/60 puntos).
${characterMessage}
¡Haz el test tú también en Ecocalipsis! 🌱`;

    navigator.clipboard.writeText(shareText);
    setShareSuccess(true);
    confetti({ particleCount: 30, spread: 30 });
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const handleReset = () => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const renderInteractiveText = (text: string) => {
    const keywords = [
      "Guardián Supremo del Planeta",
      "excelentes",
      "ejemplo",
      "pequeños cambios",
      "Guardián Supremo",
      "protector del ambiente",
      "grandes héroes",
      "Ecohéroe",
      "Ecohéroe en Entrenamiento",
      "Protector Inteligente",
      "Explorador Ambiental",
      "cuidar la naturaleza",
      "acciones positivas",
      "insuflas vida",
      "héroes",
      "aventura"
    ];
    
    let parts: (string | React.ReactNode)[] = [text];
    keywords.forEach(keyword => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const subparts = part.split(keyword);
          subparts.forEach((subpart, index) => {
            newParts.push(subpart);
            if (index < subparts.length - 1) {
              newParts.push(
                <motion.span 
                  key={keyword + index}
                  whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                  onClick={() => {
                    confetti({ particleCount: 18, spread: 40, colors: ['#00ff88', '#fbbf24', '#38bdf8'] });
                  }}
                  className="inline-block cursor-pointer font-black text-[#00ff88] underline underline-offset-4 decoration-wavy decoration-2 decoration-amber-400 select-none hover:text-amber-300 transition-all font-mono"
                >
                  {keyword}
                </motion.span>
              );
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    
    return <>{parts}</>;
  };

  if (!isOpen) return null;

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#06100b]/98 backdrop-blur-2xl overflow-y-auto flex items-start justify-center p-4 sm:p-6 md:p-8 animate-fadeIn">
      {/* Background glow effects inside the overlay */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto my-auto relative z-10 py-6">
        {/* Top bar with close action */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#11241c] hover:bg-[#183528] text-slate-300 hover:text-white border border-[#00ff88]/30 flex items-center gap-1.5 transition-all text-xs font-black uppercase cursor-pointer"
          >
            <span>Cerrar</span>
            <X size={14} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: INTRO FORM */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-[#11241c] to-[#0a1811] border-2 border-[#00ff88]/30 shadow-2xl space-y-6 text-left"
            >
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                  SISTEMA DE ENCUESTA - ECOCALIPSIS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#00ff88] tracking-tight">
                  ¿Qué Ecohéroe eres?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  Evalúa tus hábitos ambientales mediante esta divertida encuesta de 15 preguntas. ¡Descubre si eres un Dinosaurio, un Zorro, un Tiburón o un Conejo!
                </p>
              </div>

              {/* GOOGLE LINK STATUS & INTERACTION PANEL */}
              <div className="p-4 rounded-2xl bg-[#0d2116] border border-[#00ff88]/30 space-y-3">
                {auth.currentUser ? (
                  <div className="flex items-center gap-3">
                    {auth.currentUser.photoURL ? (
                      <img 
                        src={auth.currentUser.photoURL} 
                        alt="Avatar" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full border border-[#00ff88]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#00ff88]/15 flex items-center justify-center text-[#00ff88]">
                        <User size={18} />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                        ✨ Cuenta de Google Vinculada ✨
                      </p>
                      <p className="text-xs font-black text-white">
                        {auth.currentUser.displayName || auth.currentUser.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <p className="text-xs font-black text-[#00ff88] flex items-center gap-1">
                        🔗 ¡Vincula tu cuenta de Google!
                      </p>
                      <p className="text-[11px] text-slate-300 leading-normal font-medium">
                        Guarda tus superpoderes, XP de racha y resultados ecológicos de forma permanente en tu perfil escolar.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleGoogleLoginInSurvey}
                      className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <Sparkles size={13} className="fill-slate-950 text-slate-950" />
                      <span>Conectar Google</span>
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleStartSurvey} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#00ff88] uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    className="w-full bg-[#08130e] border border-[#00ff88]/20 focus:border-[#00ff88] rounded-2xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-all"
                    placeholder="Tu nombre o apodo"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#00ff88] uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap size={14} />
                      Edad (Años)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      required
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full bg-[#08130e] border border-[#00ff88]/20 focus:border-[#00ff88] rounded-2xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-all"
                      placeholder="Ej. 10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#00ff88] uppercase tracking-wider flex items-center gap-1.5">
                      <Building size={14} />
                      Institución Educativa
                    </label>
                    <input
                      type="text"
                      required
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full bg-[#08130e] border border-[#00ff88]/20 focus:border-[#00ff88] rounded-2xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-all"
                      placeholder="Ej: IED Pío X"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-2xl bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#00ff88]/20 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Comenzar Encuesta</span>
                  <ChevronRight size={16} />
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: ACTIVE QUESTIONS */}
          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5 sm:p-7 rounded-[32px] bg-gradient-to-br from-[#11241c] to-[#0a1811] border-2 border-[#00ff88]/30 shadow-2xl space-y-5 text-left"
            >
              {/* Header / Tracker */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
                    else setStep('intro');
                  }}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Atrás</span>
                </button>
                <span className="text-[11px] font-black uppercase text-[#00ff88] tracking-widest bg-[#00ff88]/15 px-3 py-1 rounded-full font-mono">
                  Pregunta {currentQuestionIndex + 1} de {QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>Progreso de la encuesta</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#08130e] h-2 rounded-full overflow-hidden p-0.5 border border-[#00ff88]/15">
                  <div 
                    style={{ width: `${progressPercent}%` }}
                    className="bg-[#00ff88] h-full rounded-full transition-all duration-300"
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="py-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug flex gap-2">
                  <span className="text-[#00ff88] font-black">{currentQuestionIndex + 1}.</span>
                  <span>{currentQuestion.text}</span>
                </h3>
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.letter}
                    onClick={() => handleAnswerSelect(option.letter, option.points, option.text)}
                    className="w-full text-left p-4 rounded-2xl bg-[#091510] border border-[#00ff88]/15 hover:border-[#00ff88] hover:bg-[#00ff88]/5 flex items-center justify-between gap-4 transition-all duration-200 active:scale-99 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-[#112a1e] border border-[#00ff88]/30 group-hover:border-[#00ff88] flex items-center justify-center text-xs font-black text-[#00ff88] shrink-0 font-mono">
                        {option.letter}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white leading-normal font-medium">
                        {option.text}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#00ff88] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: RESULTS & CLASIFICACIÓN */}
          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-8 rounded-[36px] bg-gradient-to-br from-[#12281e] to-[#0a1811] border-2 border-[#00ff88] shadow-2xl text-center space-y-6"
            >
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/35 mx-auto">
                <Sparkles size={14} className="text-amber-400 animate-pulse animate-bounce" />
                <span>¡Resultados Listos!</span>
              </div>

              {/* Score Display */}
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">PUNTUACIÓN OBTENIDA</p>
                <h3 className="text-4xl sm:text-5xl font-black text-[#00ff88] font-mono tracking-tight">
                  {totalScore} <span className="text-lg text-slate-400">/ 60 Pts</span>
                </h3>
              </div>

              {/* Progress visualization inside limits */}
              <div className="max-w-xs mx-auto space-y-1.5">
                <div className="w-full bg-[#08130e] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#00ff88]/20">
                  <div 
                    style={{ width: `${(totalScore / 60) * 100}%` }}
                    className="bg-[#00ff88] h-full rounded-full shadow-lg shadow-[#00ff88]/50"
                  />
                </div>
                <p className="text-[9px] uppercase font-mono text-slate-400 font-bold">Rango de Evaluación: 15 Pts (Mín) a 60 Pts (Máx)</p>
              </div>

              {/* Character Graphic Display - With Movement & Clean Render */}
              <div className="relative py-4 max-w-sm mx-auto flex flex-col items-center justify-center">
                {characterImage ? (
                  <div className="relative">
                    {/* Subtle pulsing backdrop */}
                    <div className="absolute inset-0 bg-[#00ff88]/10 rounded-full blur-3xl scale-110 animate-pulse" />
                    
                    {/* Primary custom illustration with floating movement */}
                    <motion.img 
                      src={characterImage} 
                      alt={characterName} 
                      referrerPolicy="no-referrer"
                      animate={{
                        y: [0, -12, 0],
                        rotate: [-1.5, 1.5, -1.5],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeInOut"
                      }}
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain relative z-10 filter drop-shadow-[0_12px_28px_rgba(0,255,136,0.35)] cursor-grab active:cursor-grabbing"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                    <CheckCircle size={48} className="text-[#00ff88]" />
                  </div>
                )}

                {/* Character Title */}
                <div className="mt-5 space-y-1 z-10 relative">
                  <span className="text-[10px] text-amber-400 font-black tracking-widest uppercase">¡TU ECOHÉROE ES!</span>
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                    {characterName}
                  </h4>
                </div>
              </div>

              {/* Custom Message Card with Interactive Underlined text */}
              <div className="p-5 rounded-2xl bg-[#08130e]/90 border border-[#00ff88]/20 max-w-lg mx-auto text-left space-y-3 shadow-inner">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {renderInteractiveText(characterMessage)}
                </p>
                
                <div className="pt-2 border-t border-[#00ff88]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-slate-400">
                  <span><strong>Participante:</strong> {participantName} ({age} años)</span>
                  <span><strong>Colegio:</strong> {school}</span>
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-mono"
                >
                  <RotateCcw size={14} />
                  <span>Hacer de Nuevo</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <Share2 size={14} />
                  <span>{shareSuccess ? '¡Copiado al Portapapeles!' : 'Compartir Resultado'}</span>
                </button>
              </div>
              
              {shareSuccess && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-[11px] text-[#00ff88] font-bold"
                >
                  🎉 ¡Se ha copiado un mensaje especial de tu Ecohéroe al portapapeles listo para compartir!
                </motion.p>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
