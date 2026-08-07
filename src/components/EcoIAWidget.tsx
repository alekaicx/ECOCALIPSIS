import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { askPioAI } from '../services/aiService';
import { Menu, Plus, Trash2, X, Sparkles, Bot, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  date: number;
}

const createNewSession = (): ChatSession => ({
  id: Date.now().toString(),
  title: 'Nueva Consulta Ecológica',
  messages: [],
  date: Date.now()
});

interface EcoIAWidgetProps {
  hidden?: boolean;
}

export const EcoIAWidget: React.FC<EcoIAWidgetProps> = ({ hidden = false }) => {
  if (hidden) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('ecoia_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error loading EcoIA sessions", e);
      }
    }
    return [createNewSession()];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(sessions[0]?.id || Date.now().toString());

  useEffect(() => {
    localStorage.setItem('ecoia_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      if (messages[messages.length - 1].sender === 'user') {
        scrollToBottom();
      }
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || inputText;
    if (!textToSend.trim() || !currentSessionId) return;

    const userMessage: Message = { id: Date.now().toString(), text: textToSend, sender: 'user' };
    
    // Convert current session history for context
    const history = (currentSession?.messages || []).map(m => ({
      sender: m.sender,
      text: m.text
    }));

    // Update title if it's the first message
    const currentSessionMessages = sessions.find(s => s.id === currentSessionId)?.messages || [];
    if (currentSessionMessages.length === 0) {
      const generatedTitle = textToSend.slice(0, 35) + (textToSend.length > 35 ? '...' : '');
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, title: generatedTitle, messages: [...s.messages, userMessage], date: Date.now() }
          : s
      ));
    } else {
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...s.messages, userMessage], date: Date.now() }
          : s
      ));
    }
    
    if (!textOverride) setInputText('');
    setIsLoading(true);

    const responseText = await askPioAI(textToSend, history);
    
    const aiMessage: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'ai' };
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId 
        ? { ...s, messages: [...s.messages, aiMessage] }
        : s
    ));
    setIsLoading(false);
  };

  const startNewChat = () => {
    const newSession = createNewSession();
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setIsSidebarOpen(false);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    if (newSessions.length === 0) {
      const newSession = createNewSession();
      setSessions([newSession]);
      setCurrentSessionId(newSession.id);
    } else {
      setSessions(newSessions);
      if (currentSessionId === id) {
        setCurrentSessionId(newSessions[0].id);
      }
    }
  };

  const quickActions = [
    { text: "🌱 ¿Qué va en la caneca blanca?" },
    { text: "💧 ¿Cómo ahorro agua en el colegio Pío X?" },
    { text: "🌼 ¿Por qué cuidamos el Páramo de Sumapaz?" },
    { text: "⚡ ¿Cómo evito los vampiros eléctricos?" }
  ];

  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* Botón flotante con movimiento suave */}
      <div className={`fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-[60] flex flex-col items-end transition-all duration-500 ease-in-out ${isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <motion.button 
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          whileHover={{ rotate: 8, scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer focus:outline-none group"
          title="Abrir EcoIA - Asistente de IA Ecológica"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#00ff88,transparent_70%)] opacity-70 blur-2xl animate-pulse group-hover:opacity-100 transition-opacity" />
          
          {!imgError ? (
            <img 
              src="https://i.ibb.co/N52xC5L/Whats-App-Image-2026-08-07-at-1-58-55-PM-removebg-preview.png" 
              alt="EcoIA Asistente Virtual" 
              onError={() => setImgError(true)}
              className="relative z-10 w-full h-full object-contain cursor-pointer drop-shadow-[0_0_30px_rgba(0,255,136,0.9)]" 
            />
          ) : (
            <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-[#123824] via-[#092215] to-[#040e08] border-2 border-[#00ff88] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.4),0_0_25px_rgba(0,255,136,0.6)]">
              <Bot className="w-10 h-10 text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]" />
              <Sparkles className="w-4 h-4 text-amber-300 absolute top-1 right-1 animate-spin" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Interfaz de Chat a Pantalla Completa */}
      <div 
        className={`fixed top-0 left-0 w-full h-[100dvh] z-[100] transition-all duration-700 ease-in-out flex ${
          isOpen 
            ? 'opacity-100 translate-y-0 backdrop-blur-xl bg-black/95' 
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        {/* Sidebar (Historial) */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-80 bg-zinc-950/95 backdrop-blur-3xl border-r border-white/10 z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-[#00ff88] font-bold tracking-[0.3em] uppercase text-[10px]">Historial de EcoIA</h3>
            <button onClick={() => setIsSidebarOpen(false)} className="text-zinc-500 hover:text-white transition-all duration-300 cursor-pointer">
              <X strokeWidth={1.5} size={24} />
            </button>
          </div>
          <div className="p-6">
            <button 
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-3 bg-[#00ff88]/10 hover:bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 hover:border-[#00ff88]/60 py-4 rounded-2xl transition-all duration-500 uppercase tracking-[0.2em] text-[11px] font-semibold tracking-widest shadow-sm cursor-pointer"
            >
              <Plus strokeWidth={1.5} size={18} /> Nueva Consulta
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sessions.map(s => (
              <div 
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  setIsSidebarOpen(false);
                }}
                className={`group flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-500 border ${
                  s.id === currentSessionId 
                    ? 'bg-[#00ff88]/15 border-[#00ff88]/40 text-white shadow-lg' 
                    : 'bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex flex-col overflow-hidden pr-4">
                  <span className="font-medium text-[14px] truncate tracking-wide">{s.title}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-50 mt-2 font-bold text-[#00ff88]">
                    {new Date(s.date).toLocaleDateString()}
                  </span>
                </div>
                <button 
                  onClick={(e) => deleteSession(e, s.id)}
                  className="p-2 text-zinc-600 hover:text-red-400 transition-all duration-300 cursor-pointer"
                  title="Eliminar chat"
                >
                  <Trash2 strokeWidth={1.5} size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col w-full h-full bg-[#06120b] overflow-hidden">
          {/* Header */}
          <div className="flex-none p-4 sm:p-6 flex justify-between items-center z-20 border-b border-white/10 bg-[#06120b]/90 backdrop-blur-3xl">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-500 text-zinc-400 hover:text-white cursor-pointer"
                title="Historial de chats"
              >
                <Menu strokeWidth={2} size={24} />
              </button>
              <div className="flex flex-col ml-1">
                <div className="flex items-center gap-2">
                   <h2 className="text-white text-xl font-black tracking-tight">EcoIA</h2>
                   <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center border border-[#00ff88]/40 overflow-hidden shadow-[0_0_10px_rgba(0,255,136,0.4)]">
                      <img src="https://i.ibb.co/N52xC5L/Whats-App-Image-2026-08-07-at-1-58-55-PM-removebg-preview.png" alt="EcoIA" className="w-6 h-6 object-contain" />
                   </div>
                </div>
                <p className="text-[#00ff88] text-[9px] font-bold tracking-[0.2em] uppercase">IA Ecológica • IED Pío X</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-zinc-400 hover:text-white cursor-pointer"
                title="Cerrar chat"
              >
                <X strokeWidth={2} size={24} />
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-12 pb-4">
            <div className="max-w-4xl mx-auto w-full flex flex-col min-h-full">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center mt-12 mb-8">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0d2a1b] border-2 border-[#00ff88]/40 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(0,255,136,0.3)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#00ff88]/10 blur-2xl animate-pulse"></div>
                    <img 
                      src="https://i.ibb.co/N52xC5L/Whats-App-Image-2026-08-07-at-1-58-55-PM-removebg-preview.png" 
                      alt="EcoIA" 
                      className="w-24 h-24 sm:w-30 sm:h-30 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(0,255,136,0.6)]" 
                    />
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 text-center tracking-tight">
                    Hola, soy <span className="text-[#00ff88]">EcoIA</span> 🌿
                  </h1>
                  
                  <p className="text-slate-300 text-xs sm:text-sm font-medium text-center max-w-md mb-8">
                    Tu superamigo de Inteligencia Artificial para aprender a cuidar la naturaleza, reciclar y proteger el planeta. ¡Hazme cualquier pregunta ecológica!
                  </p>

                  <p className="text-[#00ff88] font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Consultas Recomendadas</p>
                  
                  <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                    {quickActions.map((action, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(0, 255, 136, 0.08)" }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSend(undefined, action.text)}
                        className="text-left px-6 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-[#00ff88]/20 rounded-[1.5rem] text-white transition-all duration-300 group flex items-center gap-4 relative overflow-hidden backdrop-blur-3xl cursor-pointer"
                      >
                        <div className="absolute inset-y-0 left-0 w-1 bg-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex flex-col">
                          <span className="font-bold text-[14px] tracking-wide text-zinc-200 group-hover:text-[#00ff88] transition-colors">{action.text}</span>
                          <span className="text-[9px] text-[#00ff88] font-bold uppercase tracking-[0.2em] mt-1 opacity-60 group-hover:opacity-100 transition-all">Consultar a EcoIA</span>
                        </div>
                        <Sparkles 
                          size={18} 
                          className="ml-auto text-[#00ff88]/40 group-hover:text-[#00ff88] transition-all duration-300 group-hover:scale-110" 
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-12 pb-8 mt-12">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <span className={`text-[9px] font-bold tracking-[0.4em] uppercase mb-3 ml-2 ${msg.sender === 'user' ? 'text-[#00ff88]' : 'text-slate-400'}`}>
                        {msg.sender === 'user' ? 'TÚ' : 'ECOIA 🌿'}
                      </span>
      
                      <div 
                        className={`
                          text-[15px] sm:text-[16px] font-normal leading-[1.8] break-words tracking-wide
                          ${msg.sender === 'user' 
                            ? 'text-right text-slate-950 bg-gradient-to-r from-[#00ff88] to-emerald-400 font-semibold px-6 py-4 rounded-[2rem] rounded-tr-sm ml-auto max-w-[90%] sm:max-w-[75%] shadow-xl' 
                            : 'text-left text-slate-100 px-1 py-1 max-w-[100%] overflow-hidden'
                          }
                        `}
                      >
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-4 last:mb-0 text-[15px] sm:text-[16px] break-words w-full whitespace-pre-wrap leading-[1.8]">{children}</p>,
                            strong: ({ children }) => <strong className="font-extrabold text-[#00ff88] tracking-wide break-words">{children}</strong>,
                            h1: ({ children }) => <h1 className="text-2xl font-black text-[#00ff88] mb-4 tracking-wide break-words pb-2 border-b border-white/10">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-bold text-[#00ff88] mb-3 tracking-wide break-words">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-bold text-[#00ff88] mb-2 tracking-widest uppercase break-words">{children}</h3>,
                            li: ({ children }) => <li className="ml-5 list-disc mb-2 marker:text-[#00ff88] text-[15px] sm:text-[16px] font-normal break-words whitespace-pre-wrap leading-[1.8]">{children}</li>,
                            ul: ({ children }) => <ul className="mb-4 w-full pl-1">{children}</ul>,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
      
                  {isLoading && (
                    <div className="flex flex-col items-start space-y-3 opacity-80 ml-2">
                      <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#00ff88]">ECOIA 🌿</span>
                      <div className="text-[15px] text-[#00ff88] flex items-center space-x-2 font-bold">
                        <span>Pensando respuesta ecológica</span>
                        <span className="inline-flex space-x-1 pt-1">
                          <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></span>
                          <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></span>
                          <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></span>
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-4" />
                </div>
              )}
            </div>
          </div>
  
          {/* Input Area */}
          <div className="flex-none p-4 sm:p-6 bg-[#06120b] border-t border-white/10 pb-[env(safe-area-inset-bottom,16px)]">
            <div className="max-w-4xl mx-auto relative group">
              <form onSubmit={handleSend} className="relative">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Escribe tu consulta a EcoIA..."
                  className="w-full bg-white/5 backdrop-blur-3xl text-white placeholder-slate-400 text-[15px] sm:text-[16px] font-medium px-6 sm:px-8 py-4 sm:py-5 rounded-[2.5rem] border border-white/15 focus:border-[#00ff88] focus:bg-white/10 focus:outline-none transition-all duration-300 pr-20 shadow-xl"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#00ff88] text-slate-950 font-black rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.6)] transition-all duration-300 disabled:opacity-0 disabled:scale-50 disabled:pointer-events-none cursor-pointer"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EcoIAWidget;
