
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const InvocationPrompt = () => {
  const { invocation, setStage, mindState, setMindState } = useJourney();
  const [isVisible, setIsVisible] = useState(false);
  const [showStateSelection, setShowStateSelection] = useState(true);

  useEffect(() => {
    // Fade in the component
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMindStateSelect = (state: 'morning' | 'afternoon' | 'creative' | 'stress' | 'gratitude' | 'evening') => {
    setMindState(state);
    setShowStateSelection(false);
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
        {showStateSelection ? (
          <div className="animate-fade-in">
            <h2 className="text-xl md:text-2xl font-normal text-mystic-gold/80 mb-6">
              Where is your mind in this moment?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                onClick={() => handleMindStateSelect('morning')}
                className="mystic-button"
              >
                Morning Launch
              </Button>
              
              <Button
                onClick={() => handleMindStateSelect('afternoon')}
                className="mystic-button"
              >
                Afternoon Momentum
              </Button>
              
              <Button
                onClick={() => handleMindStateSelect('creative')}
                className="mystic-button"
              >
                Creative Spark
              </Button>
              
              <Button
                onClick={() => handleMindStateSelect('stress')}
                className="mystic-button"
              >
                Stress Release
              </Button>
              
              <Button
                onClick={() => handleMindStateSelect('gratitude')}
                className="mystic-button"
              >
                Gratitude Pause
              </Button>
              
              <Button
                onClick={() => handleMindStateSelect('evening')}
                className="mystic-button"
              >
                Evening Reflection
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-normal text-mystic-gold/80 mb-4">
              Your Invocation
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
