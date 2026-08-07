/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Section, StudentProfile } from './types';
import { INITIAL_STUDENT_PROFILE } from './data/mockData';
import { auth, saveStudentProfile } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { RecyclingGame } from './components/RecyclingGame';
import { AboutUs } from './components/AboutUs';
import { Workshops } from './components/Workshops';
import { ImpactStats } from './components/ImpactStats';
import { StudentTracker } from './components/StudentTracker';
import { EcoTips } from './components/EcoTips';
import { NewsEvents } from './components/NewsEvents';
import { ReforestationSupport } from './components/ReforestationSupport';
import { LoginWidget } from './components/LoginWidget';
import { EcoSurvey } from './components/EcoSurvey';
import { EcoIAWidget } from './components/EcoIAWidget';
import { InstallAppModal } from './components/InstallAppModal';
import { FIFTY_BADGES, BadgeItem } from './data/badgesData';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Gamepad2, 
  GraduationCap, 
  BarChart3, 
  Lightbulb,
  Heart,
  TreePine,
  Award,
  Check
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('quienes-somos');
  const [student, setStudent] = useState<StudentProfile>({ ...INITIAL_STUDENT_PROFILE });
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<BadgeItem | null>(null);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Core system that identifies and unlocks the two official badges based on actual in-app events
  const triggerBadgeAction = (actionId: string, value: any = true) => {
    setStudent(prev => {
      let badgeIdToUnlock: string | null = null;
      
      if (
        actionId === 'start_jetpack' || 
        actionId === 'start_ecosort' || 
        actionId === 'game_played' || 
        actionId.includes('game') || 
        actionId.includes('jetpack') || 
        actionId.includes('ecosort')
      ) {
        badgeIdToUnlock = 'badge-jugar';
      } else if (
        actionId === 'lorax_quiz_passed' || 
        actionId === 'biodiversity_quiz_correct'
      ) {
        badgeIdToUnlock = 'badge-lorax';
      } else if (
        actionId === 'reciclaje_quiz_passed' ||
        actionId === 'reciclaje_quiz_correct'
      ) {
        badgeIdToUnlock = 'badge-reciclaje';
      }

      if (!badgeIdToUnlock) return prev;

      const currentBadges = prev.badges || [];
      let anyNewUnlock = false;
      let newlyUnlockedItem: any = null;

      let foundInExisting = false;
      const updatedBadges = currentBadges.map(b => {
        if (b.id === badgeIdToUnlock) {
          foundInExisting = true;
          if (!b.unlocked) {
            anyNewUnlock = true;
            newlyUnlockedItem = FIFTY_BADGES.find(x => x.id === b.id) || b;
            return { ...b, unlocked: true };
          }
        }
        return b;
      });

      if (!foundInExisting) {
        const templateItem = FIFTY_BADGES.find(x => x.id === badgeIdToUnlock);
        if (templateItem) {
          anyNewUnlock = true;
          newlyUnlockedItem = templateItem;
          updatedBadges.push({
            id: templateItem.id,
            name: templateItem.name,
            description: templateItem.description,
            icon: templateItem.icon,
            unlocked: true,
            requiredXP: 0
          });
        }
      }

      if (!anyNewUnlock) return prev;

      if (newlyUnlockedItem) {
        setNewlyUnlockedBadge(newlyUnlockedItem);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      }

      return {
        ...prev,
        badges: updatedBadges
      };
    });
  };

  // Save student updates to Firestore in real-time if logged in
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      saveStudentProfile(currentUser.uid, student).catch(err => {
        console.error("Error automatic saving to Firestore:", err);
      });
    }
  }, [student]);

  // Bottom Navigation tabs definition matching the screenshots
  const bottomTabs = [
    { id: 'quienes-somos' as Section, label: 'Inicio', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'juego' as Section, label: 'Juegos', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'capacitaciones' as Section, label: 'Aprende', icon: <GraduationCap className="w-6 h-6" />, isCenter: true },
    { id: 'seguimiento' as Section, label: 'Logros', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'consejos' as Section, label: 'Tips', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a1510] text-slate-100 font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-[#00ff88]/30 selection:text-[#00ff88]">
      {/* Ambient background glow effects */}
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-[-100px] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col space-y-6 pb-28">
        {/* Top Navbar */}
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          student={student}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
          deferredPrompt={deferredPrompt}
        />

        {/* Dynamic Section Content with Motion Transitions */}
        <main className="px-3 sm:px-6 max-w-4xl mx-auto w-full flex-1 space-y-6">
          <LoginWidget student={student} setStudent={setStudent} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSection === 'quienes-somos' && (
                <AboutUs 
                  onNavigate={setActiveSection} 
                  onOpenSurvey={() => setIsSurveyOpen(true)} 
                  onTriggerBadgeAction={triggerBadgeAction} 
                  onOpenInstallModal={() => setIsInstallModalOpen(true)}
                />
              )}

              {activeSection === 'juego' && (
                <RecyclingGame
                  student={student}
                  setStudent={setStudent}
                  onTriggerBadgeAction={triggerBadgeAction}
                />
              )}

              {activeSection === 'capacitaciones' && (
                <Workshops 
                  student={student} 
                  setStudent={setStudent} 
                  onTriggerBadgeAction={triggerBadgeAction} 
                  onWorkshopOpenChange={setIsWorkshopOpen}
                  onNavigate={setActiveSection}
                />
              )}

              {activeSection === 'estadisticas' && <ImpactStats />}

              {activeSection === 'seguimiento' && (
                <StudentTracker 
                  student={student} 
                  setStudent={setStudent} 
                  onOpenSurvey={() => setIsSurveyOpen(true)} 
                  onTriggerBadgeAction={triggerBadgeAction} 
                />
              )}

              {activeSection === 'consejos' && (
                <EcoTips 
                  onNavigate={setActiveSection} 
                  onTriggerBadgeAction={triggerBadgeAction} 
                />
              )}

              {activeSection === 'noticias' && <NewsEvents />}

              {activeSection === 'apoyar' && (
                <ReforestationSupport 
                  student={student} 
                  setStudent={setStudent} 
                  onTriggerBadgeAction={triggerBadgeAction} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Fixed Floating Bottom Navigation Bar (Hidden when workshop modal is open) */}
      {!isWorkshopOpen && (
        <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-3 pointer-events-none">
          <nav className="pointer-events-auto bg-[#07160e]/50 border border-[#00ff88]/25 backdrop-blur-xl px-2 sm:px-3 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_15px_rgba(0,255,136,0.1)] flex items-center justify-between relative">
            {bottomTabs.map((tab) => {
              const isActive = activeSection === tab.id || (tab.id === 'seguimiento' && activeSection === 'estadisticas');
              
              if (tab.isCenter) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className="relative -top-3.5 flex flex-col items-center group focus:outline-none shrink-0 px-1"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all ring-4 ring-[#07160e]/70 ${
                        isActive 
                          ? 'bg-gradient-to-tr from-[#00ff88] via-[#2effa0] to-emerald-300 text-slate-950 border-2 border-white' 
                          : 'bg-gradient-to-tr from-[#00ff88] to-emerald-400 text-slate-950 hover:brightness-110'
                      }`}
                    >
                      {tab.icon}
                    </motion.div>
                    <span className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${
                      isActive ? 'text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]' : 'text-slate-300'
                    }`}>
                      {tab.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className="relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all focus:outline-none group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 w-6 h-1 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div 
                    whileTap={{ scale: 0.88 }}
                    className={`relative z-10 p-1 transition-all ${
                      isActive ? 'text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {tab.icon}
                  </motion.div>
                  <span className={`relative z-10 text-[9px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#00ff88]' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* EcoSurvey Full-Screen Overlay */}
      <EcoSurvey 
        isOpen={isSurveyOpen} 
        onClose={() => setIsSurveyOpen(false)} 
        student={student} 
        setStudent={setStudent} 
        onTriggerBadgeAction={triggerBadgeAction} 
      />

      {/* Floating Interactive EcoIA Spherical Widget */}
      <EcoIAWidget hidden={activeSection === 'juego' || isWorkshopOpen || isSurveyOpen} />

      {/* PWA Direct Installation Modal */}
      <InstallAppModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
        deferredPrompt={deferredPrompt}
      />

      {/* GORGEOUS ACHIEVEMENT UNLOCKED FULLSCREEN CELEBRATION CARDS OVERLAY */}
      <AnimatePresence>
        {newlyUnlockedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            {/* Celebration Card Container */}
            <motion.div
              initial={{ scale: 0.85, y: 30, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0, transition: { type: "spring", damping: 15 } }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-sm overflow-hidden bg-gradient-to-b from-[#11241c] to-[#0a1510] border-2 border-[#00ff88] rounded-[36px] shadow-[0_0_50px_rgba(0,255,136,0.3)] p-6 text-center text-slate-100 flex flex-col items-center space-y-4"
            >
              {/* Shining radial background aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#00ff88]/10 blur-3xl pointer-events-none" />

              {/* Award Icon & Header Text */}
              <div className="space-y-1.5 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20">
                  <Award className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>¡Insignia Conseguida!</span>
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight bg-gradient-to-r from-amber-400 via-[#00ff88] to-emerald-400 bg-clip-text text-transparent">
                  ¡LOGRO DESBLOQUEADO!
                </h3>
              </div>

              {/* Massive Badge Image - Pure image without box/border container */}
              <div className="relative w-36 h-36 flex items-center justify-center z-10 my-2">
                {newlyUnlockedBadge.icon?.startsWith('http') || newlyUnlockedBadge.icon?.startsWith('/') ? (
                  <img 
                    src={newlyUnlockedBadge.icon} 
                    alt={newlyUnlockedBadge.name} 
                    className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(250,204,21,0.8)] animate-pulse hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-6xl">{newlyUnlockedBadge.icon}</span>
                )}
              </div>

              {/* Badge Details */}
              <div className="space-y-1 relative z-10">
                <h4 className="text-xl font-extrabold text-white leading-tight">
                  {newlyUnlockedBadge.name}
                </h4>
                <p className="text-xs text-[#00ff88] font-mono font-bold uppercase tracking-wider">
                  Categoría: {newlyUnlockedBadge.category}
                </p>
                <p className="text-xs text-slate-300 font-medium px-4 pt-1 leading-relaxed">
                  {newlyUnlockedBadge.description}
                </p>
              </div>

              {/* CTA Claim Button */}
              <button
                onClick={() => {
                  setNewlyUnlockedBadge(null);
                  confetti({
                    particleCount: 50,
                    spread: 40,
                    colors: ['#00ff88', '#facc15']
                  });
                }}
                className="w-full py-3.5 rounded-2xl bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer font-mono relative z-10 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>¡SÚPER! SEGUIR SUMANDO</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

