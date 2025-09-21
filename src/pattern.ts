export interface CellState {
  number: number;
  color: 'black' | 'blue' | 'red' | 'green';
  isActive: boolean;
}

export interface PatternStep {
  step: number;
  cells: CellState[];
  description: string;
}

export class PatternGenerator {
  private totalCells = 200;
  private totalSteps = 100;
  private currentStep = 0;
  private isPlaying = false;
  private animationSpeed = 500; // milliseconds

  // Define the zigzag patterns based on the images
  private bluePatterns = [
    // First diagonal pattern (down-right with deviations)
    [12, 23, 34, 45, 55, 64, 73, 82, 93, 104, 115, 125, 134, 143, 152, 159, 168, 177, 185, 186],
    // Second diagonal pattern (down-left with deviations)  
    [19, 28, 37, 46, 56, 67, 78, 89, 98, 107, 116, 126, 137, 148, 159, 168, 177, 185],
    // Additional blue cells
    [13, 24, 35, 46, 57, 68, 79, 90, 101, 112, 123, 134, 145, 156, 167, 178, 189]
  ];

  private redPatterns = [
    // First red diagonal pattern
    [17, 28, 39, 50, 61, 72, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182],
    // Second red diagonal pattern
    [16, 25, 34, 43, 52, 61, 72, 83, 94, 105, 116, 127, 138, 149, 160, 169, 178],
    // Red blocks at bottom
    [162, 163, 171, 172, 173, 181, 182, 183]
  ];

  private greenPatterns = [
    // Header row (1-10)
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // Bottom special cells
    [191, 192]
  ];

  generateInitialGrid(): CellState[] {
    const cells: CellState[] = [];
    
    for (let i = 1; i <= this.totalCells; i++) {
      let color: 'black' | 'blue' | 'red' | 'green' = 'black';
      
      // Check if number is in any pattern
      if (this.greenPatterns.some(pattern => pattern.includes(i))) {
        color = 'green';
      } else if (this.bluePatterns.some(pattern => pattern.includes(i))) {
        color = 'blue';
      } else if (this.redPatterns.some(pattern => pattern.includes(i))) {
        color = 'red';
      }

      cells.push({
        number: i,
        color,
        isActive: false
      });
    }

    return cells;
  }

  generatePatternSequence(): PatternStep[] {
    const sequence: PatternStep[] = [];
    const baseGrid = this.generateInitialGrid();

    for (let step = 0; step < this.totalSteps; step++) {
      const cells = [...baseGrid];
      let description = `Step ${step + 1}`;

      // Create animated patterns based on step
      if (step < 30) {
        // First phase: Show blue diagonal pattern
        this.animateBluePattern(cells, step, 30);
        description = `Blue Pattern Phase - Step ${step + 1}`;
      } else if (step < 60) {
        // Second phase: Show red diagonal pattern
        this.animateRedPattern(cells, step - 30, 30);
        description = `Red Pattern Phase - Step ${step + 1}`;
      } else {
        // Third phase: Combined zigzag pattern
        this.animateCombinedPattern(cells, step - 60, 40);
        description = `Combined Zigzag - Step ${step + 1}`;
      }

      sequence.push({
        step: step + 1,
        cells,
        description
      });
    }

    return sequence;
  }

  private animateBluePattern(cells: CellState[], progress: number, maxProgress: number) {
    const pattern = this.bluePatterns[0];
    const activeCount = Math.floor((pattern.length * progress) / maxProgress);
    
    // Reset all cells
    cells.forEach(cell => cell.isActive = false);
    
    // Activate cells progressively
    for (let i = 0; i < activeCount && i < pattern.length; i++) {
      const cellIndex = cells.findIndex(cell => cell.number === pattern[i]);
      if (cellIndex !== -1) {
        cells[cellIndex].isActive = true;
        cells[cellIndex].color = 'blue';
      }
    }
  }

  private animateRedPattern(cells: CellState[], progress: number, maxProgress: number) {
    const pattern = this.redPatterns[0];
    const activeCount = Math.floor((pattern.length * progress) / maxProgress);
    
    // Reset all cells
    cells.forEach(cell => cell.isActive = false);
    
    // Activate cells progressively
    for (let i = 0; i < activeCount && i < pattern.length; i++) {
      const cellIndex = cells.findIndex(cell => cell.number === pattern[i]);
      if (cellIndex !== -1) {
        cells[cellIndex].isActive = true;
        cells[cellIndex].color = 'red';
      }
    }
  }

  private animateCombinedPattern(cells: CellState[], progress: number, maxProgress: number) {
    const bluePattern = this.bluePatterns[1];
    const redPattern = this.redPatterns[1];
    
    // Reset all cells
    cells.forEach(cell => {
      cell.isActive = false;
      if (!this.greenPatterns.some(pattern => pattern.includes(cell.number))) {
        cell.color = 'black';
      }
    });
    
    // Create zigzag effect by alternating between patterns
    const totalSteps = Math.max(bluePattern.length, redPattern.length);
    const currentPos = Math.floor((progress * totalSteps) / maxProgress);
    
    // Activate blue cells
    for (let i = 0; i <= currentPos && i < bluePattern.length; i++) {
      const cellIndex = cells.findIndex(cell => cell.number === bluePattern[i]);
      if (cellIndex !== -1) {
        cells[cellIndex].isActive = true;
        cells[cellIndex].color = 'blue';
      }
    }
    
    // Activate red cells with offset for zigzag effect
    const redOffset = Math.floor(currentPos / 2);
    for (let i = 0; i <= redOffset && i < redPattern.length; i++) {
      const cellIndex = cells.findIndex(cell => cell.number === redPattern[i]);
      if (cellIndex !== -1) {
        cells[cellIndex].isActive = true;
        cells[cellIndex].color = 'red';
      }
    }
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  getTotalSteps(): number {
    return this.totalSteps;
  }

  setCurrentStep(step: number): void {
    this.currentStep = Math.max(0, Math.min(step, this.totalSteps - 1));
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  play(): void {
    this.isPlaying = true;
  }

  pause(): void {
    this.isPlaying = false;
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  setAnimationSpeed(speed: number): void {
    this.animationSpeed = Math.max(100, Math.min(speed, 2000));
  }

  getAnimationSpeed(): number {
    return this.animationSpeed;
  }
}

// Export a singleton instance
export const patternGenerator = new PatternGenerator();
