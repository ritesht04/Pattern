# Pattern Grid Visualization

An interactive React.js application that displays a numerical grid with animated zigzag patterns, featuring timeline controls for pattern playback.

## Features

- **Interactive Grid**: 200-cell grid (10x20) with numbers 1-200
- **Animated Patterns**: Blue and red cells that form zigzag patterns
- **Timeline Controls**: Play, pause, step forward/backward controls
- **Speed Control**: Adjustable animation speed
- **Responsive Design**: Works on desktop and mobile devices

## Pattern Types

### Blue Patterns
- Diagonal patterns moving down-right and down-left
- Progressive activation during animation
- Glowing blue effect with shadows

### Red Patterns  
- Complementary diagonal patterns
- Block formations at bottom of grid
- Glowing red effect with shadows

### Green Cells
- Header row (numbers 1-10)
- Special bottom cells (191-192)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Usage

- **Play/Pause**: Click the orange play button to start/stop animation
- **Timeline**: Drag the slider to jump to any step
- **Speed Control**: Adjust animation speed from Fast to Very Slow
- **Step Controls**: Use arrow buttons to move step by step
- **Skip Controls**: Jump forward/backward by 10 or 30 steps

## Animation Phases

1. **Phase 1 (Steps 1-30)**: Blue diagonal pattern activation
2. **Phase 2 (Steps 31-60)**: Red diagonal pattern activation  
3. **Phase 3 (Steps 61-100)**: Combined zigzag pattern with both colors

## Technical Details

- Built with React 18 and TypeScript
- Uses Vite for fast development and building
- CSS Grid for responsive layout
- Custom pattern generation algorithm
- Smooth animations with CSS transitions

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── pattern.ts       # Pattern generation logic
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
