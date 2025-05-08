
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';

const InvocationPrompt = () => {
  const { invocation, setStage } = useJourney();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in the invocation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
        
        <button 
          onClick={handleContinue}
          className="mystic-button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InvocationPrompt;
