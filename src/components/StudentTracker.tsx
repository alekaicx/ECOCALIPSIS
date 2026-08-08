import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { FIFTY_BADGES } from '../data/badgesData';
import { 
  Trophy, 
  Droplet, 
  Users, 
  Recycle, 
  GraduationCap, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Edit2,
  Sparkles,
  Plus,
  Lock,
  Unlock,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { EcoSurvey } from './EcoSurvey';

const AWARENESS_DATA = [
  { month: 'Ene', conciencia: 20 },
  { month: 'Feb', conciencia: 35 },
  { month: 'Mar', conciencia: 48 },
  { month: 'Abr', conciencia: 60 },
  { month: 'May', conciencia: 60 },
  { month: 'Jun', conciencia: 60 },
  { month: 'Jul', conciencia: 56 },
];

interface StudentTrackerProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onOpenSurvey?: () => void;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

export const StudentTracker: React.FC<StudentTrackerProps> = ({ student, setStudent, onOpenSurvey }) => {
  const [showRanking, setShowRanking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editName, setEditName] = useState(student.name);
  const [editGrade, setEditGrade] = useState(student.grade || '3° B');
  const [editSchool, setEditSchool] = useState(student.school || 'IED Pío X');

  const handleVerClasificacion = () => {
    setShowRanking(!showRanking);
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleSaveProfile = () => {
    setStudent(prev => ({
      ...prev,
      name: editName,
      grade: editGrade,
      school: editSchool
    }));
    setIsEditing(false);
    confetti({ particleCount: 50, spread: 40 });
  };

  const [badgeTab, setBadgeTab] = useState<'all' | 'juegos' | 'agua' | 'energia' | 'residuos' | 'biodiversidad'>('all');
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  // Sync official badges into student.badges ensuring all official badges exist
  useEffect(() => {
    if (!student.badges || student.badges.length !== FIFTY_BADGES.length) {
      const initialBadges = FIFTY_BADGES.map((b) => {
        const existing = student.badges?.find(ex => ex.id === b.id);
        return {
          id: b.id,
          name: b.name,
          description: b.description,
          icon: b.icon,
          unlocked: existing ? existing.unlocked : false,
          requiredXP: 0
        };
      });
      setStudent(prev => ({
        ...prev,
        badges: initialBadges
      }));
    }
  }, [student.badges, setStudent]);

  const handleAddActionPoints = (amount: number, type: string) => {
    // Perform fun actions and add XP!
    setStudent(prev => {
      const isRecycle = type === 'recycle';
      const isPlant = type === 'plant';

      return {
        ...prev,
        xp: prev.xp + amount,
        itemsRecycled: isRecycle ? prev.itemsRecycled + 3 : prev.itemsRecycled,
        treesPlanted: isPlant ? prev.treesPlanted + 1 : prev.treesPlanted
      };
    });

    confetti({ particleCount: 50, spread: 50 });
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto py-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00ff88]">
            Mi Impacto Ambiental
          </h1>
          <p className="text-xs text-slate-300">
            ¡Hola! Mira cuánto ha crecido tu aporte ecológico hoy.
          </p>
        </div>

        <button
          onClick={() => {
            setEditName(student.name);
            setEditGrade(student.grade || '');
            setEditSchool(student.school || '');
            setIsEditing(!isEditing);
          }}
          className="px-3 py-1.5 rounded-full bg-[#00ff88]/10 hover:bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 self-start sm:self-center"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancelar Edición' : 'Editar Perfil'}</span>
        </button>
      </div>

      {/* Profile Details (Dynamic Info Display) */}
      <div className="p-4 rounded-2xl bg-[#11221a]/65 border border-[#00ff88]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{student.name || 'Estudiante'}</span>
            {student.grade && (
              <span className="text-[10px] bg-[#00ff88]/10 text-[#00ff88] px-2 py-0.5 rounded-full font-mono font-bold">
                {student.grade}
              </span>
            )}
          </div>
          {student.school && (
            <p className="text-xs text-slate-400 mt-0.5">{student.school}</p>
          )}
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-[24px] bg-[#142820] border-2 border-[#00ff88] shadow-2xl space-y-4 text-left"
        >
          <h3 className="text-sm font-black uppercase text-[#00ff88] tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            Editar Datos del Perfil
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-[#00ff88]/80 uppercase mb-1">Nombre Completo</label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-[#09140e] border border-[#00ff88]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88] font-bold"
                placeholder="Nombre del estudiante"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#00ff88]/80 uppercase mb-1">Curso / Grado</label>
                <input 
                  type="text" 
                  value={editGrade}
                  onChange={(e) => setEditGrade(e.target.value)}
                  className="w-full bg-[#09140e] border border-[#00ff88]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88] font-bold"
                  placeholder="Ej: 3° B"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#00ff88]/80 uppercase mb-1">Colegio / Escuela</label>
                <input 
                  type="text" 
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                  className="w-full bg-[#09140e] border border-[#00ff88]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88] font-bold"
                  placeholder="Ej: IED Pío X"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all active:scale-95"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-1.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 text-xs font-black uppercase transition-all active:scale-95"
            >
              Guardar Cambios
            </button>
          </div>
        </motion.div>
      )}

      {/* Tu Personaje de Ecocalipsis Card */}
      {student.ecoHeroCharacter && (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 sm:p-6 rounded-[28px] bg-gradient-to-br from-[#12281e] to-[#0a1811] border-2 border-[#00ff88] shadow-2xl flex flex-col sm:flex-row items-center gap-5 text-left"
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-[#00ff88]/10 rounded-full blur-xl scale-110" />
            <img 
              src={student.ecoHeroImage || "https://i.ibb.co/pvxLf1zm/Chat-GPT-Image-28-jul-2026-18-19-44-removebg-preview.png"} 
              alt={student.ecoHeroCharacter} 
              referrerPolicy="no-referrer"
              className="w-24 h-24 object-contain relative z-10"
            />
          </div>
          <div className="space-y-1.5 w-full">
            <span className="text-[10px] font-black tracking-widest text-[#00ff88] uppercase bg-[#00ff88]/10 px-2.5 py-0.5 rounded-full border border-[#00ff88]/20">
              Mi Ecohéroe de Ecocalipsis
            </span>
            <h3 className="text-xl font-black text-white leading-tight">
              {student.ecoHeroCharacter}
            </h3>
            <p className="text-xs text-slate-300 leading-normal font-medium">
              Obtuviste <strong>{student.ecoHeroScore || 0} / 60 puntos</strong> en tu evaluación de hábitos ambientales. ¡Excelente trabajo protegiendo la naturaleza!
            </p>
          </div>
        </motion.div>
      )}

      {/* INTERACTIVE BADGES ALBUM */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-[28px] bg-gradient-to-b from-[#11241a] to-[#0a1812] border-2 border-[#00ff88]/30 shadow-2xl space-y-4 text-center"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#00ff88]/10 pb-3 text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#00ff88] flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Mi Álbum de Insignias</span>
            </h3>
          </div>
          <button
            onClick={() => setIsAlbumOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer font-mono shrink-0"
          >
            Abrir Álbum 📖
          </button>
        </div>

        {/* Clean Badges View - Pure transparent images without boxes */}
        <div className="flex flex-row items-center justify-center gap-8 sm:gap-12 py-4">
          {(student.badges || []).map((badge) => {
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.1, rotate: badge.unlocked ? 3 : 0 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedBadge(badge);
                  setIsAlbumOpen(true);
                }}
                className="cursor-pointer flex flex-col items-center gap-2 group"
              >
                <img
                  src={badge.icon}
                  alt={badge.name}
                  className={`w-32 h-32 sm:w-40 sm:h-40 object-contain transition-all duration-300 ${
                    badge.unlocked
                      ? 'drop-shadow-[0_10px_25px_rgba(250,204,21,0.6)] animate-pulse'
                      : 'grayscale opacity-35 filter'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-black text-slate-200 group-hover:text-[#00ff88] transition-colors">
                  {badge.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* FULL ALBUM POPUP TAB MODAL */}
      <AnimatePresence>
        {isAlbumOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-[#0a1811] border-2 border-[#00ff88]/40 rounded-[36px] p-6 sm:p-8 shadow-2xl relative space-y-6 text-center max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsAlbumOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-black text-xs px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 font-mono cursor-pointer transition-all"
              >
                CERRAR ✕
              </button>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#00ff88]">
                  📖 Álbum de Insignias
                </h3>
              </div>

              {/* Grid of the 2 Badges - Pure images without background boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-2 items-start">
                {(student.badges || []).map((badge) => {
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedBadge(badge)}
                      className="flex flex-col items-center gap-3 cursor-pointer text-center relative"
                    >
                      {/* Pure Image without background box */}
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className={`w-36 h-36 sm:w-44 sm:h-44 object-contain ${
                          badge.unlocked
                            ? 'drop-shadow-[0_12px_30px_rgba(250,204,21,0.7)] animate-pulse'
                            : 'grayscale opacity-35 filter'
                        }`}
                        referrerPolicy="no-referrer"
                      />

                      <div className="space-y-1.5 max-w-xs">
                        <h4 className="text-base font-black text-white">{badge.name}</h4>
                        <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          badge.unlocked ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {badge.unlocked ? 'Desbloqueado ⭐' : 'Bloqueado 🔒'}
                        </span>
                        <p className="text-xs text-slate-300 pt-1 leading-relaxed font-sans">
                          {badge.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SISTEMA DE ENCUESTA - ECOCALIPSIS */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-[28px] bg-gradient-to-br from-[#11241c] to-[#0a1811] border border-[#00ff88]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-left"
      >
        <div className="space-y-1">
          <h3 className="text-base font-black text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Encuesta de Ecohéroe</span>
          </h3>
          <p className="text-xs text-slate-300">
            {student.ecoHeroCharacter 
              ? `¡Tu Ecohéroe actual es ${student.ecoHeroCharacter}! Puedes repetir el test de 15 preguntas cuando quieras.`
              : "Descubre tu Ecohéroe de Ecocalipsis y vincula tus resultados oficiales de superpoderes."}
          </p>
        </div>
        <button 
          onClick={onOpenSurvey}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider transition-all active:scale-95 shrink-0 cursor-pointer font-mono"
        >
          {student.ecoHeroCharacter ? "Repetir Test" : "Comenzar Test"}
        </button>
      </motion.div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Metric 1: Beneficiados */}
        <div className="p-5 rounded-[24px] bg-[#11221a]/90 border border-[#00ff88]/20 space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full">
              Grado 3°
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-400">Niños Instruidos</div>
          <div className="text-2xl font-black text-white">118 <span className="text-xs text-slate-400 font-normal">estudiantes</span></div>
        </div>

        

        {/* Metric 3: Talleres */}
        <div className="p-5 rounded-[24px] bg-[#11221a]/90 border border-[#00ff88]/20 space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full">
              Activos
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-400">Talleres Realizados</div>
          <div className="text-2xl font-black text-white">3 <span className="text-xs text-slate-400 font-normal">de 9 programados</span></div>
        </div>
      </div>

      {/* CARD 6: Nuestra Huella Verde */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-[28px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl space-y-4"
      >
        <h3 className="text-xl font-extrabold text-[#00ff88] hand-drawn">
          Nuestra Conciencia Ambiental
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          Cada taller y juego interactivo fortalece nuestro compromiso con la naturaleza. ¡Gracias a tu participación, hemos mejorado la conciencia ambiental de nuestra comunidad escolar en un <strong>56%</strong>!
        </p>



        {/* Conciencia Ambiental Progress Chart */}
        <div className="relative rounded-2xl overflow-hidden border border-[#00ff88]/20 mt-4 bg-[#0a1811] p-4 sm:p-6 text-center space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs border border-[#00ff88]/40">
              <TrendingUp className="w-3.5 h-3.5" /> +56% CONCIENCIA AMBIENTAL
            </div>
            <span className="text-[10px] text-slate-400 font-bold">Progreso Mensual • 2026</span>
          </div>

          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={AWARENESS_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConciencia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#00ff88" fontSize={10} tickLine={false} />
                <YAxis stroke="#00ff88" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a1a12', 
                    borderColor: '#00ff88', 
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '11px'
                  }} 
                  formatter={(value) => [`${value}%`, 'Conciencia Ambiental']}
                />
                <Area type="monotone" dataKey="conciencia" stroke="#00ff88" strokeWidth={3} fillOpacity={1} fill="url(#colorConciencia)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            Medición de asimilación conceptual basada en juegos interactivos y talleres completados.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

