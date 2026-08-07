import React from 'react';
import { GlassCard } from './GlassCard';
import { IMPACT_STATS_DATA } from '../data/mockData';
import { 
  Users, 
  GraduationCap, 
  Recycle, 
  TreePine, 
  TrendingUp, 
  Award,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const ImpactStats: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      {/* Title Header */}
      <div className="p-6 rounded-[32px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl backdrop-blur-md space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 font-mono uppercase tracking-wider">
              MÉTRICAS & IMPACTO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00ff88] mt-2">
              Estadísticas e Impacto
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Resultados del compromiso ecológico en la <strong>Institución Educativa Departamental Pío X</strong>.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-xs font-bold text-[#00ff88] shrink-0">
            <Sparkles className="w-4 h-4 text-[#00ff88]" />
            <span>Año Lectivo 2026</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* KPI 1 */}
        <div className="p-5 rounded-[24px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#00ff88] bg-[#00ff88]/20 px-2 py-0.5 rounded-full">
              94.8%
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {IMPACT_STATS_DATA.studentsBenefited}
          </div>
          <div className="text-xs font-bold text-slate-300">
            Niños Beneficiados
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-[24px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#00ff88] bg-[#00ff88]/20 px-2 py-0.5 rounded-full">
              Jornadas
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {IMPACT_STATS_DATA.workshopsCompleted}
          </div>
          <div className="text-xs font-bold text-slate-300">
            Capacitaciones
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-[24px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center">
              <Recycle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#00ff88] bg-[#00ff88]/20 px-2 py-0.5 rounded-full">
              Kilos
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {IMPACT_STATS_DATA.kgRecycledTotal.toLocaleString()} kg
          </div>
          <div className="text-xs font-bold text-slate-300">
            Residuos Clasificados
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-[24px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#00ff88] bg-[#00ff88]/20 px-2 py-0.5 rounded-full">
              Siembra
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {IMPACT_STATS_DATA.treesPlantedTotal}
          </div>
          <div className="text-xs font-bold text-slate-300">
            Árboles Nativos
          </div>
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="p-6 rounded-[28px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[#00ff88] flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#00ff88]" />
            Evolución Mensual de Reciclaje (Kg)
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Residuos orgánicos vs aprovechables procesados este año.
          </p>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={IMPACT_STATS_DATA.monthlyRecycling}>
              <XAxis dataKey="month" stroke="#00ff88" fontSize={11} />
              <YAxis stroke="#00ff88" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a1a12', 
                  borderColor: '#00ff88', 
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '11px'
                }} 
              />
              <Bar dataKey="aprovechable" name="Aprovechable" fill="#00ff88" radius={[6, 6, 0, 0]} />
              <Bar dataKey="organico" name="Orgánico" fill="#20b26c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
