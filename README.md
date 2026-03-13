# TestMachine Landing Page

The official TestMachine website - a modern web application showcasing our blockchain security platform and reinforcement learning capabilities.

## About TestMachine

TestMachine specializes in Web3 security testing and smart contract auditing, powered by advanced reinforcement learning algorithms. Our platform helps organizations identify vulnerabilities and optimize blockchain protocols.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable components
│   │   ├── ui/             # Basic UI components
│   │   ├── layout/         # Navigation, footer, etc.
│   │   ├── sections/       # Page sections (Hero, Stats, etc.)
│   │   └── visualizations/ # Interactive demos and animations
│   ├── stores/             # Svelte stores for state
│   ├── utils/              # Utility functions
│   ├── data/               # Static data
│   └── styles/             # Shared styles
└── routes/                 # Pages and routing
    ├── +layout.svelte      # Root layout
    ├── +page.svelte        # Homepage
    └── ...                 # Additional pages
```

## Features

### Core Functionality
- **RL Trajectory Visualization** - Interactive reinforcement learning demo
- **Azimuth Analysis** - Real-time blockchain security simulation  
- **Responsive Design** - Optimized for all devices
- **Theme System** - Light/dark mode with persistence
- **Performance Optimized** - Fast loading and smooth animations

### Technical Stack
- **SvelteKit** - Modern web framework
- **TypeScript** - Type-safe development
- **Canvas Rendering** - High-performance visualizations
- **Responsive CSS** - Mobile-first design
- **SEO Optimized** - Proper meta tags and structure

## Development

### Commands
```bash
# Type checking
npm run check

# Linting
npm run lint

# Formatting
npm run format
```

### Environment Variables
```env
PUBLIC_ANALYTICS_ID=GA4_TRACKING_ID
```

## Deployment

Configured for deployment to:
- Vercel (recommended) 
- Netlify
- CloudFlare Pages
- Any static hosting provider

Build command: `npm run build`
Output directory: `build/`

## License

Proprietary software © TestMachine. All rights reserved.

## Contact

For questions about this codebase, contact the development team through official TestMachine channels.