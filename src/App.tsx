/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen, Candidate, UserProfile, Intent } from './types.ts';
import { MOCK_CANDIDATES, INITIAL_USER_PROFILE } from './data.ts';
import PhoneFrame from './components/PhoneFrame.tsx';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import OnboardingScreen from './components/OnboardingScreen.tsx';
import SuggestionsScreen from './components/SuggestionsScreen.tsx';
import DetailScreen from './components/DetailScreen.tsx';
import RevealScreen from './components/RevealScreen.tsx';
import ChatScreen from './components/ChatScreen.tsx';
import ProfileScreen from './components/ProfileScreen.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.Welcome);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showPitchSummary, setShowPitchSummary] = useState(false);

  // Restart entire demo walkthrough
  const handleRestartDemo = () => {
    setCurrentScreen(AppScreen.Welcome);
    setSelectedCandidate(null);
    setShowPitchSummary(false);
    // Reset candidates state
    setCandidates(MOCK_CANDIDATES);
    setUserProfile(INITIAL_USER_PROFILE);
  };

  const renderActiveScreen = () => {
    // If showPitchSummary is active, override standard phone screen with clean marketing feedback
    if (showPitchSummary) {
      return (
        <div className="flex-grow flex flex-col justify-between p-6 bg-[#0A0D14] text-white overflow-y-auto relative font-sans">
          
          {/* Decorative Ambient Blurs */}
          <div className="absolute top-10 left-[-20%] w-[180px] h-[180px] bg-red-600/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-20 right-[-20%] w-[200px] h-[200px] bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col gap-5 pt-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/15 rounded-full w-max">
              <span className="text-sm">🏆</span>
              <span className="text-[10px] font-mono tracking-widest text-red-400 font-bold uppercase">
                Pitch Wrap-up
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tighter text-white leading-none uppercase">
              Recommy: The Vision
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
              You've demonstrated the core "Vibe Resonance & Lookbook Payoff" loop. Here is how we communicate these differentiators to market investors:
            </p>

            <div className="flex flex-col gap-3.5 mt-1 text-left">
              
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-start gap-3 shadow-lg">
                <div className="p-1 rounded-xl bg-red-950 text-red-400 mt-0.5 text-base">
                  💡
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">AI Lookbook Resonance</h4>
                  <p className="text-[10px] text-zinc-300 mt-0.5 leading-relaxed font-semibold">
                    By matching users based on lifestyle snapshots and surroundings (coffee, trails, design, art looks) instead of fast face swiping, we achieve 5.4x deeper user dwell time and 70% match conversion rate.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-start gap-3 shadow-lg">
                <div className="p-1 rounded-xl bg-blue-950 text-blue-400 mt-0.5 text-base">
                  🥞
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Conversational Onboarding</h4>
                  <p className="text-[10px] text-zinc-300 mt-0.5 leading-relaxed font-semibold">
                    Recommy (the AI Matchmaking companion) guides users dynamically step-by-step. Users enjoy building a lookbook, reducing initial safety fatigue while maximizing authenticity.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-start gap-3 shadow-lg">
                <div className="p-1 rounded-xl bg-zinc-800 text-zinc-300 mt-0.5 text-base">
                  📈
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Ping & Proximity Reveal</h4>
                  <p className="text-[10px] text-zinc-300 mt-0.5 leading-relaxed font-semibold">
                    3-5 curated matches tailored to vicinity, current neighborhood, and time of day. Once they accept your ping, details and high-contrast portraits instantly reveal for safe real-world meetups.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-6 pb-2 z-10">
            <button
              onClick={handleRestartDemo}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(220,38,38,0.3)] border-0"
            >
              <span className="text-sm">🔄</span>
              <span>Reset Demo Walkthrough</span>
            </button>
            <div className="text-center text-[8px] font-mono mt-3.5 text-zinc-500 tracking-widest uppercase font-bold">
              RECOMMY NETWORKS INC • PROPRIETARY DECK 2026
            </div>
          </div>
        </div>
      );
    }

    switch (currentScreen) {
      case AppScreen.Welcome:
        return (
          <WelcomeScreen
            onStart={(preferredIntent) => {
              setUserProfile(prev => ({ ...prev, intent: preferredIntent }));
              setCurrentScreen(AppScreen.Onboarding);
            }}
          />
        );
      
      case AppScreen.Onboarding:
        return (
          <OnboardingScreen
            onComplete={(newProfile) => {
              setUserProfile(newProfile);
              setCurrentScreen(AppScreen.Suggestions);
            }}
          />
        );

      case AppScreen.Suggestions:
        return (
          <SuggestionsScreen
            candidates={candidates}
            userProfile={userProfile}
            onSelectCandidate={(cand) => {
              setSelectedCandidate(cand);
              setCurrentScreen(AppScreen.Detail);
            }}
            onNavigateProfile={() => {
              setCurrentScreen(AppScreen.Profile);
            }}
            onUpdateCandidates={setCandidates}
          />
        );

      case AppScreen.Detail:
        if (!selectedCandidate) {
          setCurrentScreen(AppScreen.Suggestions);
          return null;
        }
        // Sync selected candidate parameters with global list state if changed there
        const activeCand = candidates.find(c => c.id === selectedCandidate.id) || selectedCandidate;
        return (
          <DetailScreen
            candidate={activeCand}
            userProfile={userProfile}
            onBack={() => {
              setSelectedCandidate(null);
              setCurrentScreen(AppScreen.Suggestions);
            }}
            onRequestIntroduction={(updatedCandidate) => {
              // Update state
              setCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
              setSelectedCandidate(updatedCandidate);
              setCurrentScreen(AppScreen.Reveal);
            }}
            onUpdateCandidates={setCandidates}
          />
        );

      case AppScreen.Reveal:
        if (!selectedCandidate) {
          setCurrentScreen(AppScreen.Suggestions);
          return null;
        }
        return (
          <RevealScreen
            candidate={selectedCandidate}
            userProfile={userProfile}
            onBeginChat={() => {
              setCurrentScreen(AppScreen.Chat);
            }}
          />
        );

      case AppScreen.Chat:
        if (!selectedCandidate) {
          setCurrentScreen(AppScreen.Suggestions);
          return null;
        }
        return (
          <ChatScreen
            candidate={selectedCandidate}
            userProfile={userProfile}
            onBack={() => {
              setCurrentScreen(AppScreen.Suggestions);
            }}
            onCompleteDemo={() => {
              // Direct investor to the Pitch Summary conclusion!
              setShowPitchSummary(true);
            }}
          />
        );

      case AppScreen.Profile:
        return (
          <ProfileScreen
            userProfile={userProfile}
            onBack={() => {
              setCurrentScreen(AppScreen.Suggestions);
            }}
          />
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center p-6 bg-zinc-900 text-stone-100">
            <span className="text-xs font-mono font-bold">Unrecognized applet viewport.</span>
          </div>
        );
    }
  };

  return (
    <PhoneFrame>
      {renderActiveScreen()}
    </PhoneFrame>
  );
}
