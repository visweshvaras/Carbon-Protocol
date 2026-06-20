// Static data constants for the G.A.I.A. Carbon Footprint JRPG

export interface DialogueStep {
  title: string;
  speaker: string;
  character: 'eco' | 'ray' | 'solar' | 'aero' | 'uranium' | 'goblin' | 'hydrogen' | 'nymph' | 'biomass' | 'daemon';
  expression: 'neutral' | 'happy' | 'concerned' | 'sad' | 'mischievous' | 'evil';
  text: string;
}

export const scrollyDialogues: DialogueStep[] = [
  {
    title: "L.01: THE CARBON SIGNATURE",
    speaker: "Eco-Chan",
    character: "eco",
    expression: "neutral",
    text: "Greetings, Pilot! I am Eco-Chan, your G.A.I.A. flight operations assistant. A carbon footprint is the total volume of greenhouse gases—mainly Carbon Dioxide (CO2) and Methane (CH4)—released by our actions, measured in CO2 equivalents (CO2e). Scroll down to explore our atmosphere."
  },
  {
    title: "L.02: SCOPE 1 - DIRECT COMBUSTION",
    speaker: "Commander Ray",
    character: "ray",
    expression: "neutral",
    text: "Attention, Recruit! Commander Ray here. Scope 1 covers Direct emissions. This is carbon you burn yourself: vehicle tailpipe exhausts, gas stoves, or industrial factory furnaces. It represents your immediate, physical fuel footprint on our atmosphere!"
  },
  {
    title: "L.03: SCOPE 2 - UTILITY POWER GRIDS",
    speaker: "Solar-Senpai",
    character: "solar",
    expression: "happy",
    text: "Yoohoo, Pilot! Solar-Senpai is in the grid! Scope 2 tracks Indirect emissions from purchased energy. Whenever you run AC units or charge devices, power is drawn from grid substations. Switching grids to clean solar arrays keeps our utility load clean!"
  },
  {
    title: "L.04: SCOPE 2 - WIND HARVESTING",
    speaker: "Aero-Kun",
    character: "aero",
    expression: "happy",
    text: "Aero-Kun reporting for duty, Pilot! Wind energy is another critical part of Scope 2 power! Spinning massive offshore wind turbines routes clean kinetic energy into local utilities, avoiding coal combustion completely!"
  },
  {
    title: "L.05: SCOPE 2 - BASE-LOAD ATOMIC POWER",
    speaker: "Uranium-Onee-san",
    character: "uranium",
    expression: "neutral",
    text: "Welcome, Pilot. Uranium-Onee-san here. Intermittent wind and solar need clean base-load support. Safe, modern nuclear reactors provide continuous, carbon-free electricity to balance grid fluctuations when the sun sets or wind drops!"
  },
  {
    title: "L.06: SCOPE 3 - LIFECYCLE VALUE CHAINS",
    speaker: "Trash-Goblin",
    character: "goblin",
    expression: "mischievous",
    text: "Hehehe, crackle pop! Trash-Goblin's scope is massive! Scope 3 covers Value Chain emissions—everything you buy, consume, and discard. From plastic processing and container shipping to food waste rotting in local landfills. Nothing escapes my pile!"
  },
  {
    title: "L.07: SCOPE 3 - HYDROGEN SHIPPERS",
    speaker: "H2-Senpai",
    character: "hydrogen",
    expression: "happy",
    text: "Pressurizing tanks, Pilot! H2-Senpai reporting! Heavy shipping, steel production, and aviation are hard to electrify. Green hydrogen fuel cells offer zero-emission transport logistics, discharging only pure water vapor!"
  },
  {
    title: "L.08: REGIONAL GRIDS & THERMAL TRAPS",
    speaker: "H2O-Chan",
    character: "nymph",
    expression: "concerned",
    text: "W-warning, Pilot... H2O-Chan reporting. India faces a severe AC feedback loop. Intense heatwaves surge cooling demand, which overloads coal-powered energy grids, releasing more carbon and trapping more heat. Acid rain is acidifying our rivers!"
  },
  {
    title: "L.09: BIOLOGICAL SINKS & SOIL OFFSET",
    speaker: "Biomass-Obaasan",
    character: "biomass",
    expression: "happy",
    text: "Greetings, little one. Biomass-Obaasan here. Scope 4 is about offset recoveries. Mature forest soils and plants act as biological carbon sinks, absorbing greenhouse elements from the sky. Organic composting and planting trees nurture this natural ledger!"
  },
  {
    title: "L.10: THE THERMAL RETENTION SHIELD",
    speaker: "Carbon-Daemon",
    character: "daemon",
    expression: "evil",
    text: "Gyahahaha! Keep consuming, frail carbon-based lifeforms! As carbon accumulates, it expands my Thermal Retention Shield, trapping the Sun's infrared radiation like a heavy greenhouse blanket. There is no escape from my rising global furnace!"
  },
  {
    title: "L.11: SYNCHRONIZE COGNITIVE BRIDGE",
    speaker: "Eco-Chan",
    character: "eco",
    expression: "happy",
    text: "Orbital descent finalized, Pilot! G.A.I.A. Command Core is online. To initialize your daily emission ledger, calibrate grid tracking, and calculate your local World Score, synchronize your cognitive interface below. The future is in your hands!"
  }
];

export const simpleDialoguesText: string[] = [
  "Hi! I am Eco-Chan. Your carbon footprint is the amount of dirty air you create when you run cars, use lights, or throw away trash. Let's learn how to make our Earth clean and green!",
  "Hi! Commander Ray here. Direct fuel means the gas and coal you burn yourself—like driving gas cars, cooking on stoves, or burning fuels in factories.",
  "Hey! Solar-Senpai here. Purchased power is the electricity you buy. When you use lights or computers, they draw power from the electrical grid. Let's switch to sun power!",
  "Aero-Kun here! Wind power uses giant spinning fans to make clean energy without burning coal. Slide the wind control up to make it clean!",
  "Hello, I am Uranium-Onee-san. Sometimes the wind doesn't blow and the sun doesn't shine. Modern nuclear power works all day and night to keep the lights on without making dirty air!",
  "Hehe! Trash-Goblin here! Everything you buy, use, and throw away makes carbon. Plastic bags, rotting food in trash bins—it all makes the Earth warmer. Throw away less!",
  "H2-Senpai here! Heavy trucks, airplanes, and ships need a lot of power. Hydrogen fuel cells run clean and only spit out clean water, keeping shipping green!",
  "Warning! H2O-Chan here. In hot places, everyone turns on their ACs. This uses too much coal power, making the air even hotter and creating dirty acid rain. We need to break this cycle!",
  "Hello! Biomass-Obaasan here. Trees and plants are like natural vacuum cleaners—they suck the dirty carbon out of the sky. Composting and planting trees helps them clean the air!",
  "Gyahahaha! I am Carbon-Daemon! The more electricity and gas you burn, the thicker my hot blanket around the Earth becomes. Soon, the planet will be a hot furnace!",
  "We are at the control station! Now you can adjust the clean energy grids, play the arcade game, and log your green actions. Let's save the Earth together!"
];

export interface CharacterBio {
  id: 'eco' | 'ray' | 'solar' | 'aero' | 'goblin' | 'nymph' | 'biomass' | 'uranium' | 'hydrogen' | 'daemon';
  name: string;
  role: string;
  status: string;
  bio: string;
  quote: string;
  color: string;
}

export const characterBios: CharacterBio[] = [
  {
    id: "eco",
    name: "Eco-Chan",
    role: "G.A.I.A. COMMAND CORE PILOT",
    status: "ACTIVE OPERATIONS",
    bio: "Your loyal simulation deck guide. Equipped with a green environmental beret and solar-leaf energy receptor, Eco-Chan helps calibrate global atmospheric levels and track daily user logs.",
    quote: "Let's synchronize command protocols and revert the footprint, Pilot!",
    color: "bg-sky-50 border-sky-400"
  },
  {
    id: "ray",
    name: "Commander Ray",
    role: "SCOPE 1 DIRECT COMBUSTION CHIEF",
    status: "STANDBY FOR BRIEFING",
    bio: "Chief tactical commander overseeing direct fuels combustion, natural gas usage, coal reactors, and vehicle exhausts. Known for wearing orange heads-up command shades.",
    quote: "Calibrate direct combustion vectors! Every drop of fuel logged is a battle won.",
    color: "bg-slate-900 text-white border-slate-600"
  },
  {
    id: "solar",
    name: "Solar-Senpai",
    role: "SCOPE 2 POWER GRID ENGINEER",
    status: "UTILITY SYNCHRONIZED",
    bio: "Hyper-optimistic power grid engineer wearing cyan HUD solar visor goggles. Expert in utility integration, power plants, clean solar arrays, and grid heatwaves.",
    quote: "Switch those grids to clean photovoltaic solar arrays! Let's power the planet!",
    color: "bg-amber-50 border-amber-400"
  },
  {
    id: "aero",
    name: "Aero-Kun",
    role: "SCOPE 2 WIND TURBINE TACTICIAN",
    status: "WIND DYNAMICS SYNCED",
    bio: "A youthful, enthusiastic pilot with wind-turbine goggles and dynamic spiky cyan hair. Manages offshore wind power grids and air current energy routing.",
    quote: "Catch the clean wind gusts, Pilot! Power those massive offshore rotors!",
    color: "bg-cyan-50 border-cyan-400"
  },
  {
    id: "goblin",
    name: "Trash-Goblin",
    role: "SCOPE 3 LANDFILL METROPOLIS MONSTER",
    status: "MONITORING LOGISTICS",
    bio: "Mischievous landfill monster sporting a crumpled aluminum can crown. Tracks secondary lifestyle consumption: plastics procurement, container shipping, and rotten landfill methane.",
    quote: "Hehehe, single-use cups! Container cargo ships! Rotting landfill piles! All mine!",
    color: "bg-emerald-950 text-white border-emerald-700"
  },
  {
    id: "nymph",
    name: "H2O-Chan",
    role: "ATMOSPHERIC RAIN & MONSOON NYMPH",
    status: "SHIELD OSCILLATING",
    bio: "Water-themed nymph with concerned watery teardrop pins and blue hair. Worries deeply about monsoon imbalances, cooling grid overload heatwaves, and acid rain acidifying water bodies.",
    quote: "The... the AC units are overloading the coal grids. Acid rain is acidifying our rivers!",
    color: "bg-cyan-50 border-cyan-300"
  },
  {
    id: "biomass",
    name: "Biomass-Obaasan",
    role: "SCOPE 4 BIOLOGICAL OFFSET ELDER",
    status: "ORGANIC SINKS MATURED",
    bio: "Wise biological elder wearing a lucky four-leaf clover badge. Specializes in soil carbon absorption sinks, organic composting, and afforestation offset operations.",
    quote: "Nurture the soil, little ones. Planting trees matures our biological carbon sinks.",
    color: "bg-emerald-50 border-emerald-400"
  },
  {
    id: "uranium",
    name: "Uranium-Onee-san",
    role: "BASE-LOAD CLEAN REACTOR OPERATOR",
    status: "NUCLEAR CORES COOLED",
    bio: "Cool, calm base-load specialist with neon-green twin tails and a miniature cooling-tower hairpin. Oversees clean nuclear baseline grid stability operations.",
    quote: "Splitting atoms for carbon-free baseline power keeps the grid completely steady.",
    color: "bg-purple-900 text-purple-100 border-purple-400"
  },
  {
    id: "hydrogen",
    name: "H2-Senpai",
    role: "SCOPE 3 CLEAN HYDROGEN FUEL LOGISTICS",
    status: "HYDROGEN CELLS PRESSUREIZED",
    bio: "Energetic logistics leader with bubble water crown and high-pressure fuel-cell goggles. Optimizes green hydrogen heavy cargo shipping and transport.",
    quote: "Pressurize the hydrogen cells! Clean cargo ships and fuel cells are ready for transport!",
    color: "bg-blue-950 text-blue-100 border-blue-400"
  },
  {
    id: "daemon",
    name: "Carbon-Daemon",
    role: "ATMOSPHERIC RETENTION SHIELD VILLAIN",
    status: "THREAT LEVEL: CRITICAL",
    bio: "A menacing, gas-cloud entity that expands its thermal retention blanket as global carbon compounds pile up. Desires to turn the world into a massive, irreversible global furnace.",
    quote: "Keep consuming, frail carbon creatures! Expand my Thermal Shield and burn!",
    color: "bg-purple-950 text-white border-purple-800"
  }
];

export interface QuestionOption {
  text: string;
  points: number;
}

export interface Question {
  id: number;
  speaker: string;
  expression: 'neutral' | 'happy' | 'concerned' | 'sad';
  text: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    speaker: 'Eco-Chan',
    expression: 'neutral',
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
    expression: 'concerned',
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
    expression: 'concerned',
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
    expression: 'happy',
    text: "Data linked. Last check: which carbon reduction commit are you most likely to stick to for the long term?",
    options: [
      { text: "Commuting via public transport (metro, bus) or walking", points: 25 },
      { text: "Composting food waste and reducing general landfill footprint", points: 20 },
      { text: "Eliminating single-use plastics from daily consumption", points: 20 },
      { text: "Using highly efficient appliances and LED lighting grids", points: 15 }
    ]
  }
];

export const simplifiedQuestions: Question[] = [
  {
    id: 1,
    speaker: 'Eco-Chan',
    expression: 'neutral',
    text: "Hi! Welcome. Let's start: Who do you think should pay the most to clean up dirty air and stop climate change?",
    options: [
      { text: "Rich countries (who started using factories and coal long ago)", points: 25 },
      { text: "All countries should pay the same amount", points: 20 },
      { text: "The biggest emitters today (like China, USA, and India)", points: 25 },
      { text: "I am not sure / Let's check the data first", points: 15 }
    ]
  },
  {
    id: 2,
    speaker: 'Eco-Chan',
    expression: 'concerned',
    text: "The Earth is getting very warm. How do you keep your home cool during hot summer days?",
    options: [
      { text: "I run the air conditioner (AC) all day and night", points: 5 },
      { text: "I use ceiling fans, cold water pots, and keep curtains closed", points: 25 },
      { text: "I use a high-efficiency AC that uses very little electricity", points: 20 },
      { text: "I do not have an AC / I just open windows for breeze", points: 15 }
    ]
  },
  {
    id: 3,
    speaker: 'Eco-Chan',
    expression: 'concerned',
    text: "What stops you from buying or using an Electric Vehicle (EV) or electric car?",
    options: [
      { text: "Electric cars are too expensive to buy right now", points: 15 },
      { text: "There are no charging plug spots near my house", points: 15 },
      { text: "The electricity comes from burning dirty coal anyway", points: 20 },
      { text: "I already drive an electric car or want to get one soon", points: 25 }
    ]
  },
  {
    id: 4,
    speaker: 'Eco-Chan',
    expression: 'happy',
    text: "Got it! Which of these clean habits is easiest for you to keep doing for a long time?",
    options: [
      { text: "Take public buses, trains, metros, or walk and cycle", points: 25 },
      { text: "Recycle trash, compost food waste, and throw away less", points: 20 },
      { text: "Stop using single-use plastic cups, bags, and bottles", points: 20 },
      { text: "Turn off lights when leaving rooms and use low-power bulbs", points: 15 }
    ]
  }
];

export interface SimpleBio {
  role: string;
  status: string;
  quote: string;
  bio: string;
}

export const simplifiedBios: Record<string, SimpleBio> = {
  eco: {
    role: "GRID PILOT & GUIDE",
    status: "ONLINE & ACTIVE",
    quote: "Let's work together to make our footprint smaller!",
    bio: "She is your helper. She wears a green hat and helps you change grid levels and record your daily actions."
  },
  ray: {
    role: "DIRECT FUEL BOSS",
    status: "READY FOR INSTRUCTIONS",
    quote: "Every bit of fuel we save helps us win the fight!",
    bio: "He checks the gas and coal you burn yourself—like driving gas cars or burning fuel in stoves."
  },
  solar: {
    role: "SUN POWER ENGINEER",
    status: "GRID CONNECTED",
    quote: "Switch the grids to clean sun power! Let's save the planet!",
    bio: "She is a happy engineer who loves solar panels. She helps switch electricity grids to clean energy."
  },
  aero: {
    role: "WIND POWER LEADER",
    status: "WIND POWER SYNCED",
    quote: "Catch the clean wind! Turn those giant fans!",
    bio: "He is an exciting pilot who manages wind energy, using wind turbines to make clean electricity."
  },
  goblin: {
    role: "TRASH & WASTE MONITOR",
    status: "CHECKING YOUR TRASH",
    quote: "Plastic cups! Rotten food piles! I love trash!",
    bio: "He tracks the waste we throw away, single-use plastics, and cargo shipping emissions."
  },
  nymph: {
    role: "RAIN & AC PROTECTOR",
    status: "SHIELD OSCILLATING",
    quote: "AC units are making the grid too hot, and dirty rain hurts rivers!",
    bio: "She is a water nymph who worries about heatwaves, AC overloading coal grids, and acid rain."
  },
  biomass: {
    role: "FOREST & SOIL ELDER",
    status: "FOREST MATURING",
    quote: "Care for the soil! Planting trees cleans the air.",
    bio: "She is a wise grandmother who knows how trees and compost suck dirty air out of the sky."
  },
  uranium: {
    role: "NUCLEAR GRID MANAGER",
    status: "REACTOR CORES OK",
    quote: "Nuclear power works day and night to keep the lights on clean.",
    bio: "She helps use nuclear reactors to provide clean, constant electricity when there is no wind or sun."
  },
  hydrogen: {
    role: "CLEAN FUEL SPECIALIST",
    status: "FUEL CELLS PRESSURIZED",
    quote: "Green hydrogen cells only spit out clean water!",
    bio: "He manages green hydrogen fuel cells for clean heavy shipping and clean airplanes."
  },
  daemon: {
    role: "CARBON DEMON",
    status: "THREAT LEVEL: DANGER",
    quote: "Burn more gas and coal! Make my hot blanket thicker!",
    bio: "He is the bad guy. He wants us to burn more fuel so the Earth gets trapped under a hot blanket."
  }
};
