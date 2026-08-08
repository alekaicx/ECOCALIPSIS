import { GoogleGenAI } from '@google/genai';

export async function askPioAI(userMessage: string, history: { sender: 'user' | 'ai'; text: string }[] = []): Promise<string> {
  // 1. Try backend server API first
  try {
    const res = await fetch('/api/ecoia/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: history.slice(-6),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch (error) {
    console.log('Backend API unavailable (static hosting mode), trying client-side or fallback...', error);
  }

  // 2. If VITE_GEMINI_API_KEY is available in client environment (e.g. Netlify env var), use Gemini SDK directly on client
  const clientApiKey = typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_GEMINI_API_KEY;
  if (clientApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: clientApiKey });
      const prompt = `Eres "EcoIA", la Inteligencia Artificial ecológica interactiva de la app "Ecocalipsis" de la IED Pío X. Responde de forma breve (1-2 párrafos), alegre y con emojis para niños sobre ecología, reciclaje, agua y naturaleza. Pregunta: ${userMessage}`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (gErr) {
      console.error('Client-side Gemini error:', gErr);
    }
  }

  // 3. Intelligent fallback responses for static deployment (Netlify) without backend server
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('recicl') || lower.includes('caneca') || lower.includes('basura') || lower.includes('plastico') || lower.includes('papel')) {
    return '🌱 ¡En la IED Pío X reciclamos con el código de colores de Colombia (Resolución 2184)! \n\n* **Caneca Blanca:** Plásticos, vidrio, metal, papel y cartón limpios.\n* **Caneca Verde:** Residuos orgánicos.\n* **Caneca Negra:** Residuos no aprovechables.\n\n¡Separar nuestros residuos protege nuestro planeta y da vida nueva a los materiales! ♻️💚';
  }
  
  if (lower.includes('agua') || lower.includes('ahorr') || lower.includes('llave')) {
    return '💧 ¡El agua es la fuente de toda la vida! Para cuidarla en el colegio y en casa:\n\n1. Cierra la llave mientras te cepillas los dientes.\n2. Toma duchas de máximo 5 minutos.\n3. Repara goteras a tiempo.\n\n¡Cada gota cuenta para mantener nuestros ríos limpios y caudalosos! 🌊✨';
  }
  
  if (lower.includes('paramo') || lower.includes('sumapaz') || lower.includes('arbol') || lower.includes('bosque') || lower.includes('lorax')) {
    return '🌼 ¡Los páramos como el Sumapaz y los árboles son nuestros pulmones naturales! Absorben CO2, limpian el aire y fabrican el agua que bebemos. Como nos enseña El Lorax: *"Si alguien como tú no se preocupa de verdad, nada va a mejorar, jamás."* 🌳💚';
  }

  if (lower.includes('energia') || lower.includes('luz') || lower.includes('vampir')) {
    return '⚡ ¡Apaga los electrodomésticos que no uses y desconecta los "vampiros eléctricos" (cargadores conectados sin celular)! Así ahorramos energía y cuidamos los recursos de la Tierra. 🌍💡';
  }

  return `🌿 ¡Hola amiguito! Como EcoIA en Ecocalipsis (IED Pío X), mi misión es enseñarte a cuidar la naturaleza, reciclar correctamente y proteger el agua. \n\nRecuerda que con pequeñas acciones cotidianas logramos grandes cambios. ¿Tienes alguna duda sobre reciclaje, árboles o el agua? 💧🌍`;
}

