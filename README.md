# TestMachine SvelteKit Conversion

This is the SvelteKit conversion of the TestMachine website, transforming a 108KB HTML file with embedded JavaScript into a modern, maintainable, and performant web application.

## Project Overview

- **Original**: Single HTML file with 2000+ lines of inline JavaScript
- **New Architecture**: Component-based SvelteKit application with TypeScript
- **Key Features**: RL trajectory visualization, interactive demos, theme system
- **Performance**: Optimized bundles, code splitting, better caching

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
│   │   ├── visualizations/ # Complex animations (Trajectory, etc.)
│   │   └── forms/          # Form components
│   ├── stores/             # Svelte stores for state
│   ├── utils/              # Utility functions
│   ├── data/               # Static data
│   └── styles/             # Shared styles
└── routes/                 # Pages and routing
    ├── +layout.svelte      # Root layout
    ├── +page.svelte        # Homepage
    └── ...                 # Other pages
```

## Component Status

### ✅ Implemented
- [x] Navigation with theme toggle
- [x] Hero section with animations
- [x] Social proof testimonial
- [x] Statistics with count-up animation
- [x] Theme system (dark/light mode)
- [x] Responsive layout system

### 🚧 In Progress  
- [ ] Trajectory visualization (complex canvas component)
- [ ] Azimuth demo simulation
- [ ] Contact form with validation
- [ ] Mobile menu with transitions

### 📋 Planned
- [ ] Token explorer interface
- [ ] Predator technology demo
- [ ] Investor/partner grids
- [ ] Blog system
- [ ] SEO optimization
- [ ] Performance tuning

## Key Features

### Theme System
The app supports both light and dark themes with automatic persistence:
```typescript
import { theme } from '$lib/stores/theme';
theme.toggle(); // Switch themes
```

### Animations
Built-in scroll reveal and count-up animations:
```svelte
<div data-animate>Content that animates on scroll</div>
```

### Canvas Visualizations
The complex trajectory visualization will be the most challenging component to convert, requiring:
- Canvas rendering engine
- 3D mathematical projections
- Particle effects and animations
- Mobile optimization
- State management for 200+ episodes

## Development Notes

### Original Challenges Addressed
1. **Maintainability**: 2000+ lines of inline JS → organized components
2. **Performance**: Large single file → optimized bundles with code splitting  
3. **Developer Experience**: No tooling → TypeScript, hot reload, proper debugging
4. **SEO**: Single page → proper routing and meta tags
5. **Accessibility**: Limited ARIA → proper semantic HTML and ARIA

### Performance Optimizations
- Route-based code splitting (automatic with SvelteKit)
- Lazy loading for heavy components
- Intersection Observer for animations
- Canvas performance management
- Image optimization and WebP conversion

### Migration Strategy
1. **Phase 1**: Basic structure and static sections (CURRENT)
2. **Phase 2**: Interactive components and forms  
3. **Phase 3**: Complex visualizations (trajectory, Azimuth)
4. **Phase 4**: Optimization, testing, deployment

## Assets

Copy the following assets from the original site:
```bash
# Copy all assets from original site
cp -r ~/sites/testmachine/assets/* static/assets/
```

Required assets:
- `logo-icon-white.png` - Main logo
- Partner logos for partnerships section
- Investor logos for backed-by section  
- Product screenshots for demos

## Configuration

### Environment Variables
```env
# API endpoints (when needed)
PUBLIC_CONTACT_API_URL=https://api.testmachine.ai/contact
PUBLIC_ANALYTICS_ID=GA4_TRACKING_ID
```

### Build Configuration
- `svelte.config.js` - SvelteKit configuration
- `vite.config.ts` - Vite bundler settings
- `tsconfig.json` - TypeScript configuration

## Testing

```bash
# Type checking
npm run check

# Linting
npm run lint

# Formatting
npm run format
```

## Deployment

The app is configured for deployment to:
- Vercel (recommended) 
- Netlify
- CloudFlare Pages
- Any static host (after `npm run build`)

## Contributing

1. Follow the established component structure
2. Use TypeScript for all new code
3. Include proper ARIA attributes for accessibility
4. Test on both light and dark themes
5. Ensure mobile responsiveness

## Architecture Decisions

### Why SvelteKit?
- **Performance**: Compiled framework with smaller bundles
- **Developer Experience**: Great TypeScript support, hot reload
- **SEO**: Built-in SSR and static generation
- **Ecosystem**: Rich component ecosystem and tooling

### Component Strategy
- **Separation of Concerns**: Logic, styles, and markup in single files
- **Reusability**: UI components for consistent design
- **State Management**: Reactive stores for global state
- **Performance**: Lazy loading and code splitting

### Canvas Approach
For the complex trajectory visualization:
- Extract rendering logic to separate modules
- Use Web Workers for heavy calculations
- Implement proper cleanup on component destroy
- Mobile-specific optimizations

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [TypeScript with Svelte](https://svelte.dev/docs/typescript)
- [Original Analysis Document](./testmachine-sveltekit-analysis.md)
- [Component Breakdown](./testmachine-component-breakdown.md)