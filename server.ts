import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Ecocalipsis - IED Pío X' });
  });

  // AI EcoIA floating interactive bot endpoint (OpenRouter API)
  app.post('/api/ecoia/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.OPENROUTER_API_KEY || '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';

      const systemPrompt = `Eres "EcoIA", la Inteligencia Artificial ecológica interactiva de la app "Ecocalipsis" de la IED Pío X.

REGLAS DE ORO OBLIGATORIAS:
1. SOLO Y ÚNICAMENTE respondes preguntas relacionadas con el MEDIO AMBIENTE, la ecología, el reciclaje, el agua, la energía, la naturaleza, el Páramo de Sumapaz, las plantas, los animales y la app Ecocalipsis.
2. SI TE PREGUNTAN ALGO QUE NO TIENE QUE VER CON EL MEDIO AMBIENTE O LA ECOLOGÍA (como matemáticas, chismes, deportes generales, videojuegos no ecológicos, tareas de otras materias, historias no ambientales, etc.):
   Debes declinar de manera muy dulce, divertida y amable dirigida a niños con este estilo:
   "🌱 ¡Hola amiguito! Recuerda que soy EcoIA y mi superpoder es únicamente cuidar y enseñar sobre el medio ambiente 🌍. No puedo responder sobre ese tema, pero ¿te gustaría saber cómo reciclar en el colegio o por qué son tan importantes los frailejones del Páramo de Sumapaz? 🌿💧"
3. EXPLICACIONES PARA NIÑOS: Explica las cosas de forma súper sencilla, fácil de entender, muy didáctica, alegre y bonita para niños de escuela.
4. Usa siempre emojis ecológicos divertidos (🌿💧⚡♻️🌳🌼) y responde en 1 o 2 párrafos breves.`;

      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...(Array.isArray(history) ? history.map((h: any) => ({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text
        })) : []),
        { role: 'user', content: message }
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.APP_URL || 'https://ecocalipsis-pio-x.app',
          'X-Title': 'Ecocalipsis - IED Pio X',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'cohere/north-mini-code:free',
          messages: formattedMessages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter EcoIA API HTTP error:', response.status, errorText);

        // Backup fallback call to Gemini if available
        if (process.env.GEMINI_API_KEY) {
          try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const geminiRes = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `${systemPrompt}\n\nPregunta: ${message}`
            });
            return res.json({ reply: geminiRes.text || '🌿 ¡Hola! Soy EcoIA. Recuerda separar tus residuos en la caneca correspondiente.' });
          } catch (gErr) {
            console.error('Gemini fallback error:', gErr);
          }
        }

        return res.json({ 
          reply: '🌱 ¡Hola! Soy EcoIA. Reciclar en la caneca blanca (plástico y cartón seco) y cuidar el agua son hábitos que salvan nuestro planeta. ¿Quieres hacerme otra pregunta?'
        });
      }

      const data = await response.json();
      const replyText = data.choices?.[0]?.message?.content || '🌱 ¡Hola! Soy EcoIA, tu asistente ecológico en Ecocalipsis. ¿En qué puedo ayudarte hoy?';

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('EcoIA endpoint error:', error);
      res.json({
        reply: '🌿 EcoIA tuvo un destello de señal. ¡Escríbeme de nuevo tu pregunta y te responderé con mucho gusto!'
      });
    }
  });

  // AI Eco-Assistant Gemini endpoint for kids & teachers at IED Pío X
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: 'Missing GEMINI_API_KEY environment variable.',
          reply: 'El asistente ecológico necesita la clave de API configurada para responderte. ¡Pide ayuda al profesor o administrador!'
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `Eres "Pío-Bot", el simpático robot guardián del medio ambiente de la Institución Educativa Departamental Pío X para la app "Ecocalipsis: La última oportunidad".
Tu tono es alegre, motivador, respetuoso, didáctico y muy amigable con los niños.
Conoces detalladamente:
- El código de colores de reciclaje en Colombia (Resolución 2184):
  * Blanco: plásticos, vidrio, metal, papel y cartón limpios.
  * Verde: residuos orgánicos biodegradables (cáscaras, restos de comida).
  * Negro: residuos no aprovechables (servilletas usadas, papel higiénico, papel sucio).
  * Rojo: residuos peligrosos o RAEE (pilas, bombillos, baterías).
- La importancia de la siembra de árboles y la reforestación en Colombia (bosque altoandino, frailejones, páramos de Chingaza y Sumapaz, Fundación Natura).
- Cómo pequeñas acciones de los niños de la IED Pío X generan grandes cambios.
Responde de forma concisa (máximo 2 párrafos breves), usando emojis ecológicos y explicando con ejemplos sencillos.`;

      // Build conversation array or single prompt
      const prompt = `System Prompt: ${systemInstruction}\n\nPregunta del estudiante o usuario: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const replyText = response.text || '¡Hola! Recuerda que separar en la caneca adecuada es la clave para un planeta más verde. 🌿';

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Gemini API error:', error);
      res.status(500).json({
        error: error.message || 'Error communicating with Gemini API',
        reply: '¡Ups! Ocurrió un pequeño problema en la red ecológica. Vuelve a intentarlo en un momento. 🌲'
      });
    }
  });

  // Vite development server middleware vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
