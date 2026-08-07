import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { TREE_INITIATIVES } from '../data/mockData';
import { StudentProfile } from '../types';
import { 
  TreePine, 
  HeartHandshake, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle,
  Sprout,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReforestationSupportProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

export const ReforestationSupport: React.FC<ReforestationSupportProps> = ({
  student,
  setStudent,
  onTriggerBadgeAction
}) => {
  const [pledgeTreeName, setPledgeTreeName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Guayacán Amarillo');
  const [selectedAction, setSelectedAction] = useState('Siembra en Huerto Escolar Pío X');
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);

  // Trigger viewing reforestation projects badge on mount
  React.useEffect(() => {
    onTriggerBadgeAction?.('view_reforestation_project');
  }, [onTriggerBadgeAction]);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeTreeName.trim()) return;

    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    setPledgeSubmitted(true);

    setStudent((prev) => ({
      ...prev,
      treesPlanted: prev.treesPlanted + 1,
      xp: prev.xp + 200
    }));

    // Trigger reforestation pledge badge action
    onTriggerBadgeAction?.('support_reforestation');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      {/* Header Banner */}
      <div className="p-6 rounded-[32px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl backdrop-blur-md space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20">
          <span>Reforestación Colombiana</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00ff88]">
          Siembra de Árboles y Alianzas
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Iniciativas de conservación de bosques altoandinos y páramos en Colombia. ¡La mejor donación es tu acción constante!
        </p>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0b1812] border border-[#00ff88]/20">
          <HeartHandshake className="w-6 h-6 text-[#00ff88] shrink-0" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Árboles Registrados</div>
            <div className="text-base font-bold text-white">
              {student.treesPlanted} Árboles en la IED Pío X
            </div>
          </div>
        </div>
      </div>

      {/* Non-monetary guarantee banner */}
      <div className="rounded-[28px] bg-[#11221a]/90 border border-[#00ff88]/20 p-5 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#00ff88]" />
          <h3 className="text-sm font-extrabold text-[#00ff88]">Compromiso Sin Ánimo de Lucro</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>No solicitamos donaciones en dinero.</strong> Tu aporte se mide en acciones sostenibles y cuidado ambiental.
        </p>
      </div>

      {/* Interactive Virtual Tree Adoption / Pledge Form */}
      <div id="pledge-form" className="p-6 rounded-[28px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center border border-[#00ff88]/20 shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              Registra tu Compromiso de Siembra
            </h3>
            <p className="text-xs text-slate-300">
              Bautiza a un árbol nativo colombiano y cuida su crecimiento.
            </p>
          </div>
        </div>

        {!pledgeSubmitted ? (
          <form onSubmit={handlePledgeSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mb-1">
                Nombre de tu Árbol:
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Esperanza Pío X"
                value={pledgeTreeName}
                onChange={(e) => setPledgeTreeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#09140e] border border-[#00ff88]/20 text-white text-xs focus:outline-none focus:border-[#00ff88]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block mb-1">
                Especie Nativa:
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#09140e] border border-[#00ff88]/20 text-white text-xs focus:outline-none focus:border-[#00ff88]"
              >
                <option value="Guayacán Amarillo">Guayacán Amarillo (Chicalá)</option>
                <option value="Frailejón Espeletia">Frailejón de Páramo</option>
                <option value="Palma de Cera">Palma de Cera</option>
                <option value="Roble Andino">Roble Andino</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#00ff88] text-slate-950 font-black text-xs uppercase tracking-wider transition-all hover:bg-[#00e077] flex items-center justify-center gap-2 shadow-lg shadow-[#00ff88]/20"
            >
              <TreePine className="w-4 h-4" />
              Registrar Compromiso (+200 XP)
            </button>
          </form>
        ) : (
          <div className="p-5 rounded-2xl bg-[#0b1812] border border-[#00ff88]/30 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-[#00ff88] mx-auto" />
            <h4 className="text-base font-bold text-white">
              ¡Compromiso Registrado!
            </h4>
            <p className="text-xs text-slate-300">
              Tu árbol <strong className="text-[#00ff88]">"{pledgeTreeName}"</strong> ({selectedSpecies}) ha sido añadido al registro de la IED Pío X.
            </p>
            <button
              onClick={() => setPledgeSubmitted(false)}
              className="px-5 py-2 rounded-full bg-[#00ff88] text-slate-950 font-bold text-xs uppercase tracking-wider mt-2"
            >
              Registrar Otro Árbol
            </button>
          </div>
        )}
      </div>

      {/* Reforestation NGO & Project List */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#00ff88] flex items-center gap-2">
          <TreePine className="w-4 h-4 text-[#00ff88]" />
          Proyectos Colombianos Aliados
        </h3>

        <div className="space-y-3">
          {TREE_INITIATIVES.map((init) => (
            <div key={init.id} className="rounded-[28px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl overflow-hidden p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#00ff88] bg-[#00ff88]/10 px-2.5 py-0.5 rounded-full border border-[#00ff88]/20">
                  {init.organization}
                </span>
                <span className="text-[10px] text-slate-400">
                  🌱 {init.impactMetric}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {init.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {init.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
