/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Candidate, UserProfile } from '../types.ts';
import AbstractAvatar from './AbstractAvatar.tsx';

interface ChatScreenProps {
  candidate: Candidate;
  userProfile: UserProfile;
  onBack: () => void;
  onCompleteDemo: () => void;
}

export default function ChatScreen({ candidate, userProfile, onBack, onCompleteDemo }: ChatScreenProps) {
  const [messages, setMessages] = useState(candidate.chatHistory);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getSuggestedPills = () => {
    if (candidate.id === 'cand_01') {
      return ["Hi Elena! 👋", "Let's meet up for coffee and spin some vinyl! 🎧", "What's your current ceramic project? 🏺"];
    }
    if (candidate.id === 'cand_02') {
      return ["Hello Marcus!", "Let's grab a coffee at Valencia coffee roasters ☕", "I saw your climate dashboards! 📊"];
    }
    return ["Hi Sasha!", "Wow, can I borrow some sourdough starter? 🍞", "Let's do a quiet walk at Lafayette Park! ⛰️"];
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Append user message
    const newMsg = { sender: 'me' as const, text: textToSend, timestamp: 'Now' };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // 2. Determine canned response from candidate
    let matchedReply = candidate.scriptedReplies.find(reply => 
      textToSend.toLowerCase().includes(reply.TriggerWord.toLowerCase())
    );

    if (!matchedReply) {
      matchedReply = candidate.scriptedReplies.find(reply => reply.TriggerWord === 'default') 
        || { TriggerWord: 'default', response: "That sounds incredibly suiting! Let's definitely meet up this week and talk more." };
    }

    // 3. Trigger simulated typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { sender: 'them' as const, text: matchedReply!.response, timestamp: 'Just now' }
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0A0D14] text-white overflow-hidden relative font-sans">
      
      {/* Decorative Ambient Blurs */}
      <div className="absolute top-10 left-[-20%] w-[180px] h-[180px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Navigation Custom Header bar */}
      <div className="h-16 px-4 flex items-center justify-between bg-black/80 backdrop-blur-md z-10 shrink-0 shadow-md">
        <button
          onClick={onBack}
          className="p-1 px-3 py-1 rounded-xl text-zinc-300 hover:bg-white/15 bg-white/10 cursor-pointer flex items-center gap-1 text-[10px] font-black uppercase transition-colors border-0"
        >
          <span>👈</span>
          <span>Matches</span>
        </button>

        {/* Header Profile Info card */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-extrabold text-sm text-white tracking-tight block">
              {candidate.firstName}
            </span>
          </div>
          <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-wider block">
            PORTRAIT MUTUALLY REVEALED
          </span>
        </div>

        {/* Small avatar display representing reveal progress */}
        <div className="w-9 h-9 relative">
          <AbstractAvatar
            seed={candidate.avatarSeed}
            revealStage="fully_revealed"
            size="sm"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 flex items-center justify-center">
            <span className="text-[9px]">😊</span>
          </div>
        </div>
      </div>

      {/* REVEAL PAYOFF CONFIRMATION NOTIFICATION */}
      <div className="shrink-0 bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2.5 flex items-center justify-between z-10 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🛡️</span>
          <span className="text-[9px] font-mono font-black uppercase tracking-wider">
            Double Opt-In Meetup Verified • Proximity Lock Unsealed
          </span>
        </div>
        <button
          onClick={onCompleteDemo}
          className="px-3 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-[9px] font-black uppercase text-white cursor-pointer transition-colors border-0"
        >
          Finish Demo
        </button>
      </div>

      {/* Message Log Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6 scrollbar-none bg-black/10 z-10">
        
        {/* Intro conversation banner */}
        <div className="text-center py-3.5 bg-white/10 rounded-2xl px-4">
          <span className="text-[9px] text-red-400 font-mono font-black uppercase tracking-wider px-3 py-1 bg-red-500/10 rounded-full">
            Recommy Vicinity Sync Established
          </span>
          <p className="text-[10.5px] text-zinc-300 leading-normal max-w-xs mx-auto mt-2.5 font-bold">
            You matched lookbook aesthetics! Start chatting and coordinate a safe, real-life encounter in <strong className="text-white">{candidate.neighborhood}</strong>.
          </p>
        </div>

        {/* Existing Messages */}
        {messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                isMe 
                  ? 'bg-red-600 text-white rounded-tr-sm font-bold shadow-[0_4px_12px_rgba(220,38,38,0.2)]' 
                  : 'bg-white/10 backdrop-blur-md text-zinc-200 rounded-tl-sm font-medium'
               }`}>
                {msg.text}
              </div>
              <span className="text-[8px] font-mono text-zinc-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </motion.div>
          );
        })}

        {/* Typing Placeholder banner */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-zinc-300 px-1"
          >
            <div className="flex gap-1.5 items-center bg-white/10 px-3 py-2 rounded-2xl rounded-tl-sm">
              <span className="text-[10px] font-mono font-bold text-zinc-400">{candidate.firstName} is texting...</span>
              <span className="flex gap-0.5 ml-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-200" />
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-300" />
              </span>
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* QUICK SUGGESTION DIALOGUE PILLS */}
      <div className="shrink-0 px-3 py-2.5 flex gap-1.5 overflow-x-auto scrollbar-none bg-black/80 backdrop-blur-md">
        {getSuggestedPills().map((pillText, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(pillText)}
            className="px-3 py-1.5 bg-white/10 text-zinc-300 hover:bg-white/15 rounded-full text-[10px] font-black whitespace-nowrap cursor-pointer transition-all shrink-0 border-0"
          >
            {pillText}
          </button>
        ))}
      </div>

      {/* Send Message Panel */}
      <div className="shrink-0 p-3 bg-black flex items-center gap-2">
        <input
          type="text"
          placeholder={`Coordinate meetup with ${candidate.firstName}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
          className="flex-grow bg-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:bg-white/15 font-medium border-0"
        />
        
        <button
          onClick={() => handleSendMessage(inputText)}
          className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center cursor-pointer transition-colors shrink-0 hover:bg-red-500 shadow-[0_2px_8px_rgba(220,38,38,0.2)] border-0"
        >
          <span className="text-sm">👉</span>
        </button>
      </div>

    </div>
  );
}
