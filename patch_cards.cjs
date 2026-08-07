const fs = require('fs');
let code = fs.readFileSync('src/components/AboutUs.tsx', 'utf8');

// Interactive cards
const card1Regex = /<h3 className="text-xs font-black text-\[#00ff88\]">1. Campeón del Reciclaje<\/h3>[\s\S]*?<\/span>\n            \)}/g;
const card1Replacement = `<h3 className="text-xs font-black text-[#00ff88]">{unlockedPowers.includes(1) ? "¡SÚPER PODER ACTIVADO!" : "1. Campeón del Reciclaje"}</h3>
            {unlockedPowers.includes(1) ? (
              <p className="text-[11px] text-white font-medium animate-fadeIn">
                ¡Separamos papel, plástico y orgánicos en las canecas correctas y salvamos animales! 🐾
              </p>
            ) : (
              <span className="text-[10px] text-[#00ff88] font-black block bg-[#00ff88]/20 px-2 py-1 rounded-full animate-pulse">👆 ¡TOCA PARA REVELAR!</span>
            )}`;

const card2Regex = /<h3 className="text-xs font-black text-\[#00ff88\]">2. Guardián del Agua<\/h3>[\s\S]*?<\/span>\n            \)}/g;
const card2Replacement = `<h3 className="text-xs font-black text-[#00ff88]">{unlockedPowers.includes(2) ? "¡MAGIA ACUÁTICA!" : "2. Guardián del Agua"}</h3>
            {unlockedPowers.includes(2) ? (
              <p className="text-[11px] text-white font-medium animate-fadeIn">
                ¡Cerramos la llave al cepillarnos y cuidamos el hogar de los peces! 🐟
              </p>
            ) : (
              <span className="text-[10px] text-[#00ff88] font-black block bg-[#00ff88]/20 px-2 py-1 rounded-full animate-pulse">👆 ¡TOCA PARA REVELAR!</span>
            )}`;

const card3Regex = /<h3 className="text-xs font-black text-\[#00ff88\]">3. Sembrador de Vida<\/h3>[\s\S]*?<\/span>\n            \)}/g;
const card3Replacement = `<h3 className="text-xs font-black text-[#00ff88]">{unlockedPowers.includes(3) ? "¡BOSQUE MÁGICO!" : "3. Sembrador de Vida"}</h3>
            {unlockedPowers.includes(3) ? (
              <p className="text-[11px] text-white font-medium animate-fadeIn">
                ¡Plantamos semillas mágicas que se convertirán en bosques gigantes! 🌳
              </p>
            ) : (
              <span className="text-[10px] text-[#00ff88] font-black block bg-[#00ff88]/20 px-2 py-1 rounded-full animate-pulse">👆 ¡TOCA PARA REVELAR!</span>
            )}`;


code = code.replace(card1Regex, card1Replacement);
code = code.replace(card2Regex, card2Replacement);
code = code.replace(card3Regex, card3Replacement);

// Make emojis bigger when revealed
code = code.replace(/<div className="text-3xl">♻️<\/div>/, '{unlockedPowers.includes(1) ? <div className="text-5xl animate-bounce">♻️</div> : <div className="text-3xl">♻️</div>}');
code = code.replace(/<div className="text-3xl">💧<\/div>/, '{unlockedPowers.includes(2) ? <div className="text-5xl animate-bounce">💧</div> : <div className="text-3xl">💧</div>}');
code = code.replace(/<div className="text-3xl">🌱<\/div>/, '{unlockedPowers.includes(3) ? <div className="text-5xl animate-bounce">🌱</div> : <div className="text-3xl">🌱</div>}');

fs.writeFileSync('src/components/AboutUs.tsx', code);
