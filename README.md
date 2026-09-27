# Kashyap Nasit — Personal Portfolio ⚡

> *"Building systems that see, reason, and actually ship."*

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Status](https://img.shields.io/badge/Status-Live-success?style=flat-square)](#)

Welcome to the source repository for my personal portfolio. Built from scratch with an editorial design aesthetic, custom WebGL shaders, 3D interactive canvases, and zero boring corporate templates.

🌐 **Live Deployment:** [kashyap-portfolio-site.vercel.app](https://kashyap-portfolio-site.vercel.app)  
📄 **GitHub Pages Mirror:** [kashyapnasit109.github.io/Personal_Portfolio](https://kashyapnasit109.github.io/Personal_Portfolio/)

---

## 🧭 What’s Inside

| Section | The Experience |
| :--- | :--- |
| **Hero & Preloader** | An SVG preloader drawing the hand-signed **k** signature, zooming into a magazine-style hero. Features an interactive **WebGL Alter-Ego Portal** mapped landmark-by-landmark using MediaPipe face-mesh (Gentleman Racer × Travelling Photographer). Hover to reveal liquid trails, click to switch, double-click to swallow the viewport. |
| **About (`/about`)** | The human behind the terminal: spec sheets, the dual life of cars × code, learning loops, and deep rabbit holes explored on purpose. |
| **Work (`/work`)** | Case studies of shipped software: **AUREX** (Winner, GDG × DezAI Hackathon), **VIGINT / SentinelVision** (SIH University Round), **Sentinel**, **Satva Laser** (client work, delivered), **Nexus Command**, and **Hawk-i** — equipped with interactive stack x-rays and a hover loupe. |
| **Lens (`/lens`)** | A 3D orbital photo gallery, machine-vision field-of-view HUD, and category filters housing 50+ real captures. |
| **Journey (`/journey`)** | An interactive roadmap tracing school to Semester 5 — milestone cards, the turning point, lit-up semesters, and a mini build toy. |
| **Contact (`/contact`)** | Polyglot greetings on hover, a 3D flippable visiting card, real-time IST clock, and an intent-based email drafter with paper-plane dispatch. |

Plus: Global `Ctrl` / `⌘` + `K` command palette, interactive portfolio tour guide, magnetic physics buttons, cursor spotlight, and buttery Lenis smooth scrolling.

---

## 🛠️ Tech Architecture

- **Core:** React 19, Vite, React Router 7
- **Styling & Theme:** Custom Ink & Ivory palette via Tailwind CSS 3, glassmorphism overlays
- **Motion Engine:** GSAP (ScrollTrigger, Flip), Lenis smooth scroll, spring physics
- **Graphics & Shaders:** Hand-written GLSL shaders for chromatic aberration, liquid distortion, and portal transitions
- **Typography:** Self-hosted *Bricolage Grotesque*, *Instrument Serif*, *Geist*, and *JetBrains Mono*
- **Icons:** React Icons (`fi`, `lu`)

---

## 🚀 Quickstart

Run it locally in less than 30 seconds:

```bash
# 1. Clone the repo
git clone https://github.com/kashyapnasit109/Personal_Portfolio.git

# 2. Enter workspace
cd Personal_Portfolio

# 3. Install dependencies
npm install

# 4. Fire up the dev server
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

> **Deployment Note:** GitHub Pages uses base path `/Personal_Portfolio/` (configured via `.github/workflows/pages.yml`), while Vercel serves directly from root `/` with SPA route rewrites in `vercel.json`.

---

## 📂 Content Management

All textual copy, projects, timeline milestones, and photos are strictly decoupled from UI logic in `src/data/`:

```
src/data/
├── site.js       # Global metadata & socials
├── projects.js   # Featured case studies & stack specs
├── journey.js    # Semester roadmap & history
├── timeline.js   # Academic milestones
├── about.js      # Spec sheet, philosophy & bio
├── frames.js     # Lens gallery photos & EXIF metadata
└── assistant.js  # Scripted portfolio guide responses
```

---

## 📜 License & Attribution

Designed and engineered by **Kashyap Nasit** © 2026.  
Personal portfolio showcase. Photography and original brand assets reserved.
