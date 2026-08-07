const fs = require('fs');
let code = fs.readFileSync('src/components/StudentTracker.tsx', 'utf8');

code = code.replace(/<div className="text-\[11px\] font-bold text-slate-400">Niños Beneficiados<\/div>/, '<div className="text-[11px] font-bold text-slate-400">Niños Instruidos</div>');
code = code.replace(/<div className="text-2xl font-black text-white">94% <span className="text-xs text-slate-400 font-normal">de la comunidad<\/span><\/div>/, '<div className="text-2xl font-black text-white">118 <span className="text-xs text-slate-400 font-normal">estudiantes</span></div>');

code = code.replace(/<div className="text-\[11px\] font-bold text-slate-400">Talleres Realizados<\/div>/, '<div className="text-[11px] font-bold text-slate-400">Talleres Realizados</div>');
code = code.replace(/<div className="text-2xl font-black text-white">24 <span className="text-xs text-slate-400 font-normal">este semestre<\/span><\/div>/, '<div className="text-2xl font-black text-white">3 <span className="text-xs text-slate-400 font-normal">de 9 programados</span></div>');

// Remove Metric 2: Residuos Reciclados
const metric2Regex = /\{\/\* Metric 2: Residuos \*\/\}[\s\S]*?Meta: 500kg[\s\S]*?428 kg<\/div>\s*<\/div>/;
code = code.replace(metric2Regex, '');

// Fix grid columns
code = code.replace(/className="grid grid-cols-1 sm:grid-cols-3 gap-3"/, 'className="grid grid-cols-1 sm:grid-cols-2 gap-3"');

// Remove Abono Orgánico and Agua Ahorrada
const footprintRegex = /<div className="space-y-3 pt-2">[\s\S]*?1,200 litros recuperados de lluvia\.<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
code = code.replace(footprintRegex, '');

fs.writeFileSync('src/components/StudentTracker.tsx', code);
