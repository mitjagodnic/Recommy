/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Candidate, UserProfile } from '../types.ts';
import AbstractAvatar from './AbstractAvatar.tsx';

interface SuggestionsScreenProps {
  candidates: Candidate[];
  userProfile: UserProfile;
  onSelectCandidate: (candidate: Candidate) => void;
  onNavigateProfile: () => void;
  onUpdateCandidates?: (newCandidates: Candidate[]) => void;
}

export default function SuggestionsScreen({ 
  candidates, 
  userProfile, 
  onSelectCandidate, 
  onNavigateProfile,
  onUpdateCandidates 
}: SuggestionsScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'dating' | 'networking' | 'friendship'>('all');
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [successMatch, setSuccessMatch] = useState<Candidate | null>(null);

  const filteredCandidates = candidates.filter(c => {
    if (activeTab === 'all') return true;
    return c.intent === activeTab;
  });

  const handlePing = (candidateId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening detailed card
    setPingingId(candidateId);

    // 1. Update candidate state to 'pinged'
    const updatedCandidates = candidates.map(c => {
      if (c.id === candidateId) {
        return { ...c, pingStatus: 'pinged' as const };
      }
      return c;
    });
    if (onUpdateCandidates) {
      onUpdateCandidates(updatedCandidates);
    }

    // 2. Simulate candidate viewing lookbook and accepting after 1.8 seconds!
    setTimeout(() => {
      const targetCandidate = candidates.find(c => c.id === candidateId);
      const finalCandidates = candidates.map(c => {
        if (c.id === candidateId) {
          return { 
            ...c, 
            pingStatus: 'accepted' as const,
            photoRevealState: 'requested' as const 
          };
        }
        return c;
      });
      
      if (onUpdateCandidates) {
        onUpdateCandidates(finalCandidates);
      }
      
      setPingingId(null);
      if (targetCandidate) {
        setSuccessMatch({
          ...targetCandidate,
          pingStatus: 'accepted',
          photoRevealState: 'requested'
        });
      }
    }, 1800);
  };

  const handleMutualRevealAction = (cand: Candidate, e: React.MouseEvent) => {
    e.stopPropagation();
    setSuccessMatch(null);
    onSelectCandidate(cand);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0A0D14] text-white overflow-hidden relative">
      
      {/* Decorative Ambient Blurs (Red and Blue) */}
      <div className="absolute top-10 left-[-20%] w-[200px] h-[200px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* SUCCESS MATCH CONGRATS TOAST BANNER */}
      <AnimatePresence>
        {successMatch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="absolute inset-x-4 bottom-20 bg-black/95 p-4 rounded-3xl z-40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-red-600 text-white shrink-0 text-base">
                🛡️
              </div>
              <div>
                <h4 className="text-sm font-black text-red-400 uppercase tracking-wider">Mutual Lookbook Acceptance!</h4>
                <p className="text-[10.5px] text-zinc-300 leading-tight">
                  {successMatch.firstName} loved your {userProfile.moodboardPreset} moodboard! You both matched coordinates.
                </p>
              </div>
            </div>
            
            <div className="h-[1px] bg-white/10" />
            
            <button
              onClick={(e) => handleMutualRevealAction(successMatch, e)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-wide border-0 cursor-pointer flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <span>🔥 Dossier & Reveal Portraits</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Dashboard Header */}
      <div className="pt-5 pb-3 px-4 bg-black/60 backdrop-blur-md z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[9px] font-mono tracking-wider text-red-400 font-extrabold uppercase">
                📍 {userProfile.city} • Curation Mode Active
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-0.5 uppercase">
              Recommy Matches
            </h2>
          </div>
          
          {/* Quick User Avatar Icon with nice glowing background */}
          <button
            onClick={onNavigateProfile}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-blue-600 flex items-center justify-center font-black text-sm text-white uppercase cursor-pointer hover:scale-105 transition-transform border-0"
            title="My Background Profile"
          >
            {userProfile.name[0]}
          </button>
        </div>

        {/* Curation info banner based on time of day */}
        <div className="mt-3 py-2 px-3.5 rounded-2xl bg-white/10 flex items-center justify-between text-[10px] text-zinc-300">
          <div className="flex items-center gap-1.5 font-bold">
            <span>🕒 Morning Coffee selection (8AM - 11AM)</span>
          </div>
          <div className="text-red-400 font-mono tracking-wider font-black uppercase bg-red-500/10 px-2 py-0.5 rounded-lg">
            {candidates.filter(c => c.pingStatus !== 'none').length} / 4 Pings Sent
          </div>
        </div>

        {/* Intent filter tab select */}
        <div className="flex items-center gap-1 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap cursor-pointer border-0 ${
              activeTab === 'all' 
                ? 'bg-white text-black font-extrabold' 
                : 'bg-white/10 text-zinc-300 hover:bg-white/15'
            }`}
          >
            All Vibes
          </button>
          
          <button
            onClick={() => setActiveTab('dating')}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border-0 ${
              activeTab === 'dating' 
                ? 'bg-red-600 text-white shadow-[0_2px_8px_rgba(220,38,38,0.3)]' 
                : 'bg-white/10 text-zinc-300 hover:bg-white/15'
            }`}
          >
            <span>❤️ Love</span>
          </button>

          <button
            onClick={() => setActiveTab('networking')}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border-0 ${
              activeTab === 'networking' 
                ? 'bg-blue-600 text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)]' 
                : 'bg-white/10 text-zinc-300 hover:bg-white/15'
            }`}
          >
            <span>🌐 Network</span>
          </button>

          <button
            onClick={() => setActiveTab('friendship')}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border-0 ${
              activeTab === 'friendship' 
                ? 'bg-zinc-700 text-white shadow-md' 
                : 'bg-white/10 text-zinc-300 hover:bg-white/15'
            }`}
          >
            <span>🧭 Friends</span>
          </button>
        </div>
      </div>

      {/* Main Container of Curated Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 scrollbar-none bg-black/10 z-10">
        
        {filteredCandidates.map((candidate, idx) => {
          const isDating = candidate.intent === 'dating';
          const isNetwork = candidate.intent === 'networking';
          const indicatorBg = isDating ? 'bg-red-600 text-white' : isNetwork ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-white';
          const bannerText = isDating ? 'Love & Romance' : isNetwork ? 'Networking Collabs' : 'Sincere Friendship';

          return (
            <div
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate)}
              className="group relative bg-white/10 p-4 rounded-3xl hover:bg-white/15 transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg"
            >
              
              {/* Card Badge Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-extrabold uppercase ${indicatorBg}`}>
                  {bannerText}
                </div>
                <div className="px-2 py-0.5 rounded-lg bg-white/10 text-[9.5px] font-black font-mono text-zinc-300">
                  🔥 {candidate.matchScore}% Vibe Fit
                </div>
              </div>

              {/* Anonymized Avatar Row & Short Summary */}
              <div className="flex items-start gap-3.5 mb-3">
                
                {/* Beautiful custom visual container indicating veiled status */}
                <div className="relative shrink-0">
                  <AbstractAvatar
                    seed={candidate.avatarSeed}
                    revealStage="anonymous"
                    size="md"
                    className="blur-[1.5px]"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                    <span className="text-sm">🔒</span>
                  </div>
                </div>
                
                <div className="flex-1 mt-0.5">
                  <span className="text-[9px] font-mono font-black text-red-400 block tracking-wider uppercase">
                    Veiled Match candidate
                  </span>
                  
                  {/* Career & Neighborhood instead of names and faces */}
                  <div className="flex items-center gap-1.5 text-xs font-black text-white mt-0.5">
                    <span className="text-xs">💼</span>
                    <span className="line-clamp-1">{candidate.profession}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5 font-bold">
                    <span className="text-xs">📍</span>
                    <span>{candidate.location}</span>
                  </div>
                </div>
              </div>

              {/* LOCATION AND TIME OF DAY SPECIFICS BADGE */}
              <div className="mb-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-[10px] font-bold text-zinc-300">
                <span>🕒 Time of Day Match: <strong className="text-white">{candidate.timeOfDayMatch}</strong></span>
              </div>

              {/* INTERACTIVE MOODBOARD LIFE PHOTO LABELS (Showcasing analyzed looks!) */}
              <div className="mb-3">
                <span className="text-[9px] font-mono font-black text-zinc-500 block tracking-wider uppercase mb-1.5">Recommy's Analyzed Life Lookbook</span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.moodboardPhotos.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white/10 rounded-xl text-[9px] font-bold text-zinc-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* WHY WE THINK YOU'D CLICK callout board */}
              <div className="p-3 rounded-2xl bg-black/40 flex flex-col gap-1.5 mb-3.5">
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-red-400 tracking-wider uppercase">
                  <span>✨ Aesthetic Matching Reason</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed tracking-tight font-medium">
                  {candidate.whyMatch}
                </p>
              </div>

              {/* DYNAMIC INTERACTIVE PING CONTROLLER BUTTON (The ultimate payload!) */}
              <div className="pt-2.5 flex flex-col gap-2">
                
                {candidate.pingStatus === 'none' && (
                  <button
                    onClick={(e) => handlePing(candidate.id, e)}
                    disabled={pingingId !== null}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white border-0 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                  >
                    <span>⚡ Ping Lookboard Match</span>
                  </button>
                )}

                {candidate.pingStatus === 'pinged' && (
                  <div className="w-full py-2.5 bg-white/10 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <span>Ping Sent • Waiting for reaction...</span>
                  </div>
                )}

                {candidate.pingStatus === 'accepted' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCandidate(candidate);
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 animate-bounce shadow-md"
                  >
                    <span>✔️ Vibe Accepted! Click to Reveal Portrait</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[10px] font-bold text-red-400 px-1 mt-1.5">
                  <span>CURATED SUITING MATCH</span>
                  <span className="flex items-center gap-1 text-zinc-400 font-black">
                    Review Dossier 👉
                  </span>
                </div>
              </div>

            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <span className="text-3xl animate-spin block">🧭</span>
            <p className="text-xs font-mono font-bold mt-2 text-zinc-600 uppercase">No recommendations matching this intent today.</p>
          </div>
        )}
      </div>

    </div>
  );
}
