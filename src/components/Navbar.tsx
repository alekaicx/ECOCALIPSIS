import React, { useState, useEffect } from 'react';
import { Section, StudentProfile } from '../types';
import { 
  Sparkles, 
  Bot, 
  Leaf,
  Star,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { auth, onAuthStateChanged, signOut, User as FirebaseUser } from '../lib/firebase';

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  student: StudentProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  student
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 pt-3 pb-1">
      <nav className="mx-auto max-w-4xl bg-[#0f2018]/80 rounded-full px-4 py-2.5 border border-[#00ff88]/20 backdrop-blur-xl shadow-xl flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveSection('quienes-somos')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 group-hover:bg-[#00ff88]/20 transition-all duration-300">
            <Leaf className="w-4 h-4 text-[#00ff88]" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-[#00ff88] uppercase font-sans">
              Ecocalipsis
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Active Account / Profile Pic */}
          <div 
            onClick={() => setActiveSection('seguimiento')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#183024] border border-[#00ff88]/20 cursor-pointer hover:border-[#00ff88]/40 transition-all"
            title={currentUser ? `Cuenta de ${currentUser.displayName || currentUser.email}` : "Perfil Estudiante"}
          >
            {currentUser && currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || "Avatar"} 
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full border border-[#00ff88] object-cover"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/50 flex items-center justify-center text-[#00ff88]">
                <UserIcon className="w-3 h-3" />
              </div>
            )}
            <span className="text-[10px] font-bold text-slate-200 hidden xs:inline max-w-[80px] truncate">
              {currentUser ? (currentUser.displayName?.split(' ')[0] || 'Mi Cuenta') : (student.name || 'Guardián')}
            </span>
            <span className="text-[10px] font-mono font-black text-[#00ff88] bg-[#00ff88]/15 px-1.5 py-0.5 rounded-full">
              N{student.level}
            </span>
          </div>

          {currentUser && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                try {
                  await signOut(auth);
                  localStorage.removeItem('eco_auto_login');
                } catch (e) {
                  console.error("Error signing out:", e);
                }
              }}
              className="p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer flex items-center justify-center"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>
      </nav>
    </header>
  );
};


