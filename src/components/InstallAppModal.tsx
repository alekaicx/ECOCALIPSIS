import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Smartphone, Monitor, Share, MoreVertical, PlusSquare, X, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose, deferredPrompt: externalPrompt }) => {
  const [internalPrompt, setInternalPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'pc'>('android');

  const activePrompt = externalPrompt || internalPrompt;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInternalPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInternalPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Detect if already running in standalone (installed) mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    // Detect browser OS to set default tab
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActiveTab('ios');
    } else if (/android/.test(userAgent)) {
      setActiveTab('android');
    } else {
      setActiveTab('pc');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (activePrompt) {
      try {
        activePrompt.prompt();
        const { outcome } = await activePrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
        setInternalPrompt(null);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Direct user to open ecocalipsis.netlify.app in new tab or standalone
      window.open('https://ecocalipsis.netlify.app', '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a1d13] border border-[#00ff88]/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,255,136,0.25)] overflow-hidden text-slate-100"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#00ff88]/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00ff88]/20 to-emerald-900/60 border-2 border-[#00ff88] p-2 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <img
                  src="https://i.ibb.co/N52xC5L/Whats-App-Image-2026-08-07-at-1-58-55-PM-removebg-preview.png"
                  alt="Dino Ecocalipsis"
                  className="w-16 h-16 object-contain drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#00ff88] text-slate-950 p-1 rounded-full shadow-md">
                <Download className="w-4 h-4 font-black" />
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#00ff88] tracking-tight">
              Instalar Ecocalipsis 📲
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mt-1">
              Crea un acceso directo en la pantalla principal de tu celular o computador para abrir <span className="text-[#00ff88] font-bold">ecocalipsis.netlify.app</span> con un solo toque.
            </p>
          </div>

          {/* Main Action Button */}
          <div className="mb-6">
            {isInstalled ? (
              <div className="flex items-center justify-center gap-2 p-3 bg-[#00ff88]/15 border border-[#00ff88]/40 rounded-2xl text-[#00ff88] font-bold text-sm">
                <CheckCircle className="w-5 h-5" />
                ¡Aplicación instalada en este dispositivo!
              </div>
            ) : activePrompt ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstallClick}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-300 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:shadow-[0_0_35px_rgba(0,255,136,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                INSTALAR AHORA EN MI PANTALLA
              </motion.button>
            ) : (
              <a
                href="https://ecocalipsis.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-300 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                Abrir en ecocalipsis.netlify.app
              </a>
            )}
          </div>

          {/* Device Tabs for Step-by-Step Instructions */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Instrucciones paso a paso según tu dispositivo:
            </p>

            <div className="flex gap-1.5 p-1 bg-black/50 rounded-xl mb-4 border border-white/5">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'android'
                    ? 'bg-[#00ff88] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Android
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ios'
                    ? 'bg-[#00ff88] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Share className="w-3.5 h-3.5" />
                iPhone / iPad
              </button>
              <button
                onClick={() => setActiveTab('pc')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'pc'
                    ? 'bg-[#00ff88] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                PC / Laptop
              </button>
            </div>

            {/* Steps Content */}
            <div className="space-y-2.5 text-xs text-slate-200">
              {activeTab === 'android' && (
                <>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>Abre el menú de Chrome tocando los <strong>3 puntos verticales (⋮)</strong> arriba a la derecha.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>Selecciona <strong>"Agregar a la pantalla principal"</strong> o <strong>"Instalar aplicación"</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p>¡Listo! El icono del Dino Ecocalipsis aparecerá en tu teléfono como una App real.</p>
                  </div>
                </>
              )}

              {activeTab === 'ios' && (
                <>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>Abre esta página en <strong>Safari</strong> y toca el botón de <strong>Compartir (⎘)</strong> abajo en el centro.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>Desplázate hacia abajo y elige <strong>"Agregar a inicio ➕"</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p>Toca "Agregar" arriba a la derecha. ¡Tendrás el acceso directo listo!</p>
                  </div>
                </>
              )}

              {activeTab === 'pc' && (
                <>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>En Google Chrome o Edge, busca el ícono de <strong>Instalar (💻 o ➕)</strong> en el extremo derecho de la barra de URL arriba.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 text-[#00ff88] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>Haz clic en <strong>"Instalar"</strong> para tener Ecocalipsis directo en tu escritorio.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
