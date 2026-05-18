# 🎮 NameTheGame

### Ever-Bloom Sanctuary for Game Hunters

Identify any video game from images or descriptions. Join elite guild of hunters. Powered by Gemini AI.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-Fast-f9f1e1?style=for-the-badge&logo=bun)](https://bun.sh/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-red?style=for-the-badge&logo=turborepo)](https://turbo.build/)

---

## 🌟 Features

- **AI-Powered Identification**: Use Google Gemini 1.5 Flash. Identify games from vague descriptions.
- **Community Hunts**: Start hunts for mysterious games. Help others solve theirs.
- **Hunter's Garden**: Competitive leaderboard system. Track points, ranks, and solves.
- **Interactive Forums**: Discuss lore, mechanics, and discoveries.
- **Premium Design**: Glassmorphism UI. Vibrant animations. Responsive layout.

## 🛠️ Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Runtime**: [Bun](https://bun.sh/)
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **AI**: [Google Generative AI](https://ai.google.dev/) (Gemini)
- **Backend**: [Firebase](https://firebase.google.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)

## 📂 Monorepo Structure (FSD)

```bash
name-the-game/
├── apps/
│   └── web/            # Next.js 16 Web Application
│       ├── src/
│       │   ├── app/           # App-wide providers, global styles, layout
│       │   │   └── providers/ # Contexts and providers (e.g. AuthContext)
│       │   ├── entities/      # Business logic & components related to core models (Post, User)
│       │   ├── features/      # User-actionable flows and features
│       │   ├── shared/        # Reusable assets, components, utilities
│       │   │   ├── config/    # Core configs (Firebase, etc.)
│       │   │   ├── lib/       # Utility helper functions (UUID, utils)
│       │   │   ├── types/     # Core type definitions
│       │   │   └── ui/        # Atomic UI components (Buttons, Input, Card)
│       │   └── widgets/       # Complex structural components (Navbar, Sidebar)
│       └── tsconfig.json      # Path mappings to match Feature-Sliced Design
├── packages/                  # Workspace package registry
├── package.json               # Root workspace manifest
└── turbo.json                 # Turborepo task pipeline configuration
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed.
- Google Gemini API Key.
- Firebase Project credentials.

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/name-the-game.git
   cd name-the-game
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Setup environment variables:
   Create `.env` file in `apps/web/`.
   ```env
   GEMINI_API_KEY=your_key_here
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   # Add other Firebase vars...
   ```

4. Run development server:
   ```bash
   bun run dev
   ```

5. Build production bundle:
   ```bash
   bun run build
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## 🛡️ License

Distributed under MIT License. See `LICENSE` for more information.

---

### [Visit NameTheGame](https://name-the-game.vercel.app/)
