export async function askPioAI(userMessage: string, history: { sender: 'user' | 'ai'; text: string }[] = []): Promise<string> {
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

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.reply || '🌿 ¡Hola! Soy EcoIA. Recuerda reciclar en la caneca blanca y cuidar el agua en el colegio.';
  } catch (error) {
    console.error('Error in askPioAI:', error);
    return '🌱 *EcoIA tuvo un pequeño parpadeo ecológico.* ¡Escríbeme tu consulta de nuevo y te responderé de inmediato!';
  }
}
