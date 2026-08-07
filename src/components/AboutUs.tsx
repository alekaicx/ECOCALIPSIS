import React, { useState } from 'react';
import { 
  Flag, 
  Eye, 
  Heart, 
  CheckCircle2, 
  Sparkles,
  HandHeart,
  Zap,
  Smile,
  ShieldCheck,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Section } from '../types';

interface AboutUsProps {
  onNavigate?: (section: Section) => void;
  onOpenSurvey?: () => void;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate, onOpenSurvey }) => {
  const [unlockedPowers, setUnlockedPowers] = useState<number[]>([]);
  const [readMision, setReadMision] = useState(false);
  const [readVision, setReadVision] = useState(false);

  const togglePower = (id: number) => {
    if (!unlockedPowers.includes(id)) {
      setUnlockedPowers([...unlockedPowers, id]);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setUnlockedPowers(unlockedPowers.filter(p => p !== id));
    }
  };

  const handleSumate = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 }
    });
    if (onNavigate) {
      onNavigate('juego');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      {/* HERO & FEATURED IMAGE */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-[32px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl backdrop-blur-md space-y-4 text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00ff88] tracking-tight">
          ¡Somos la última generación que puede salvar el planeta! 🌍
        </h1>

        <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-lg mx-auto">
          Un grupo de niños y niñas de la <strong>IED Pío X</strong> cuidando el agua, la tierra y los animales. ¡Aprender es nuestra mayor aventura!
        </p>

        {/* User Provided Image - Animated & Transparent */}
        <div className="my-6 flex justify-center items-center relative py-2">
          <motion.img 
            src="https://i.ibb.co/n8sQGNrJ/Chat-GPT-Image-28-jul-2026-12-07-51-removebg-preview.png" 
            alt="Exploradores IED Pío X"
            animate={{ 
              y: [0, -12, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5, 
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.08 }}
            className="w-full max-w-sm sm:max-w-md h-auto max-h-[420px] object-contain drop-shadow-[0_15px_25px_rgba(0,255,136,0.25)] filter"
          />
        </div>
      </motion.div>

      {/* INTERACTIVE GAME: TAP TO REVEAL ECO-SUPERPOWERS */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-[#122b20] to-[#0a1811] border-2 border-[#00ff88] shadow-2xl relative overflow-hidden text-center space-y-6"
      >
        {/* Decorative blur elements inside the card */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff88]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/30 font-mono">
            ✨ EVALUACIÓN DE SUPERPODERES ✨
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#00ff88] tracking-tight leading-tight">
            Toca para Revelar tus Superpoderes Ecológicos
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto font-medium">
            ¿Qué personaje protector del bosque eres? Responde la divertida encuesta oficial de hábitos de <strong className="text-amber-400 underline decoration-amber-400">Ecocalipsis</strong> vinculada a tu cuenta de Google.
          </p>
        </div>

        {/* Big interactive floating button with continuous animation */}
        <div className="flex justify-center items-center py-3 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 10px 25px -5px rgba(0,255,136,0.3)",
                "0 15px 35px 5px rgba(0,255,136,0.5)",
                "0 10px 25px -5px rgba(0,255,136,0.3)"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            onClick={onOpenSurvey}
            className="px-8 py-4 sm:py-5 rounded-full bg-[#00ff88] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 shadow-2xl border border-white/20 transition-all cursor-pointer"
          >
            <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            <span>¡Revelar mis Superpoderes!</span>
          </motion.button>
        </div>

        {/* Badges for characters */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
          <span className="text-[10px] bg-[#0d2116] text-slate-300 font-bold px-3 py-1.5 rounded-xl border border-[#00ff88]/15 flex items-center gap-1.5 font-mono">
            🦖 Dinosaurio
          </span>
          <span className="text-[10px] bg-[#0d2116] text-slate-300 font-bold px-3 py-1.5 rounded-xl border border-[#00ff88]/15 flex items-center gap-1.5 font-mono">
            🦊 Zorro
          </span>
          <span className="text-[10px] bg-[#0d2116] text-slate-300 font-bold px-3 py-1.5 rounded-xl border border-[#00ff88]/15 flex items-center gap-1.5 font-mono">
            🦈 Tiburón
          </span>
          <span className="text-[10px] bg-[#0d2116] text-slate-300 font-bold px-3 py-1.5 rounded-xl border border-[#00ff88]/15 flex items-center gap-1.5 font-mono">
            🐰 Conejo
          </span>
        </div>
      </motion.div>

      {/* SHORT MISIÓN Y VISIÓN CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* NUESTRA MISIÓN WITH DINOSAUR LOGO PREVIEW */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setReadMision(!readMision);
            confetti({ particleCount: 35, colors: ['#00ff88', '#38bdf8'] });
          }}
          className="p-6 rounded-[28px] bg-gradient-to-br from-[#11241a] to-[#06120b] border-2 border-[#00ff88] shadow-xl space-y-3 cursor-pointer text-left relative overflow-hidden group"
        >
          {/* Dinosaur Logo */}
          <div className="absolute top-2 right-2 text-5xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300 select-none">
            🦖
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#00ff88]/15 text-[#00ff88] flex items-center justify-center border border-[#00ff88]/30 group-hover:bg-[#00ff88]/20 transition-all">
            <Flag className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-lg font-black text-[#00ff88] flex items-center gap-1.5 uppercase tracking-wide">
            🏆 Nuestra Misión
          </h3>
          
          <AnimatePresence initial={false} mode="wait">
            {!readMision ? (
              <motion.div
                key="mision-preview"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="pt-1"
              >
                <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                  ¿Quieres ver nuestra gran misión con el <strong className="text-emerald-400">Dinosaurio 🦖</strong>?
                </p>
                <span className="inline-block mt-2 text-[10px] bg-[#00ff88]/20 text-[#00ff88] px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                  Toca para Leer 🦖
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="mision-full"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3 pt-1"
              >
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  ¡Convertirnos en los <strong className="text-[#00ff88] underline decoration-wavy">Súper Héroes de la Tierra</strong>! Aprendemos jugando a cuidar el agua, reciclar botellas y rescatar la naturaleza, llevando el mensaje mágico a nuestros hogares.
                </p>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-2xl animate-bounce">🦖</span>
                  <span className="text-[9px] text-[#00ff88] font-black uppercase tracking-wide">
                    ¡El Súper Dinosaurio apoya la misión ecológica!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* NUESTRA VISIÓN WITH SHARK LOGO PREVIEW */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setReadVision(!readVision);
            confetti({ particleCount: 35, colors: ['#fbbf24', '#f59e0b'] });
          }}
          className="p-6 rounded-[28px] bg-gradient-to-br from-[#11221a] to-[#0a1811] border-2 border-amber-400 shadow-xl space-y-3 cursor-pointer text-left relative overflow-hidden group"
        >
          {/* Shark Logo */}
          <div className="absolute top-2 right-2 text-5xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300 select-none">
            🦈
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-400/20 transition-all">
            <Eye className="w-5 h-5 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
            🚀 Nuestra Visión
          </h3>

          <AnimatePresence initial={false} mode="wait">
            {!readVision ? (
              <motion.div
                key="vision-preview"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="pt-1"
              >
                <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                  ¿Quieres descubrir nuestra visión con el <strong className="text-amber-400">Tiburón 🦈</strong>?
                </p>
                <span className="inline-block mt-2 text-[10px] bg-amber-400/20 text-amber-400 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                  Toca para Leer 🦈
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="vision-full"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3 pt-1"
              >
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  ¡Hacer de la <strong className="text-amber-400 underline decoration-wavy">IED Pío X</strong> el templo verde y ecológico más asombroso de toda Colombia para el 2026, donde cada niño brille con sus superpoderes ambientales!
                </p>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-2xl animate-pulse">🦈</span>
                  <span className="text-[9px] text-amber-400 font-black uppercase tracking-wide">
                    ¡El Tiburón del Sumapaz guía nuestra visión!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CENTRALIZED PLAY ACTION BUTTON - REPLACING REACTIONS SECTION */}
      <div className="pt-6 flex flex-col items-center justify-center space-y-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              "0 10px 25px -5px rgba(0,255,136,0.2)",
              "0 15px 35px 5px rgba(0,255,136,0.3)",
              "0 10px 25px -5px rgba(0,255,136,0.2)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          onClick={handleSumate}
          className="w-32 h-32 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 flex flex-col items-center justify-center gap-1 shadow-2xl border-4 border-emerald-300 font-black transition-all cursor-pointer"
        >
          <HandHeart className="w-8 h-8 text-slate-950" />
          <span className="text-sm uppercase tracking-wider">¡JUGAR!</span>
        </motion.button>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          ¡Aprende y diviértete con la ecología!
        </p>
      </div>
    </div>
  );
};


