import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Button } from './UI';
import { 
  RotateCcw, Zap, Play, X, Lock, Gamepad2, ArrowLeft, Trophy, Leaf, Wind, 
  ThermometerSun, Recycle, Bike, TreePine, Trash2, Microscope, 
  ChevronRight, Fingerprint, Apple, Battery, Heart, Carrot, Fish, 
  Bone, Box, FileText, Wine, Pizza, Milk, Maximize2, Minimize2,
  Volume2, VolumeX
} from 'lucide-react'; 
import { SpriteAnimator } from './SpriteAnimator';

// --- CONFIGURACIÓN GLOBAL ---
const BG_MAIN = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/1_d6f212b4-27d7-4628-ba80-cd11daf86732.png?v=1768784963';
const CLOUD_SMALL = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/2_13cdaf6d-8a80-4163-b926-1df230dc98db.png?v=1768784964';
const CLOUD_BIG = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/3_91597b88-040c-4063-8ba9-47fca1645b7c.png?v=1768784964';
const BACKGROUND_PATIO = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/ChatGPT_Image_17_ene_2026_21_47_52.png?v=1768704492';

// --- ASSETS COMPARTIDOS ---
const FOX_RUN = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/Fox_Run_with_shadow.png?v=1768695389';
const FOX_IDLE = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/Fox_Idle_with_shadow.png?v=1768695389';
const FOX_HURT = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/Fox_Hurt_with_shadow.png?v=1768695389';

// --- JUEGO 1: FOX JETPACK ---

const GRAVITY = 0.38; 
const THRUST = -6.2; 
const SCROLL_SPEED = 7.0; 
const FUEL_DECAY = 0.18; 
const SPAWN_RATE = 75; 

const FUEL_SPRITE = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/download-removebg-preview_12.png?v=1769030204';
const POLLUTANT_SPRITES = ['https://cdn.shopify.com/s/files/1/0738/0362/8732/files/download-removebg-preview_9.png?v=1769029104'];
const OBSTACLE_TREES = ['https://cdn.shopify.com/s/files/1/0738/0362/8732/files/download-removebg-preview_6.png?v=1768785994'];
const OBSTACLE_BIRDS = ['https://cdn.shopify.com/s/files/1/0738/0362/8732/files/Black_grouse_Flight_with_shadow.png?v=1768942423'];
const CO2_EDU_IMG = 'https://cdn.shopify.com/s/files/1/0738/0362/8732/files/download-removebg-preview_9.png?v=1769029104';

type GameState = 'START' | 'PLAYING' | 'GAMEOVER';
type EntityType = 'FUEL' | 'POLLUTANT' | 'OBSTACLE_TREE' | 'OBSTACLE_BIRD';

interface Entity {
  id: number;
  type: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  spriteUrl?: string; 
  hitboxH?: number; 
  isAnimated?: boolean;
}

interface CloudEntity {
    id: number;
    type: 'SMALL' | 'BIG';
    x: number;
    y: number;
    speed: number;
}

interface MiniGameChildProps {
    onGameOver: (score: number) => void;
    onExit: () => void;
    onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

// --- JUEGO 2: ECO SORTING ---

type TrashType = 'ORGANIC' | 'RECYCLE' | 'TRASH';

interface SortableItemDef {
    type: TrashType;
    label: string;
    emoji: string;
    icon: any;
    color: string;
}

const SORTING_ITEMS: SortableItemDef[] = [
    // ORGÁNICO (Caneca Verde)
    { type: 'ORGANIC', label: 'Cáscara Manzana', emoji: '🍎', icon: Apple, color: 'text-green-400' },
    { type: 'ORGANIC', label: 'Cáscara Banano', emoji: '🍌', icon: Carrot, color: 'text-yellow-400' },
    { type: 'ORGANIC', label: 'Zanahoria', emoji: '🥕', icon: Carrot, color: 'text-orange-400' },
    { type: 'ORGANIC', label: 'Hojas Secas', emoji: '🍂', icon: Leaf, color: 'text-amber-500' },
    { type: 'ORGANIC', label: 'Resto de Pescado', emoji: '🐟', icon: Fish, color: 'text-cyan-300' },
    { type: 'ORGANIC', label: 'Borra de Café', emoji: '☕', icon: Apple, color: 'text-amber-700' },
    { type: 'ORGANIC', label: 'Cáscara de Huevo', emoji: '🥚', icon: Apple, color: 'text-yellow-100' },
    { type: 'ORGANIC', label: 'Cáscara Sandía', emoji: '🍉', icon: Apple, color: 'text-red-400' },
    { type: 'ORGANIC', label: 'Tusa de Maíz', emoji: '🌽', icon: Carrot, color: 'text-yellow-300' },
    { type: 'ORGANIC', label: 'Semilla Aguacate', emoji: '🥑', icon: Apple, color: 'text-emerald-500' },
    { type: 'ORGANIC', label: 'Pan Duro', emoji: '🍞', icon: Apple, color: 'text-amber-300' },
    { type: 'ORGANIC', label: 'Cáscara Naranja', emoji: '🍊', icon: Apple, color: 'text-orange-500' },
    { type: 'ORGANIC', label: 'Cáscara de Maní', emoji: '🥜', icon: Apple, color: 'text-amber-600' },
    { type: 'ORGANIC', label: 'Base de Brócoli', emoji: '🥦', icon: Leaf, color: 'text-green-500' },
    { type: 'ORGANIC', label: 'Corona de Piña', emoji: '🍍', icon: Apple, color: 'text-yellow-500' },
    
    // RECICLAJE (Caneca Azul / Blanco)
    { type: 'RECYCLE', label: 'Botella PET Limpia', emoji: '🍾', icon: Milk, color: 'text-sky-300' },
    { type: 'RECYCLE', label: 'Caja de Cartón', emoji: '📦', icon: Box, color: 'text-amber-400' },
    { type: 'RECYCLE', label: 'Lata de Aluminio', emoji: '🥫', icon: Box, color: 'text-rose-400' },
    { type: 'RECYCLE', label: 'Periódico Seco', emoji: '📰', icon: FileText, color: 'text-slate-300' },
    { type: 'RECYCLE', label: 'Botella Vidrio', emoji: '🥛', icon: Wine, color: 'text-emerald-300' },
    { type: 'RECYCLE', label: 'Cajita Tetrapak', emoji: '🧃', icon: Milk, color: 'text-[#00ff88]' },
    { type: 'RECYCLE', label: 'Frasco de Vidrio', emoji: '🫙', icon: Wine, color: 'text-cyan-200' },
    { type: 'RECYCLE', label: 'Revista Vieja', emoji: '🗞️', icon: FileText, color: 'text-blue-300' },
    { type: 'RECYCLE', label: 'Cuaderno Usado', emoji: '📓', icon: FileText, color: 'text-indigo-300' },
    { type: 'RECYCLE', label: 'Pote de Shampoo', emoji: '🧴', icon: Milk, color: 'text-pink-300' },
    { type: 'RECYCLE', label: 'Lata de Atún', emoji: '🐟', icon: Box, color: 'text-stone-300' },
    { type: 'RECYCLE', label: 'Sobre de Papel', emoji: '✉️', icon: FileText, color: 'text-yellow-100' },
    { type: 'RECYCLE', label: 'Tubo de Cartón', emoji: '🧻', icon: Box, color: 'text-amber-700' },

    // BASURA GENERAL (Caneca Gris / Negro)
    { type: 'TRASH', label: 'Servilleta Usada', emoji: '🧻', icon: Trash2, color: 'text-stone-300' },
    { type: 'TRASH', label: 'Pila o Batería', emoji: '🔋', icon: Battery, color: 'text-purple-400' },
    { type: 'TRASH', label: 'Caja Pizza Grasosa', emoji: '🍕', icon: Pizza, color: 'text-amber-500' },
    { type: 'TRASH', label: 'Bolsa Plástica Sucia', emoji: '🛍️', icon: Trash2, color: 'text-gray-400' },
    { type: 'TRASH', label: 'Bombillo Roto', emoji: '💡', icon: Trash2, color: 'text-yellow-300' },
    { type: 'TRASH', label: 'Hueso de Pollo', emoji: '🦴', icon: Bone, color: 'text-stone-200' },
    { type: 'TRASH', label: 'Colilla Cigarrillo', emoji: '🚬', icon: Trash2, color: 'text-amber-800' },
    { type: 'TRASH', label: 'Cepillo Dientes', emoji: '🪥', icon: Trash2, color: 'text-cyan-400' },
    { type: 'TRASH', label: 'Esponja de Cocina', emoji: '🧽', icon: Trash2, color: 'text-yellow-400' },
    { type: 'TRASH', label: 'Vaso de Icopor', emoji: '🥤', icon: Trash2, color: 'text-stone-100' },
    { type: 'TRASH', label: 'Tapabocas Usado', emoji: '😷', icon: Trash2, color: 'text-blue-200' },
    { type: 'TRASH', label: 'Espejo Roto', emoji: '🪞', icon: Trash2, color: 'text-sky-200' },
    { type: 'TRASH', label: 'Chicle Usado', emoji: '🍬', icon: Trash2, color: 'text-pink-400' },
];

interface TrashItem extends SortableItemDef {
    id: number;
    x: number;
    y: number;
    rotation: number;
}

const EcoSortingGame: React.FC<MiniGameChildProps> = ({ onGameOver, onExit, onTriggerBadgeAction }) => {
    const [gameState, setGameState] = useState<GameState>('START');
    const gameStateRef = useRef<GameState>('START');
    
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [items, setItems] = useState<TrashItem[]>([]);
    const itemsRef = useRef<TrashItem[]>([]);
    
    const [foxAnim, setFoxAnim] = useState<'IDLE' | 'RUN' | 'HURT'>('IDLE');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Refs for performance-driven badge unlocking
    const correctCountRef = useRef(0);
    const streakRef = useRef(0);
    const whiteBinRef = useRef(0);
    const greenBinRef = useRef(0);
    const trashBinRef = useRef(0);
    const itemSpawnTimesRef = useRef<Record<number, number>>({});
    const onlyOrganicRef = useRef(true);
    
    // Audio ref
    const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
    const sfxCtxRef = useRef<AudioContext | null>(null);

    const playSound = (type: 'correct' | 'wrong' | 'gameover') => {
        try {
            if (!sfxCtxRef.current) {
                sfxCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = sfxCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const now = ctx.currentTime;
            
            if (type === 'correct') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (type === 'wrong') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            } else if (type === 'gameover') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 1);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
                gainNode.gain.linearRampToValueAtTime(0.001, now + 1);
                osc.start(now);
                osc.stop(now + 1);
            }
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        if (!bgmAudioRef.current) {
            // Flight of the Bumblebee (Fast/Upbeat)
            bgmAudioRef.current = new Audio("https://upload.wikimedia.org/wikipedia/commons/c/c0/Rimsky-Korsakov_-_flight_of_the_bumblebee.oga");
            bgmAudioRef.current.preload = "auto";
            bgmAudioRef.current.loop = true;
            bgmAudioRef.current.volume = 0.4;
        }

        if (gameState === 'PLAYING' || gameState === 'START') {
            bgmAudioRef.current.play().catch(e => console.warn("BGM play prevented:", e));
        } else {
            bgmAudioRef.current.pause();
        }

        return () => {
            if (bgmAudioRef.current) {
                bgmAudioRef.current.pause();
            }
        };
    }, [gameState]);

    useEffect(() => {
        document.body.classList.add('hide-navbar');
        onTriggerBadgeAction?.('start_ecosort');
        onTriggerBadgeAction?.('game_played');
        return () => {
            document.body.classList.remove('hide-navbar');
        };
    }, []);

    // Dragging state
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const draggedItemRef = useRef<number | null>(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const gameLoopRef = useRef<number>(0);
    const spawnRateRef = useRef(150);
    const frameCountRef = useRef(0);
    const speedRef = useRef(0.9);

    useEffect(() => {
        draggedItemRef.current = draggedItem;
    }, [draggedItem]);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
            }
        }
    };

    const bins = [
        { type: 'ORGANIC', label: 'Orgánico', color: 'bg-green-600', icon: Apple, border: 'border-green-800' },
        { type: 'RECYCLE', label: 'Reciclaje', color: 'bg-blue-600', icon: Recycle, border: 'border-blue-800' },
        { type: 'TRASH', label: 'Basura', color: 'bg-gray-600', icon: Trash2, border: 'border-gray-800' }
    ];

    const createItemAtY = (startY: number): TrashItem => {
        const template = SORTING_ITEMS[Math.floor(Math.random() * SORTING_ITEMS.length)];
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
        const padding = 65;
        const randomX = Math.random() * Math.max(100, screenWidth - padding * 2) + padding;
        const id = Date.now() + Math.random();

        // Record spawn timestamp
        itemSpawnTimesRef.current[id] = Date.now();

        return {
            ...template,
            id,
            x: randomX,
            y: startY,
            rotation: (Math.random() - 0.5) * 30,
        };
    };

    const spawnItem = () => {
        const newItem = createItemAtY(-70);
        itemsRef.current.push(newItem);
        setItems([...itemsRef.current]);
    };

    const updateGame = () => {
        if (gameStateRef.current !== 'PLAYING') return;

        frameCountRef.current++;
        
        // Increase speed very gradually over time
        if (frameCountRef.current % 750 === 0) {
            speedRef.current = Math.min(1.8, speedRef.current + 0.1);
            spawnRateRef.current = Math.max(90, spawnRateRef.current - 5);
        }

        // Spawn new item periodically
        if (frameCountRef.current % spawnRateRef.current === 0) {
            spawnItem();
        }

        const currentItems = itemsRef.current;
        const nextItems: TrashItem[] = [];
        let livesLost = 0;
        const bottomBoundary = (typeof window !== 'undefined' ? window.innerHeight : 700) - 110;

        for (const item of currentItems) {
            if (item.id === draggedItemRef.current) {
                nextItems.push(item);
                continue;
            }

            const nextY = item.y + speedRef.current;

            if (nextY > bottomBoundary) {
                livesLost++;
            } else {
                nextItems.push({ 
                    ...item, 
                    y: nextY, 
                    rotation: item.rotation + 0.3 
                });
            }
        }
        
        itemsRef.current = nextItems;
        setItems([...nextItems]);

        if (livesLost > 0) {
            setLives(prev => {
                const newLives = prev - livesLost;
                if (newLives <= 0 && prev > 0) {
                    playSound('gameover');
                    setGameState('GAMEOVER');
                    gameStateRef.current = 'GAMEOVER';
                } else if (newLives > 0) {
                    playSound('wrong');
                }
                return Math.max(0, newLives);
            });
            setFoxAnim('HURT');
            setTimeout(() => setFoxAnim('IDLE'), 1000);
        }

        if (gameStateRef.current === 'PLAYING') {
            gameLoopRef.current = requestAnimationFrame(updateGame);
        }
    };

    useEffect(() => {
        if (gameState === 'PLAYING') {
            gameLoopRef.current = requestAnimationFrame(updateGame);
        }
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameState]); 

    const handleStart = () => {
        setScore(0);
        setLives(3);
        speedRef.current = 0.9;
        spawnRateRef.current = 150;
        frameCountRef.current = 0;

        // Reset badge tracking metrics for this round
        correctCountRef.current = 0;
        streakRef.current = 0;
        whiteBinRef.current = 0;
        greenBinRef.current = 0;
        trashBinRef.current = 0;
        itemSpawnTimesRef.current = {};
        onlyOrganicRef.current = true;

        // Restart music immediately from beginning
        if (!bgmAudioRef.current) {
            bgmAudioRef.current = new Audio("https://upload.wikimedia.org/wikipedia/commons/c/c0/Rimsky-Korsakov_-_flight_of_the_bumblebee.oga");
            bgmAudioRef.current.preload = "auto";
            bgmAudioRef.current.loop = true;
            bgmAudioRef.current.volume = 0.4;
        }
        bgmAudioRef.current.currentTime = 0;
        bgmAudioRef.current.play().catch(e => console.warn("BGM play prevented:", e));

        // Trigger starting badge
        onTriggerBadgeAction?.('start_ecosort');
        onTriggerBadgeAction?.('game_played');

        // Spawn initial 2 items spaced far apart
        const initialItems = [
            createItemAtY(-60),
            createItemAtY(-320)
        ];
        itemsRef.current = initialItems;
        setItems(initialItems);

        gameStateRef.current = 'PLAYING';
        setGameState('PLAYING');
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: number) => {
        if (gameStateRef.current !== 'PLAYING') return;
        setDraggedItem(id);
        draggedItemRef.current = id;
        
        const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        setDragPosition({ x: clientX, y: clientY });
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!draggedItemRef.current) return;
        const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        setDragPosition({ x: clientX, y: clientY });
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (!draggedItemRef.current) return;
        const activeId = draggedItemRef.current;

        const screenW = window.innerWidth;
        const binWidth = screenW / 3;
        
        let dropX = dragPosition.x;
        let dropY = dragPosition.y;

        if ('changedTouches' in e && e.changedTouches.length > 0) {
            dropX = e.changedTouches[0].clientX;
            dropY = e.changedTouches[0].clientY;
        } else if ('clientX' in e) {
            dropX = (e as React.MouseEvent).clientX;
            dropY = (e as React.MouseEvent).clientY;
        }

        // Check if dropped near bins area (bottom 170px)
        if (dropY > window.innerHeight - 170) {
            let targetBin: TrashType = 'ORGANIC';
            if (dropX < binWidth) targetBin = 'ORGANIC';
            else if (dropX < binWidth * 2) targetBin = 'RECYCLE';
            else targetBin = 'TRASH';

            const item = itemsRef.current.find(i => i.id === activeId);
            
            if (item && item.type === targetBin) {
                playSound('correct');
                const newScore = score + 15;
                setScore(newScore);
                setFoxAnim('RUN');
                setTimeout(() => setFoxAnim('IDLE'), 600);

                // Update performance metrics for badge tracking
                correctCountRef.current += 1;
                streakRef.current += 1;

                // 1. Fast sorting achievement (under 1.0 second)
                const spawnTime = itemSpawnTimesRef.current[item.id];
                if (spawnTime && (Date.now() - spawnTime < 1000)) {
                    onTriggerBadgeAction?.('ecosort_fast_sort');
                }

                // 2. Trash bin classifications tracking
                if (targetBin === 'RECYCLE') {
                    whiteBinRef.current += 1;
                    if (whiteBinRef.current >= 15) {
                        onTriggerBadgeAction?.('ecosort_white_bin', whiteBinRef.current);
                    }
                    onlyOrganicRef.current = false;
                } else if (targetBin === 'ORGANIC') {
                    greenBinRef.current += 1;
                    if (greenBinRef.current >= 15) {
                        onTriggerBadgeAction?.('ecosort_green_bin', greenBinRef.current);
                    }
                } else if (targetBin === 'TRASH') {
                    trashBinRef.current += 1;
                    if (trashBinRef.current >= 5) {
                        onTriggerBadgeAction?.('ecosort_trash_bin', trashBinRef.current);
                    }
                    onlyOrganicRef.current = false;
                }

                // 3. Dynamic unlocks based on streaks and totals
                if (correctCountRef.current >= 10) {
                    onTriggerBadgeAction?.('ecosort_correct', correctCountRef.current);
                }
                if (correctCountRef.current >= 50) {
                    onTriggerBadgeAction?.('ecosort_total_correct', correctCountRef.current);
                }
                if (streakRef.current >= 15) {
                    onTriggerBadgeAction?.('ecosort_accuracy_100', streakRef.current);
                }
                if (streakRef.current >= 20) {
                    onTriggerBadgeAction?.('ecosort_streak', streakRef.current);
                }
                if (newScore >= 200) {
                    onTriggerBadgeAction?.('ecosort_score', newScore);
                }
            } else {
                streakRef.current = 0;
                setLives(prev => {
                    const newLives = prev - 1;
                    if (newLives <= 0 && prev > 0) {
                        playSound('gameover');
                        setGameState('GAMEOVER');
                        gameStateRef.current = 'GAMEOVER';
                    } else if (newLives > 0) {
                        playSound('wrong');
                    }
                    return Math.max(0, newLives);
                });
                setFoxAnim('HURT');
                setTimeout(() => setFoxAnim('IDLE'), 1000);
            }
            
            itemsRef.current = itemsRef.current.filter(i => i.id !== activeId);
            setItems([...itemsRef.current]);
        }

        setDraggedItem(null);
        draggedItemRef.current = null;
    };

    const getFoxSprite = () => {
        if (foxAnim === 'RUN') return FOX_RUN;
        if (foxAnim === 'HURT') return FOX_HURT;
        return FOX_IDLE;
    };

    if (gameState === 'GAMEOVER') {
        return (
            <div className="fixed inset-0 z-[30000] bg-[#0d1c15] overflow-y-auto font-sans w-full min-h-screen py-12 px-4">
                <div className="bg-[#11221a] rounded-3xl p-6 sm:p-8 max-w-md w-full mx-auto my-auto text-center border-4 border-[#00ff88]/30 animate-in zoom-in-95 shadow-2xl">
                    <h2 className="text-3xl sm:text-4xl font-black text-[#00ff88] mb-2 hand-drawn">¡Juego Terminado!</h2>
                    <p className="text-slate-300 mb-6 uppercase text-xs sm:text-sm font-bold tracking-widest">Patio Limpio Completo</p>
                    
                    <div className="text-6xl font-black text-[#00ff88] mb-6">{score} XP</div>
                    
                    <Button onClick={() => onGameOver(score)} className="w-full justify-center py-3.5 text-lg mb-3 bg-[#00ff88] text-slate-950 font-black shadow-lg">
                        RECLAMAR PUNTOS Y VOLVER
                    </Button>
                    <Button onClick={handleStart} variant="secondary" className="w-full justify-center py-2.5 font-bold">
                        INTENTAR DE NUEVO
                    </Button>
                </div>
            </div>
        );
    }

    if (gameState === 'START') {
        return (
            <div className="fixed inset-0 z-[200] bg-black/75 flex items-center justify-center p-4 backdrop-blur-md">
                <div className="bg-[#11221a] rounded-3xl p-6 max-w-md w-full text-center border-4 border-[#00ff88]/30 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-repeat z-0" style={{backgroundImage: `url(${BACKGROUND_PATIO})`, backgroundSize: 'cover'}}></div>
                    <button onClick={onExit} className="absolute top-3 right-3 text-slate-400 hover:text-white z-20"><X /></button>
                    
                    <h2 className="text-3xl font-black text-[#00ff88] hand-drawn mb-4 relative z-10">Clasificación Eco</h2>
                    
                    <div className="flex justify-center gap-4 mb-6 relative z-10">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-1 border-2 border-green-500 text-2xl shadow-md">🍎</div>
                            <span className="text-[11px] font-bold text-slate-200">Orgánico</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-1 border-2 border-blue-500 text-2xl shadow-md">🍾</div>
                            <span className="text-[11px] font-bold text-slate-200">Reciclaje</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-500/20 rounded-2xl flex items-center justify-center mb-1 border-2 border-gray-500 text-2xl shadow-md">🧻</div>
                            <span className="text-[11px] font-bold text-slate-200">Basura</span>
                        </div>
                    </div>

                    <p className="text-slate-200 mb-6 relative z-10 text-xs sm:text-sm leading-relaxed">
                        ¡Arrastra los residuos que caen hacia la caneca correspondiente antes de que lleguen al suelo!
                    </p>

                    <Button onClick={handleStart} className="w-full justify-center py-3.5 text-xl shadow-xl relative z-10 bg-[#00ff88] text-slate-950 font-black" icon={<Play />}>
                        ¡A CLASIFICAR!
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="fixed inset-0 z-[20000] overflow-hidden touch-none select-none bg-sky-950"
            onMouseMove={handleDragMove}
            onTouchMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
        >
            <div className="absolute inset-0 bg-cover bg-bottom z-0" style={{ backgroundImage: `url(${BACKGROUND_PATIO})` }}></div>

            {/* Top Game Bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                <div className="bg-[#11221a]/90 backdrop-blur px-4 py-1.5 rounded-full border-2 border-[#00ff88]/30 font-black text-xl text-[#00ff88] flex items-center gap-2 shadow-lg">
                    <Trophy size={18} className="text-yellow-400" /> {score} XP
                </div>
                <div className="flex gap-1.5 items-center bg-black/40 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    {[...Array(3)].map((_, i) => (
                        <Heart key={i} size={22} className={`${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-600'} drop-shadow-sm`} />
                    ))}
                </div>
                <div className="flex gap-2 items-center">
                    <button onClick={toggleFullscreen} title="Pantalla completa" className="bg-[#11221a]/90 p-2 rounded-full hover:bg-[#183024] text-white border border-[#00ff88]/20 transition-all active:scale-95">
                        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                    <button onClick={onExit} title="Salir" className="bg-[#11221a]/90 p-2 rounded-full hover:bg-[#183024] text-white border border-[#00ff88]/20 transition-all active:scale-95">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Fox Mascot */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-20 h-20 z-10 pointer-events-none flex items-center justify-center">
                <SpriteAnimator 
                    src={getFoxSprite()} 
                    row={2} 
                    rows={4}
                    frameCount={foxAnim === 'RUN' ? 6 : 4} 
                    fps={8} 
                    className="w-full h-full drop-shadow-lg"
                />
            </div>

            {/* Bins at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-28 flex z-10 shadow-2xl">
                {bins.map((bin) => (
                    <div key={bin.type} className={`flex-1 ${bin.color} border-t-4 ${bin.border} flex flex-col items-center justify-center text-white relative group`}>
                         <div className="absolute -top-6 bg-[#11221a] text-[#00ff88] px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md border border-[#00ff88]/40">
                            {bin.label}
                         </div>
                         <bin.icon size={32} className="mb-1 opacity-90 group-hover:scale-110 transition-transform" />
                         <div className="w-16 h-2 bg-black/20 rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* Falling Waste Items */}
            {items.map(item => {
                const isBeingDragged = draggedItem === item.id;
                const currentX = isBeingDragged ? dragPosition.x : item.x;
                const currentY = isBeingDragged ? dragPosition.y : item.y;

                return (
                    <div
                        key={item.id}
                        onMouseDown={(e) => handleDragStart(e, item.id)}
                        onTouchStart={(e) => handleDragStart(e, item.id)}
                        className="absolute cursor-grab active:cursor-grabbing flex flex-col items-center justify-center touch-none select-none p-2"
                        style={{
                            left: `${currentX}px`,
                            top: `${currentY}px`,
                            transform: `translate(-50%, -50%) rotate(${isBeingDragged ? 0 : item.rotation}deg) scale(${isBeingDragged ? 1.2 : 1})`,
                            zIndex: isBeingDragged ? 100 : 30
                        }}
                    >
                        {/* Clean Emoji without box container */}
                        <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none leading-none transform transition-transform hover:scale-110 active:scale-95">
                            {item.emoji}
                        </span>
                        
                        {/* Small Name Label Tag */}
                        <div className="bg-slate-950/85 text-white font-black text-[10px] px-2 py-0.5 rounded-full mt-1 border border-[#00ff88]/30 shadow-md tracking-wide whitespace-nowrap pointer-events-none">
                            {item.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- AUDIO ENGINE: BEETHOVEN "MOONLIGHT" SONATA III "PRESTO AGITATO" Y SFX PARA FOX JETPACK ---
class Game1AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;

  constructor() {
    // Beethoven Sonata No. 14 "Moonlight" - Movement 3: Presto Agitato (In C# minor)
    // Public domain audio from Wikimedia Commons
    this.bgmAudio = new Audio("https://upload.wikimedia.org/wikipedia/commons/d/d4/Beethoven_Moonlight_3rd_movement.ogg");
    this.bgmAudio.preload = "auto";
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.5;
  }

  public getAudioContext(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public startBgm() {
    if (this.isMuted) return;
    this.isPlaying = true;
    if (this.bgmAudio) {
      this.bgmAudio.play().catch(e => console.warn("BGM play prevented:", e));
    }
  }

  public restartBgm() {
    if (this.isMuted) return;
    this.isPlaying = true;
    if (this.bgmAudio) {
      this.bgmAudio.currentTime = 0;
      this.bgmAudio.play().catch(e => console.warn("BGM play prevented:", e));
    }
  }

  public stopBgm() {
    this.isPlaying = false;
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }


  public playSoundEffect(type: 'thrust' | 'fuel' | 'point' | 'hit' | 'gameover') {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'thrust') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'fuel') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'point') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.16);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === 'hit' || type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// --- COMPONENTE FOX JETPACK ---

const FoxJetpackGame: React.FC<MiniGameChildProps> = ({ onGameOver, onExit, onTriggerBadgeAction }) => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const hasStartedRef = useRef(false);

  // Performance-driven badge tracking references
  const co2CollectedRef = useRef(0);
  const fuelCollectedRef = useRef(0);
  const treesDodgedRef = useRef(0);
  const birdsDodgedRef = useRef(0);
  const cumulativeBirdsDodgedRef = useRef(0);
  const startTimeRef = useRef(0);
  const hasHitRef = useRef(false);
  
  const audioEngineRef = useRef<Game1AudioEngine | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    document.body.classList.add('hide-navbar');
    audioEngineRef.current = new Game1AudioEngine();
    audioEngineRef.current.restartBgm();
    onTriggerBadgeAction?.('start_jetpack');
    onTriggerBadgeAction?.('game_played');
    return () => {
        document.body.classList.remove('hide-navbar');
        if (audioEngineRef.current) {
            audioEngineRef.current.stopBgm();
        }
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    }
  };

  const handleStartGameAction = () => {
    if (gameState === 'PLAYING' && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setHasStarted(true);
      isThrusting.current = true;
      velocity.current = THRUST * 0.8;
      if (audioEngineRef.current) {
        audioEngineRef.current.startBgm();
        audioEngineRef.current.playSoundEffect('thrust');
      }
    }
  };
  
  const getLogicalDimensions = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (h > w) return { width: h, height: w }; 
    return { width: w, height: h };
  };

  const [dimensions, setDimensions] = useState(getLogicalDimensions());
  const [gameState, setGameState] = useState<GameState>('START');
  
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 
  const fuelRef = useRef(100);
  const [fuel, setFuel] = useState(100);
  const [eduStep, setEduStep] = useState(0);

  const foxY = useRef(getLogicalDimensions().height / 2);
  const velocity = useRef(0);
  const entities = useRef<Entity[]>([]);
  const clouds = useRef<CloudEntity[]>([]);
  const frameCount = useRef(0);
  const gameLoopRef = useRef<number>(0);
  const isThrusting = useRef(false);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('foxJetpackHighScore');
    if (saved) {
        setHighScore(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
        const h = window.innerHeight;
        const w = window.innerWidth;
        const portrait = h > w;
        setIsPortrait(portrait);
        setDimensions({ width: portrait ? h : w, height: portrait ? w : h });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initClouds = () => {
      const initialClouds: CloudEntity[] = [];
      const dims = getLogicalDimensions(); 
      for (let i = 0; i < 10; i++) { 
          initialClouds.push({
              id: i,
              type: i % 2 === 0 ? 'BIG' : 'SMALL',
              x: Math.random() * dims.width,
              y: Math.random() * (dims.height * 0.5),
              speed: Math.random() * 0.5 + 0.2
          });
      }
      clouds.current = initialClouds;
  };

  useEffect(() => { initClouds(); }, []); 

  const spawnEntity = () => {
    const typeRoll = Math.random();
    let type: EntityType = 'POLLUTANT';
    let isAnimated = false;
    
    if (typeRoll < 0.25) type = 'POLLUTANT';
    else if (typeRoll < 0.50) type = 'FUEL'; 
    else if (typeRoll < 0.75) type = 'OBSTACLE_TREE'; 
    else type = 'OBSTACLE_BIRD'; 

    let width = 40; let height = 40;
    let yPos = Math.random() * (dimensions.height - 200) + 50; 
    let spriteUrl = undefined; let hitboxH = undefined;

    if (type === 'OBSTACLE_TREE') {
        width = 300; height = 500; 
        const visibleCanopy = 130 + Math.random() * 50; 
        yPos = dimensions.height - visibleCanopy; 
        hitboxH = visibleCanopy; 
        spriteUrl = OBSTACLE_TREES[Math.floor(Math.random() * OBSTACLE_TREES.length)];
    } else if (type === 'OBSTACLE_BIRD') {
        width = 70; height = 70; isAnimated = true;
        yPos = Math.random() * (dimensions.height * 0.6); 
        spriteUrl = OBSTACLE_BIRDS[Math.floor(Math.random() * OBSTACLE_BIRDS.length)];
    } else if (type === 'POLLUTANT') {
        width = 90; height = 90;
        yPos = Math.random() * (dimensions.height - 150) + 50;
        spriteUrl = POLLUTANT_SPRITES[Math.floor(Math.random() * POLLUTANT_SPRITES.length)];
    } else if (type === 'FUEL') {
        width = 60; height = 60;
        yPos = Math.random() * (dimensions.height - 150) + 50;
        spriteUrl = FUEL_SPRITE;
    }

    entities.current.push({
        id: Date.now() + Math.random(),
        type, x: dimensions.width + 100, y: yPos, width, height,
        collected: false, spriteUrl, hitboxH, isAnimated
    });
  };

  const updatePhysics = () => {
    if (!hasStartedRef.current) {
        foxY.current = dimensions.height / 2 + Math.sin(Date.now() / 250) * 8;
        clouds.current.forEach(cloud => {
            cloud.x -= cloud.speed;
            if (cloud.x < -350) { 
                cloud.x = dimensions.width + Math.random() * 200;
                cloud.y = Math.random() * (dimensions.height * 0.5);
                cloud.type = Math.random() > 0.5 ? 'BIG' : 'SMALL';
                cloud.speed = Math.random() * 0.5 + 0.2;
            }
        });
        setRenderTrigger(prev => prev + 1);
        if (gameState === 'PLAYING') gameLoopRef.current = requestAnimationFrame(updatePhysics);
        return;
    }

    if (fuelRef.current <= 0) {
        isThrusting.current = false;
    } else if (isThrusting.current) {
        velocity.current += THRUST * 0.15; 
    }
    velocity.current += GRAVITY;
    foxY.current += velocity.current;

    const foxH = 50;
    if (foxY.current > dimensions.height - foxH) { handleGameOver(); return; }
    if (foxY.current < 0) { foxY.current = 0; velocity.current = 0; }

    if (fuelRef.current > 0) {
        const decay = isThrusting.current ? 0.08 : 0.03;
        fuelRef.current = Math.max(0, fuelRef.current - decay);
        setFuel(Math.round(fuelRef.current));
    }

    frameCount.current++;

    clouds.current.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x < -350) { 
            cloud.x = dimensions.width + Math.random() * 200;
            cloud.y = Math.random() * (dimensions.height * 0.5);
            cloud.type = Math.random() > 0.5 ? 'BIG' : 'SMALL';
            cloud.speed = Math.random() * 0.5 + 0.2;
        }
    });

    if (frameCount.current % SPAWN_RATE === 0) spawnEntity();

    entities.current.forEach(e => { e.x -= SCROLL_SPEED; });
    entities.current = entities.current.filter(e => e.x > -600); 

    const foxRect = { x: 50, y: foxY.current, w: 50, h: 40 };

    entities.current.forEach(e => {
        if (e.collected) return;

        let entH = e.hitboxH || e.height;
        let entY = e.y;
        let entW = e.width;
        let entX = e.x;

        if (e.type === 'OBSTACLE_TREE') {
            entY = e.y + 20; entW = e.width * 0.3; entX = e.x + (e.width - entW) / 2;
        } else if (e.type === 'OBSTACLE_BIRD') {
            const scaleFactor = 0.6; entW = e.width * scaleFactor; entH = e.height * scaleFactor;
            entX = e.x + (e.width - entW) / 2; entY = e.y + (e.height - entH) / 2; 
        } else if (e.type === 'POLLUTANT') {
            const scaleFactor = 0.7; entW = e.width * scaleFactor; entH = e.height * scaleFactor;
            entX = e.x + (e.width - entW) / 2; entY = e.y + (e.height - entH) / 2; 
        } else if (e.type === 'FUEL') {
            const scaleFactor = 0.8; entW = e.width * scaleFactor; entH = e.height * scaleFactor;
            entX = e.x + (e.width - entW) / 2; entY = e.y + (e.height - entH) / 2; 
        }

        if (foxRect.x < entX + entW && foxRect.x + foxRect.w > entX && foxRect.y < entY + entH && foxRect.y + foxRect.h > entY) {
            handleCollision(e);
        }

        // Track successfully dodged obstacles
        if (!e.collected && !(e as any).dodged && e.x < foxRect.x - 20) {
            (e as any).dodged = true;
            if (e.type === 'OBSTACLE_TREE') {
                treesDodgedRef.current += 1;
                if (treesDodgedRef.current >= 5) {
                    onTriggerBadgeAction?.('trees_dodged', treesDodgedRef.current);
                }
            } else if (e.type === 'OBSTACLE_BIRD') {
                birdsDodgedRef.current += 1;
                cumulativeBirdsDodgedRef.current += 1;
                if (birdsDodgedRef.current >= 5) {
                    onTriggerBadgeAction?.('birds_dodged', birdsDodgedRef.current);
                }
                if (cumulativeBirdsDodgedRef.current >= 20) {
                    onTriggerBadgeAction?.('birds_dodged_cumulative', cumulativeBirdsDodgedRef.current);
                }
            }
        }
    });

    // Clean flight and total flight duration timers
    if (hasStartedRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (!hasHitRef.current && duration >= 30) {
            onTriggerBadgeAction?.('flight_duration_clean', duration);
        }
        if (duration >= 120) {
            onTriggerBadgeAction?.('flight_duration', duration);
        }
    }

    setRenderTrigger(prev => prev + 1);
    if (gameState === 'PLAYING') gameLoopRef.current = requestAnimationFrame(updatePhysics);
  };

  const handleCollision = (e: Entity) => {
    if (e.type === 'FUEL') {
        e.collected = true;
        fuelRef.current = Math.min(100, fuelRef.current + 40);
        setFuel(Math.round(fuelRef.current)); 
        audioEngineRef.current?.playSoundEffect('fuel');

        // Fuel collected achievement tracking
        fuelCollectedRef.current += 1;
        if (fuelCollectedRef.current >= 5) {
            onTriggerBadgeAction?.('fuel_collected', fuelCollectedRef.current);
        }
    } else if (e.type === 'POLLUTANT') {
        e.collected = true;
        scoreRef.current += 10;
        setScore(scoreRef.current);
        audioEngineRef.current?.playSoundEffect('point');

        // CO2 collected achievement tracking
        co2CollectedRef.current += 1;
        if (co2CollectedRef.current >= 10) {
            onTriggerBadgeAction?.('co2_collected', co2CollectedRef.current);
        }
    } else if (e.type === 'OBSTACLE_TREE' || e.type === 'OBSTACLE_BIRD') {
        audioEngineRef.current?.playSoundEffect('hit');
        hasHitRef.current = true;
        handleGameOver();
    }
  };

  const handleGameOver = () => {
    if (gameState === 'GAMEOVER') return;
    setGameState('GAMEOVER');
    setEduStep(0);
    audioEngineRef.current?.playSoundEffect('gameover');
    audioEngineRef.current?.stopBgm();
    
    const finalScore = scoreRef.current;
    if (finalScore > highScore) {
        setHighScore(finalScore);
        localStorage.setItem('foxJetpackHighScore', finalScore.toString());
    }

    // Trigger score achievement milestones
    onTriggerBadgeAction?.('jetpack_score', finalScore);
    
    cancelAnimationFrame(gameLoopRef.current);
  };

  const startGame = () => {
    scoreRef.current = 0;
    setScore(0);
    fuelRef.current = 100;
    setFuel(100);
    foxY.current = dimensions.height / 2;
    velocity.current = 0;
    entities.current = [];
    initClouds(); 
    frameCount.current = 0;
    setEduStep(0);
    hasStartedRef.current = false;
    setHasStarted(false);

    // Reset badge tracking variables for this flight
    co2CollectedRef.current = 0;
    fuelCollectedRef.current = 0;
    treesDodgedRef.current = 0;
    birdsDodgedRef.current = 0;
    startTimeRef.current = Date.now();
    hasHitRef.current = false;

    // Restart BGM music immediately from 0 on game restart
    if (audioEngineRef.current) {
      audioEngineRef.current.restartBgm();
    }

    // Trigger badge action
    onTriggerBadgeAction?.('start_jetpack');
    onTriggerBadgeAction?.('game_played');

    setGameState('PLAYING');
  };

  useEffect(() => {
    if (gameState === 'PLAYING') gameLoopRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState]);

  const handleStartThrust = () => {
      if (gameState === 'PLAYING') {
          if (!hasStartedRef.current) {
              handleStartGameAction();
              return;
          }
          if (fuelRef.current > 0) {
              isThrusting.current = true;
              if (velocity.current > 0) velocity.current *= 0.5;
          }
      }
  };
  
  const handleEndThrust = () => { isThrusting.current = false; };

  const renderEntity = (e: Entity) => {
      if (e.collected) return null;
      let content = null;
      
      switch(e.type) {
          case 'FUEL':
              content = <img src={FUEL_SPRITE} alt="combustible" className="w-full h-full object-contain animate-pulse filter drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]" />;
              break;
          case 'POLLUTANT':
              content = <img src={e.spriteUrl} alt="polucion" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" />;
              break;
          case 'OBSTACLE_TREE':
              return <img key={e.id} src={e.spriteUrl} alt="tree" className="absolute select-none pointer-events-none filter drop-shadow-2xl z-10" style={{left: `${e.x}px`, top: `${e.y}px`, width: `${e.width}px`, height: `${e.height}px`, objectFit: 'contain', objectPosition: 'top'}} />;
          case 'OBSTACLE_BIRD':
              return <div key={e.id} className="absolute select-none pointer-events-none flex items-center justify-center z-10" style={{left: `${e.x}px`, top: `${e.y}px`, width: `${e.width}px`, height: `${e.height}px`}}><SpriteAnimator src={e.spriteUrl || ''} row={2} rows={4} frameCount={6} fps={12} className="w-full h-full" /></div>;
      }
      return <div key={e.id} className="absolute flex items-center justify-center select-none z-10" style={{left: `${e.x}px`, top: `${e.y}px`, width: `${e.width}px`, height: `${e.height}px`}}>{content}</div>;
  };

  const containerStyle: React.CSSProperties = isPortrait ? {
      width: '100vh', height: '100vw', transform: 'rotate(90deg)', transformOrigin: 'top left',
      position: 'fixed', top: '0', left: '100%', zIndex: 20000,
  } : {
      width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', zIndex: 20000,
  };

  if (gameState === 'GAMEOVER') {
      return (
        <div className="fixed inset-0 z-[30000] bg-[#0d1c15] overflow-y-auto font-sans w-full min-h-screen py-12 px-4">
             <div className="bg-[#11221a] w-full max-w-lg mx-auto flex flex-col rounded-3xl shadow-2xl border-4 border-[#00ff88]/30 relative animate-in zoom-in-95 duration-300 text-slate-100 overflow-hidden my-auto">
                
                {/* Header bar with progress steps & control buttons */}
                <div className="flex items-center justify-between gap-3 p-4 bg-[#0d1c15] border-b border-[#00ff88]/20 shrink-0">
                    <div className="flex gap-1.5 flex-1 items-center">
                        {[0, 1, 2, 3].map(s => (
                            <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-500 ${s <= eduStep ? 'bg-[#00ff88] shadow-[0_0_8px_#00ff88]' : 'bg-slate-800'}`}></div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleFullscreen} title="Pantalla completa" className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white border border-white/20 transition-all active:scale-95">
                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                        <button onClick={onExit} title="Salir" className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white border border-white/20 transition-all active:scale-95">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col items-center text-center w-full space-y-6">
                    {eduStep === 0 && (
                         <div className="w-full flex flex-col items-center text-center animate-in slide-in-from-right duration-300 space-y-4">
                             <h2 className="text-3xl sm:text-4xl font-black text-[#00ff88] hand-drawn">¡Misión Cumplida!</h2>
                             <p className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wider">Resultado del Vuelo en Shylake</p>
                             
                             <div className="bg-[#183024] p-6 sm:p-8 rounded-full w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center justify-center border-4 border-dashed border-[#00ff88]/50 my-2 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] relative shrink-0">
                                <span className="text-xs font-bold uppercase text-slate-300 mb-1">Puntos Totales</span>
                                <span className="text-5xl sm:text-6xl font-black text-[#00ff88] leading-none tracking-tighter">{score}</span>
                                {score > 0 && score >= highScore && (
                                     <div className="absolute -bottom-3 bg-yellow-400 text-yellow-950 px-4 py-1.5 rounded-full text-xs font-black animate-bounce border-2 border-white shadow-lg whitespace-nowrap">
                                        ¡NUEVO RÉCORD! 🏆
                                     </div>
                                )}
                             </div>

                             <p className="text-slate-200 text-sm sm:text-base px-2 leading-relaxed max-w-md">
                                Has limpiado el cielo de Shylake. ¡Analiza tus hallazgos para aprender y canjear tus créditos eco!
                             </p>
                         </div>
                    )}

                    {eduStep === 1 && (
                        <div className="w-full flex flex-col items-center text-center animate-in slide-in-from-right duration-300 space-y-4">
                             <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center animate-bounce shrink-0 border border-purple-500/40 shadow-lg">
                                <Microscope size={40} className="text-purple-400"/>
                             </div>
                             <h2 className="text-2xl sm:text-3xl font-black text-[#00ff88] hand-drawn">¿Qué atrapaste?</h2>
                             <p className="text-xl font-extrabold text-purple-400">Dióxido de carbono (CO2)</p>
                             
                             <div className="bg-[#183024] p-5 rounded-2xl border border-[#00ff88]/30 text-sm sm:text-base text-slate-200 leading-relaxed max-w-md shadow-md">
                                <p>Es como una <strong>manta invisible</strong> en el cielo que atrapa el calor y no deja respirar adecuadamente a la Tierra.</p>
                             </div>
                             
                             <div className="flex justify-center pt-2">
                                <img src={CO2_EDU_IMG} alt="co2" className="w-32 h-32 object-contain opacity-90 drop-shadow-md" />
                             </div>
                        </div>
                    )}

                    {eduStep === 2 && (
                        <div className="w-full flex flex-col items-center text-center animate-in slide-in-from-right duration-300 space-y-4">
                             <h2 className="text-2xl sm:text-3xl font-black text-[#00ff88] hand-drawn">¿Qué provoca en el planeta?</h2>
                             
                             <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                                <div className="bg-red-950/50 p-4 sm:p-5 rounded-2xl border border-red-500/40 flex items-center gap-4 text-left shadow-md">
                                    <ThermometerSun size={36} className="text-red-400 shrink-0"/>
                                    <div>
                                        <h4 className="font-extrabold text-red-300 text-sm sm:text-base">Calentamiento Global</h4>
                                        <p className="text-xs sm:text-sm text-red-200 mt-0.5">Sube la temperatura del planeta y derrite los glaciares.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-600 flex items-center gap-4 text-left shadow-md">
                                    <Wind size={36} className="text-slate-300 shrink-0"/>
                                    <div>
                                        <h4 className="font-extrabold text-slate-200 text-sm sm:text-base">Aire Contaminado</h4>
                                        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Afecta la salud respiratoria y ensucia nuestras ciudades.</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}

                    {eduStep === 3 && (
                         <div className="w-full flex flex-col items-center text-center animate-in slide-in-from-right duration-300 space-y-4">
                             <h2 className="text-2xl sm:text-3xl font-black text-[#00ff88] hand-drawn">¿Cuál es la Solución?</h2>
                             <div className="space-y-3 w-full max-w-md">
                                 <div className="flex items-center gap-4 bg-green-950/50 p-4 rounded-2xl border border-green-500/40 shadow-md">
                                     <div className="bg-green-500/20 p-2.5 rounded-full"><Bike className="text-green-400" size={24}/></div>
                                     <div className="text-left">
                                         <h5 className="text-sm font-extrabold text-green-300">Transporte Limpio</h5>
                                         <p className="text-xs text-green-200/80">Usa bicicleta o camina más seguido.</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4 bg-blue-950/50 p-4 rounded-2xl border border-blue-500/40 shadow-md">
                                     <div className="bg-blue-500/20 p-2.5 rounded-full"><Recycle className="text-blue-400" size={24}/></div>
                                     <div className="text-left">
                                         <h5 className="text-sm font-extrabold text-blue-300">Reducir y Reciclar</h5>
                                         <p className="text-xs text-blue-200/80">Clasifica la basura correctamente.</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4 bg-emerald-950/50 p-4 rounded-2xl border border-emerald-500/40 shadow-md">
                                     <div className="bg-emerald-500/20 p-2.5 rounded-full"><TreePine className="text-emerald-400" size={24}/></div>
                                     <div className="text-left">
                                         <h5 className="text-sm font-extrabold text-emerald-300">Cuidar Bosques</h5>
                                         <p className="text-xs text-emerald-200/80">Planta árboles y protege la naturaleza.</p>
                                     </div>
                                 </div>
                             </div>
                             <div className="mt-4 text-xs sm:text-sm font-black text-slate-950 bg-[#00ff88] px-6 py-2.5 rounded-full animate-bounce shadow-lg uppercase tracking-wider">
                                ¡Tú eres un Guardián Eco!
                             </div>
                         </div>
                    )}
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 sm:p-6 bg-[#0d1c15] border-t border-[#00ff88]/20 shrink-0 w-full">
                    {eduStep === 0 ? (
                        <div className="space-y-3 w-full">
                             <Button 
                                onClick={() => setEduStep(prev => prev + 1)} 
                                className="w-full py-3.5 text-base justify-center bg-amber-500 hover:bg-amber-600 text-slate-950 border-none font-black tracking-wide shadow-lg active:scale-98"
                                icon={<Fingerprint size={20} />}
                            >
                                ANALIZAR Y APRENDER
                            </Button>
                            
                            <Button 
                                onClick={startGame} 
                                variant="secondary"
                                className="w-full py-2.5 text-xs sm:text-sm justify-center text-slate-300 font-bold active:scale-98"
                                icon={<RotateCcw size={16} />}
                            >
                                Jugar de nuevo
                            </Button>
                        </div>
                    ) : eduStep < 3 ? (
                        <Button 
                            onClick={() => setEduStep(prev => prev + 1)} 
                            className="w-full py-3.5 text-base justify-center font-extrabold tracking-wide active:scale-98 shadow-lg"
                            icon={<ChevronRight size={20} />}
                        >
                            SIGUIENTE PASO
                        </Button>
                    ) : (
                        <div className="space-y-3 w-full">
                            <Button 
                                onClick={() => onGameOver(score)} 
                                className="w-full py-3.5 text-base justify-center bg-[#00ff88] hover:bg-[#00e077] text-slate-950 font-black tracking-wide shadow-lg active:scale-98"
                                icon={<Trophy size={20} />}
                            >
                                RECLAMAR PUNTOS Y VOLVER
                            </Button>
                        </div>
                    )}
                </div>

             </div>
        </div>
      );
  }

  if (gameState === 'START') {
      return (
        <div style={containerStyle} className="flex flex-col items-center justify-center bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${BG_MAIN})` }}></div>
            
            <button onClick={onExit} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full hover:bg-black/60 text-white z-50 backdrop-blur-sm border border-white/20">
                <X size={28} />
            </button>

            {clouds.current.map((cloud, i) => (
                <img key={`menu-cloud-${i}`} src={cloud.type === 'BIG' ? CLOUD_BIG : CLOUD_SMALL} alt="nube" className="absolute opacity-80 animate-pulse z-5 pointer-events-none" style={{left: `${cloud.x}px`, top: `${cloud.y}px`, width: cloud.type === 'BIG' ? '320px' : '140px'}} />
            ))}

            <div className="bg-[#11221a]/95 p-5 rounded-3xl shadow-2xl flex flex-col items-center backdrop-blur-md border-4 border-[#00ff88]/30 w-[90%] max-w-md relative z-30 animate-in fade-in zoom-in duration-300 text-slate-100">
                <h1 className="text-3xl font-black text-[#00ff88] mb-3 drop-shadow-md text-center leading-tight tracking-wider hand-drawn">FOX JETPACK</h1>
                
                <div className="grid grid-cols-2 gap-3 w-full mb-4">
                    <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/30 flex flex-col items-center">
                       <h3 className="font-bold text-emerald-300 mb-1 text-[10px] uppercase tracking-widest bg-emerald-900/60 px-2 rounded-full">Recolectar</h3>
                       <div className="flex gap-4 items-end justify-center w-full mt-1">
                           <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-black/30 rounded-lg p-1 flex items-center justify-center">
                                <img src={FUEL_SPRITE} alt="Fuel" className="w-full h-full object-contain animate-pulse" />
                              </div>
                           </div>
                           <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-black/30 rounded-lg p-1 flex items-center justify-center">
                                <img src={POLLUTANT_SPRITES[0]} alt="Score" className="w-full h-full object-contain" />
                              </div>
                           </div>
                       </div>
                    </div>
                    <div className="bg-red-950/50 p-2 rounded-xl border border-red-500/30 flex flex-col items-center">
                       <h3 className="font-bold text-red-300 mb-1 text-[10px] uppercase tracking-widest bg-red-900/60 px-2 rounded-full">Evitar</h3>
                        <div className="flex gap-4 items-end justify-center w-full mt-1">
                           <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-black/30 rounded-lg p-1 flex items-center justify-center overflow-hidden">
                                  <SpriteAnimator src={OBSTACLE_BIRDS[0]} row={2} rows={4} frameCount={6} fps={12} className="w-12 h-12 scale-125" />
                              </div>
                           </div>
                           <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-black/30 rounded-lg p-1 flex items-center justify-center">
                                <img src={OBSTACLE_TREES[0]} alt="Tree" className="w-full h-full object-contain" />
                              </div>
                           </div>
                       </div>
                    </div>
                </div>
                
                <div className="text-center text-xs font-bold text-slate-300 mb-4 animate-bounce bg-[#183024] px-4 py-1 rounded-full border border-[#00ff88]/20">( Toca para volar )</div>
                <Button onClick={startGame} icon={<Play size={20} />} className="w-full py-3 text-lg scale-105 hover:scale-110 transition-transform shadow-xl justify-center">¡ENTENDIDO!</Button>
            </div>
        </div>
      );
  }

  return (
    <div style={containerStyle} className="overflow-hidden select-none touch-none cursor-crosshair bg-sky-300"
        onMouseDown={handleStartThrust} onMouseUp={handleEndThrust} onMouseLeave={handleEndThrust}
        onTouchStart={handleStartThrust} onTouchEnd={handleEndThrust}>
        <div className="absolute inset-0 bg-cover bg-bottom pointer-events-none z-0" style={{ backgroundImage: `url(${BG_MAIN})` }}></div>
        {clouds.current.map(cloud => (
            <img key={cloud.id} src={cloud.type === 'BIG' ? CLOUD_BIG : CLOUD_SMALL} alt="nube" className="absolute opacity-80 transition-none pointer-events-none z-5" style={{left: `${cloud.x}px`, top: `${cloud.y}px`, width: cloud.type === 'BIG' ? '320px' : '140px'}} />
        ))}
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50 pointer-events-none safe-area-inset">
             <div className="w-36 sm:w-48 flex flex-col gap-1 filter drop-shadow-lg pointer-events-auto">
                 <div className="flex items-center gap-1 text-xs sm:text-sm uppercase tracking-wider text-white font-black stroke-black">
                     <Zap size={18} className="text-yellow-400 fill-yellow-400"/> ENERGÍA
                 </div>
                 <div className="h-4 sm:h-5 w-full bg-black/50 rounded-full overflow-hidden border-2 border-white/80 backdrop-blur-sm relative">
                     <div className={`h-full ${fuel < 25 ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]' : 'bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.9)]'}`} style={{ width: `${Math.max(0, Math.min(100, fuel))}%` }}></div>
                     {fuel <= 0 && (
                         <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-red-200 uppercase tracking-tight drop-shadow">
                             ¡SIN ENERGÍA!
                         </span>
                     )}
                 </div>
             </div>
             
             <div className="font-black text-3xl sm:text-4xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tighter" style={{ textShadow: '3px 3px 0 #2C3639' }}>
                 {score}
             </div>

             <div className="flex items-center gap-2 pointer-events-auto">
                <button 
                    onClick={() => {
                        if (audioEngineRef.current) {
                            const muted = audioEngineRef.current.toggleMute();
                            setIsMuted(muted);
                        }
                    }} 
                    title={isMuted ? "Activar sonido y música" : "Silenciar música"} 
                    className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white border border-white/30 backdrop-blur-md shadow-lg transition-all active:scale-95 flex items-center justify-center"
                >
                    {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-[#00ff88]" />}
                </button>
                <button onClick={toggleFullscreen} title="Pantalla completa" className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white border border-white/30 backdrop-blur-md shadow-lg transition-all active:scale-95">
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button onClick={onExit} title="Salir" className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white border border-white/30 backdrop-blur-md shadow-lg transition-all active:scale-95">
                    <X size={20} />
                </button>
             </div>
        </div>

        {gameState === 'PLAYING' && !hasStarted && (
            <div 
                onClick={handleStartGameAction}
                onTouchStart={handleStartGameAction}
                className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer select-none"
            >
                <div className="bg-[#11221a]/95 border-2 border-[#00ff88] text-white px-8 py-6 rounded-3xl shadow-[0_0_35px_rgba(0,255,136,0.35)] flex flex-col items-center gap-3 animate-bounce">
                    <div className="w-16 h-16 bg-[#00ff88]/20 rounded-full flex items-center justify-center text-[#00ff88] border-2 border-[#00ff88]/50">
                        <Fingerprint size={40} className="animate-pulse" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-[#00ff88] text-center uppercase tracking-wide">
                        ¡Toca la pantalla para volar!
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 font-bold text-center">
                        Mantén presionado para elevarte con el jetpack
                    </span>
                </div>
            </div>
        )}
        
        {entities.current.map(renderEntity)}
        <div className="absolute z-40 will-change-transform flex items-center justify-center" style={{left: `50px`, top: `${foxY.current}px`, width: '56px', height: '56px', transform: `rotate(${Math.max(-25, Math.min(25, velocity.current * 1.5))}deg)`}}>   
            {isThrusting.current && <div className="absolute top-[55%] -left-3 w-6 h-6 bg-orange-500 rounded-full blur-md animate-pulse"></div>}
            <SpriteAnimator src={FOX_RUN} row={2} rows={4} frameCount={6} fps={12} className="w-full h-full drop-shadow-xl" />
        </div>
    </div>
  );
};
interface MiniGameProps {
  onComplete: (score: number) => void;
  difficulty?: number;
  onTriggerBadgeAction?: (actionId: string, value?: any) => void;
}

// --- JUEGO 3: AHORCADO AMBIENTAL (ECO HANGMAN) ---

export const EcoHangmanGame: React.FC<MiniGameChildProps> = ({ onGameOver, onExit, onTriggerBadgeAction }) => {
  React.useEffect(() => {
    onTriggerBadgeAction?.('hangman_won');
    onTriggerBadgeAction?.('game_played');
  }, [onTriggerBadgeAction]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 p-2 sm:p-4">
      <div className="w-full flex items-center justify-between border-b border-[#00ff88]/20 pb-3">
        <button
          onClick={onExit}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#00ff88] transition-colors bg-[#183024] px-4 py-2 rounded-full border border-[#00ff88]/30 cursor-pointer shadow-md"
        >
          <ArrowLeft size={16} /> Volver
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-[#00ff88] tracking-wide flex items-center gap-2">
          <TreePine className="w-6 h-6 text-[#00ff88]" />
          Ahorcado ecológico
        </h2>

        <div className="w-16 sm:w-20" />
      </div>

      <div className="w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border-2 border-[#00ff88]/40 shadow-[0_0_35px_rgba(0,255,136,0.2)] bg-black relative">
        <iframe
          style={{ width: '100%', height: '100%', border: 0 }}
          src="https://wordwall.net/es/embed/e4b4526fab7c40779ad1c969b55e37b8?themeId=44&templateId=73&fontStackId=0"
          width="500"
          height="380"
          frameBorder="0"
          allowFullScreen
          title="Ahorcado ecológico"
          className="w-full h-full rounded-3xl"
        ></iframe>
      </div>
    </div>
  );
};

export const MiniGame: React.FC<MiniGameProps> = ({ onComplete, onTriggerBadgeAction }) => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const handleSelectGame = (game: string) => {
        setSelectedGame(game);
        if (game === 'FOX_JETPACK') {
            onTriggerBadgeAction?.('start_jetpack');
            onTriggerBadgeAction?.('game_played');
        } else if (game === 'ECO_SORT') {
            onTriggerBadgeAction?.('start_ecosort');
            onTriggerBadgeAction?.('game_played');
        } else if (game === 'ECO_HANGMAN') {
            onTriggerBadgeAction?.('start_hangman');
            onTriggerBadgeAction?.('game_played');
        }
    };

    if (selectedGame === 'FOX_JETPACK') {
        return (
            <FoxJetpackGame 
                onGameOver={(score) => { onComplete(score); setSelectedGame(null); }} 
                onExit={() => setSelectedGame(null)} 
                onTriggerBadgeAction={onTriggerBadgeAction}
            />
        );
    }
    
    if (selectedGame === 'ECO_SORT') {
        return (
            <EcoSortingGame
                onGameOver={(score) => { onComplete(score); setSelectedGame(null); }} 
                onExit={() => setSelectedGame(null)} 
                onTriggerBadgeAction={onTriggerBadgeAction}
            />
        );
    }

    if (selectedGame === 'ECO_HANGMAN') {
        return (
            <EcoHangmanGame
                onGameOver={(score) => { onComplete(score); setSelectedGame(null); }} 
                onExit={() => setSelectedGame(null)} 
                onTriggerBadgeAction={onTriggerBadgeAction}
            />
        );
    }

    return (
        <div className="min-h-[500px] flex flex-col items-center justify-center p-2 sm:p-4 max-w-4xl mx-auto">
            <div className="text-center mb-6 animate-in slide-in-from-top-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00ff88] mb-1 tracking-tight">
                  Minijuegos Interactivos
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                
                {/* TARJETA JUEGO 1: FOX JETPACK */}
                <div 
                    onClick={() => handleSelectGame('FOX_JETPACK')}
                    className="group relative h-64 bg-[#11221a] border-2 border-[#00ff88]/30 rounded-[28px] overflow-hidden shadow-2xl hover:border-[#00ff88] transition-all cursor-pointer flex flex-col justify-between p-5"
                >
                    <div className="absolute inset-0 bg-sky-950/60">
                        <img 
                            src={BG_MAIN} 
                            alt="Background" 
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-1 right-1 w-20 h-20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center pointer-events-none">
                            <SpriteAnimator src={FOX_RUN} row={2} rows={4} frameCount={6} fps={12} className="w-full h-full" />
                        </div>
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="bg-yellow-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md animate-bounce">
                          VOLADOR
                      </span>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-1 drop-shadow-md">Fox Jetpack</h3>
                        <p className="text-slate-200 text-xs mb-3">Vuela con el zorro, esquiva obstáculos y atrapa CO2.</p>
                        <Button className="w-full text-xs py-2" icon={<Gamepad2 size={16} />}>JUGAR JETPACK</Button>
                    </div>
                </div>

                {/* TARJETA 2: ECO SORTING */}
                <div 
                     onClick={() => handleSelectGame('ECO_SORT')}
                     className="group relative h-64 bg-[#11221a] border-2 border-[#00ff88]/30 rounded-[28px] overflow-hidden shadow-2xl hover:border-[#00ff88] transition-all cursor-pointer flex flex-col justify-between p-5"
                >
                     <div className="absolute inset-0 bg-emerald-950/60">
                         <div className="absolute inset-0 bg-repeat opacity-30" style={{backgroundImage: `url(${BACKGROUND_PATIO})`, backgroundSize: 'cover'}}></div>
                         <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-28 flex items-center justify-center">
                             <Recycle size={60} className="text-[#00ff88] opacity-30 group-hover:rotate-45 transition-transform duration-500" />
                         </div>
                     </div>

                     <div className="relative z-10 flex justify-between items-start">
                       <span className="bg-[#00ff88]/20 text-[#00ff88] text-[10px] font-extrabold px-3 py-1 rounded-full border border-[#00ff88]/30">
                           CLASIFICACIÓN
                       </span>
                     </div>
                     
                     <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-1 drop-shadow-md">Clasificación Eco</h3>
                        <p className="text-slate-200 text-xs mb-3">Arrastra y clasifica rápidamente los residuos.</p>
                        <Button className="w-full text-xs py-2" icon={<Recycle size={16} />}>JUGAR CLASIFICACIÓN</Button>
                     </div>
                </div>

                {/* TARJETA 3: AHORCADO AMBIENTAL */}
                <div 
                     onClick={() => handleSelectGame('ECO_HANGMAN')}
                     className="group relative h-64 bg-[#11221a] border-2 border-[#00ff88]/30 rounded-[28px] overflow-hidden shadow-2xl hover:border-[#00ff88] transition-all cursor-pointer flex flex-col justify-between p-5"
                >
                     <div className="absolute inset-0 bg-amber-950/60">
                         <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 flex items-center justify-center">
                             <TreePine size={64} className="text-[#00ff88] opacity-40 group-hover:scale-110 transition-transform duration-500" />
                         </div>
                     </div>

                     <div className="relative z-10 flex justify-between items-start">
                       <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md animate-pulse">
                           ¡NUEVO JUEGO!
                       </span>
                     </div>
                     
                     <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-1 drop-shadow-md">Ahorcado ecológico</h3>
                        <p className="text-slate-200 text-xs mb-3">Demuestra tus conocimientos ambientales en Wordwall.</p>
                        <Button className="w-full text-xs py-2" icon={<TreePine size={16} />}>JUGAR AHORCADO</Button>
                     </div>
                </div>

            </div>
            
             <button 
                onClick={() => onComplete(0)}
                className="mt-6 flex items-center gap-2 text-slate-400 hover:text-[#00ff88] text-xs font-bold px-4 py-2 rounded-full bg-[#183024]/50 border border-[#00ff88]/20 transition-colors cursor-pointer"
            >
                <ArrowLeft size={16} /> Volver
            </button>
        </div>
    );
};
