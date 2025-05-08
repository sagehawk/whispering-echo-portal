
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const InvocationPrompt = () => {
  const { invocation, setStage, workPhase, setWorkPhase } = useJourney();
  const [isVisible, setIsVisible] = useState(false);
  const [showPhaseSelection, setShowPhaseSelection] = useState(true);

  useEffect(() => {
    // Fade in the component
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleWorkPhaseSelect = (phase: 'starting' | 'continuing' | 'ending') => {
    setWorkPhase(phase);
    setShowPhaseSelection(false);
  };

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStage('reflection');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className={cn(
        "max-w-xl mx-auto text-center transition-all duration-1000",
        isVisible ? "opacity-100" : "opacity-0 translate-y-4"
      )}>
        {showPhaseSelection ? (
          <div className="animate-fade-in">
            <h2 className="text-xl md:text-2xl font-normal text-mystic-gold/80 mb-6">
              Where are you in your day?
            </h2>
            
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center">
              <Button
                onClick={() => handleWorkPhaseSelect('starting')}
                className="mystic-button"
              >
                Starting Work
              </Button>
              
              <Button
                onClick={() => handleWorkPhaseSelect('continuing')}
                className="mystic-button"
              >
                Continuing Work
              </Button>
              
              <Button
                onClick={() => handleWorkPhaseSelect('ending')}
                className="mystic-button"
              >
                Ending Work
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-normal text-mystic-gold/80 mb-4">
              Daily Invocation
            </h2>
            
            <div className="mantra-box my-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal cosmic-text">
                {invocation}
              </h1>
            </div>
            
            <p className="text-md md:text-lg text-white/70 mb-10 font-light max-w-md mx-auto">
              Take a moment to let this question resonate within you. When you're ready, 
              share your thoughts.
            </p>
            
            <Button 
              onClick={handleContinue}
              className="mystic-button"
            >
              Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default InvocationPrompt;
