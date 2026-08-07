import React, { useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  getStudentProfile,
  saveStudentProfile,
  User 
} from '../lib/firebase';
import { 
  LogIn, 
  LogOut, 
  Sparkles, 
  UserCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  ArrowRight,
  ChevronLeft,
  X,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockData';

interface LoginWidgetProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
}

export const LoginWidget: React.FC<LoginWidgetProps> = ({ student, setStudent }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'choose_method' | 'gmail_form'>('choose_method');
  
  // Auth Mode: 'login' | 'register'
  const [isRegistering, setIsRegistering] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check auth state on mount
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const cloudProfile = await getStudentProfile(currentUser.uid);
          if (cloudProfile) {
            setStudent(cloudProfile as StudentProfile);
          } else {
            // Create initial profile in Firestore
            const initialProfile: StudentProfile = {
              ...INITIAL_STUDENT_PROFILE,
              name: currentUser.displayName || currentUser.email?.split('@')[0] || 'Estudiante Pío X',
            };
            setStudent(initialProfile);
            await saveStudentProfile(currentUser.uid, initialProfile);
          }
        } catch (err) {
          console.error("Error fetching student profile on login:", err);
        }
      } else {
        // Revert to default profile when logged out
        setStudent({ ...INITIAL_STUDENT_PROFILE });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setStudent]);

  const openAuthModal = (registerMode: boolean) => {
    setIsRegistering(registerMode);
    setModalStep('choose_method');
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
    setEmail('');
    setPassword('');
    setStudentName('');
  };

  const handleGoogleLogin = async () => {
    setActionLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('eco_auto_login', 'google');
        closeModal();
      }
    } catch (err: any) {
      console.error("Error during Google Login:", err);
      let errMsg = "No se pudo iniciar sesión con Google. Por favor, intenta de nuevo.";
      if (err.code === "auth/unauthorized-domain") {
        errMsg = `Dominio no autorizado: Debes agregar "${window.location.hostname}" en la consola de Firebase (Autenticación -> Configuración -> Dominios autorizados).`;
      } else if (err.code === "auth/operation-not-allowed") {
        errMsg = "Método de inicio desactivado: Debes habilitar el proveedor 'Google' en la pestaña 'Sign-in method' de la consola de Firebase.";
      } else if (err.message) {
        errMsg = `Error (${err.code || 'unknown'}): ${err.message}`;
      }
      setError(errMsg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor ingresa tu correo de Gmail y tu contraseña.");
      return;
    }

    setActionLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        // Create new account
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (credential.user) {
          const initialProfile: StudentProfile = {
            ...INITIAL_STUDENT_PROFILE,
            name: studentName.trim() || email.split('@')[0] || 'Estudiante Pío X',
          };
          setStudent(initialProfile);
          await saveStudentProfile(credential.user.uid, initialProfile);
        }
      } else {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem('eco_auto_login', 'email');
      closeModal();
    } catch (err: any) {
      console.error("Error during Email Auth:", err);
      let errMsg = "Error al autenticar. Verifica tu correo y contraseña.";
      
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        errMsg = "Correo o contraseña incorrectos. Si aún no tienes cuenta, selecciona 'Registrarse'.";
      } else if (err.code === "auth/email-already-in-use") {
        errMsg = "Este correo ya está registrado. Haz clic en 'Iniciar sesión' para ingresar.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "La contraseña debe tener al menos 6 caracteres.";
      } else if (err.code === "auth/invalid-email") {
        errMsg = "Por favor ingresa un correo de Gmail válido (ejemplo: usuario@gmail.com).";
      } else if (err.code === "auth/operation-not-allowed") {
        errMsg = "El inicio de sesión por Correo/Contraseña está desactivado en Firebase. Debes activarlo en Authentication -> Sign-in method -> Correo electrónico/contraseña.";
      } else if (err.message) {
        errMsg = `Error (${err.code || 'unknown'}): ${err.message}`;
      }

      setError(errMsg);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 rounded-2xl bg-[#11221a]/80 border border-[#00ff88]/20 flex items-center justify-center gap-2 text-xs text-slate-300">
        <div className="w-4 h-4 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin"></div>
        <span>Verificando sesión...</span>
      </div>
    );
  }

  if (user) {
    return null; // Hidden when logged in
  }

  return (
    <>
      {/* Main Banner Widget - Liquid Glass Style */}
      <div className="relative overflow-hidden p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,255,136,0.18)] transition-all duration-300 hover:border-[#00ff88]/40 hover:shadow-[0_12px_40px_0_rgba(0,255,136,0.28)]">
        {/* Liquid reflections & glow elements */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#00ff88]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm sm:text-base font-black text-[#00ff88] flex items-center gap-2 drop-shadow-[0_2px_8px_rgba(0,255,136,0.4)]">
              <Sparkles size={18} className="text-[#00ff88] animate-pulse" />
              ¡Guarda tu progreso ecológico!
            </h4>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            {/* Button 1: Iniciar Sesión */}
            <button
              onClick={() => openAuthModal(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00ff88]/25 transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <LogIn size={15} />
              <span>Iniciar Sesión</span>
            </button>

            {/* Button 2: Registrarse */}
            <button
              onClick={() => openAuthModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer border border-white/30 backdrop-blur-md"
            >
              <UserPlus size={15} className="text-[#00ff88]" />
              <span>Registrarse</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#0b1b13] border border-[#00ff88]/30 rounded-3xl p-6 shadow-2xl shadow-[#00ff88]/10 text-slate-100 overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#00ff88]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* VENTANA 1: Selección de Método (Google vs Gmail) */}
              {modalStep === 'choose_method' && (
                <div className="space-y-5">
                  <div className="text-center space-y-1.5 pt-2">
                    <div className="inline-flex p-3 rounded-2xl bg-[#00ff88]/10 text-[#00ff88] mb-1">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">
                      {isRegistering ? 'Crear Cuenta en Ecocalipsis' : 'Iniciar Sesión'}
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto">
                      Elige el método con el que deseas ingresar para guardar tus logros ecológicos.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Option A: Continuar con Google */}
                    <button
                      onClick={handleGoogleLogin}
                      disabled={actionLoading}
                      className="w-full p-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 transition-all flex items-center justify-between group cursor-pointer shadow-lg active:scale-[0.98] border border-white disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-white transition-colors">
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                        </div>
                        <div className="text-left">
                          <span className="block font-black text-sm text-slate-900">
                            Continuar con Google
                          </span>
                          <span className="block text-[11px] text-slate-600 font-medium">
                            Un solo clic mediante ventana emergente
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                    </button>

                    {/* Option B: Usar Correo Gmail */}
                    <button
                      onClick={() => {
                        setModalStep('gmail_form');
                        setError(null);
                      }}
                      className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transition-all flex items-center justify-between group cursor-pointer shadow-lg shadow-red-950/40 active:scale-[0.98] border border-red-400/30"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <span className="block font-black text-sm text-white">
                            Usar Correo Gmail / Contraseña
                          </span>
                          <span className="block text-[11px] text-red-100 font-medium">
                            Ingresa tu correo y contraseña directamente
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-red-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                  {/* Mode Switcher */}
                  <div className="pt-2 text-center border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="text-xs text-slate-300 hover:text-[#00ff88] transition-colors cursor-pointer"
                    >
                      {isRegistering ? (
                        <span>¿Ya tienes una cuenta? <strong className="text-[#00ff88] underline">Inicia Sesión</strong></span>
                      ) : (
                        <span>¿Aún no tienes cuenta? <strong className="text-[#00ff88] underline">Regístrate aquí</strong></span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* VENTANA 2: Formulario de Gmail / Correo y Contraseña */}
              {modalStep === 'gmail_form' && (
                <div className="space-y-4">
                  {/* Back to method selection */}
                  <button
                    onClick={() => {
                      setModalStep('choose_method');
                      setError(null);
                    }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#00ff88] transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>Volver a opciones</span>
                  </button>

                  <div className="text-left space-y-1">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Mail className="text-red-400" size={20} />
                      {isRegistering ? 'Crear Cuenta con Gmail' : 'Iniciar Sesión con Gmail'}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Ingresa tu dirección de correo de Gmail y tu contraseña.
                    </p>
                  </div>

                  <form onSubmit={handleEmailAuth} className="space-y-3 pt-1">
                    {isRegistering && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300 uppercase">
                          Nombre o Apodo
                        </label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="Ej: Camilo Pérez"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#05110a] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                      </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase">
                        Correo de Gmail
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                          <Mail size={15} />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="estudiante@gmail.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#05110a] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase">
                        Contraseña
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                          <Lock size={15} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#05110a] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="w-full mt-2 py-3 rounded-xl bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00ff88]/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                          <span>Procesando...</span>
                        </>
                      ) : isRegistering ? (
                        <>
                          <UserPlus size={16} />
                          <span>Crear mi Cuenta</span>
                        </>
                      ) : (
                        <>
                          <LogIn size={16} />
                          <span>Ingresar a Ecocalipsis</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Toggle registration / login */}
                  <div className="pt-2 text-center border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(!isRegistering);
                        setError(null);
                      }}
                      className="text-xs text-slate-300 hover:text-[#00ff88] transition-colors cursor-pointer"
                    >
                      {isRegistering ? (
                        <span>¿Ya tienes cuenta? <strong className="text-[#00ff88] underline">Iniciar Sesión</strong></span>
                      ) : (
                        <span>¿Nuevo en la app? <strong className="text-[#00ff88] underline">Crear cuenta aquí</strong></span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Global Error Banner inside Modal */}
              {error && (
                <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-left space-y-1.5 text-xs text-red-300">
                  <p className="font-bold text-red-200">{error}</p>
                  <p className="text-[11px] text-slate-400">
                    * Si usas Google Popup y tu navegador lo bloquea, puedes usar la opción de <strong>Gmail con contraseña</strong> o abrir la app en una pestaña nueva.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


