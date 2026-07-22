/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types.ts';
import AbstractAvatar from './AbstractAvatar.tsx';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onBack: () => void;
}

export default function ProfileScreen({ userProfile, onBack }: ProfileScreenProps) {
  const [currentTier, setCurrentTier] = useState<1 | 2>(2);

  return (
    <div className="flex-1 flex flex-col bg-[#0A0D14] text-white overflow-hidden relative font-sans">
      
      {/* Decorative Ambient Blurs */}
      <div className="absolute top-10 left-[-20%] w-[180px] h-[180px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Profile Header */}
      <div className="h-14 px-4 flex items-center justify-between bg-black/80 backdrop-blur-md z-10 shrink-0">
        <button
          onClick={onBack}
          className="p-1 px-3 py-1 rounded-xl text-zinc-300 hover:bg-white/15 bg-white/10 cursor-pointer flex items-center gap-1.5 text-[10px] font-black uppercase transition-colors border-0"
        >
          <span>👈</span>
          <span>Matches</span>
        </button>
        <span className="text-[10px] font-mono font-black text-red-400 tracking-widest uppercase">
          My Recommy Vibe Profile
        </span>
        <div className="w-8" />
      </div>

      <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 pb-8 scrollbar-none relative z-10 bg-black/10">
        
        {/* Tier Selector Indicator: Crucial for investor education! */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl flex flex-col gap-2.5 shadow-md">
          <div className="text-[9px] font-mono font-black text-red-400 tracking-wider uppercase">
            Preview: How others see my profile
          </div>
          <p className="text-[10.5px] text-zinc-300 font-bold leading-tight">
            Select a state below to preview how matches see your lookbook:
          </p>
          
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => setCurrentTier(1)}
              className={`p-2.5 rounded-xl text-[10px] font-black font-mono tracking-wide cursor-pointer text-center flex items-center justify-center gap-1.5 transition-all border-0 ${
                currentTier === 1 
                  ? 'bg-white text-black font-extrabold' 
                  : 'bg-white/10 text-zinc-400 hover:bg-white/15'
              }`}
            >
              <span className="text-sm">🙈</span>
              <span>1. Veiled Vibe State</span>
            </button>
            <button
              onClick={() => setCurrentTier(2)}
              className={`p-2.5 rounded-xl text-[10px] font-black font-mono tracking-wide cursor-pointer text-center flex items-center justify-center gap-1.5 transition-all border-0 ${
                currentTier === 2 
                  ? 'bg-red-600 text-white shadow-[0_2px_8px_rgba(220,38,38,0.3)]' 
                  : 'bg-white/10 text-zinc-400 hover:bg-white/15'
              }`}
            >
              <span className="text-sm">🛡️</span>
              <span>2. Unlocked Reveal</span>
            </button>
          </div>
        </div>

        {/* Dynamic Preview Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 flex flex-col gap-4 text-center items-center shadow-lg">
          
          {/* Persona Avatar according to current disclosure tier */}
          <div className="relative">
            <AbstractAvatar
              seed={1} 
              revealStage={currentTier === 1 ? 'anonymous' : 'unveiled'}
              size="lg"
              className={`transition-all ${currentTier === 1 ? 'blur-[2px]' : 'scale-105'}`}
            />
            {currentTier === 1 && (
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                <span className="text-xl">🙈</span>
              </div>
            )}
          </div>

          {/* Name & Identity header */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              {currentTier === 1 ? 'Anonymized Vibe Match' : userProfile.name}
            </h3>
            <span className="text-[10px] font-mono font-black text-red-400 mt-1 block uppercase tracking-wider">
              {currentTier === 1 
                ? '🔒 Portrait & Name hidden from other swipers' 
                : '🔓 Mutually Unlocked via Ping Acceptance'
              }
            </span>
          </div>

          <div className="w-full h-[1px] bg-white/10 my-1" />

          {/* User's lifestyle moodboard pictures - Very high payoff! */}
          <div className="w-full text-left">
            <span className="text-[9px] font-mono font-black text-zinc-400 block tracking-wider uppercase mb-2">My Active Lookbook ({userProfile.moodboardPreset})</span>
            <div className="grid grid-cols-2 gap-2">
              {userProfile.profilePhotos.map((photo, index) => (
                <div key={index} className="p-2.5 rounded-xl bg-white/10 flex items-center gap-1.5 shadow-sm">
                  <span className="text-sm">📷</span>
                  <span className="text-[10px] font-bold text-zinc-200 truncate">{photo}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-red-500/10 text-[9px] font-mono font-bold text-red-400 uppercase text-center">
              Vibe Target: {userProfile.moodboardAnalyzedVibe}
            </div>
          </div>

          {/* Profile Core Parameters */}
          <div className="w-full text-left space-y-3.5 text-xs">
            <div>
              <span className="text-[9px] font-mono font-black text-zinc-400 block tracking-wider uppercase">Occupation & Sphere</span>
              <span className="font-extrabold text-white block mt-0.5">{userProfile.profession} ({userProfile.city})</span>
            </div>

            <div>
              <span className="text-[9px] font-mono font-black text-zinc-400 block tracking-wider uppercase">Active Routines & Passions</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {userProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 text-zinc-200 text-[10px] font-black"
                  >
                    ★ {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono font-black text-zinc-400 block tracking-wider uppercase">My Life Bio</span>
              <p className="text-zinc-300 leading-relaxed mt-1 font-semibold text-[11px] italic bg-black/40 p-3 rounded-xl">
                "{userProfile.bio}"
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
