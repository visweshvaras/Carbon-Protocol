'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  LogOut, 
  LogIn, 
  Heart,
  User,
  Compass,
  Zap,
  Terminal,
  ArrowDown,
  Volume2,
  VolumeX,
  Tv,
  Users,
  Sliders
} from 'lucide-react';
import { mockDb, UserState, UserAction } from '@/lib/supabase';
import { sounds } from '@/lib/sounds';
import DashboardLandscape from '@/components/DashboardLandscape';
import VisualNovelBox from '@/components/VisualNovelBox';
import AnimeParallax from '@/components/AnimeParallax';

// Dynamically load pure WebGL/Three.js Earth component to prevent app router hydration warnings
const ThreeEarth = dynamic(() => import('@/components/ThreeEarth'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 font-mono text-xs">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400 mb-3"></div>
      DYN_SIM: CONNECTING ORBITAL LINK...
    </div>
  ),
});

// The expanded scrollytelling characters and storyline briefing steps (9 chapters for 8 characters)
const scrollyDialogues = [
  {
    title: "L.01: THE CARBON SIGNATURE",
    speaker: "Eco-Chan",
    character: "eco" as const,
    expression: "neutral",
    text: "Greetings, Pilot! I am Eco-Chan, your G.A.I.A. flight operations assistant. A carbon footprint is the total volume of greenhouse gases—mainly Carbon Dioxide (CO2) and Methane (CH4)—released by our actions, measured in CO2 equivalents (CO2e). Scroll down to explore our atmosphere."
  },
  {
    title: "L.02: SCOPE 1 - DIRECT COMBUSTION",
    speaker: "Commander Ray",
    character: "ray" as const,
    expression: "neutral",
    text: "Attention, Recruit! Commander Ray here. Scope 1 covers Direct emissions. This is carbon you burn yourself: vehicle tailpipe exhausts, gas stoves, or industrial factory furnaces. It represents your immediate, physical fuel footprint on our atmosphere!"
  },
  {
    title: "L.03: SCOPE 2 - UTILITY POWER GRIDS",
    speaker: "Solar-Senpai",
    character: "solar" as const,
    expression: "happy",
    text: "Yoohoo, Pilot! Solar-Senpai is in the grid! Scope 2 tracks Indirect emissions from purchased energy. Whenever you run AC units or charge devices, power is drawn from grid substations. Switching grids to clean solar arrays keeps our utility load clean!"
  },
  {
    title: "L.04: SCOPE 2 - WIND HARVESTING",
    speaker: "Aero-Kun",
    character: "aero" as const,
    expression: "happy",
    text: "Aero-Kun reporting for duty, Pilot! Wind energy is another critical part of Scope 2 power! Spinning massive offshore wind turbines routes clean kinetic energy into local utilities, avoiding coal combustion completely!"
  },
  {
    title: "L.05: SCOPE 2 - BASE-LOAD ATOMIC POWER",
    speaker: "Uranium-Onee-san",
    character: "uranium" as const,
    expression: "neutral",
    text: "Welcome, Pilot. Uranium-Onee-san here. Intermittent wind and solar need clean base-load support. Safe, modern nuclear reactors provide continuous, carbon-free electricity to balance grid fluctuations when the sun sets or wind drops!"
  },
  {
    title: "L.06: SCOPE 3 - LIFECYCLE VALUE CHAINS",
    speaker: "Trash-Goblin",
    character: "goblin" as const,
    expression: "mischievous",
    text: "Hehehe, crackle pop! Trash-Goblin's scope is massive! Scope 3 covers Value Chain emissions—everything you buy, consume, and discard. From plastic processing and container shipping to food waste rotting in local landfills. Nothing escapes my pile!"
  },
  {
    title: "L.07: SCOPE 3 - HYDROGEN SHIPPERS",
    speaker: "H2-Senpai",
    character: "hydrogen" as const,
    expression: "happy",
    text: "Pressurizing tanks, Pilot! H2-Senpai reporting! Heavy shipping, steel production, and aviation are hard to electrify. Green hydrogen fuel cells offer zero-emission transport logistics, discharging only pure water vapor!"
  },
  {
    title: "L.08: REGIONAL GRIDS & THERMAL TRAPS",
    speaker: "H2O-Chan",
    character: "nymph" as const,
    expression: "concerned",
    text: "W-warning, Pilot... H2O-Chan reporting. India faces a severe AC feedback loop. Intense heatwaves surge cooling demand, which overloads coal-powered energy grids, releasing more carbon and trapping more heat. Acid rain is acidifying our rivers!"
  },
  {
    title: "L.09: BIOLOGICAL SINKS & SOIL OFFSET",
    speaker: "Biomass-Obaasan",
    character: "biomass" as const,
    expression: "happy",
    text: "Greetings, little one. Biomass-Obaasan here. Scope 4 is about offset recoveries. Mature forest soils and plants act as biological carbon sinks, absorbing greenhouse elements from the sky. Organic composting and planting trees nurture this natural ledger!"
  },
  {
    title: "L.10: THE THERMAL RETENTION SHIELD",
    speaker: "Carbon-Daemon",
    character: "daemon" as const,
    expression: "evil",
    text: "Gyahahaha! Keep consuming, frail carbon-based lifeforms! As carbon accumulates, it expands my Thermal Retention Shield, trapping the Sun's infrared radiation like a heavy greenhouse blanket. There is no escape from my rising global furnace!"
  },
  {
    title: "L.11: SYNCHRONIZE COGNITIVE BRIDGE",
    speaker: "Eco-Chan",
    character: "eco" as const,
    expression: "happy",
    text: "Orbital descent finalized, Pilot! G.A.I.A. Command Core is online. To initialize your daily emission ledger, calibrate grid tracking, and calculate your local World Score, synchronize your cognitive interface below. The future is in your hands!"
  }
];

// Profile Database entries
const characterBios = [
  {
    id: "eco" as const,
    name: "Eco-Chan",
    role: "G.A.I.A. COMMAND CORE PILOT",
    status: "ACTIVE OPERATIONS",
    bio: "Your loyal simulation deck guide. Equipped with a green environmental beret and solar-leaf energy receptor, Eco-Chan helps calibrate global atmospheric levels and track daily user logs.",
    quote: "Let's synchronize command protocols and revert the footprint, Pilot!",
    color: "bg-sky-50 border-sky-400"
  },
  {
    id: "ray" as const,
    name: "Commander Ray",
    role: "SCOPE 1 DIRECT COMBUSTION CHIEF",
    status: "STANDBY FOR BRIEFING",
    bio: "Chief tactical commander overseeing direct fuels combustion, natural gas usage, coal reactors, and vehicle exhausts. Known for wearing orange heads-up command shades.",
    quote: "Calibrate direct combustion vectors! Every drop of fuel logged is a battle won.",
    color: "bg-slate-900 text-white border-slate-600"
  },
  {
    id: "solar" as const,
    name: "Solar-Senpai",
    role: "SCOPE 2 POWER GRID ENGINEER",
    status: "UTILITY SYNCHRONIZED",
    bio: "Hyper-optimistic power grid engineer wearing cyan HUD solar visor goggles. Expert in utility integration, power plants, clean solar arrays, and grid heatwaves.",
    quote: "Switch those grids to clean photovoltaic solar arrays! Let's power the planet!",
    color: "bg-amber-50 border-amber-400"
  },
  {
    id: "aero" as const,
    name: "Aero-Kun",
    role: "SCOPE 2 WIND TURBINE TACTICIAN",
    status: "WIND DYNAMICS SYNCED",
    bio: "A youthful, enthusiastic pilot with wind-turbine goggles and dynamic spiky cyan hair. Manages offshore wind power grids and air current energy routing.",
    quote: "Catch the clean wind gusts, Pilot! Power those massive offshore rotors!",
    color: "bg-cyan-50 border-cyan-400"
  },
  {
    id: "goblin" as const,
    name: "Trash-Goblin",
    role: "SCOPE 3 LANDFILL METROPOLIS MONSTER",
    status: "MONITORING LOGISTICS",
    bio: "Mischievous landfill monster sporting a crumpled aluminum can crown. Tracks secondary lifestyle consumption: plastics procurement, container shipping, and rotten landfill methane.",
    quote: "Hehehe, single-use cups! Container cargo ships! Rotting landfill piles! All mine!",
    color: "bg-emerald-950 text-white border-emerald-700"
  },
  {
    id: "nymph" as const,
    name: "H2O-Chan",
    role: "ATMOSPHERIC RAIN & MONSOON NYMPH",
    status: "SHIELD OSCILLATING",
    bio: "Water-themed nymph with concerned watery teardrop pins and blue hair. Worries deeply about monsoon imbalances, cooling grid overload heatwaves, and acid rain acidifying water bodies.",
    quote: "The... the AC units are overloading the coal grids. Acid rain is acidifying our rivers!",
    color: "bg-cyan-50 border-cyan-300"
  },
  {
    id: "biomass" as const,
    name: "Biomass-Obaasan",
    role: "SCOPE 4 BIOLOGICAL OFFSET ELDER",
    status: "ORGANIC SINKS MATURED",
    bio: "Wise biological elder wearing a lucky four-leaf clover badge. Specializes in soil carbon absorption sinks, organic composting, and afforestation offset operations.",
    quote: "Nurture the soil, little ones. Planting trees matures our biological carbon sinks.",
    color: "bg-emerald-50 border-emerald-400"
  },
  {
    id: "uranium" as const,
    name: "Uranium-Onee-san",
    role: "BASE-LOAD CLEAN REACTOR OPERATOR",
    status: "NUCLEAR CORES COOLED",
    bio: "Cool, calm base-load specialist with neon-green twin tails and a miniature cooling-tower hairpin. Oversees clean nuclear baseline grid stability operations.",
    quote: "Splitting atoms for carbon-free baseline power keeps the grid completely steady.",
    color: "bg-purple-900 text-purple-100 border-purple-400"
  },
  {
    id: "hydrogen" as const,
    name: "H2-Senpai",
    role: "SCOPE 3 CLEAN HYDROGEN FUEL LOGISTICS",
    status: "HYDROGEN CELLS PRESSUREIZED",
    bio: "Energetic logistics leader with bubble water crown and high-pressure fuel-cell goggles. Optimizes green hydrogen heavy cargo shipping and transport.",
    quote: "Pressurize the hydrogen cells! Clean cargo ships and fuel cells are ready for transport!",
    color: "bg-blue-950 text-blue-100 border-blue-400"
  },
  {
    id: "daemon" as const,
    name: "Carbon-Daemon",
    role: "ATMOSPHERIC RETENTION SHIELD VILLAIN",
    status: "THREAT LEVEL: CRITICAL",
    bio: "A menacing, gas-cloud entity that expands its thermal retention blanket as global carbon compounds pile up. Desires to turn the world into a massive, irreversible global furnace.",
    quote: "Keep consuming, frail carbon creatures! Expand my Thermal Shield and burn!",
    color: "bg-purple-950 text-white border-purple-800"
  }
];

// RPG Questionnaire parameters
const questions = [
  {
    id: 1,
    speaker: 'Eco-Chan',
    expression: 'neutral' as const,
    text: "Greetings, Pilot! Onboarding initiated. Let's calibrate structural perspectives: Who do you believe should pay the most to fix global climate change?",
    options: [
      { text: "Rich countries (bearing 150 years of historical pollution)", points: 25 },
      { text: "All countries equally (universal flat global contribution)", points: 20 },
      { text: "Biggest current emitters (China, USA, India)", points: 25 },
      { text: "Unsure / Awaiting further satellite scans", points: 15 }
    ]
  },
  {
    id: 2,
    speaker: 'Eco-Chan',
    expression: 'concerned' as const,
    text: "Calibrating database... temperatures are peaking. How are you currently managing your home cooling needs during summer peaks?",
    options: [
      { text: "AC units running constantly (high power draw)", points: 5 },
      { text: "Traditional methods (ceiling fans, clay pots, natural shade)", points: 25 },
      { text: "5-star energy efficient inverter appliances", points: 20 },
      { text: "Cannot afford AC / rely on basic ventilation", points: 15 }
    ]
  },
  {
    id: 3,
    speaker: 'Eco-Chan',
    expression: 'concerned' as const,
    text: "Grid load recorded. Speaking of power grids, what is your primary personal barrier to adopting an Electric Vehicle (EV)?",
    options: [
      { text: "Initial purchase price is too expensive upfront", points: 15 },
      { text: "Lack of public charging stations in my vicinity", points: 15 },
      { text: "The power grid is mostly coal-powered anyway", points: 20 },
      { text: "Already using an EV or planning to buy very soon", points: 25 }
    ]
  },
  {
    id: 4,
    speaker: 'Eco-Chan',
    expression: 'happy' as const,
    text: "Data linked. Last check: which carbon reduction commit are you most likely to stick to for the long term?",
    options: [
      { text: "Commuting via public transport (metro, bus) or walking", points: 25 },
      { text: "Composting food waste and reducing general landfill footprint", points: 20 },
      { text: "Eliminating single-use plastics from daily consumption", points: 20 },
      { text: "Using highly efficient appliances and LED lighting grids", points: 15 }
    ]
  }
];

// Render SVG dialogue avatars dynamically (Updated with 8 characters and support for custom expressions)
const renderCharacterAvatar = (
  char: 'eco' | 'ray' | 'daemon' | 'solar' | 'goblin' | 'nymph' | 'aero' | 'biomass' | 'uranium' | 'hydrogen', 
  expr: string
) => {
  if (char === 'eco') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-sky-200 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0 transition-transform duration-300">
        <path d="M 15 80 C 10 50 15 25 50 20 C 85 25 90 50 85 80 Z" fill="#1e3a8a" />
        <circle cx="50" cy="55" r="25" fill="#fbcfe8" stroke="#000000" strokeWidth="2.5" />
        <circle cx="24" cy="55" r="4.5" fill="#fbcfe8" stroke="#000000" strokeWidth="2.5" />
        <circle cx="76" cy="55" r="4.5" fill="#fbcfe8" stroke="#000000" strokeWidth="2.5" />

        {expr === 'happy' ? (
          <>
            <path d="M 37 53 Q 41 48 45 53" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 55 53 Q 59 48 63 53" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 35 45 Q 40 40 45 44" stroke="#000000" strokeWidth="2" fill="none" />
            <path d="M 55 44 Q 60 40 65 45" stroke="#000000" strokeWidth="2" fill="none" />
          </>
        ) : expr === 'concerned' || expr === 'sad' ? (
          <>
            <ellipse cx="40" cy="53" rx="3.5" ry="4" fill="#000000" />
            <ellipse cx="60" cy="53" rx="3.5" ry="4" fill="#000000" />
            <circle cx="41.5" cy="51.5" r="1" fill="#ffffff" />
            <circle cx="61.5" cy="51.5" r="1" fill="#ffffff" />
            <path d="M 34 46 L 44 49" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 66 46 L 56 49" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="40" cy="52" rx="4" ry="5.5" fill="#000000" />
            <ellipse cx="60" cy="52" rx="4" ry="5.5" fill="#000000" />
            <circle cx="38.5" cy="50" r="1.5" fill="#ffffff" />
            <circle cx="58.5" cy="50" r="1.5" fill="#ffffff" />
            <circle cx="41.5" cy="54" r="0.8" fill="#ffffff" />
            <circle cx="61.5" cy="54" r="0.8" fill="#ffffff" />
            <path d="M 34 45 Q 40 42 45 46" stroke="#000000" strokeWidth="2" fill="none" />
            <path d="M 55 46 Q 60 42 66 45" stroke="#000000" strokeWidth="2" fill="none" />
          </>
        )}

        <ellipse cx="33" cy="59" rx="3.5" ry="1.5" fill="#ec4899" opacity="0.6" />
        <ellipse cx="67" cy="59" rx="3.5" ry="1.5" fill="#ec4899" opacity="0.6" />

        {expr === 'happy' ? (
          <path d="M 45 61 Q 50 68 55 61 Z" fill="#ef4444" stroke="#000000" strokeWidth="2" />
        ) : expr === 'concerned' || expr === 'sad' ? (
          <path d="M 46 62 Q 50 64 54 62" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 46 61 Q 50 64 54 61" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        <path d="M 23 40 Q 35 30 50 38 Q 65 30 77 40 L 79 48 L 73 45 L 68 38 L 50 44 L 32 38 L 27 45 L 21 48 Z" fill="#1e3b8b" stroke="#000000" strokeWidth="2" />
        <path d="M 22 35 C 22 15 78 15 78 35 Z" fill="#10b981" stroke="#000000" strokeWidth="2.5" />
        <ellipse cx="50" cy="18" rx="8" ry="4" fill="#047857" stroke="#000000" strokeWidth="2" />
        <path d="M 50 14 C 47 8 50 3 53 6 C 56 9 53 14 50 14 Z" fill="#4ade80" stroke="#000000" strokeWidth="1.5" />
        <path d="M 38 78 L 50 88 L 62 78 Z" fill="#ffffff" stroke="#000000" strokeWidth="2" />
        <path d="M 32 80 L 38 78 L 42 85 Z" fill="#f43f5e" stroke="#000000" strokeWidth="2" />
        <path d="M 68 80 L 62 78 L 58 85 Z" fill="#f43f5e" stroke="#000000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'ray') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-slate-800 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <path d="M 15 75 C 10 40 25 15 50 15 Z" fill="#64748b" />
        <circle cx="50" cy="55" r="24" fill="#ffedd5" stroke="#000" strokeWidth="2.5" />
        <path d="M 38 70 Q 50 78 62 70 Q 50 66 38 70 Z" fill="#cbd5e1" stroke="#000" strokeWidth="1.5" />
        <rect x="26" y="44" width="48" height="13" rx="2.5" fill="#f97316" stroke="#000" strokeWidth="2.5" />
        <line x1="28" y1="50" x2="72" y2="50" stroke="#ffedd5" strokeWidth="1" strokeDasharray="2 2" />
        {expr === 'concerned' || expr === 'sad' ? (
          <path d="M 44 63 Q 50 69 56 63 Z" fill="#000000" stroke="#000000" strokeWidth="2" />
        ) : (
          <line x1="44" y1="64" x2="56" y2="64" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        )}
        <polygon points="15,31 50,14 85,31 77,37 23,37" fill="#1e293b" stroke="#000000" strokeWidth="2.5" />
        <rect x="23" y="32" width="54" height="5" fill="#facc15" stroke="#000" strokeWidth="1.5" />
        <circle cx="50" cy="26" r="4.5" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
        <path d="M 38 78 L 50 88 L 62 78 Z" fill="#1e293b" stroke="#000000" strokeWidth="2" />
        <rect x="22" y="76" width="12" height="6" fill="#facc15" stroke="#000" strokeWidth="1.5" />
        <rect x="66" y="76" width="12" height="6" fill="#facc15" stroke="#000" strokeWidth="1.5" />
      </svg>
    );
  } else if (char === 'solar') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-amber-50 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <path d="M 12 70 L 22 25 L 35 35 L 50 15 L 65 35 L 78 25 L 88 70 Z" fill="#eab308" stroke="#000" strokeWidth="2.5" />
        <circle cx="50" cy="55" r="23" fill="#ffedd5" stroke="#000" strokeWidth="2.5" />
        <polygon points="25,44 75,44 70,55 30,55" fill="#0ea5e9" stroke="#000" strokeWidth="2.5" />
        <line x1="30" y1="49" x2="70" y2="49" stroke="#fff" strokeWidth="1.5" />
        {expr === 'concerned' || expr === 'sad' ? (
          <line x1="42" y1="65" x2="58" y2="65" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <path d="M 42 63 Q 50 71 58 63" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        <path d="M 36 78 L 50 89 L 64 78 Z" fill="#f8fafc" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'aero') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-cyan-100 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <path d="M 10 70 L 15 25 L 30 35 L 50 15 L 70 35 L 85 25 L 90 70 Z" fill="#06b6d4" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="55" r="22" fill="#ffedd5" stroke="#000" strokeWidth="2" />
        <rect x="34" y="36" width="32" height="10" rx="2.5" fill="#eab308" stroke="#000" strokeWidth="1.5" />
        <circle cx="42" cy="41" r="2" fill="#fff" />
        <circle cx="58" cy="41" r="2" fill="#fff" />
        {expr === 'happy' ? (
          <>
            <path d="M 38 52 Q 42 48 46 52" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 54 52 Q 58 48 62 52" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 44 61 Q 50 68 56 61 Z" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <ellipse cx="42" cy="51" rx="2.5" ry="3.5" fill="#000" />
            <ellipse cx="58" cy="51" rx="2.5" ry="3.5" fill="#000" />
            <path d="M 45 62 Q 50 65 55 62" stroke="#000" strokeWidth="2" fill="none" />
          </>
        )}
        <path d="M 36 77 L 50 88 L 64 77 Z" fill="#0891b2" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'goblin') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-emerald-950 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <polygon points="20,50 5,30 24,42" fill="#22c55e" stroke="#000" strokeWidth="2" />
        <polygon points="80,50 95,30 76,42" fill="#22c55e" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="56" r="24" fill="#22c55e" stroke="#000" strokeWidth="2.5" />
        <circle cx="36" cy="50" r="6" fill="#eab308" stroke="#000" strokeWidth="2" />
        <circle cx="34" cy="48" r="1.5" fill="#000" />
        <circle cx="64" cy="50" r="6" fill="#eab308" stroke="#000" strokeWidth="2" />
        <circle cx="62" cy="48" r="1.5" fill="#000" />
        {expr === 'concerned' || expr === 'sad' ? (
          <path d="M 38 67 Q 50 60 62 67" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <>
            <path d="M 38 65 Q 50 74 62 65 Z" fill="#15803d" stroke="#000" strokeWidth="2" />
            <polygon points="46,67 50,71 54,67" fill="#fff" />
          </>
        )}
        <rect x="36" y="24" width="28" height="12" fill="#cbd5e1" stroke="#000" strokeWidth="2" />
        <polygon points="36,24 43,15 50,24 57,15 64,24" fill="#cbd5e1" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'nymph') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-cyan-100 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <path d="M 16 80 C 10 40 20 20 50 20 C 80 20 90 40 84 80 Z" fill="#06b6d4" />
        <circle cx="50" cy="55" r="23" fill="#ffedd5" stroke="#000" strokeWidth="2.5" />
        <circle cx="28" cy="38" r="3" fill="#e0f2fe" stroke="#000" strokeWidth="1.5" />
        <circle cx="72" cy="38" r="3" fill="#e0f2fe" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="38" cy="51" rx="4" ry="5.5" fill="#0c4a6e" stroke="#000" strokeWidth="1.5" />
        <circle cx="36" cy="49" r="1.5" fill="#fff" />
        <circle cx="39" cy="53" r="0.8" fill="#fff" />
        <ellipse cx="62" cy="51" rx="4" ry="5.5" fill="#0c4a6e" stroke="#000" strokeWidth="1.5" />
        <circle cx="60" cy="49" r="1.5" fill="#fff" />
        <circle cx="63" cy="53" r="0.8" fill="#fff" />
        
        {expr === 'happy' ? (
          <>
            <path d="M 32 46 Q 38 42 42 46" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 68 46 Q 62 42 58 46" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 44 62 Q 50 67 56 62" stroke="#000" strokeWidth="2" fill="none" />
          </>
        ) : (
          <>
            <path d="M 32 44 Q 38 46 42 42" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 68 44 Q 62 46 58 42" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M 38 58 L 36 64 C 33 64 33 60 36 58" fill="#38bdf8" />
            <path d="M 46 63 Q 50 61 54 63 Q 50 65 46 63" stroke="#000" strokeWidth="2" fill="none" />
          </>
        )}
        <path d="M 27 40 Q 50 34 73 40 L 75 46 L 62 43 L 50 48 L 38 43 Z" fill="#06b6d4" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'biomass') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-emerald-50 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <circle cx="-14" cy="-14" r="8" fill="#15803d" stroke="#000" strokeWidth="2" transform="translate(50,55)" />
        <circle cx="14" cy="-14" r="8" fill="#15803d" stroke="#000" strokeWidth="2" transform="translate(50,55)" />
        <circle cx="50" cy="55" r="22" fill="#ffedd5" stroke="#000" strokeWidth="2.5" />
        <circle cx="42" cy="50" r="5" fill="none" stroke="#eab308" strokeWidth="2.2" />
        <circle cx="58" cy="50" r="5" fill="none" stroke="#eab308" strokeWidth="2.2" />
        <line x1="47" y1="50" x2="53" y2="50" stroke="#eab308" strokeWidth="2" />
        {expr === 'concerned' ? (
          <>
            <ellipse cx="42" cy="50" rx="1.5" fill="#000" />
            <ellipse cx="58" cy="50" rx="1.5" fill="#000" />
            <path d="M 46 65 Q 50 62 54 65" stroke="#000" strokeWidth="2" fill="none" />
          </>
        ) : (
          <>
            <path d="M 40 50 L 44 50" stroke="#000" strokeWidth="1.5" />
            <path d="M 56 50 L 60 50" stroke="#000" strokeWidth="1.5" />
            <path d="M 44 61 Q 50 66 56 61" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
        <path d="M 36 77 L 50 88 L 64 77 Z" fill="#166534" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'uranium') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-purple-900 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <path d="M 12 70 L 5 35 L 20 40 Z" fill="#22c55e" stroke="#000" strokeWidth="2" />
        <path d="M 88 70 L 95 35 L 80 40 Z" fill="#22c55e" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="55" r="23" fill="#ffedd5" stroke="#000" strokeWidth="2.5" />
        <path d="M 23 45 C 23 20 77 20 77 45 Z" fill="#22c55e" stroke="#000" strokeWidth="2" />
        <polygon points="20,20 28,20 26,32 22,32" fill="#a1a1aa" stroke="#000" strokeWidth="1.5" />
        <line x1="20" y1="26" x2="28" y2="26" stroke="#ef4444" strokeWidth="1.5" />
        
        <ellipse cx="40" cy="52" rx="3" ry="5" fill="#000" />
        <ellipse cx="60" cy="52" rx="3" ry="5" fill="#000" />
        <circle cx="38.5" cy="50" r="1.2" fill="#fff" />
        <circle cx="58.5" cy="50" r="1.2" fill="#fff" />
        
        {expr === 'happy' ? (
          <path d="M 44 63 Q 50 68 56 63" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : expr === 'concerned' || expr === 'sad' ? (
          <path d="M 44 65 Q 50 62 56 65" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <line x1="44" y1="64" x2="56" y2="64" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        )}
        <path d="M 36 78 L 50 88 L 64 78 Z" fill="#1e1b4b" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else if (char === 'hydrogen') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-blue-950 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
        <path d="M 12 70 Q 10 15 50 18 Q 90 15 88 70 Z" fill="#3b82f6" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="55" r="23" fill="#ffedd5" stroke="#000" strokeWidth="2.5" />
        <rect x="28" y="42" width="44" height="11" rx="2" fill="#60a5fa" stroke="#000" strokeWidth="2" />
        <circle cx="38" cy="47" r="3.5" fill="#fff" stroke="#000" strokeWidth="1" />
        <circle cx="62" cy="47" r="3.5" fill="#fff" stroke="#000" strokeWidth="1" />
        
        {expr === 'happy' ? (
          <path d="M 43 62 Q 50 70 57 62" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : expr === 'concerned' || expr === 'sad' ? (
          <path d="M 44 65 Q 50 61 56 65" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <line x1="44" y1="63" x2="56" y2="63" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        )}
        <path d="M 36 78 L 50 88 L 64 78 Z" fill="#2563eb" stroke="#000" strokeWidth="2" />
      </svg>
    );
  } else {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-purple-950 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0 animate-pulse" style={{ animationDuration: '2s' }}>
        <defs>
          <linearGradient id="daemonSmokeGradLocal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a044e" />
            <stop offset="100%" stopColor="#701a75" />
          </linearGradient>
        </defs>
        <path d="M 20 80 Q 5 50 20 30 Q 50 10 80 30 Q 95 50 80 80 Q 50 95 20 80 Z" fill="url(#daemonSmokeGradLocal)" stroke="#701a75" strokeWidth="2.5" />
        <polygon points="-26,45 -10,49 -20,53" fill="#f43f5e" stroke="#000" strokeWidth="1.5" transform="translate(50,0)" />
        <polygon points="26,45 10,49 20,53" fill="#f43f5e" stroke="#000" strokeWidth="1.5" transform="translate(50,0)" />
        {expr === 'concerned' || expr === 'angry' ? (
          <path d="M 40 68 Q 50 58 60 68" stroke="#facc15" strokeWidth="2.5" fill="none" />
        ) : (
          <path d="M 33 63 L 38 59 L 43 63 L 48 59 L 53 63 L 58 59 L 63 63 L 68 59 L 63 67 L 58 65 L 53 67 L 48 65 L 43 67 L 38 65 Z" fill="#facc15" stroke="#000" strokeWidth="1.5" />
        )}
        <rect x="18" y="16" width="8" height="18" fill="#4a044e" stroke="#000" strokeWidth="1.5" />
        <rect x="74" y="16" width="8" height="18" fill="#4a044e" stroke="#000" strokeWidth="1.5" />
        <circle cx="22" cy="11" r="4.5" fill="#a1a1aa" opacity="0.8" />
        <circle cx="78" cy="11" r="4.5" fill="#a1a1aa" opacity="0.8" />
      </svg>
    );
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserState | null>(null);
  const [actions, setActions] = useState<UserAction[]>([]);
  
  // Custom interactive controls
  const [isMuted, setIsMuted] = useState(true);
  const [crtActive, setCrtActive] = useState(true);
  
  // Onboarding & Scrolling Navigation States
  const [scrollSection, setScrollSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  // Live Dashboard Animation States
  const [trainTrigger, setTrainTrigger] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<{ id: string; text: string; x: number; y: number }[]>([]);

  // Arcade minigame states
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [filterX, setFilterX] = useState(50);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; speed: number }[]>([]);

  // Character expressions database state
  const [charExpressions, setCharExpressions] = useState<Record<string, string>>({
    eco: 'neutral',
    ray: 'neutral',
    solar: 'happy',
    aero: 'happy',
    uranium: 'neutral',
    goblin: 'mischievous',
    hydrogen: 'happy',
    nymph: 'sad',
    biomass: 'happy',
    daemon: 'evil'
  });

  // Carbon Matrix Sandbox parameters
  const [calSolar, setCalSolar] = useState(30);
  const [calWind, setCalWind] = useState(25);
  const [calNuclear, setCalNuclear] = useState(35);
  const [calRecycle, setCalRecycle] = useState(40);
  const [calForest, setCalForest] = useState(20);
  const [calHydrogen, setCalHydrogen] = useState(30);

  // Computed sandbox metrics
  const stabilityIndex = Math.round((calSolar * 0.2) + (calWind * 0.2) + (calNuclear * 0.2) + (calRecycle * 0.15) + (calForest * 0.15) + (calHydrogen * 0.1));
  const anomalyOffset = (1.8 - (stabilityIndex / 100) * 1.5).toFixed(2);

  // Load user data on mount
  useEffect(() => {
    setMounted(true);
    const savedUser = mockDb.getUser();
    if (savedUser) {
      setUser(savedUser);
      setActions(mockDb.getActions(savedUser.id));
    }
  }, []);

  // Play boot sound once mounted & unmuted
  useEffect(() => {
    if (mounted && !isMuted) {
      sounds.boot();
    }
  }, [mounted, isMuted]);

  // Track window scroll progress for scrollytelling (mapped over 9 steps)
  useEffect(() => {
    if (!mounted || user) return;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const progress = scrollPos / (scrollHeight || 1);
      
      setScrollProgress(progress);
      
      // Interpolate 11 steps (increments of ~9.09% progress)
      if (progress < 0.09) {
        setScrollSection(0);
      } else if (progress < 0.18) {
        setScrollSection(1);
      } else if (progress < 0.27) {
        setScrollSection(2);
      } else if (progress < 0.36) {
        setScrollSection(3);
      } else if (progress < 0.45) {
        setScrollSection(4);
      } else if (progress < 0.54) {
        setScrollSection(5);
      } else if (progress < 0.63) {
        setScrollSection(6);
      } else if (progress < 0.72) {
        setScrollSection(7);
      } else if (progress < 0.81) {
        setScrollSection(8);
      } else if (progress < 0.90) {
        setScrollSection(9);
      } else {
        setScrollSection(10);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, user]);

  // Typewriter effect for scrolly dialogues
  useEffect(() => {
    if (!mounted || user) return;
    const text = scrollyDialogues[scrollSection].text;
    setTypedText('');
    let i = 0;
    
    const interval = setInterval(() => {
      setTypedText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [scrollSection, mounted, user]);

  // Grid Interceptor Arcade Loop
  useEffect(() => {
    if (!gameActive) {
      setParticles([]);
      return;
    }
    
    // Spawn particles
    const spawnInterval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * 90 + 5,
          y: 0,
          speed: Math.random() * 3 + 2.5
        }
      ]);
    }, 1000);

    // Animation physics updates
    const physicsInterval = setInterval(() => {
      setParticles(prev => {
        const remaining: typeof prev = [];
        
        for (const p of prev) {
          const nextY = p.y + p.speed;
          
          if (nextY >= 90) {
            // Check collision with shield (paddle) at y = 90
            // Paddle is centered at filterX, with width of 24% (half-width = 12)
            const isHit = Math.abs(p.x - filterX) <= 12;
            if (isHit) {
              setGameScore(s => s + 1);
              sounds.click();
            } else {
              sounds.logActionNegative();
              setUser(u => {
                if (!u) return null;
                const nextScore = Math.max(0, u.score - 1);
                const updated = { ...u, score: nextScore };
                mockDb.setUser(updated);
                return updated;
              });
            }
          } else {
            remaining.push({ ...p, y: nextY });
          }
        }
        return remaining;
      });
    }, 40);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(physicsInterval);
    };
  }, [gameActive, filterX]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400 font-mono text-sm">
        INITIALIZING G.A.I.A. COMMAND NODE...
      </div>
    );
  }

  // Initiate Onboarding directly
  const handleInitiateQuestionnaire = () => {
    sounds.click();
    const tempUser: UserState = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: 'Eco-Pilot',
      score: -1,
      created_at: new Date().toISOString()
    };
    mockDb.setUser(tempUser);
    setUser(tempUser);
  };

  // Onboarding questionnaire complete
  const handleQuestionnaireComplete = (score: number, answers: Record<string, string>) => {
    if (!user) return;
    const finalUser: UserState = {
      ...user,
      score,
      q1_answer: answers.q1,
      q2_answer: answers.q2,
      q3_answer: answers.q3,
      q4_answer: answers.q4
    };
    mockDb.setUser(finalUser);
    setUser(finalUser);
    setActions(mockDb.getActions(finalUser.id));
  };

  // Log Daily Action
  const logDailyAction = (actionName: string, pointsChange: number, desc: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;

    if (pointsChange >= 0) {
      sounds.logActionPositive();
    } else {
      sounds.logActionNegative();
    }

    if (actionName === 'Took Metro') {
      setTrainTrigger(true);
    }

    // Floating text indicator
    const rect = e.currentTarget.getBoundingClientRect();
    const floatingId = Math.random().toString(36).substring(2, 9);
    const sign = pointsChange >= 0 ? '+' : '';
    setFloatingTexts(prev => [
      ...prev,
      { 
        id: floatingId, 
        text: `${sign}${pointsChange} Eco HP`, 
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top - 20 + window.scrollY
      }
    ]);

    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== floatingId));
    }, 1500);

    // Save action
    mockDb.addAction({
      user_id: user.id,
      action_type: actionName,
      score_change: pointsChange,
      description: desc
    });

    const updatedUser = mockDb.getUser();
    if (updatedUser) {
      setUser(updatedUser);
      setActions(mockDb.getActions(updatedUser.id));
    }
  };

  // Clear data / Reset simulation
  const handleDisconnect = () => {
    sounds.click();
    mockDb.clearUser();
    setUser(null);
    setActions([]);
    setScrollSection(0);
    setScrollProgress(0);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const toggleSoundMute = () => {
    const isNowMuted = sounds.toggleMute();
    setIsMuted(isNowMuted);
    if (!isNowMuted) {
      sounds.click();
    }
  };

  const updateCharacterExpression = (charId: string, newExpr: string) => {
    sounds.click();
    setCharExpressions(prev => ({
      ...prev,
      [charId]: newExpr
    }));
  };

  const altitudeVal = Math.max(0, Math.round(1000 - Math.min(1, scrollProgress / 0.8) * 1000));
  const ppmVal = Math.min(420, Math.round(280 + scrollProgress * 140));
  const anomalyVal = (scrollProgress * 1.2).toFixed(2);

  return (
    <div className="relative min-h-screen text-slate-900 bg-[#faf9f6] overflow-x-hidden font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Vintage CRT scanline overlay toggle */}
      {crtActive && (
        <div className="fixed inset-0 pointer-events-none crt-glow scanlines opacity-[0.04] z-50 bg-emerald-500/5" />
      )}

      {/* Dynamic points floating popups */}
      <AnimatePresence>
        {floatingTexts.map(text => (
          <motion.div
            key={text.id}
            initial={{ opacity: 1, y: text.y, scale: 0.8 }}
            animate={{ opacity: 0, y: text.y - 80, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ left: text.x - 40 }}
            className={`absolute z-50 font-mono font-extrabold text-xs border-2 border-black px-2 py-1 rounded bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)] pointer-events-none
              ${text.text.includes('-') ? 'text-rose-400 border-rose-950' : 'text-emerald-400 border-emerald-950'}
            `}
          >
            {text.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {!user ? (
        /* ==================== EDITORIAL JAPANESE RECRUIT-STYLE LANDING PAGE ==================== */
        <div className="w-full">
          
          {/* Header Bar */}
          <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm border-b-4 border-black px-6 py-4 flex items-center justify-between z-40">
            <div className="flex items-center gap-2 font-mono font-black text-sm tracking-wider text-slate-950">
              <span className="bg-slate-950 text-white px-2 py-1 rounded">G.A.I.A.</span>
              <span className="hidden sm:inline">CARBON PROTOCOL</span>
            </div>
            
            {/* Nav Menu */}
            <nav className="hidden lg:flex items-center gap-6 font-mono font-bold text-xs text-slate-900">
              <a href="#about" onMouseEnter={() => sounds.hover()} className="hover:underline">ABOUT</a>
              <a href="#metrics" onMouseEnter={() => sounds.hover()} className="hover:underline">METRICS</a>
              <a href="#scopes" onMouseEnter={() => sounds.hover()} className="hover:underline">SCOPES</a>
              <a href="#archives" onMouseEnter={() => sounds.hover()} className="hover:underline font-bold text-sky-600">👤 ARCHIVES</a>
              <a href="#sandbox" onMouseEnter={() => sounds.hover()} className="hover:underline font-bold text-emerald-600">🎛️ SANDBOX</a>
              <a href="#briefings" onMouseEnter={() => sounds.hover()} className="hover:underline font-bold text-yellow-600">★ BRIEFINGS</a>
            </nav>

            {/* Utility Toggles & Action */}
            <div className="flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                onClick={toggleSoundMute}
                className="p-2 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-slate-100 hover:bg-slate-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                title={isMuted ? "Unmute Retro Synth Sounds" : "Mute Sounds"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-600" /> : <Volume2 className="w-4 h-4 text-emerald-600 animate-bounce" />}
              </button>

              {/* CRT Toggle */}
              <button
                onClick={() => { sounds.click(); setCrtActive(!crtActive); }}
                className={`p-2 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-slate-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all
                  ${crtActive ? 'bg-emerald-100' : 'bg-slate-100'}
                `}
                title="Toggle CRT Screen Glow Effect"
              >
                <Tv className={`w-4 h-4 ${crtActive ? 'text-emerald-700 font-bold' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={handleInitiateQuestionnaire}
                onMouseEnter={() => sounds.hover()}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black rounded text-xs font-bold font-mono tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                START ENTRY
              </button>
            </div>
          </header>

          {/* Section 1: Hero Section */}
          <section className="h-[calc(100vh-76px)] relative bg-slate-950 text-white flex flex-col justify-center overflow-hidden border-b-4 border-black">
            
            {/* Background looping marquee in reverse directions */}
            <div className="absolute inset-x-0 top-1/4 -rotate-3 overflow-hidden pointer-events-none opacity-10">
              <div className="animate-marquee-left text-[6vw] font-black tracking-tighter whitespace-nowrap text-white/50">
                REVERT THE FOOTPRINT. POWER THE PLANET. REVERT THE FOOTPRINT. POWER THE PLANET.&nbsp;
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-1/4 rotate-3 overflow-hidden pointer-events-none opacity-10">
              <div className="animate-marquee-right text-[6vw] font-black tracking-tighter whitespace-nowrap text-white/50">
                REVERT THE FOOTPRINT. POWER THE PLANET. REVERT THE FOOTPRINT. POWER THE PLANET.&nbsp;
              </div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Slogan details */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="font-mono text-xs font-bold text-yellow-400 tracking-widest flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping"></span>
                  G.A.I.A. SIMULATION CORE V.02
                </div>
                <h1 className="text-4xl sm:text-6xl font-black leading-none tracking-tight font-sans text-retro-shadow">
                  POWER YOUR PLANET.<br />
                  REVERT THE FOOTPRINT.
                </h1>
                <p className="text-sm md:text-base font-semibold font-sans text-slate-300 max-w-xl leading-relaxed">
                  Every lifestyle output is logged. Calibrate atmospheric stability grids, sync direct and indirect scopes, and meet the command crew database below.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href="#about"
                    onMouseEnter={() => sounds.hover()}
                    onClick={() => sounds.click()}
                    className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-xs border-2 border-black rounded shadow-[4px_4px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                  >
                    LEARN THE LEDGER
                  </a>
                  <button
                    onClick={handleInitiateQuestionnaire}
                    onMouseEnter={() => sounds.hover()}
                    className="px-6 py-3 bg-transparent hover:bg-white/10 text-white font-mono font-bold text-xs border-2 border-white rounded transition-all"
                  >
                    START ENTRY
                  </button>
                </div>
              </div>

              {/* Circular Earth Viewport */}
              <div className="lg:col-span-5 hidden lg:flex justify-center">
                <div className="w-[320px] h-[320px] rounded-full border-4 border-white overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] bg-slate-900 relative">
                  <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
                  <ThreeEarth />
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs font-mono tracking-widest text-slate-500 animate-bounce">
              SCROLL DOWN
              <ArrowDown className="w-4 h-4 mx-auto mt-1" />
            </div>
          </section>

          {/* Section 2: ABOUT */}
          <section id="about" className="py-20 border-b-4 border-black bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-4 border-l-4 border-black pl-4">
                  <h2 className="text-sm font-black text-slate-400 font-mono tracking-widest uppercase">ABOUT</h2>
                  <h3 className="text-2xl font-black text-slate-950 font-sans tracking-tight mt-1">
                    G.A.I.A. EMISSION BRIEF
                  </h3>
                  <div className="text-[10px] font-mono text-slate-500 font-bold uppercase mt-2">
                    ESTD.2026 // EMISSION SYSTEM CONTEXT
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed font-sans mb-8">
                    Our carbon footprint consists of all greenhouse gases (predominantly Carbon Dioxide and Methane) released by household utilities, industrial operations, and lifecycle value chains. G.A.I.A. maps this ecological ledger to help users mitigate outputs and stabilize global climate grids.
                  </p>

                  {/* Character dialogue card */}
                  <div className="border-4 border-black p-5 bg-slate-900 rounded-lg text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] flex gap-4 items-start relative overflow-hidden">
                    <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
                    
                    {renderCharacterAvatar('eco', 'neutral')}
                    
                    <div>
                      <div className="font-mono text-[9px] text-yellow-400 font-bold tracking-widest uppercase">OPERATIONS BRIEF</div>
                      <h4 className="font-mono text-xs font-extrabold text-white mt-0.5">Eco-Chan</h4>
                      <p className="font-mono text-xs text-slate-300 leading-relaxed mt-2">
                        {'Welcome to G.A.I.A. Command Station, Pilot! We have configured this visual landing console exactly in our bold, high-contrast Gifu corporate recruitment design style. Explore our atmospheric statistics and learning sections as you scroll.'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 3: METRICS */}
          <section id="metrics" className="py-20 border-b-4 border-black bg-slate-950 text-white relative">
            <div className="container mx-auto px-6">
              
              <div className="mb-10 text-center">
                <h2 className="text-xs font-bold text-yellow-400 tracking-widest uppercase">TELEMETRY</h2>
                <h3 className="text-3xl font-black font-sans mt-1">ATMOSPHERIC NUMBERS</h3>
              </div>

              {/* Statistics Grid Panel */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {[
                  { label: "CO2 Saturation", val: "420 PPM", color: "text-white", desc: "Greenhouse particles saturation index in our air column." },
                  { label: "Heat Anomaly", val: "+1.20°C", color: "text-rose-500", desc: "Global surface average peak temperature anomaly deviation." },
                  { label: "Remaining Budget", val: "110 Mos", color: "text-yellow-500", desc: "Critical global window left before breaching thermal threshold." },
                  { label: "India Peak AC Load", val: "10 Hrs/D", color: "text-white", desc: "Summer cooling grid demand duration accelerating feedback loops." },
                  { label: "Offset Cases", val: "1200+", color: "text-white", desc: "Clean afforestation offset operations logged by active pilots." },
                  { label: "Annual Quota", val: "36 Tons", color: "text-white", desc: "Maximum target carbon ceiling allowance per household unit." },
                  { label: "Emissions Ratio", val: "6 : 4", color: "text-white", desc: "Ratio comparing indirect lifecycle value chains to direct fuels." },
                  { label: "Reactor Status", val: "100 HP", color: "text-emerald-400", desc: "Optimal core atmospheric safety starting baseline HP levels." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="border-4 border-black p-6 bg-slate-900 rounded shadow-[4px_4px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between hover:border-yellow-400 hover:scale-[1.02] transition-all"
                  >
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</span>
                    <div className={`my-4 font-black font-sans text-3xl sm:text-4xl ${item.color}`}>{item.val}</div>
                    <p className="text-[9px] text-slate-400 leading-tight">{item.desc}</p>
                  </motion.div>
                ))}

              </div>

            </div>
          </section>

          {/* Section 4: SCOPES */}
          <section id="scopes" className="py-20 border-b-4 border-black bg-white">
            <div className="container mx-auto px-6">
              
              <div className="mb-12 border-l-4 border-black pl-4">
                <h2 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">CLASSIFICATIONS</h2>
                <h3 className="text-2xl font-black font-sans tracking-tight mt-1">EMISSION SCOPES</h3>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {[
                  { id: "01", name: "Scope 1: Direct", desc: "Direct greenhouse gas emissions released by sources owned or controlled by you (e.g. burning gas in heating furnaces or operating vehicle exhausts).", status: "OBSERVING", bg: "bg-[#faf9f6]" },
                  { id: "02", name: "Scope 2: Utility", desc: "Indirect emissions tracking purchased utilities and grid electricity consumption. Includes home appliances, wind turbine load, and solar subgrids.", status: "OBSERVING", bg: "bg-[#faf9f6]" },
                  { id: "03", name: "Scope 3: Lifecycle", desc: "Value chain emissions tracking everything you procure, consume, and discard. From manufacturing processing to logistics transport and landfill decomposition.", status: "OBSERVING", bg: "bg-[#faf9f6]" },
                  { id: "04", name: "Offset: Revert", desc: "Emissions recovery through clean activities. Logging zero-emission transit modes, organic compost sinks, and reforestation to restore core safety.", status: "INTEGRATED", bg: "bg-yellow-400" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`border-4 border-black p-5 ${item.bg} rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col justify-between h-[280px]`}
                  >
                    <div>
                      <span className="font-mono text-slate-400 font-bold text-lg">{item.id}</span>
                      <h4 className="font-sans font-black text-lg text-slate-950 mt-1 uppercase tracking-tight">{item.name}</h4>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed mt-3">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 border-t border-slate-350 pt-3">
                      <span className="text-[10px] font-mono font-black text-slate-500">{`STATUS: ${item.status}`}</span>
                    </div>
                  </motion.div>
                ))}

              </div>

            </div>
          </section>

          {/* ==================== SECTION 5: CHARACTER DATABASE / PROFILE ARCHIVES ==================== */}
          <section id="archives" className="py-20 border-b-4 border-black bg-sky-100/30">
            <div className="container mx-auto px-6">
              
              <div className="mb-12 border-l-4 border-black pl-4">
                <h2 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-600" />
                  DATABASE CONSOLE
                </h2>
                <h3 className="text-2xl font-black font-sans tracking-tight mt-1">CHARACTER DECK ARCHIVES</h3>
              </div>

              {/* Cards layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {characterBios.map((char) => (
                  <div 
                    key={char.id}
                    className={`border-4 border-black p-5 bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all duration-150 hover:scale-[1.01]`}
                  >
                    <div>
                      {/* Interactive Avatar Container */}
                      <div className="flex justify-center mb-4 relative p-3 bg-slate-50 rounded border-2 border-black">
                        {renderCharacterAvatar(char.id, charExpressions[char.id])}
                        
                        <div className="absolute top-2 right-2 bg-black text-yellow-400 border border-black text-[7px] font-mono font-bold px-1 py-0.5 rounded uppercase">
                          {charExpressions[char.id]}
                        </div>
                      </div>

                      <div className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                        {char.role}
                      </div>
                      
                      <h4 className="font-sans font-black text-lg text-slate-950 mt-1 uppercase tracking-tight">
                        {char.name}
                      </h4>

                      <span className="inline-block text-[8px] font-mono font-bold bg-slate-100 border border-black rounded px-1.5 py-0.5 mt-2 text-slate-800">
                        {char.status}
                      </span>

                      <p className="text-xs text-slate-700 font-medium leading-relaxed mt-3 italic">
                        {`"${char.quote}"`}
                      </p>

                      <p className="text-[11px] text-slate-600 leading-normal mt-2">
                        {char.bio}
                      </p>
                    </div>

                    {/* Expression toggle buttons */}
                    <div className="border-t border-slate-200 mt-4 pt-3">
                      <div className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        MOD_EXPRESSION:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {char.id === 'daemon' ? (
                          <>
                            <button
                              onClick={() => updateCharacterExpression('daemon', 'evil')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions.daemon === 'evil' ? 'bg-purple-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              EVIL
                            </button>
                            <button
                              onClick={() => updateCharacterExpression('daemon', 'angry')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions.daemon === 'angry' ? 'bg-rose-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              ANGRY
                            </button>
                          </>
                        ) : char.id === 'goblin' ? (
                          <>
                            <button
                              onClick={() => updateCharacterExpression('goblin', 'mischievous')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions.goblin === 'mischievous' ? 'bg-emerald-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              GRIN
                            </button>
                            <button
                              onClick={() => updateCharacterExpression('goblin', 'concerned')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions.goblin === 'concerned' ? 'bg-amber-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              SAD
                            </button>
                          </>
                        ) : char.id === 'nymph' ? (
                          <>
                            <button
                              onClick={() => updateCharacterExpression('nymph', 'sad')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions.nymph === 'sad' ? 'bg-cyan-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              CRYING
                            </button>
                            <button
                              onClick={() => updateCharacterExpression('nymph', 'happy')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions.nymph === 'happy' ? 'bg-sky-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              HAPPY
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => updateCharacterExpression(char.id, 'happy')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions[char.id] === 'happy' ? 'bg-emerald-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              HAPPY
                            </button>
                            <button
                              onClick={() => updateCharacterExpression(char.id, 'concerned')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions[char.id] === 'concerned' ? 'bg-amber-600 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              WORRIED
                            </button>
                            <button
                              onClick={() => updateCharacterExpression(char.id, 'neutral')}
                              className={`px-1.5 py-1 text-[8px] font-mono border rounded ${charExpressions[char.id] === 'neutral' ? 'bg-slate-800 text-white border-black font-bold' : 'bg-slate-50 hover:bg-slate-100 border-slate-300'}`}
                            >
                              PLAIN
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ==================== SECTION 6: CARBON CALIBRATION MATRIX MINIGAME ==================== */}
          <section id="sandbox" className="py-20 border-b-4 border-black bg-white">
            <div className="container mx-auto px-6">
              
              <div className="mb-12 border-l-4 border-black pl-4">
                <h2 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  INTERACTIVE LAB
                </h2>
                <h3 className="text-2xl font-black font-sans tracking-tight mt-1">CARBON GRID CALIBRATION MATRIX</h3>
              </div>

              {/* Grid Layout Sandbox */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Sliders Console */}
                <div className="lg:col-span-7 border-4 border-black p-6 bg-slate-900 rounded-lg text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono font-bold text-xs text-yellow-400 tracking-wider mb-6 flex items-center justify-between border-b border-slate-800 pb-2">
                      <span>🎛️ SIMULATION CONTROLS</span>
                      <span className="text-[10px] text-slate-500 font-normal">LEDGER RUNTIME</span>
                    </h4>

                    <div className="space-y-6">
                      {/* Slider 1: Solar */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="font-bold text-amber-400">☀️ SOLAR GRID INFRASTRUCTURE</span>
                          <span>{calSolar}% Power Ratio</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={calSolar}
                          onChange={(e) => { sounds.hover(); setCalSolar(Number(e.target.value)); }}
                          className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 border border-slate-700 rounded"
                        />
                      </div>

                      {/* Slider 2: Wind */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="font-bold text-cyan-400">💨 WIND TURBINES DEPLOYMENT</span>
                          <span>{calWind}% Clean Wind</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={calWind}
                          onChange={(e) => { sounds.hover(); setCalWind(Number(e.target.value)); }}
                          className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 border border-slate-700 rounded"
                        />
                      </div>

                      {/* Slider 3: Recycle */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="font-bold text-emerald-400">♻️ ORGANIC COMPOST & RECYCLING</span>
                          <span>{calRecycle}% Diversion Rate</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={calRecycle}
                          onChange={(e) => { sounds.hover(); setCalRecycle(Number(e.target.value)); }}
                          className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 border border-slate-700 rounded"
                        />
                      </div>

                      {/* Slider 4: Forests */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="font-bold text-green-400">🌲 BIOLOGICAL FOREST SINKS</span>
                          <span>{calForest}% Canopy Recover</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={calForest}
                          onChange={(e) => { sounds.hover(); setCalForest(Number(e.target.value)); }}
                          className="w-full accent-green-400 cursor-pointer h-2 bg-slate-800 border border-slate-700 rounded"
                        />
                      </div>

                      {/* Slider 5: Nuclear */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="font-bold text-purple-400">⚛️ BASE-LOAD ATOMIC POWER</span>
                          <span>{calNuclear}% Base capacity</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={calNuclear}
                          onChange={(e) => { sounds.hover(); setCalNuclear(Number(e.target.value)); }}
                          className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 border border-slate-700 rounded"
                        />
                      </div>

                      {/* Slider 6: Hydrogen */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="font-bold text-blue-400">💧 GREEN HYDROGEN CELLS</span>
                          <span>{calHydrogen}% Fuel usage</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={calHydrogen}
                          onChange={(e) => { sounds.hover(); setCalHydrogen(Number(e.target.value)); }}
                          className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-800 border border-slate-700 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-slate-800 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>SYS_SIMULATION: CONNECTED</span>
                    <span>MATRIX MODE V.02</span>
                  </div>
                </div>

                {/* Live Sandbox Feedback Screen */}
                <div className="lg:col-span-5 border-4 border-black p-6 bg-white rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono font-bold text-xs text-slate-400 tracking-wider mb-4 border-b pb-2">
                      📡 WORLD RECOVERY STATUS
                    </h4>

                    {/* Gauges */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-black p-4 bg-slate-50 rounded text-center">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">GRID STABILITY</span>
                        <div className={`text-3xl font-black font-sans mt-2 ${stabilityIndex >= 65 ? 'text-emerald-600' : stabilityIndex >= 40 ? 'text-amber-500' : 'text-rose-600'}`}>
                          {stabilityIndex}%
                        </div>
                      </div>

                      <div className="border-2 border-black p-4 bg-slate-50 rounded text-center">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">ANOMALY DEV</span>
                        <div className={`text-3xl font-black font-sans mt-2 ${stabilityIndex >= 65 ? 'text-emerald-600' : stabilityIndex >= 40 ? 'text-amber-500' : 'text-rose-600'}`}>
                          +{anomalyOffset}°C
                        </div>
                      </div>
                    </div>

                    {/* Interactive react character faces */}
                    <div className="mt-6 flex items-center justify-around p-4 bg-slate-50 rounded border-2 border-black relative">
                      <div className="text-center">
                        {renderCharacterAvatar('eco', stabilityIndex >= 60 ? 'happy' : stabilityIndex >= 35 ? 'neutral' : 'concerned')}
                        <div className="font-mono text-[9px] font-bold mt-1 uppercase text-slate-500">Eco-Chan</div>
                      </div>

                      <div className="font-mono text-sm font-black text-slate-400">vs</div>

                      <div className="text-center">
                        {renderCharacterAvatar('daemon', stabilityIndex >= 60 ? 'concerned' : 'evil')}
                        <div className="font-mono text-[9px] font-bold mt-1 uppercase text-slate-500">Carbon-Daemon</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-mono text-xs leading-relaxed text-slate-700 bg-slate-100 border border-slate-200 rounded p-3">
                      {stabilityIndex >= 65 
                        ? '>> LOG: Clean utility grids established. Carbon-Daemon is losing containment! Uranium-Onee-san reports core baseline stabilized. H2-Senpai reports heavy cargo transport pressurized and running clean.' 
                        : stabilityIndex >= 40 
                        ? '>> LOG: System balanced but sub-critical. H2-Senpai suggests boosting green hydrogen fuel ratios to clear remaining Scope 3 heavy haul deficits.' 
                        : '>> LOG: WARNING! High utility fossil fuels overloading local lines. Uranium-Onee-san warns of base-load deficit! Initiate baseline reactor calibrations immediately!'}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* Section 7: BRIEFINGS */}
          <section id="briefings" className="py-20 border-b-4 border-black bg-slate-900 text-white relative">
            <div className="container mx-auto px-6">
              
              <div className="mb-10 text-center">
                <h2 className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Briefing console</h2>
                <h3 className="text-3xl font-black font-sans mt-1">SCROLLYTELLING VIEWPORT</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side: Typewriter Dialogue & Poses */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div className="border-4 border-black p-5 bg-slate-950 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] relative flex-1 flex flex-col justify-between min-h-[240px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-900/60 pb-2 mb-4">
                        <span className="text-[9px] text-yellow-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-ping"></span>
                          TRANSMISSION NODE
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold font-mono">
                          BRIEFING: 0{scrollSection + 1} / 09
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        {renderCharacterAvatar(
                          scrollyDialogues[scrollSection].character,
                          scrollyDialogues[scrollSection].expression
                        )}
                        <div>
                          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Speaker:</div>
                          <h4 className="font-mono text-sm font-black text-white">{scrollyDialogues[scrollSection].speaker}</h4>
                        </div>
                      </div>

                      <p className="font-mono text-xs sm:text-sm leading-relaxed text-slate-200 min-h-[80px]">
                        {typedText}
                      </p>
                    </div>

                    <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-4">
                      {`[Descent Level: ${Math.round(scrollProgress * 100)}% // Scroll down to advance]`}
                    </div>
                  </div>

                  {/* Flight telemetry status cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border-2 border-black p-2.5 bg-slate-950 rounded text-center">
                      <div className="text-[8px] text-slate-500 font-bold uppercase font-mono">PPM Metric</div>
                      <div className="text-sm font-black text-white font-mono mt-0.5">{ppmVal} PPM</div>
                    </div>
                    <div className="border-2 border-black p-2.5 bg-slate-950 rounded text-center">
                      <div className="text-[8px] text-slate-500 font-bold uppercase font-mono">Anomaly</div>
                      <div className="text-sm font-black text-rose-500 font-mono mt-0.5">+{anomalyVal}°C</div>
                    </div>
                    <div className="border-2 border-black p-2.5 bg-slate-950 rounded text-center">
                      <div className="text-[8px] text-slate-500 font-bold uppercase font-mono">Altitude</div>
                      <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{altitudeVal} KM</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Viewfinder display */}
                <div className="lg:col-span-7 border-4 border-black bg-slate-950 p-3 rounded shadow-[6px_6px_0px_rgba(0,0,0,1)] relative h-[360px] lg:h-auto min-h-[300px]">
                  <div className="w-full h-full relative overflow-hidden rounded border border-slate-900 bg-slate-900">
                    {scrollSection < 10 ? (
                      <AnimeParallax progress={scrollProgress} />
                    ) : (
                      <ThreeEarth />
                    )}
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* Section 8: ENTRY */}
          <section className="py-24 bg-yellow-400 text-black border-b-4 border-black relative overflow-hidden flex flex-col justify-center items-center text-center">
            
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center font-black text-[22vw] text-black/5 opacity-10 pointer-events-none uppercase tracking-tighter select-none font-sans">
              ENTRY
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <h2 className="text-xs font-bold tracking-widest uppercase text-black/60 mb-2">ONBOARDING LINK</h2>
              <h3 className="text-3xl sm:text-5xl font-black font-sans leading-none tracking-tight mb-4">
                COGNITIVE NODE INTERFACE
              </h3>
              <p className="text-xs sm:text-sm font-semibold max-w-lg mx-auto leading-relaxed text-black/85 mb-8">
                Connect your interface to calculate your starting environmental HP score. Complete the visual novel dialogue assessment questions to calibrate G.A.I.A. ledgers.
              </p>

              <button
                onClick={handleInitiateQuestionnaire}
                onMouseEnter={() => sounds.hover()}
                className="px-10 py-5 bg-black hover:bg-slate-900 text-white font-mono font-black text-base border-4 border-black rounded-lg shadow-[6px_6px_0px_rgba(255,255,255,1)] hover:translate-y-[-2px] active:translate-y-[2px] transition-transform flex items-center gap-3 mx-auto"
              >
                <LogIn className="w-5 h-5 text-yellow-400" />
                START ENTRY ASSESSMENT
              </button>
            </div>
          </section>

          {/* Footer Area */}
          <footer className="py-12 bg-white text-slate-900 px-6 border-t-4 border-black">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-mono font-black text-sm tracking-widest uppercase text-slate-950">G.A.I.A. DIRECTORY</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">ENVIRONMENTAL DECK // SANS RECRUIT REDESIGN MODE</p>
              </div>
              <div className="flex gap-6 font-mono text-[10px] font-bold text-slate-700">
                <a href="#about" className="hover:underline">ABOUT</a>
                <a href="#metrics" className="hover:underline">METRICS</a>
                <a href="#scopes" className="hover:underline">SCOPES</a>
                <a href="#briefings" className="hover:underline">BRIEFINGS</a>
              </div>
              <div className="text-[9px] text-slate-400 font-mono text-center md:text-right">
                © 2026 G.A.I.A. PROJECT. ALL SYSTEMS LOCAL.
              </div>
            </div>
          </footer>

        </div>
      ) : user.score === -1 ? (
        /* ==================== ONBOARDING ALIGNMENT QUESTIONNAIRE TERMINAL ==================== */
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#030611] relative z-10">
          
          <div className="absolute inset-0 pointer-events-none crt-glow scanlines opacity-[0.04] bg-emerald-500 z-20" />
          
          <div className="w-full max-w-4xl bg-slate-950 border-4 border-emerald-500 rounded-lg p-5 text-white shadow-[0_0_25px_rgba(16,185,129,0.2)] relative z-10">
            <div className="mb-4 flex items-center justify-between border-b-2 border-emerald-500/20 pb-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="h-2 w-2 bg-emerald-500 animate-ping rounded-full"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  ONBOARDING LINK // CLIMATE ALIGNMENT MODULE
                </span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">G.A.I.A. CORE COGNITION</span>
            </div>
            
            <VisualNovelBox
              questions={questions}
              onComplete={handleQuestionnaireComplete}
            />
          </div>
        </div>
      ) : (
        /* ==================== ACTIVE USER EMISSION COMMAND COCKPIT DASHBOARD ==================== */
        <div className="min-h-screen bg-[#faf9f6] flex flex-col p-4 z-10 relative">
          
          {/* Header Command Deck */}
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between border-4 border-black p-4 bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6 z-10 relative">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-950 border-2 border-black rounded text-white font-extrabold text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                📟 G.A.I.A.
              </div>
              <div>
                <h1 className="font-sans font-black text-lg md:text-xl tracking-tight uppercase text-slate-950">
                  ATMOSPHERIC LEDGER COMMAND STATION
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] text-slate-500 font-bold uppercase mt-0.5">
                  <span className="flex items-center gap-1 text-slate-900">
                    <User className="w-3 h-3 text-slate-900" />
                    PILOT: Eco-Pilot
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>SECT: SURFACE EMISSIONS</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-600 animate-pulse">GRID_LINK: ESTABLISHED</span>
                </div>
              </div>
            </div>

            {/* Header Deck Actions */}
            <div className="flex items-center gap-3">
              {/* Sound Toggler */}
              <button
                onClick={toggleSoundMute}
                className="p-2 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-slate-100 hover:bg-slate-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-600" /> : <Volume2 className="w-4 h-4 text-emerald-600 animate-bounce" />}
              </button>

              {/* CRT Monitor Switcher */}
              <button
                onClick={() => { sounds.click(); setCrtActive(!crtActive); }}
                className={`p-2 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-slate-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all
                  ${crtActive ? 'bg-emerald-100' : 'bg-slate-100'}
                `}
              >
                <Tv className={`w-4 h-4 ${crtActive ? 'text-emerald-700' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs border-2 border-black rounded flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                DISCONNECT LINK
              </button>
            </div>
          </div>

          {/* Grid Layout Dashboard */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 relative min-h-0">
            
            {/* LEFT SIDEBAR: Atmospheric HP Core & Radar widgets (3 Columns) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              
              {/* Widget A: Reactor Core HP */}
              <div className="border-4 border-black p-5 bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between flex-1">
                <div>
                  <div className="border-b border-slate-200 pb-2 mb-3 font-mono font-extrabold text-[10px] text-slate-400 tracking-widest flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                    REACTOR SHIELD INTEGRITY
                  </div>

                  <div className="flex flex-col justify-center py-2">
                    <div className="text-center font-sans font-black text-3xl mb-2 text-slate-950">
                      {user.score} / 100 HP
                    </div>

                    {/* Health gauge */}
                    <div className="w-full h-5 border-2 border-black bg-slate-100 p-0.5 rounded overflow-hidden relative">
                      <div
                        className={`h-full transition-all duration-700 ease-out border-r border-black
                          ${user.score >= 75 ? 'bg-emerald-500' : user.score >= 50 ? 'bg-amber-400' : 'bg-rose-600'}
                        `}
                        style={{ width: `${user.score}%` }}
                      />
                    </div>

                    <div className="mt-3 text-[9px] text-slate-500 font-semibold leading-relaxed p-2 bg-slate-50 border border-slate-200 rounded text-center uppercase tracking-wider">
                      {user.score >= 75 
                        ? 'Core Status: STABLE // High carbon shield integrity' 
                        : user.score >= 50 
                        ? 'Core Status: GRID_HAZE // Local temperatures deviating' 
                        : 'Core Status: MELTDOWN // Atmospheric integrity collapsing'}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-2 text-[8px] text-slate-400 font-bold uppercase text-center tracking-widest">
                  SYS_REACTOR_INTEGRITY: GOOD
                </div>
              </div>

              {/* Widget B: Toxicity Radar */}
              <div className="border-4 border-black p-5 bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-[180px] shrink-0">
                <div className="border-b border-slate-200 pb-2 mb-2 font-mono font-extrabold text-[10px] text-slate-400 tracking-widest flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  CO2 TOXICITY RADAR SCAN
                </div>

                <div className="flex-1 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-slate-900/10 fill-none">
                    <circle cx="50" cy="50" r="45" strokeWidth="1" />
                    <circle cx="50" cy="50" r="28" strokeWidth="1" />
                    <line x1="5" y1="50" x2="95" y2="50" />
                    <line x1="50" y1="5" x2="50" y2="95" />
                    
                    <path d="M 50 50 L 50 5 Q 75 10 82 23 Z" fill="rgba(15, 23, 42, 0.05)" stroke="none" className="animate-spin" style={{ animationDuration: '3.5s', transformOrigin: '50px 50px' }} />
                    
                    {user.score < 50 && (
                      <circle cx="68" cy="35" r="3.5" fill="#f43f5e" className="animate-ping" />
                    )}
                  </svg>
                </div>
                <div className="text-[8px] text-slate-400 font-bold uppercase text-center w-full">
                  RADAR_CO2_PPM: {user.score < 50 ? 'GRID_OVERRUN' : 'METRIC_STABLE'}
                </div>
              </div>

            </div>

            {/* CENTER STAGE: Primary Viewport (6 Columns) */}
            <div className="lg:col-span-6 flex flex-col gap-6 min-h-0">
              
              {/* Viewport Frame */}
              <div className="flex-1 border-4 border-black bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-hidden relative flex flex-col min-h-[300px]">
                
                <div className="bg-slate-900 border-b-2 border-black p-2.5 font-mono text-[10px] text-white font-bold flex items-center justify-between">
                  <span>PRIMARY FORWARD VIEWPORT // GLOBAL ECOLOGY OBSERVATION</span>
                  <span className="bg-slate-950 px-2 py-0.5 text-[8px] text-slate-400 border border-slate-800 rounded font-normal">
                    ORBITAL_CAM_A
                  </span>
                </div>
                
                {/* SVG Landscape observer viewport */}
                <div className="flex-1 relative bg-slate-900 flex items-center justify-center p-3">
                  <DashboardLandscape 
                    score={user.score} 
                    triggerMetroTrain={trainTrigger}
                    onMetroAnimationComplete={() => setTrainTrigger(false)}
                  />

                  {/* Holographic Eco-Chan companion in viewport */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border-2 border-black p-2 rounded shadow-[3px_3px_0px_rgba(0,0,0,1)] max-w-[240px] md:max-w-[280px]">
                    <div className="w-12 h-12 rounded border border-black overflow-hidden shrink-0 bg-sky-100">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="55" r="25" fill="#fbcfe8" />
                        {user.score >= 75 ? (
                          <>
                            <path d="M 37 53 Q 41 48 45 53" stroke="#000" strokeWidth="3" fill="none" />
                            <path d="M 55 53 Q 59 48 63 53" stroke="#000" strokeWidth="3" fill="none" />
                            <path d="M 45 61 Q 50 68 55 61 Z" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
                          </>
                        ) : user.score >= 50 ? (
                          <>
                            <ellipse cx="40" cy="53" rx="3" fill="#000" />
                            <ellipse cx="60" cy="53" rx="3" fill="#000" />
                            <path d="M 46 62 Q 50 64 54 62" stroke="#000" strokeWidth="2" fill="none" />
                          </>
                        ) : (
                          <>
                            <path d="M 36 51 Q 40 55 44 51" stroke="#000" strokeWidth="3" fill="none" />
                            <path d="M 56 51 Q 60 55 64 51" stroke="#000" strokeWidth="3" fill="none" />
                            <path d="M 46 64 Q 50 60 54 64" stroke="#000" strokeWidth="2" fill="none" />
                          </>
                        )}
                        <path d="M 22 35 C 22 15 78 15 78 35 Z" fill="#10b981" />
                        <path d="M 23 40 Q 35 30 50 38 Q 65 30 77 40 Z" fill="#1e3b8b" />
                      </svg>
                    </div>
                    <div className="flex-1 font-mono text-[9px] text-slate-800 leading-tight">
                      <div className="font-bold uppercase text-slate-400 mb-0.5">ECO_CHAN_HOLO</div>
                      {user.score >= 75 
                        ? "Grid stabilized! Outstanding performance. Let's keep it clean, Pilot!" 
                        : user.score >= 50 
                        ? "Reactor temperature is oscillating. Log daily clean actions!" 
                        : "WARNING: High greenhouse levels detected! Red Alert!"}
                    </div>
                  </div>

                </div>
              </div>

              {/* G.A.I.A. GRID INTERCEPTOR Retro Arcade Module */}
              <div className="border-4 border-black p-4 bg-slate-950 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] text-white relative">
                <div className="mb-2.5 flex items-center justify-between border-b border-emerald-500/20 pb-1.5 font-mono text-[10px] text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${gameActive ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-rose-500'}`}></span>
                    G.A.I.A. GRID INTERCEPTOR // DEFENSIVE ARCADE
                  </span>
                  <span>SCORE: {gameScore}</span>
                </div>

                {/* Game viewport */}
                <div 
                  onMouseMove={(e) => {
                    if (!gameActive) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    setFilterX(Math.max(5, Math.min(95, x)));
                  }}
                  className="w-full h-32 bg-slate-900 border-2 border-black rounded relative overflow-hidden cursor-crosshair flex flex-col items-center justify-center"
                >
                  {/* CRT Glow screen overlay */}
                  <div className="absolute inset-0 pointer-events-none crt-glow scanlines opacity-[0.03] bg-emerald-500" />
                  
                  {!gameActive ? (
                    <div className="text-center p-3 z-10">
                      <div className="text-[10px] font-mono font-bold text-slate-400 mb-2 uppercase tracking-wide">Defend Atmosphere From CO2 Particles</div>
                      <button
                        onClick={() => { sounds.click(); setGameScore(0); setGameActive(true); }}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 border border-black font-mono font-bold text-xs text-white rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        ACTIVATE COIL SHIELD
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Falling Carbon Soot Particles */}
                      {particles.map(p => (
                        <div 
                          key={p.id}
                          style={{ left: `${p.x}%`, top: `${p.y}%` }}
                          className="absolute text-sm leading-none -translate-x-1/2 -translate-y-1/2 z-10"
                        >
                          ☄️
                        </div>
                      ))}

                      {/* Moving Shield Paddle */}
                      <div 
                        style={{ left: `${filterX}%` }}
                        className="absolute bottom-2 h-2.5 w-16 bg-emerald-400 border border-black rounded -translate-x-1/2 shadow-[0_0_10px_rgba(52,211,153,0.8)] z-10 flex items-center justify-center"
                      >
                        <div className="h-0.5 w-10 bg-white rounded-full opacity-60" />
                      </div>

                      {/* Background warning grids */}
                      <div className="absolute inset-x-0 bottom-0 h-4 bg-emerald-950/20 border-t border-emerald-900/40 pointer-events-none" />
                    </>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between font-mono text-[8px] text-slate-500 font-bold uppercase">
                  <span>CONTROL: SLIDE MOUSE OVER VIEWPORT</span>
                  {gameActive && (
                    <button 
                      onClick={() => { sounds.click(); setGameActive(false); }}
                      className="text-red-400 hover:underline cursor-pointer"
                    >
                      [DEACTIVATE]
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: Logging action nodes & green ledger terminal (3 Columns) */}
            <div className="lg:col-span-3 flex flex-col gap-6 min-h-0">
              
              {/* Emission Logger Actions */}
              <div className="border-4 border-black p-4 bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between flex-1 min-h-[220px]">
                <div>
                  <div className="border-b border-slate-200 pb-2 mb-3 font-mono font-extrabold text-[10px] text-slate-400 tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    EMISSION CONTROLLER MODULE
                  </div>

                  <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[220px] pr-1">
                    <button
                      onClick={(e) => logDailyAction('Took Metro', 5, 'Commuted via zero-emission metro rail grid', e)}
                      onMouseEnter={() => sounds.hover()}
                      className="p-2 bg-slate-50 hover:bg-slate-100 border-2 border-black rounded text-left font-mono group transition-all duration-75 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🚇</span>
                        <span className="text-[9px] font-black group-hover:text-emerald-600 uppercase">Took Metro</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-bold">+5 HP</span>
                    </button>

                    <button
                      onClick={(e) => logDailyAction('Planted Tree', 8, 'Planted local sapling in neighborhood park', e)}
                      onMouseEnter={() => sounds.hover()}
                      className="p-2 bg-slate-50 hover:bg-slate-100 border-2 border-black rounded text-left font-mono group transition-all duration-75 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🌲</span>
                        <span className="text-[9px] font-black group-hover:text-emerald-600 uppercase">Planted Tree</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-bold">+8 HP</span>
                    </button>

                    <button
                      onClick={(e) => logDailyAction('Ate Vegan Meal', 4, 'Had local plant-based organic meals', e)}
                      onMouseEnter={() => sounds.hover()}
                      className="p-2 bg-slate-50 hover:bg-slate-100 border-2 border-black rounded text-left font-mono group transition-all duration-75 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🥗</span>
                        <span className="text-[9px] font-black group-hover:text-emerald-600 uppercase">Vegan Meal</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-bold">+4 HP</span>
                    </button>

                    <button
                      onClick={(e) => logDailyAction('Used Plastic', -5, 'Purchased and discarded single-use shopping bag', e)}
                      onMouseEnter={() => sounds.hover()}
                      className="p-2 bg-rose-50 hover:bg-rose-100 border-2 border-black rounded text-left font-mono group transition-all duration-75 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🥤</span>
                        <span className="text-[9px] font-black group-hover:text-rose-600 uppercase">Used Plastic</span>
                      </div>
                      <span className="text-[9px] text-rose-600 font-bold">-5 HP</span>
                    </button>

                    <button
                      onClick={(e) => logDailyAction('AC Left On', -8, 'Left cooling units active in unoccupied zones', e)}
                      onMouseEnter={() => sounds.hover()}
                      className="p-2 bg-rose-50 hover:bg-rose-100 border-2 border-black rounded text-left font-mono group transition-all duration-75 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">❄️</span>
                        <span className="text-[9px] font-black group-hover:text-rose-600 uppercase">AC Left On</span>
                      </div>
                      <span className="text-[9px] text-rose-600 font-bold">-8 HP</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Chronicle Ledger Log console */}
              <div className="border-4 border-black p-4 bg-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between flex-1 min-h-[220px]">
                  <div>
                    <div className="border-b border-slate-200 pb-2 mb-2 font-mono font-extrabold text-[10px] text-slate-400 tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      GRID CHRONICLE LEDGER
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded p-2.5 font-mono text-[9px] overflow-y-auto max-h-[160px]">
                      {actions.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-400 animate-pulse text-center uppercase">
                          Awaiting local carbon ledger logs...
                        </div>
                      ) : (
                        <div className="space-y-2 text-slate-800">
                          {actions.map((act) => (
                            <div key={act.id} className="border-b border-slate-200 pb-1.5 last:border-0">
                              <div className="flex items-center justify-between text-slate-400">
                                <span>[{new Date(act.created_at).toLocaleTimeString()}]</span>
                                <span className={act.score_change >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                                  {act.score_change >= 0 ? '>> OK' : '>> DEFICIT'} ({act.score_change >= 0 ? `+${act.score_change}` : act.score_change} HP)
                                </span>
                              </div>
                              <div className="text-slate-700 pl-1 mt-0.5">
                                Logged: <span className="text-black font-semibold">{act.action_type}</span> - {act.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[8px] text-slate-400 font-bold uppercase text-center mt-2 border-t border-slate-200 pt-1.5">
                    SYS_CHRONICLE_LEDGER: SYNCED
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    );
}
