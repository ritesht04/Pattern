/**
 * Initializes a grid with a specified number of rows and columns.
 * All cells are initially set to an "off" state (0).
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @returns {number[][]} A 2D array representing the initial grid state.
 */
export const initPattern = (rows: number, cols: number): number[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

/**
 * Computes the next state of the grid based on a snake-like zigzag animation.
 * The snake moves in a zigzag pattern across the grid, with different segments
 * having different colors based on their age (distance from the head).
 * @param {number[][]} grid - The current grid state.
 * @param {number} tick - The current animation frame count.
 * @returns {number[][]} A new 2D array representing the next grid state.
 */
export const stepPattern = (grid: number[][], tick: number): number[][] => {
  const newGrid = initPattern(grid.length, grid[0]?.length || 0); // Start with a fresh grid
  const rows = newGrid.length;
  if (rows === 0) return [];
  const cols = newGrid[0].length;

  // Make the snake length relative to the grid size for a nice effect
  const snakeLength = Math.max(5, Math.floor(Math.min(rows, cols) * 0.8));

  // Loop backwards to draw each segment of the snake's body
  for (let i = 0; i < snakeLength; i++) {
    const segmentTick = tick - i;
    if (segmentTick < 0) continue; // Don't draw segments from before time 0

    // Calculate the total number of cells to determine when the pattern should loop
    const totalCells = rows * cols;
    const effectiveTick = segmentTick % totalCells;

    // Determine the current row for this segment
    const snakeRow = Math.floor(effectiveTick / cols);
    
    let snakeCol: number;
    // Determine column based on whether the row is even or odd to create the zig-zag
    if (snakeRow % 2 === 0) {
      // On even rows (0, 2, ...), the snake moves from left to right
      snakeCol = effectiveTick % cols;
    } else {
      // On odd rows (1, 3, ...), the snake moves from right to left
      snakeCol = cols - 1 - (effectiveTick % cols);
    }

    // Light up the cell for this segment if it's within the grid bounds
    if (snakeRow < rows && snakeCol >= 0 && snakeCol < cols) {
      // Assign the segment's tick value to the cell for dynamic coloring
      // Newer segments (closer to the head) will have a higher tick value
      newGrid[snakeRow][snakeCol] = segmentTick;
    }
  }

  return newGrid;
};

export interface PatternConfig {
  rows: number;
  cols: number;
  speed: number;
  isRunning: boolean;
  tick: number;
}

export class PatternManager {
  private config: PatternConfig;

  constructor(rows: number = 20, cols: number = 10, speed: number = 100) {
    this.config = {
      rows,
      cols,
      speed,
      isRunning: false,
      tick: 0
    };
  }

  getConfig(): PatternConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<PatternConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  reset(): void {
    this.config.tick = 0;
    this.config.isRunning = false;
  }

  nextTick(): number {
    this.config.tick++;
    return this.config.tick;
  }

  getCurrentTick(): number {
    return this.config.tick;
  }

  setTick(tick: number): void {
    this.config.tick = tick;
  }

  toggleRunning(): void {
    this.config.isRunning = !this.config.isRunning;
  }

  setRunning(running: boolean): void {
    this.config.isRunning = running;
  }

  setSpeed(speed: number): void {
    this.config.speed = speed;
  }

  setGridSize(rows: number, cols: number): void {
    this.config.rows = rows;
    this.config.cols = cols;
    this.config.tick = 0; // Reset tick when grid size changes
  }
}

// Export a singleton instance
export const patternManager = new PatternManager();
