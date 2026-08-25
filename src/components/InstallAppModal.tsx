import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose, deferredPrompt: externalPrompt }) => {
  const [internalPrompt, setInternalPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const activePrompt = externalPrompt || internalPrompt;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInternalPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      localStorage.setItem('pwa_installed', 'true');
      setInternalPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://') ||
      localStorage.getItem('pwa_installed') === 'true'
    ) {
      setIsInstalled(true);
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
          className="relative w-full max-w-md bg-[#050e09] border border-[#00ff88]/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,255,136,0.3)] overflow-hidden text-slate-100"
        >
          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#00ff88]/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <div className="relative mb-3 flex items-center justify-center gap-2">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00ff88]/20 to-emerald-900/60 border-2 border-[#00ff88] p-2 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <img
                  src="https://i.ibb.co/vx4nhDRR/Chat-GPT-Image-28-jul-2026-18-13-59-removebg-preview.png"
                  alt="Dino Ecocalipsis"
                  className="w-16 h-16 object-contain drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#00ff88] text-slate-950 p-1 rounded-full shadow-md">
                <Download className="w-4 h-4 font-black" />
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#00ff88] tracking-tight">
              Instalar Ecocalipsis
            </h2>
          </div>

            {/* Main Action Button */}
          <div className="space-y-3">
            {isInstalled ? (
              <div className="flex items-center justify-center gap-2 p-3.5 bg-[#00ff88]/15 border border-[#00ff88]/40 rounded-2xl text-[#00ff88] font-bold text-sm">
                <CheckCircle className="w-5 h-5" />
                ¡Aplicación instalada en este dispositivo!
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstallClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00ff88] via-emerald-400 to-teal-300 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:shadow-[0_0_35px_rgba(0,255,136,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                Instalar ahora (Web / PWA)
              </motion.button>
            )}

            {/* Direct Roku TV Zip Download Button */}
            <a
              href="/ecocalipsis_roku_channel.zip"
              download="ecocalipsis_roku_channel.zip"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-900/90 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4 text-[#00ff88]" />
              Descargar Paquete ZIP para Roku TV (.zip)
            </a>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
