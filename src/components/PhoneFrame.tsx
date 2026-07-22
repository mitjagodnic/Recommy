/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateSimulatedTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateSimulatedTime();
    const interval = setInterval(updateSimulatedTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#03050A] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-red-500/30 selection:text-white overflow-x-hidden relative">
      
      {/* Immersive Master Background Glow Filters */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Outer master container with gap split panel for desktop view */}
      <div className="flex w-full max-w-5xl items-center justify-center gap-12 lg:gap-16 flex-col md:flex-row z-10">
        
        {/* Left Side: Mobile Device Emulator Mockup */}
        <div className="w-full max-w-[360px] h-[780px] bg-[#111111] rounded-[52px] p-2.5 relative flex-shrink-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-300">
          
          {/* Physical Speaker Notch Slot */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full absolute right-4" />
          </div>

          {/* Screen Port */}
          <div className="relative w-full h-full bg-[#0A0D14] rounded-[44px] overflow-hidden flex flex-col">
            
            {/* Top Status Bar Grid */}
            <div className="h-10 w-full pt-3 px-6 flex items-center justify-between pointer-events-none z-40 bg-black/40 backdrop-blur-md text-zinc-300 text-[10px] font-semibold tracking-tight">
              <span>{time}</span>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span>📶</span>
                <span className="text-[7.5px] font-mono font-bold text-zinc-400">5G</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Actual Screen Payload */}
            <div id="phone-screen-payload" className="flex-1 flex flex-col h-[calc(100%-40px)] overflow-hidden relative bg-[#0A0D14]">
              {children}
            </div>

            {/* Simulated iOS Drag indicator */}
            <div className="h-3 w-full flex items-center justify-center bg-[#05070B] pb-1 z-40 pointer-events-none">
              <div className="w-20 h-1 bg-zinc-800 rounded-full" />
            </div>

          </div>

          {/* Physical Side controls buttons visual accents */}
          <div className="absolute left-[0px] top-[120px] w-[2px] h-[40px] bg-zinc-800 rounded-l-sm" />
          <div className="absolute left-[0px] top-[170px] w-[2px] h-[30px] bg-zinc-800 rounded-l-sm" />
          <div className="absolute right-[0px] top-[150px] w-[2px] h-[50px] bg-zinc-800 rounded-r-sm" />
        </div>

        {/* Right Side: Typographic Investor pitch context description - Hidden on Mobile */}
        <div className="flex-grow hidden md:flex flex-col justify-center py-8 pr-4 text-white">
          <div className="space-y-6">
            
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase font-black bg-red-500/10 px-3 py-1 rounded-full w-max inline-block">
                📢 Recommy Design System Active
              </span>
              <h2 className="text-white text-4xl font-black leading-tight uppercase tracking-tighter">
                The Progressive <br/>
                <span className="text-red-500">Reveal</span>
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-sm font-medium pt-1">
                A mindful recommended-matching experience designed for depth and high intent. We match lifestyle moodboards to prioritize shared characters and live routines.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 max-w-sm">
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-black font-mono shadow-md">01</div>
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">📁 Background-First Suggesters</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">Profiles start entirely based on professions, routines, and neighborhoods. No face cards deck.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0 text-xs font-black font-mono">02</div>
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">🤝 Mutual Intent Match</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">First names and lookbooks unlock dynamically only when both candidates confirm mutual aesthetic interest.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-black font-mono">03</div>
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">🔒 Vetted Photo Consent</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">Original portraits remain locked abstract designs until mutual trust is established during chat.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-4 max-w-sm">
              <div className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em] font-bold">📂 INVESTOR DEMO V1.3</div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] text-zinc-300 font-bold tracking-tight">🚀 PROTOTYPE READY</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
