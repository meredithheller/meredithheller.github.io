# MERE AND MORE

A personal portfolio website featuring an interactive landing page with animated confetti particles.

## Features

- **Animated Landing Page**: Brand title animation followed by interactive confetti particles
- **Interactive Confetti**: Hover over confetti pieces to see them grow and push nearby pieces away
- **Data Architecture**: Ready for backend integration with timeline data structure

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS3

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── LandingPage/      # Main landing page components
│   ├── Timeline/         # Timeline components (for future use)
│   └── Filter/          # Filter components (for future use)
├── data/
│   └── dummyTimelineData.ts  # Sample data structure
├── types/
│   └── timeline.ts      # TypeScript type definitions
└── App.tsx              # Main application component
```

## Future Development

The project is architected to support:
- Interactive confetti pieces that display timeline data on hover/selection
- Backend integration for dynamic content
- Category filtering and timeline navigation

## License

Private project - All rights reserved
