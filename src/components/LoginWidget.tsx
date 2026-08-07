import React, { useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  getStudentProfile,
  saveStudentProfile,
  User 
} from '../lib/firebase';
import { LogIn, LogOut, Sparkles, UserCheck } from 'lucide-react';
import { StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockData';

interface LoginWidgetProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
}

export const LoginWidget: React.FC<LoginWidgetProps> = ({ student, setStudent }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              name: currentUser.displayName || currentUser.email || 'Estudiante Pío X',
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('eco_auto_login', 'google');
      }
    } catch (err: any) {
      console.error("Error during Google Login:", err);
      let errMsg = "No se pudo iniciar sesión. Por favor, intenta de nuevo.";
      if (err.code === "auth/unauthorized-domain") {
        errMsg = `Dominio no autorizado: Debes agregar "${window.location.hostname}" en la consola de Firebase (Autenticación -> Configuración -> Dominios autorizados).`;
      } else if (err.code === "auth/operation-not-allowed") {
        errMsg = "Método de inicio desactivado: Debes habilitar el proveedor 'Google' en la pestaña 'Sign-in method' de la consola de Firebase.";
      } else if (err.message) {
        errMsg = `Error (${err.code || 'unknown'}): ${err.message}`;
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('eco_auto_login');
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 rounded-2xl bg-[#11221a]/80 border border-[#00ff88]/20 flex items-center justify-center gap-2 text-xs text-slate-300">
        <div className="w-4 h-4 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin"></div>
        <span>Cargando cuenta de Google...</span>
      </div>
    );
  }

  if (user) {
    return null; // Hid when logged in, since profile is already at the top!
  }

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#11221a]/95 border border-[#00ff88]/30 shadow-2xl space-y-3 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <h4 className="text-sm font-extrabold text-[#00ff88] flex items-center gap-1.5">
            <Sparkles size={16} className="text-[#00ff88] animate-pulse" />
            ¡Guarda tu progreso ecológico!
          </h4>
          <p className="text-xs text-slate-300 max-w-md leading-normal">
            Inicia sesión con tu cuenta de Google para sincronizar tus puntos (XP), logros y nivel ecológico de manera automática.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00ff88]/20 transition-all active:scale-95 cursor-pointer"
        >
          <LogIn size={15} />
          <span>Entrar con Google</span>
        </button>
      </div>

      {error && (
        <div className="mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-left space-y-2">
          <p className="text-[11px] text-red-400 font-bold">
            {error}
          </p>
          <div className="text-[10px] text-slate-300 space-y-1">
            <p className="font-extrabold uppercase text-[#00ff88]">💡 Consejos para solucionar:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Habilitar Google:</strong> En tu Consola de Firebase &rarr; Authentication &rarr; Sign-in method, asegúrate de activar el proveedor de <strong>Google</strong>.
              </li>
              <li>
                <strong>Autorizar Dominio:</strong> En Authentication &rarr; Settings &rarr; Dominios autorizados, agrega: <code className="bg-[#0b1812] px-1 py-0.5 rounded text-[#00ff88] font-mono break-all">{window.location.hostname}</code>
              </li>
              <li>
                <strong>Abrir en nueva pestaña:</strong> El visor integrado de AI Studio a veces bloquea las ventanas emergentes (popups). Próbalo abriendo la aplicación directamente desde:
                <div className="mt-1.5">
                  <a 
                    href={window.location.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#00ff88] hover:bg-[#2effa0] text-slate-950 font-black text-[10px] uppercase transition-all"
                  >
                    Abrir Aplicación en Nueva Pestaña ↗
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
