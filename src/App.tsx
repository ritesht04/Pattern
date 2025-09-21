import React, { useState, useEffect, useCallback } from 'react';
import { patternGenerator, PatternStep } from './pattern';
import './App.css';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [patternSequence, setPatternSequence] = useState<PatternStep[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(500);

  // Initialize pattern sequence
  useEffect(() => {
    const sequence = patternGenerator.generatePatternSequence();
    setPatternSequence(sequence);
    patternGenerator.setAnimationSpeed(animationSpeed);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && patternSequence.length > 0) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= patternSequence.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, animationSpeed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, patternSequence.length, animationSpeed]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    patternGenerator.play();
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    patternGenerator.pause();
  }, []);

  const handleStepChange = useCallback((newStep: number) => {
    setCurrentStep(newStep);
    patternGenerator.setCurrentStep(newStep);
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep < patternSequence.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, patternSequence.length]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSpeedChange = useCallback((speed: number) => {
    setAnimationSpeed(speed);
    patternGenerator.setAnimationSpeed(speed);
  }, []);

  const currentPattern = patternSequence[currentStep] || { step: 0, cells: [], description: '' };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pattern Grid Visualization</h1>
        <p>{currentPattern.description}</p>
      </header>
      
      <main className="app-main">
        <div className="grid-container">
          <PatternGrid cells={currentPattern.cells} />
        </div>
        
        <TimelineControls
          currentStep={currentStep}
          totalSteps={patternSequence.length}
          isPlaying={isPlaying}
          animationSpeed={animationSpeed}
          onStepChange={handleStepChange}
          onPlay={handlePlay}
          onPause={handlePause}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
          onSpeedChange={handleSpeedChange}
        />
      </main>
    </div>
  );
};

interface PatternGridProps {
  cells: Array<{
    number: number;
    color: 'black' | 'blue' | 'red' | 'green';
    isActive: boolean;
  }>;
}

const PatternGrid: React.FC<PatternGridProps> = ({ cells }) => {
  return (
    <div className="pattern-grid">
      {cells.map((cell) => (
        <div
          key={cell.number}
          className={`grid-cell ${cell.color} ${cell.isActive ? 'active' : ''}`}
        >
          {cell.number}
        </div>
      ))}
    </div>
  );
};

interface TimelineControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  animationSpeed: number;
  onStepChange: (step: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSpeedChange: (speed: number) => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  animationSpeed,
  onStepChange,
  onPlay,
  onPause,
  onNextStep,
  onPreviousStep,
  onSpeedChange,
}) => {
  const progress = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="timeline-controls">
      <div className="timeline-slider">
        <div className="timeline-track">
          <div 
            className="timeline-progress" 
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={totalSteps - 1}
            value={currentStep}
            onChange={(e) => onStepChange(parseInt(e.target.value))}
            className="timeline-range"
          />
        </div>
        <div className="timeline-labels">
          <span>1</span>
          <span>{totalSteps}</span>
        </div>
      </div>

      <div className="control-buttons">
        <div className="speed-controls">
          <label htmlFor="speed">Speed:</label>
          <select
            id="speed"
            value={animationSpeed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          >
            <option value={100}>Fast</option>
            <option value={500}>Normal</option>
            <option value={1000}>Slow</option>
            <option value={2000}>Very Slow</option>
          </select>
        </div>

        <div className="playback-controls">
          <button 
            className="control-btn skip-btn"
            onClick={onPreviousStep}
            disabled={currentStep === 0}
            title="Previous Step"
          >
            ⏮
          </button>
          
          <button 
            className="control-btn rewind-btn"
            onClick={() => onStepChange(Math.max(0, currentStep - 10))}
            disabled={currentStep === 0}
            title="Rewind 10 Steps"
          >
            ⏪ 10
          </button>

          <button 
            className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={isPlaying ? onPause : onPlay}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>

          <button 
            className="control-btn fast-forward-btn"
            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 30))}
            disabled={currentStep >= totalSteps - 1}
            title="Fast Forward 30 Steps"
          >
            30 ⏩
          </button>

          <button 
            className="control-btn skip-btn"
            onClick={onNextStep}
            disabled={currentStep >= totalSteps - 1}
            title="Next Step"
          >
            ⏭
          </button>
        </div>

        <div className="step-info">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default App;
