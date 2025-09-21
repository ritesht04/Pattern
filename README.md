# Generative Grid Animator

An interactive React.js application that displays a dynamic grid with snake-like zigzag patterns, featuring responsive controls and smooth animations.

## Features

- **Dynamic Grid**: Configurable rows and columns (minimum 5x5)
- **Snake Animation**: Zigzag pattern that moves across the grid like a snake
- **Interactive Controls**: Play, pause, clear, and speed adjustment
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Cell Interaction**: Click cells to toggle when animation is paused
- **Smooth Animations**: HSL color transitions for beautiful visual effects

## Pattern Algorithm

The animation creates a "snake" that moves in a zigzag pattern:
- **Even rows**: Snake moves left to right
- **Odd rows**: Snake moves right to left
- **Dynamic colors**: Each segment has a different color based on its age
- **Configurable length**: Snake length adapts to grid size

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser to `http://localhost:3000`**

## Usage

### Controls
- **Rows/Columns**: Adjust grid dimensions (minimum 5)
- **Speed Slider**: Control animation speed (20ms to 500ms)
- **Start/Pause**: Toggle animation with the cyan button
- **Clear**: Reset grid and stop animation
- **Cell Interaction**: Click cells to toggle when paused

### Responsive Design
- **Desktop**: Full 4-column control layout
- **Tablet**: Responsive grid adjusts to screen size
- **Mobile**: Stacked controls with touch-friendly buttons

## Technical Details

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development
- **Styling**: Tailwind CSS for responsive design
- **Animation**: Custom snake algorithm with HSL color transitions
- **Performance**: Optimized with useCallback and useRef

## Project Structure

```
src/
├── App.tsx          # Main application component
├── pattern.ts       # Snake animation logic
├── main.tsx         # Application entry point
├── index.css        # Global styles with Tailwind
└── vite-env.d.ts    # TypeScript declarations
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Customization

The snake algorithm can be customized in `src/pattern.ts`:
- Adjust `snakeLength` calculation for different snake sizes
- Modify color calculation in `hsl()` for different color schemes
- Change zigzag logic for different movement patterns
