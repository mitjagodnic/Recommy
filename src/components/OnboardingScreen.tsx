/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Intent, UserProfile } from '../types.ts';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const INTEREST_POOL = [
  "Specialty espresso", "Sourdough baking", "Acoustic vinyl", "Mid-century restoration",
  "Trail running", "Independent cinema", "Pottery & ceramics", "Gravel biking", "Sailing",
  "Modern art", "Public city gardens", "Philosophy reading"
];

const PRESETS = [
  {
    name: "Aesthetic Coffee & Records",
    vibe: "Warm Organic Minimalist • Mid-Century Earth Tones",
    photos: ["☕ Chemex setup", "🎼 Vintage vinyl stack", "🏢 Brutalist architecture", "🌲 Pine trail sunset"]
  },
  {
    name: "Organic Clay & Redwoods",
    vibe: "Rustic Earthy • Clay Texture & Forest Mist",
    photos: ["🏺 Ceramic kiln wheel", "🌿 Eucalyptus ferns", "🚴 Marin gravel route", "🌧️ Foggy redwoods"]
  },
  {
    name: "Ocean Tech & Marine",
    vibe: "Modern Crisp Nautical • Coastal Wind Vibe",
    photos: ["⛵ Sailboat helm", "📈 Laptop tech boards", "☕ Mission roastery", "🌊 Golden Gate sunset"]
  }
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hey! I'm Recommy, your AI matchmaking friend. I don't care about standard shallow swipes—I find you matches based on what actually matters: your lifestyle moodboards, your surroundings, and your core vibes! ✨ What's your name and which city are you in?",
      timestamp: "Just now"
    }
  ]);
  const [chatStep, setChatStep] = useState(1); // 1: Name & City, 2: Intent, 3: Profession & Routines, 4: Moodboard, 5: AI analysis loading
  const [nameInput, setNameInput] = useState("Alex");
  const [cityInput, setCityInput] = useState("San Francisco");
  const [professionInput, setProfessionInput] = useState("Creative Director");
  const [intent, setIntent] = useState<Intent>('dating');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Architectural photography", "Sourdough baking", "Acoustic vinyl"]);
  const [chosenPreset, setChosenPreset] = useState(PRESETS[0]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(PRESETS[0].photos);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (sender: 'ai' | 'user', text: string) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleStep1Submit = () => {
    if (!nameInput.trim()) return;
    addMessage('user', `My name is ${nameInput} and I'm in ${cityInput || 'San Francisco'}.`);
    
    setChatStep(2);
    setTimeout(() => {
      addMessage('ai', `Awesome to meet you, ${nameInput}! Recommy matches you across three major lifepaths. What are you looking to discover today?`);
    }, 600);
  };

  const handleStep2Select = (selectedIntent: Intent) => {
    setIntent(selectedIntent);
    const intentLabel = selectedIntent === 'dating' ? 'Love & Dating' : selectedIntent === 'networking' ? 'Networking Collabs' : 'Sincere Friendship';
    addMessage('user', `I'm looking for ${intentLabel}.`);
    
    setChatStep(3);
    setTimeout(() => {
      addMessage('ai', `Mindful intentions locked! Now, tell me about your typical profession/industry, and pick 2-4 daily weekend routines or lifestyle rituals that describe you best.`);
    }, 600);
  };

  const handleToggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleStep3Submit = () => {
    addMessage('user', `I work as a ${professionInput}. My routines: ${selectedInterests.slice(0, 3).join(', ')}.`);
    
    setChatStep(4);
    setTimeout(() => {
      addMessage('ai', `Fascinating! Now let's build your lifestyle moodboard. Upload 3-4 photos of your surroundings (coffee, favorite park, workspace, design, trails, or your looks!).

My AI looks-analyzer will parse their visual style to find compatible matches.

Choose one of our high-aesthetic presets to auto-populate your life moodboard, or click upload to customize!`);
    }, 600);
  };

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setChosenPreset(preset);
    setUploadedPhotos(preset.photos);
  };

  const handleCustomPhotoUpload = () => {
    const newCustomPhoto = `📷 My Custom Style Snapshot ${uploadedPhotos.length + 1}`;
    setUploadedPhotos(prev => [...prev, newCustomPhoto]);
  };

  const triggerAIMatching = () => {
    addMessage('user', `My lifestyle moodboard is ready! Let's find matches.`);
    setChatStep(5);
    setIsAnalyzing(true);

    const statuses = [
      { text: "📥 Parsing lifestyle snapshots...", progress: 20 },
      { text: "🎨 Extraction: Analyzing warm organic minimalist palettes...", progress: 50 },
      { text: "🛰️ Mapping neighborhood vicinities & time slots in San Francisco...", progress: 80 },
      { text: "✨ Aesthetic lookbook resonance unlocked! Matching with active profiles...", progress: 100 }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < statuses.length) {
        setAnalysisStatus(statuses[currentIdx].text);
        setAnalysisProgress(statuses[currentIdx].progress);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Fire complete!
          const finalizedProfile: UserProfile = {
            name: nameInput,
            age: 34,
            profession: professionInput,
            industry: "Design & Creative",
            neighborhood: "Noe Valley",
            education: "University Graduate",
            intent: intent,
            interests: selectedInterests,
            bio: `Mindful curation matching based on Cozy Cafe aesthetics and local design vibes.`,
            city: cityInput || "San Francisco",
            moodboardPreset: chosenPreset.name,
            moodboardAnalyzedVibe: chosenPreset.vibe,
            profilePhotos: uploadedPhotos
          };
          onComplete(finalizedProfile);
        }, 800);
      }
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden relative text-white font-sans">
      
      {/* Decorative Ambient Blurs (Red and Blue) */}
      <div className="absolute top-10 left-[-20%] w-[200px] h-[200px] bg-red-600/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="h-14 px-4 bg-zinc-900 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-lg">
            ❤️
          </div>
          <div>
            <span className="font-extrabold text-xs tracking-tight block text-white">Recommy Assistant</span>
            <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-wider block">Conversational AI Setup</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Recommy Online</span>
        </div>
      </div>

      {/* Chat messages viewport */}
      <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-none relative z-10 bg-zinc-900/40">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
            >
              {isAI && (
                <span className="text-[8px] font-mono font-bold text-red-400 px-1 uppercase tracking-widest mb-1">
                  Recommy • AI Assistant
                </span>
              )}
              <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                isAI 
                  ? 'bg-white/10 backdrop-blur-md text-white rounded-tl-sm' 
                  : 'bg-blue-600 text-white rounded-tr-sm font-bold shadow-[0_4px_12px_rgba(59,130,246,0.2)]'
              }`}>
                {msg.text}
              </div>
              <span className="text-[8px] font-mono text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
            </motion.div>
          );
        })}
        
        <div ref={messagesEndRef} />
      </div>

      {/* BOTTOM CONTROL SHEETS (DYNAMICS BASED ON STEPS) */}
      <div className="shrink-0 p-4 bg-zinc-900 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Name & City */}
          {chatStep === 1 && (
            <motion.div
              key="step1-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3"
            >
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1">First Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Alex"
                    className="w-full bg-white/10 rounded-xl px-3 py-2 text-xs text-white font-semibold outline-none focus:bg-white/15"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1">Current City</label>
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="San Francisco"
                    className="w-full bg-white/10 rounded-xl px-3 py-2 text-xs text-white font-semibold outline-none focus:bg-white/15"
                  />
                </div>
              </div>
              <button
                onClick={handleStep1Submit}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider border-0 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Introduce Myself 👉</span>
              </button>
            </motion.div>
          )}

          {/* STEP 2: Intent buttons */}
          {chatStep === 2 && (
            <motion.div
              key="step2-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2"
            >
              <span className="text-[9.5px] font-mono font-bold text-zinc-400 block mb-1 text-center uppercase tracking-wider">CHOOSE MATCHING INTENT</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStep2Select('dating')}
                  className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl text-center flex flex-col items-center gap-1.5 cursor-pointer transition-all border-0"
                >
                  <span className="text-xl">❤️</span>
                  <span className="text-[9px] font-black uppercase text-white">Love</span>
                </button>
                <button
                  onClick={() => handleStep2Select('networking')}
                  className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl text-center flex flex-col items-center gap-1.5 cursor-pointer transition-all border-0"
                >
                  <span className="text-xl">🌐</span>
                  <span className="text-[9px] font-black uppercase text-white">Networking</span>
                </button>
                <button
                  onClick={() => handleStep2Select('friendship')}
                  className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl text-center flex flex-col items-center gap-1.5 cursor-pointer transition-all border-0"
                >
                  <span className="text-xl">👥</span>
                  <span className="text-[9px] font-black uppercase text-white">Friendship</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Profession & Routines */}
          {chatStep === 3 && (
            <motion.div
              key="step3-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1">Your Profession</label>
                <input
                  type="text"
                  value={professionInput}
                  onChange={(e) => setProfessionInput(e.target.value)}
                  className="w-full bg-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-semibold outline-none focus:bg-white/15"
                />
              </div>

              <div>
                <label className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1.5">Pick 2-3 Routines & Interests</label>
                <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                  {INTEREST_POOL.map((interest) => {
                    const isSel = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => handleToggleInterest(interest)}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border-0 cursor-pointer transition-all ${
                          isSel 
                            ? 'bg-red-600 text-white shadow-[0_2px_8px_rgba(220,38,38,0.2)]' 
                            : 'bg-white/10 text-zinc-300 hover:bg-white/15'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleStep3Submit}
                disabled={selectedInterests.length < 2}
                className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase border-0 flex items-center justify-center gap-1 cursor-pointer transition-all ${
                  selectedInterests.length >= 2 
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.3)]' 
                    : 'bg-zinc-800 text-zinc-500 pointer-events-none'
                }`}
              >
                <span>Save Vibe Details 👉</span>
              </button>
            </motion.div>
          )}

          {/* STEP 4: Lifestyle Moodboard Setup */}
          {chatStep === 4 && (
            <motion.div
              key="step4-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3"
            >
              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-400 block mb-1 uppercase tracking-wider">CHOOSE LIFESTYLE LOOKBOOK PRESET</span>
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {PRESETS.map((p) => {
                    const isSel = chosenPreset.name === p.name;
                    return (
                      <button
                        key={p.name}
                        onClick={() => handleSelectPreset(p)}
                        className={`p-2.5 rounded-xl text-left border-0 cursor-pointer transition-all ${
                          isSel 
                            ? 'bg-blue-600/25 shadow-md text-white' 
                            : 'bg-white/10 text-zinc-300 hover:bg-white/15'
                        }`}
                      >
                        <div className="text-[9px] font-black leading-tight line-clamp-1">{p.name}</div>
                        <div className="text-[7.5px] text-zinc-400 mt-0.5 line-clamp-1">{p.vibe}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Displaying current moodboard layout preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-mono font-bold text-red-400 uppercase">My Lookbook ({uploadedPhotos.length} Items)</span>
                  <button
                    onClick={handleCustomPhotoUpload}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white/10 rounded-lg text-[9px] font-bold text-zinc-300 cursor-pointer hover:bg-white/15 border-0"
                  >
                    <span>📤 Upload Custom</span>
                  </button>
                </div>
                
                {/* Horizontal flow showing styled moodboard tiles */}
                <div className="flex gap-2 py-1 overflow-x-auto scrollbar-none">
                  {uploadedPhotos.map((photo, i) => (
                    <div key={i} className="px-2.5 py-1.5 rounded-lg bg-white/10 text-[10px] text-zinc-300 font-bold flex items-center gap-1 shrink-0">
                      <span>📷</span>
                      <span>{photo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-white/10 rounded-xl flex items-start gap-2.5 text-[9px] leading-tight text-zinc-300">
                <span className="text-sm shrink-0">❤️</span>
                <span><strong>Looks Matching Active:</strong> Recommy will use these photos to search for matches with corresponding color aesthetics and vicinity coordinates. Private from others initially.</span>
              </div>

              <button
                onClick={triggerAIMatching}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider border-0 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(220,38,38,0.3)]"
              >
                <span>🧠 Analyze My Vibe & Recommend matches</span>
              </button>
            </motion.div>
          )}

          {/* STEP 5: AI Lookbook analyzer */}
          {chatStep === 5 && (
            <motion.div
              key="step5-analyzer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              {/* Spinning/Pulsing Aesthetic look radar */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute inset-[10px] rounded-full border-2 border-dashed border-blue-500"
                />
                <span className="text-3xl animate-pulse">🧠</span>
              </div>

              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Recommy Vibe & Looks Analyzer
              </h4>
              
              <p className="text-[10px] font-mono text-red-400 font-bold mt-1.5 h-8 text-center max-w-xs leading-normal">
                {analysisStatus}
              </p>

              {/* Graphical Progress Bar */}
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mt-3 max-w-xs">
                <motion.div
                  className="bg-blue-500 h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
