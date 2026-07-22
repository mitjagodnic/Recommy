/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Candidate, UserProfile } from '../types.ts';
import AbstractAvatar from './AbstractAvatar.tsx';

interface RevealScreenProps {
  candidate: Candidate;
  userProfile: UserProfile;
  onBeginChat: () => void;
}

export default function RevealScreen({ candidate, userProfile, onBeginChat }: RevealScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#0A0D14] text-white overflow-y-auto relative font-sans">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-x-0 top-12 flex justify-center pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-2.5 h-2.5 rounded-full bg-red-500 absolute left-[15%]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
          className="w-3.5 h-3.5 rounded-full bg-blue-500 absolute right-[12%]"
        />
      </div>

      {/* Decorative Ambient Blurs */}
      <div className="absolute top-10 left-[-20%] w-[180px] h-[180px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Header Reveal */}
      <div className="flex flex-col items-center pt-4 text-center z-10 shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 mb-4"
        >
          <span className="animate-pulse">✨</span>
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-red-400">
            Lookbook Harmony Achieved
          </span>
        </motion.div>
        
        <h2 className="text-4xl font-black text-white tracking-tighter leading-none uppercase">
          It's Mutual!
        </h2>
        <p className="text-xs text-zinc-300 mt-2.5 max-w-xs leading-relaxed font-bold">
          {candidate.firstName} loved your vibe! Since you both agreed to meet up, your profile lookbooks and portraits are now fully revealed.
        </p>
      </div>

      {/* Hero Reveal Interaction Avatar Block */}
      <div className="my-auto py-4 flex flex-col items-center justify-center z-10">
        
        {/* Connection Linkages */}
        <div className="relative flex items-center justify-center gap-6 mb-5">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center font-black text-white text-xl uppercase font-sans">
              {userProfile.name[0]}
            </div>
            <span className="text-[10px] font-mono text-zinc-300 font-black uppercase">{userProfile.name}</span>
          </motion.div>

          {/* Glowing Connect Node */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ delay: 0.4, repeat: Infinity, duration: 2 }}
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white z-20 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            <span className="text-lg animate-bounce">⚡</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex flex-col items-center gap-1"
          >
            {/* Portrait Unveiled */}
            <AbstractAvatar
              seed={candidate.avatarSeed}
              revealStage="fully_revealed"
              size="lg"
            />
            <span className="text-[10px] font-mono text-red-400 font-black uppercase">{candidate.firstName}</span>
          </motion.div>

        </div>

        {/* Info Card displaying profile details revealed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl w-full max-w-sm"
        >
          <span className="text-[9.5px] font-mono text-zinc-400 block tracking-wider uppercase font-black">
            MUTUALLY REVEALED
          </span>
          <h3 className="text-2xl font-black text-red-500 tracking-wide mt-1 uppercase">
            {candidate.firstName}, {candidate.age}
          </h3>
          <p className="text-[11.5px] text-zinc-300 font-semibold mt-1.5 leading-relaxed italic">
            "{candidate.aboutMe.slice(0, 140)}..."
          </p>
          
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] font-bold text-zinc-400 font-mono uppercase">
            <span>📍</span>
            <span>Very Close: {candidate.location}</span>
          </div>
        </motion.div>

        {/* Meetup security assurance */}
        <div className="p-3.5 rounded-2xl bg-black text-[10px] text-zinc-300 font-mono leading-relaxed mt-4 flex items-start gap-2.5 max-w-sm shadow-md">
          <span className="text-base shrink-0 mt-0.5">🛡️</span>
          <span>
            <strong>Lookbook Payoff:</strong> Your lookbooks successfully matched aesthetics. Since you are extremely close in vicinity, grab an espresso or take a walking trail together!
          </span>
        </div>

      </div>

      {/* Trigger CTA button to start conversations */}
      <div className="flex flex-col gap-3 pb-3 z-10 shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBeginChat}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-extrabold text-[13px] uppercase tracking-wider shadow-[0_4px_15px_rgba(220,38,38,0.3)] border-0 flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span className="animate-pulse">💬</span>
          <span>Start Match Chat & Coordinate</span>
        </motion.button>
        <span className="text-[9px] text-zinc-500 text-center font-mono tracking-widest uppercase font-bold">
          Recommy Mutual Trust Reveal Active
        </span>
      </div>

    </div>
  );
}
