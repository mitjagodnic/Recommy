/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Intent } from '../types.ts';

interface WelcomeScreenProps {
  onStart: (preferredIntent: Intent) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-black text-white overflow-y-auto relative font-sans">
      
      {/* Dynamic Ambient Blurs (Red and Blue) */}
      <div className="absolute top-12 left-[-20%] w-[220px] h-[220px] bg-red-600/25 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-24 right-[-20%] w-[240px] h-[240px] bg-blue-600/25 rounded-full blur-[90px] pointer-events-none" />
      
      {/* Top Brand Logo & Title */}
      <div className="flex flex-col items-center pt-8 z-10 shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-1"
        >
          <h1 className="text-5xl font-black tracking-tighter text-center font-sans flex items-center gap-1">
            Recommy<span className="text-red-500 font-black animate-pulse">.</span>
          </h1>
          <span className="text-[10px] font-mono font-black tracking-widest text-blue-400 uppercase">
            ✨ Your Vibe & Moodboard Matchmaker ✨
          </span>
        </motion.div>
      </div>

      {/* Philosophy Card Space */}
      <div className="my-auto py-5 flex flex-col gap-5 z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-[19px] font-extrabold leading-snug text-center tracking-tight px-1 text-white"
        >
          Your AI companion who analyzes your <span className="text-red-500 font-black">lifestyle moodboards</span> to recommend your best local matches.
        </motion.p>

        {/* Dynamic Glassmorphic Philosophy Cards Row */}
        <div className="flex flex-col gap-3">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all shadow-lg"
          >
            <div className="p-2 rounded-xl bg-red-500/20 text-red-500 shrink-0 text-base">
              🙈
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wide text-white">Moodboard First</div>
              <div className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed font-medium">
                Upload your surroundings, style, or coffee. Recommy matches your lifestyle looks, keeping photos private.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all shadow-lg"
          >
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0 text-base">
              🧭
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wide text-white">Vicinity Curation</div>
              <div className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed font-medium">
                Get 3-5 hyper-local matches tailored to your city, neighborhood, and time of the day.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/15 backdrop-blur-md hover:bg-white/20 transition-all shadow-lg"
          >
            <div className="p-2 rounded-xl bg-white/10 text-white shrink-0 text-base">
              🛡️
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wide text-white">Ping & Reveal Payoff</div>
              <div className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed font-medium">
                Send a quick "ping". Once they accept, profile details and photo portraits instantly reveal for meeting up!
              </div>
            </div>
          </motion.div>
        </div>

        {/* Intention Guide Indicators */}
        <div className="flex justify-center gap-6 mt-2 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-lg">
              ❤️
            </div>
            <span className="text-[9px] font-mono tracking-tight font-extrabold uppercase text-zinc-300">Love</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-lg">
              🌐
            </div>
            <span className="text-[9px] font-mono tracking-tight font-extrabold uppercase text-zinc-300">Networking</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">
              👥
            </div>
            <span className="text-[9px] font-mono tracking-tight font-extrabold uppercase text-zinc-300">Friendship</span>
          </div>
        </div>
      </div>

      {/* Start Button & Footer */}
      <div className="flex flex-col gap-3.5 pb-4 z-10 shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStart('dating')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black text-[13px] uppercase tracking-wider shadow-[0_8px_25px_rgba(239,68,68,0.3)] border-0 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
        >
          <span>Create My Profile</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          >
            👉
          </motion.span>
        </motion.button>
        <div className="text-center text-[9px] text-zinc-400 font-mono tracking-widest font-bold uppercase">
          Recommy Inc • 100% Sincere AI Matchmaking
        </div>
      </div>

    </div>
  );
}
