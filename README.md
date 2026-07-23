# Pragati Path

**Pragati Path** ("Path of Progress") is a non-profit organization dedicated to creating lasting, grassroots-level change. This repository contains the source code for our official website.

## About Us

Pragati Path works across multiple focus areas to uplift underserved communities:

- **Education** - Supporting access to quality learning through tutoring programs, school supplies, and scholarships.
- **Healthcare** - Organizing health camps, awareness drives, and connecting communities with essential medical services.
- **Rural Development & Livelihoods** - Building sustainable income opportunities through skill training and community infrastructure projects.
- **Women Empowerment** - Enabling self-reliance through vocational training, self-help groups, and leadership programs.

### Our Mission
 To empower individuals and communities with the tools, resources, and opportunities they need to build a self-sustaining path to progress.

### Our Vision
A society where every individual - regardless of background - has equal access to education, healthcare, and economic opportunity.

## About the Website

This website serves as the digital home for Pragati Path, sharing our story, ongoing programs, impact, and ways for people to get involved (donations, volunteering, and partnerships).

### Key Features
- Overview of our mission, vision, and core programs
- Stories and updates from the field
- Donation and volunteer sign-up pages
- Contact and outreach information

## Tech Stack

- Frontend: React 19, TanStack Start, TanStack Router, TanStack Query
- Styling: Tailwind CSS 4
- Animation: GSAP, Framer Motion, Three.js (via `@react-three/fiber`), Lenis
- Language: TypeScript
- Build tool: Vite
- Hosting: Netlify / Vercel (config for both included)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/) (repo includes `bun.lock` / `bunfig.toml`) — or npm, using the included `package-lock.json`
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/shantanupathak29/NGO_site.git
cd NGO_site

# Install dependencies
bun install
# or: npm install

# Run the development server
bun run dev
# or: npm run dev
```

The site should now be running locally at the port Vite prints in the terminal (default `http://localhost:3000`).

### Other scripts
```bash
bun run build        # production build
bun run build:spa    # SPA build (vite.spa.config.ts)
bun run preview       # preview the production build
bun run lint          # run ESLint
bun run format        # run Prettier
```

## Project Structure

```
NGO_site/
├── public/       # Static assets (images, icons, etc.)
├── src/        # Source code
├── index.html
├── vite.config.ts
├── vite.spa.config.ts
├── netlify.toml
├── vercel.json
├── tsconfig.json
├── AGENTS.md
├── README.md
└── package.json
```

## Contributing

We welcome contributions from volunteers and developers who want to support our mission!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

Please open an issue first for major changes, so we can discuss what you'd like to do.

---

*Made with by the Pragati Path team and volunteers.*