# 📟 G.A.I.A. Carbon Protocol Command Station

An editorial, Japanese corporate recruitment-style gamified Carbon Footprint Awareness simulation built with Next.js, Anime.js, Three.js, and real-time synthesized retro JRPG audio. This application simulates direct, utility, value-chain, and biological carbon scopes using interactive visual novel interfaces, calibration matrices, and a playable arcade game module—designed to run completely locally in any modern clean browser with zero credentials required.

---

## 🌌 The Gamified World & Design Vibe

![G.A.I.A. Command Station Screen Mockup](https://raw.githubusercontent.com/username/repository/main/public/screenglow_mockup.png)

The application takes inspiration from retro-futuristic industrial telemetry and mid-century corporate recruitment landing pages (such as the Gifu recruitment grids). It adopts a high-contrast console look featuring:
*   **Heavy Black Borders & Monospace Typography**: Giving it a vintage JRPG terminal look.
*   **CRT Scanline overlay**: Toggleable filter that adds scanning horizontal grid lines, vintage glass refresh loops, and flickering green matrix glow.
*   **Procedural WebGL Planetary Projection**: A real-time, interactive 3D Earth rendering that reacts dynamically as you calibrate scopes.

---

## ⚡ Main Core Features

1.  **11-Level Visual Novel Scrollytelling**:
    *   Guided by **Eco-Chan** and 9 environmental specialists, users descend through the atmospheric layers (Scope 1, 2, 3, and 4) mapping carbon signatures, direct utility loads, base-load nuclear networks, cargo shipping values, acid monsoons, biological soil sinks, and the rising retention shield of **Carbon-Daemon**.
    *   Controlled via frame-locked Anime.js scrolling parallax vector art.

2.  **G.A.I.A. Grid Interceptor Retro Arcade Game**:
    *   A playable real-time collision defensive mini-game built inside the center observer dashboard viewport.
    *   Slide the electromagnetic coil filter shield with your mouse to catch falling red carbon soot particles (`☄️`) before they pierce atmospheric grid lines.
    *   Successful catches trigger synthesizer sweeps. Misses leak carbon directly into the reactor, reducing shield HP core integrity in real-time.

3.  **6-Axis Carbon Calibration Lab Matrix**:
    *   An interactive parameter sandbox allowing users to dynamically adjust clean parameters (Solar grid infrastructure, Wind turbine deployment, Atomic baseline power, Organic compost diversion, Forest canopy sinks, and Green Hydrogen fuel transport).
    *   Stability indexes and atmospheric anomalies are dynamically calculated with reactive live feedback from Uranium-Onee-san and H2-Senpai.

4.  **8-Bit Retro Synthesizer Sound Engine**:
    *   Custom-coded Web Audio API synth engine generating real-time sine, triangle, and sawtooth oscillator tones.
    *   Interactive sounds include interface boot sweeps, button hovers, positive action chimes, negative load warning buzzes, and visual novel questionnaire completion fanfares.

5.  **Character Archives Profile Deck**:
    *   An interactive archive containing detailed bios, quotes, and modifier nodes to switch vector facial expressions dynamically (`[HAPPY]`, `[CONCERNED]`, `[NEUTRAL]`) with responsive scale-tilt hover animations.

6.  **CRT Monitor Display Toggle**:
    *   Instant overlay switcher adding scanning horizontal grid lines, vintage glass refresh loops, and flickering green terminal glowing matrices.

---

## 🚀 The "Clean Browser" Test Guaranteed

*   **Zero Credentials / Key Leaks**: The system uses a clean local storage mock database layer to load and log actions completely client-side. No Supabase or database connections are required, guaranteeing it runs perfectly in private incognito sessions with zero environment variables required.
*   **Pure Client Execution**: Built with static Next.js compilation parameters for superfast page loads, high SEO compatibility, and low performance overhead.

---

## ♿ Accessibility (A11y) & SEO Compliance

*   **Aria Attributes**: All interactive elements (sliders, volume buttons, reset keys, game controllers) are outfitted with descriptive `aria-label` tags.
*   **Screen Reader Friendly**: Visual novel SVGs include `role="img"`, `<title>`, and descriptions for screen reader parsers.
*   **Semantic Layout**: Built using proper semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer`>) rather than plain layout wrappers.
*   **SEO Tags**: Single-page heading layout with logical `<h1>`, `<h2>`, and `<h3>` tags mapping standard outline structures.

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
