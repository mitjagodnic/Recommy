/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Candidate, UserProfile } from '../types.ts';
import AbstractAvatar from './AbstractAvatar.tsx';

interface DetailScreenProps {
  candidate: Candidate;
  userProfile: UserProfile;
  onBack: () => void;
  onRequestIntroduction: (candidate: Candidate) => void;
  onUpdateCandidates?: (newCandidates: Candidate[]) => void;
}

export default function DetailScreen({ 
  candidate, 
  userProfile, 
  onBack, 
  onRequestIntroduction,
  onUpdateCandidates 
}: DetailScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internalPingStatus, setInternalPingStatus] = useState<Candidate['pingStatus']>(candidate.pingStatus);

  const handlePingAction = () => {
    setIsSubmitting(true);
    setInternalPingStatus('pinged');

    // Update in parent state if available
    if (onUpdateCandidates) {
      const updated = [candidate].map(c => ({ ...c, pingStatus: 'pinged' as const }));
    }

    setTimeout(() => {
      setInternalPingStatus('accepted');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleMeetRevealAction = () => {
    // Reveal everything and go to chat screen!
    onRequestIntroduction({
      ...candidate,
      pingStatus: 'accepted',
      photoRevealState: 'unveiled'
    });
  };

  const isRevealed = internalPingStatus === 'accepted';

  return (
    <div className="flex-1 flex flex-col bg-[#0A0D14] text-white overflow-hidden relative">
      
      {/* Decorative Ambient Blurs */}
      <div className="absolute top-10 left-[-20%] w-[180px] h-[180px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Detail Header Navigation bar */}
      <div className="h-14 px-4 flex items-center justify-between bg-black/80 backdrop-blur-md z-10 shrink-0">
        <button
          onClick={onBack}
          className="p-1 rounded-xl text-zinc-300 hover:bg-white/15 cursor-pointer flex items-center gap-1.5 text-[11px] font-black uppercase bg-white/10 backdrop-blur-md px-3 py-1 shadow-md transition-colors border-0"
        >
          <span>👈</span>
          <span>Back</span>
        </button>
        <span className="text-[10px] font-mono font-black text-red-400 tracking-widest uppercase">
          Match Dossier
        </span>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Dossier Form Body */}
      <div className="flex-grow overflow-y-auto p-4 pb-28 flex flex-col gap-4 scrollbar-none relative z-10 bg-black/10">
        
        {/* Top Anonymized Visual Spotlight - Blurred if not accepted */}
        <div className="flex flex-col items-center text-center p-5 bg-white/10 backdrop-blur-md rounded-3xl relative overflow-hidden shadow-lg">
          
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg bg-blue-600/20 text-blue-400 font-mono text-[9px] font-black uppercase">
            🔥 {candidate.matchScore}% Fit
          </div>

          <div className="relative mb-3 mt-1">
            <AbstractAvatar
              seed={candidate.avatarSeed}
              revealStage={isRevealed ? "fully_revealed" : "anonymous"}
              size="xl"
              className={`transition-all duration-700 ${
                !isRevealed 
                  ? 'blur-[3px]' 
                  : 'scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
              }`}
            />
            {!isRevealed && (
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
            )}
          </div>

          <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-wider uppercase mb-1.5 ${
            isRevealed ? 'bg-blue-600/30 text-blue-300' : 'bg-red-600/30 text-red-300'
          }`}>
            {isRevealed ? `Mutual Reveal: ${candidate.firstName}` : '🔒 Portrait Locked'}
          </div>

          <span className="text-[10px] font-mono font-extrabold text-zinc-400 uppercase tracking-widest">
            {candidate.age} Years Old • {candidate.neighborhood}
          </span>
        </div>

        {/* LIFESTYLE MOODBOARD PHOTO THUMBNAILS (Visual highlights analyzing) */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-2.5">
          <div className="text-[9px] font-mono font-black text-zinc-400 tracking-wider uppercase">
            📷 Lookbook Lifestyle Photos (AI-Analyzed)
          </div>
          <div className="grid grid-cols-2 gap-2">
            {candidate.moodboardPhotos.map((photo, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white/10 flex items-center gap-1.5 shadow-sm">
                <span className="text-sm">📷</span>
                <span className="text-[10px] font-bold text-zinc-200">{photo}</span>
              </div>
            ))}
          </div>
          <p className="text-[9.5px] leading-relaxed text-red-400 font-mono font-bold">
            Recommy scanned these colors & objects to crosscheck layout fits with your {userProfile.moodboardPreset} presets.
          </p>
        </div>

        {/* Career & Heritage Dossier Parameters */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="text-[9px] font-mono font-black text-zinc-400 tracking-wider uppercase">
            Background Blueprint
          </div>
          
          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">💼</span>
            <div>
              <span className="text-[9px] text-zinc-400 block font-mono font-bold uppercase">Profession & Sector</span>
              <span className="text-xs font-black text-white leading-tight">{candidate.profession}</span>
              <span className="text-[10.5px] text-zinc-300 block mt-0.5 font-medium">{candidate.industry}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">🎓</span>
            <div>
              <span className="text-[9px] text-zinc-400 block font-mono font-bold uppercase">Academic History</span>
              <span className="text-xs font-black text-white leading-tight">{candidate.education}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">📍</span>
            <div>
              <span className="text-[9px] text-zinc-400 block font-mono font-bold uppercase">Vicinity Location</span>
              <span className="text-xs font-black text-white leading-tight">{candidate.location}</span>
            </div>
          </div>
        </div>

        {/* Why Match Rationale Details repeated nicely */}
        <div className="p-4 rounded-2xl bg-black/40 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-black text-red-400 tracking-wider uppercase">
            <span>✨ Recommy's Matching Curation</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed font-semibold">
            {candidate.whyMatch}
          </p>
        </div>

        {/* Mutual overlaps Checkbox display */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="text-[9px] font-mono font-black text-zinc-400 tracking-wider uppercase">
            Aesthetic Resonance Markers
          </div>
          <div className="flex flex-col gap-2">
            {candidate.overlapHighlights.map((overlap, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-zinc-300 font-bold">
                <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-0.5 shrink-0 flex items-center justify-center">
                  <span className="text-[9px]">✔️</span>
                </div>
                <span className="leading-tight">{overlap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Prompt answers inside beautiful speech envelopes */}
        {candidate.promptQuestions.map((prompt, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono font-black text-red-400 px-1 uppercase tracking-wider">
              💬 Candidate Prompt Question
            </span>
            <div className="p-4 bg-white/10 rounded-3xl rounded-tl-sm text-xs font-bold leading-relaxed text-zinc-200 italic">
              "{prompt.question}"
              <span className="block mt-2 font-sans not-italic text-blue-400 font-black">
                👉 "{prompt.answer}"
              </span>
            </div>
          </div>
        ))}

        {/* Candidate Interests Tags Cloud */}
        <div className="flex flex-col gap-2 mt-1">
          <span className="text-[9px] font-mono font-black text-zinc-400 px-1 uppercase">
            Interests & Passions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {candidate.interests.map((tag) => {
              const matched = userProfile.interests.includes(tag);
              return (
                <span
                  key={tag}
                  className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black ${
                    matched 
                      ? 'bg-blue-600/30 text-blue-300' 
                      : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {matched ? '★ ' : ''}{tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Progressive Disclosure Map */}
        <div className="p-4 bg-black rounded-3xl flex flex-col gap-3 mt-2 shadow-md">
          <div className="text-[8px] font-mono font-black text-red-400 tracking-wider uppercase">
            Recommy Meetup Barometer
          </div>
          
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-300 font-bold">1. Lifestyle Moodboard Analysis</span>
              <span className="text-blue-400 font-mono font-black text-[9px]">✔️ MATCHED</span>
            </div>
            <div className="h-[1px] bg-white/10" />
            <div className="flex items-center justify-between">
              <span className={isRevealed ? "text-blue-400 font-bold" : "text-zinc-400 font-bold"}>2. Lookboard Ping Option</span>
              <span className={isRevealed ? "text-blue-400 font-mono font-black text-[9px]" : "text-red-400 font-mono font-bold text-[9px]"}>
                {isRevealed ? "✔️ MUTUAL ACCEPT" : "PENDING ACCEPT"}
              </span>
            </div>
            <div className="h-[1px] bg-white/10" />
            <div className="flex items-center justify-between">
              <span className={isRevealed ? "text-white font-bold" : "text-zinc-500 font-bold"}>3. Full Profile Reveal & Chat</span>
              <span className={isRevealed ? "text-red-400 font-mono font-black text-[9px] animate-pulse" : "text-zinc-500 font-mono font-bold text-[9px]"}>
                {isRevealed ? "● READY TO MEET" : "LOCKED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Block */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-md flex flex-col gap-2 z-10 shrink-0 shadow-lg">
        
        {internalPingStatus === 'none' && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePingAction}
            disabled={isSubmitting}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors border-0"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-white animate-spin" />
                <span>Pinging lookbook...</span>
              </>
            ) : (
              <>
                <span>⚡</span>
                <span>Ping Lookboard Match</span>
              </>
            )}
          </motion.button>
        )}

        {internalPingStatus === 'pinged' && (
          <div className="w-full py-3.5 bg-white/10 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
            <span>Lookbook Pinged! Waiting for reaction...</span>
          </div>
        )}

        {internalPingStatus === 'accepted' && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleMeetRevealAction}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer animate-bounce shadow-md border-0"
          >
            <span>❤️</span>
            <span>Mutual Match! Reveal Profile & Meet up</span>
          </motion.button>
        )}

        <span className="text-[9.5px] text-zinc-500 font-mono text-center tracking-tight font-bold uppercase">
          Recommy Private Curation Lock • Active protection
        </span>
      </div>

    </div>
  );
}
