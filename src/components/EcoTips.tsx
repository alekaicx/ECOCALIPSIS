import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  Zap, 
  Recycle, 
  TreePine, 
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EcoTipsProps {
  onNavigate?: (section: any) => void;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

type CategoryId = 'agua' | 'energia' | 'residuos' | 'bosques' | null;

export const EcoTips: React.FC<EcoTipsProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  // Load Instagram embed script on mount for the bottom gallery
  useEffect(() => {
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.async = true;
      script.src = '//www.instagram.com/embed.js';
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      try {
        (window as any).instgrm.Embeds.process();
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const CATEGORIES = [
    {
      id: 'agua' as CategoryId,
      title: 'Cuidado del Agua',
      iconEmoji: '💧',
      badge: 'Recurso Hídrico',
      badgeColor: 'text-sky-300 bg-sky-500/15 border-sky-400/30',
      titleColor: 'text-sky-300',
      btnBg: 'bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]',
      shortDesc: 'Aprende hábitos para cuidar las fuentes de agua dulce.',
      tips: [
        {
          id: 0,
          badge: '💧 Cuidado del Agua • Hídrico',
          badgeColor: 'text-sky-300 bg-sky-500/15 border-sky-400/30',
          title: '🥛 Usa un Vaso al Cepillarte',
          titleColor: 'text-sky-300',
          body: 'Dejar la llave abierta mientras te cepillas los dientes desperdicia hasta 36 litros de agua limpia. Con un solo vaso usas únicamente lo necesario y proteges las reservas de agua dulce.',
          img: 'https://i.ibb.co/ycs8vhKm/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(56,189,248,0.5)]',
          btnBg: 'bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]'
        },
        {
          id: 1,
          badge: '💧 Ducha Eficiente • Hábitos Diarios',
          badgeColor: 'text-sky-300 bg-sky-500/15 border-sky-400/30',
          title: '🚿 Duchas Rápidas de 5 Minutos',
          titleColor: 'text-sky-300',
          body: 'Reducir tu tiempo en la ducha ahorra cientos de litros de agua al mes para nuestros ríos y embalses. Pon tu canción favorita y sal antes de que termine.',
          img: 'https://i.ibb.co/fdm5702R/90890f69ab5a4d5fb1a2e1bdd29341de-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(56,189,248,0.5)]',
          btnBg: 'bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]'
        },
        {
          id: 2,
          badge: '💧 Cierre Hermético • Cero Fugas',
          badgeColor: 'text-sky-300 bg-sky-500/15 border-sky-400/30',
          title: '🚰 Cierra bien los Grifos',
          titleColor: 'text-sky-300',
          body: 'Una sola gota por segundo desperdicia más de 30 litros de agua al día. Asegúrate de cerrar bien las llaves en casa y reportar goteos en tu colegio.',
          img: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(56,189,248,0.5)]',
          btnBg: 'bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]'
        }
      ]
    },
    {
      id: 'energia' as CategoryId,
      title: 'Ahorro de Energía',
      iconEmoji: '⚡',
      badge: 'Eficiencia Eléctrica',
      badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
      titleColor: 'text-amber-300',
      btnBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]',
      shortDesc: 'Desconecta aparatos en espera y optimiza la luz.',
      tips: [
        {
          id: 0,
          badge: '⚡ Vampiros Eléctricos • Eficiencia',
          badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
          title: '🔌 Desconecta Cargadores Sin Uso',
          titleColor: 'text-amber-300',
          body: 'Los cargadores de celular, tablets y consolas conectados a la toma siguen consumiendo electricidad aunque no estén cargando nada. ¡Desconéctalos al terminar!',
          img: 'https://i.ibb.co/dwZmXvkD/Stickers-for-Sale-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(245,158,11,0.5)]',
          btnBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
        },
        {
          id: 1,
          badge: '⚡ Iluminación Eficiente • Tecnología LED',
          badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
          title: '💡 Utiliza Bombillas LED',
          titleColor: 'text-amber-300',
          body: 'Las luces LED consumen hasta un 80% menos de energía que las incandescentes y duran años. Aprovecha también la luz natural de las ventanas durante el día.',
          img: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(245,158,11,0.5)]',
          btnBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
        },
        {
          id: 2,
          badge: '⚡ Apagado Oportuno • Cero Desperdicio',
          badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
          title: '🖥️ Apaga Pantallas y Luces',
          titleColor: 'text-amber-300',
          body: 'Al salir de tu habitación o terminar tus labores en el colegio, apaga televisores, monitores y luces. Pequeños actos reducen la huella de carbono global.',
          img: 'https://i.ibb.co/fdm5702R/90890f69ab5a4d5fb1a2e1bdd29341de-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(245,158,11,0.5)]',
          btnBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
        }
      ]
    },
    {
      id: 'residuos' as CategoryId,
      title: 'Manejo de Residuos',
      iconEmoji: '♻️',
      badge: 'Separación en la Fuente',
      badgeColor: 'text-teal-300 bg-teal-500/15 border-teal-400/30',
      titleColor: 'text-teal-300',
      btnBg: 'bg-gradient-to-r from-teal-300 via-emerald-400 to-[#00ff88] text-slate-950 shadow-[0_0_25px_rgba(45,212,191,0.4)]',
      shortDesc: 'Aprende a reciclar en las 3 canecas oficiales.',
      tips: [
        {
          id: 0,
          badge: '♻️ Caneca Blanca • Material Aprovechable',
          badgeColor: 'text-teal-300 bg-teal-500/15 border-teal-400/30',
          title: '⚪ Caneca Blanca: Reciclaje Seco',
          titleColor: 'text-teal-300',
          body: 'Deposita aquí plástico limpio, cajas de cartón, latas de aluminio y las hojas secas de tus cuadernos. ¡Todo debe estar seco y sin restos de comida!',
          img: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(45,212,191,0.5)]',
          btnBg: 'bg-gradient-to-r from-teal-300 via-emerald-400 to-[#00ff88] text-slate-950 shadow-[0_0_25px_rgba(45,212,191,0.4)]'
        },
        {
          id: 1,
          badge: '♻️ Caneca Verde • Materia Orgánica',
          badgeColor: 'text-teal-300 bg-teal-500/15 border-teal-400/30',
          title: '🟢 Caneca Verde: Residuos Orgánicos',
          titleColor: 'text-teal-300',
          body: 'Usa la caneca verde para cáscaras de frutas, restos de verduras y sobrantes de comida. Estos residuos pueden transformarse en abono natural o compostaje.',
          img: 'https://i.ibb.co/dwZmXvkD/Stickers-for-Sale-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(45,212,191,0.5)]',
          btnBg: 'bg-gradient-to-r from-teal-300 via-emerald-400 to-[#00ff88] text-slate-950 shadow-[0_0_25px_rgba(45,212,191,0.4)]'
        },
        {
          id: 2,
          badge: '♻️ Caneca Negra • No Aprovechable',
          badgeColor: 'text-teal-300 bg-teal-500/15 border-teal-400/30',
          title: '⚫ Caneca Negra: Residuos Comunes',
          titleColor: 'text-teal-300',
          body: 'En la caneca negra van las servilletas usadas, papel higiénico, cartones sucios con grasa y envolturas no reciclables que van directamente al relleno sanitario.',
          img: 'https://i.ibb.co/fdm5702R/90890f69ab5a4d5fb1a2e1bdd29341de-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(45,212,191,0.5)]',
          btnBg: 'bg-gradient-to-r from-teal-300 via-emerald-400 to-[#00ff88] text-slate-950 shadow-[0_0_25px_rgba(45,212,191,0.4)]'
        }
      ]
    },
    {
      id: 'bosques' as CategoryId,
      title: 'Bosques y Páramos',
      iconEmoji: '🌳',
      badge: 'Ecosistemas y Conservación',
      badgeColor: 'text-[#00ff88] bg-[#00ff88]/15 border-[#00ff88]/30',
      titleColor: 'text-[#00ff88]',
      btnBg: 'bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(0,255,136,0.4)]',
      shortDesc: 'Protección de bosques andinos y el Páramo de Sumapaz.',
      tips: [
        {
          id: 0,
          badge: '🌳 Uso Consciente • Deforestación Cero',
          badgeColor: 'text-[#00ff88] bg-[#00ff88]/15 border-[#00ff88]/30',
          title: '📄 Hojas que Salvan Árboles',
          titleColor: 'text-[#00ff88]',
          body: 'Aprovecha ambas caras de las hojas de tus cuadernos en el colegio antes de desecharlas. Reciclar cuadernos evita la tala de bosques comerciales de celulosa.',
          img: 'https://i.ibb.co/vvcVxfY8/descarga-3-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(0,255,136,0.6)]',
          btnBg: 'bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(0,255,136,0.4)]'
        },
        {
          id: 1,
          badge: '🌳 Fábrica de Agua • Páramo de Sumapaz',
          badgeColor: 'text-[#00ff88] bg-[#00ff88]/15 border-[#00ff88]/30',
          title: '🌼 Cuidado del Páramo de Sumapaz',
          titleColor: 'text-[#00ff88]',
          body: 'Los frailejones del Páramo de Sumapaz capturan la neblina para abastecer de agua pura a millones de personas. Recuerda que los árboles de Sumapaz no se usan para papel; su única función es cosechar agua y dar vida.',
          img: 'https://i.ibb.co/ycs8vhKm/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png',
          glow: 'drop-shadow-[0_20px_45px_rgba(0,255,136,0.6)]',
          btnBg: 'bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(0,255,136,0.4)]'
        }
      ]
    }
  ];

  const openCategoryModal = (id: CategoryId) => {
    setSelectedCategory(id);
    setCurrentTipIndex(0);
  };

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-12 max-w-3xl mx-auto py-2 text-center relative">
      
      {/* Title Header */}
      <div className="space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> ECOTIPS E HISTORIAS
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Consejos Ecológicos Interactivos
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
          Haz clic en cualquier tema para abrir la ventana de consejos interactivos y avanzar paso a paso.
        </p>
      </div>

      {/* Floating Category Selectors (Formato Capacitaciones, sin recuadros pesados) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openCategoryModal(cat.id)}
            className="p-6 rounded-[32px] bg-transparent hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center text-center space-y-4 group relative"
          >
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              {cat.iconEmoji}
            </div>

            <div className="space-y-1.5">
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${cat.badgeColor}`}>
                {cat.badge}
              </span>
              <h3 className={`text-xl font-black ${cat.titleColor} group-hover:text-white transition-colors`}>
                {cat.title}
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xs mx-auto">
                {cat.shortDesc}
              </p>
            </div>

            <button className={`mt-2 px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 cursor-pointer transition-transform group-hover:scale-105 ${cat.btnBg}`}>
              <span>Abrir Consejos</span> <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* FULL-SCREEN SLIDE MODAL WINDOW (Formato Capacitaciones) */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl min-h-[520px] max-h-[92vh] overflow-y-auto rounded-[40px] bg-[#07140b]/95 border border-[#00ff88]/30 p-6 sm:p-10 shadow-[0_0_80px_rgba(0,255,136,0.15)] text-center relative flex flex-col justify-between"
            >
              {/* Modal Header Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeCategory.iconEmoji}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${activeCategory.badgeColor}`}>
                    {activeCategory.title}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2.5 rounded-2xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                  title="Cerrar ventana"
                >
                  <X className="w-6 h-6 font-black" />
                </button>
              </div>

              {/* INTERACTIVE SLIDE STEPS */}
              <div className="py-6 flex flex-col items-center justify-center space-y-6 my-auto">
                
                {/* Step Selector Pills (Top) */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {activeCategory.tips.map((tip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTipIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
                        currentTipIndex === idx
                          ? activeCategory.badgeColor + ' scale-105'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Consejo {idx + 1}
                    </button>
                  ))}
                </div>

                {/* ACTIVE TIP CONTENT WITH MOTION */}
                {(() => {
                  const currentTip = activeCategory.tips[currentTipIndex];
                  if (!currentTip) return null;

                  return (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTipIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 flex flex-col items-center max-w-2xl px-2"
                      >
                        {/* Floating Character Illustration */}
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                          className="relative cursor-pointer my-2"
                          onClick={() => {
                            if (currentTipIndex < activeCategory.tips.length - 1) {
                              setCurrentTipIndex(currentTipIndex + 1);
                            } else {
                              setSelectedCategory(null);
                            }
                          }}
                        >
                          <img
                            src={currentTip.img}
                            alt={currentTip.title}
                            className={`w-44 h-44 sm:w-56 sm:h-56 object-contain transition-all hover:scale-110 ${currentTip.glow}`}
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>

                        {/* Tip Title & Body */}
                        <div className="space-y-3">
                          <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${currentTip.badgeColor}`}>
                            {currentTip.badge}
                          </span>
                          <h3 className={`text-2xl sm:text-4xl font-black tracking-tight ${currentTip.titleColor}`}>
                            {currentTip.title}
                          </h3>
                          <p className="text-sm sm:text-lg text-slate-200 font-sans leading-relaxed max-w-xl mx-auto">
                            {currentTip.body}
                          </p>
                        </div>

                        {/* Navigation Buttons (Anterior & Siguiente) */}
                        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                          {currentTipIndex > 0 && (
                            <button
                              onClick={() => setCurrentTipIndex(currentTipIndex - 1)}
                              className="px-5 py-3 rounded-2xl font-black text-xs bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" /> Anterior
                            </button>
                          )}

                          {currentTipIndex < activeCategory.tips.length - 1 ? (
                            <button
                              onClick={() => setCurrentTipIndex(currentTipIndex + 1)}
                              className={`px-7 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${currentTip.btnBg}`}
                            >
                              Siguiente Consejo <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedCategory(null)}
                              className="px-8 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(0,255,136,0.5)] flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                            >
                              <CheckCircle2 className="w-5 h-5" /> ¡Finalizar Consejos!
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  );
                })()}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM OFFICIAL POSTS GALLERY (DIRECTLY AT THE BOTTOM OF PAGE) */}
      <div className="pt-8 border-t border-slate-800/80 text-left space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
            📸 COMUNIDAD ECOCALIPSIS
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white pt-2">
            Publicaciones Oficiales en Instagram
          </h3>
          <p className="text-xs text-slate-300 font-medium">
            Mira eventos, fotos y actividades desde nuestro perfil <strong className="text-pink-400">@proyecto_ecocalipsis</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "DWF2zzglo3X",
            "DWIymzZFoyy",
            "DWMLHhMlkQZ",
            "DWO77XhFioU",
            "DXf3AICGAZ3",
            "DWGAK4cDSFg"
          ].map((postId, idx) => (
            <div key={postId} className="flex flex-col items-center justify-center overflow-hidden">
              <div className={`w-full flex justify-center overflow-hidden ${idx === 4 ? 'max-h-[290px]' : 'max-h-[380px]'} relative rounded-2xl`}>
                <div className={`w-full flex justify-center -mt-[65px] ${idx === 4 ? '-mb-[150px]' : '-mb-[75px]'}`}>
                  <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`} data-instgrm-version="14" style={{ background:'#FFF', border:0, borderRadius:'3px', boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth:'540px', minWidth:'326px', padding:0, width:'100%' }}>
                    <div style={{ padding: '16px' }}>
                      <a href={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`} style={{ background:'#FFFFFF', lineHeight:0, padding:'0 0', textAlign:'center', textDecoration:'none', width:'100%' }} target="_blank" rel="noreferrer">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                            <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                            <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                          </div>
                        </div>
                        <div style={{ padding: '19% 0' }}></div>
                        <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                          <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg>
                        </div>
                        <div style={{ paddingTop: '8px' }}>
                          <div style={{ color: '#3897f0', fontFamily: 'Arial, sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>Ver esta publicación en Instagram</div>
                        </div>
                      </a>
                      <p style={{ color: '#c9c8cd', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <a href={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`} style={{ color: '#c9c8cd', fontFamily: 'Arial, sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noreferrer">Una publicación compartida de Ecocalipsis (@proyecto_ecocalipsis)</a>
                      </p>
                    </div>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
