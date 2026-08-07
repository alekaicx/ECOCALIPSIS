import React from 'react';
import { GlassCard } from './GlassCard';
import { NEWS_EVENTS } from '../data/mockData';
import { Newspaper, Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

export const NewsEvents: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-[32px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-2xl backdrop-blur-md space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 mb-1">
          <span>AGENDA AMBIENTAL & NOVEDADES</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00ff88]">
          Noticias y Eventos IED Pío X
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Próximas jornadas de siembra, campañas de recolección y ferias ambientales escolares.
        </p>
      </div>

      {/* News Feed Grid */}
      <div className="space-y-4">
        {NEWS_EVENTS.map((item) => (
          <div key={item.id} className="rounded-[28px] bg-[#11221a]/90 border border-[#00ff88]/20 shadow-xl overflow-hidden flex flex-col justify-between hover:border-[#00ff88]/40 transition-all">
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 text-[10px] font-black uppercase text-slate-950 bg-[#00ff88] px-3 py-1 rounded-full shadow-md">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00ff88]" /> {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00ff88]" /> {item.location}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="px-5 py-3 border-t border-[#00ff88]/10 flex justify-between items-center text-xs text-[#00ff88] font-bold">
              <span>Leer detalles</span>
              <ArrowRight className="w-4 h-4 text-[#00ff88]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
