# 📟 G.A.I.A. Carbon Protocol Command Station

An editorial, Japanese corporate recruitment-style gamified Carbon Footprint Awareness simulation built with Next.js, Anime.js, Three.js, and real-time synthesized retro JRPG audio. This application simulates direct, utility, value-chain, and biological carbon scopes using interactive visual novel interfaces, calibration matrices, and a playable arcade game module—designed to run completely locally in any modern clean browser with zero credentials required.

---

## 🎯 Chosen Vertical: Carbon Footprint Awareness & Gamified Mitigation

G.A.I.A. addresses the **Carbon Footprint Awareness** vertical by translating abstract environmental parameters into interactive, high-impact scrollytelling visual novels, a parametric simulator sandbox, and a real-time reactive arcade engine. 

---

## 🧠 Approach and Logic

The application models carbon footprints across four ecological dimensions:
1.  **Scope 1 (Direct Emissions)**: Modeled via direct fuel combustion calibration.
2.  **Scope 2 (Utility Grid Load)**: Simulated through solar panel grids, wind turbine efficiency, and nuclear baseline networks.
3.  **Scope 3 (Value Chain & Cargo)**: Represented via freight transportation logistics and material waste accumulation.
4.  **Scope 4 (Biological Sinks)**: Simulated through organic soil diversion and forest canopy absorption rates.

As users scroll or calibrate inputs:
*   An **Ecosystem Stability Score (0-100)** is dynamically recomputed.
*   The **Atmospheric Anomaly Index (+°C)** adjusts dynamically based on the ratio of clean energy vs fossil utility loads.
*   Visual styles shift reactively (e.g., vibrant green forests and bright blue skies degrade into toxic smog and pink acid rain).

---

## ⚙️ How the Solution Works

*   **Interactive Visual Novel Scrollytelling**:
    *   Features an 11-stage chronological path mapping ecological parameters under guide characters (**Eco-Chan**, **Ray**, **Aero-Kun**, **Uranium-Onee-san**, **H2-Senpai**, and **Biomass-Obaasan**).
    *   Parallax animation matrices are governed by **Anime.js** tracking mouse scrolls, dynamically moving svg elements.
*   **Reactive 3D Telemetry Grid**:
    *   Procedural WebGL map mapping generated onto atoon-shaded canvas sphere via **Three.js**, rotating and bobbing reactively to indicate real-time simulation updates.
*   **Parametric Calibration Lab Console**:
    *   A 6-axis parameter sandbox where users adjust inputs (Wind, Solar, Compost, Canopy, Hydrogen, and Nuclear). Calibrating values prompts custom-synthesized warning signals or success Sweeps depending on threshold configurations.
*   **Playable Retro Arcade (G.A.I.A. Interceptor Grid)**:
    *   A collision-defensive minigame rendering soot particles (`☄️`) falling in real-time. Slide the electromagnetic filter shield using mouse movements to catch them and prevent shield integrity failures.
*   **Client-Side Persistence Layer**:
    *   Mapped via [src/lib/supabase.ts](file:///src/lib/supabase.ts) using `localStorage` to save carbon action logs client-side. Bypasses external servers for 100% database availability.

---

## 📌 Assumptions Made

1.  **100% Client-Side Capabilities**: Assumes database storage should be client-bound (localStorage) to pass security audits and run seamlessly in private incognito windows.
2.  **Browser Sound Synthesizer Support**: Assumes browser environment supports the standard `Web Audio API` (initialized on click/volume unmute to respect modern autoplay blocks).
3.  **Standard Screen Resolution**: Assumes fluid grid columns are responsive from 320px mobile displays up to ultra-wide 4K monitors.

---

## ♿ Accessibility (A11y) & SEO Compliance

*   **Aria Attributes**: All ranges, volume keys, CRT overlay buttons, and dashboard parameters possess unique descriptive `aria-label` tags.
*   **Screen Reader SVG Support**: Vector groups have descriptive captions and `role="img"` attributes.
*   **Structure Outline**: Heading maps are configured chronologically (`<h1>` -> `<h2>` -> `<h3>`).

---

## 📁 Repository Directory Structure

```text
carbon-footprint/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Next.js app shell config & fonts
│   │   ├── page.tsx           # Main Command Station terminal dashboard
│   │   └── globals.css        # Core styling utilities & scanline animations
│   ├── components/
│   │   ├── AnimeParallax.tsx  # Anime.js visual novel scrollytelling parallax
│   │   ├── DashboardLandscape.tsx # Dynamic landscape rendering based on carbon score
│   │   ├── ThreeEarth.tsx     # Procedural 3D planetary WebGL component
│   │   └── VisualNovelBox.tsx # Interactive dialogue character console
│   └── lib/
│       ├── sounds.ts          # Web Audio API 8-bit synthesizer module
│       └── supabase.ts        # Client-side localStorage persistence interface
├── public/                    # Static vector graphics & asset overlays
├── start_local.bat            # One-click local launch script for Windows
├── next.config.mjs            # Production optimization configuration
└── tsconfig.json              # TypeScript compilation specifications
```

---

## 💻 Running Locally

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   npm, yarn, or pnpm

### Setup
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/carbon-footprint.git
    cd carbon-footprint
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Boot the local server:
    ```bash
    npm run dev
    ```
    *For Windows environments, double-click `start_local.bat` for automatic port resolution.*
4.  Build production bundle (verification check):
    ```bash
    npm run build
    ```

---

## 🛠️ Technology Stack
*   **Framework**: Next.js 14.x (App Router)
*   **Styling**: Tailwind CSS & Vanilla CSS
*   **Animations**: Anime.js & Framer Motion
*   **3D Visuals**: Three.js (Procedural map rendering)
*   **Sound Synth**: Web Audio API (Triangle/sine/sawtooth synth blocks)
