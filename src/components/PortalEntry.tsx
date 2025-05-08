
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';

const PortalEntry = () => {
  const { setStage } = useJourney();
  const [isAnimating, setIsAnimating] = useState(false);

  const enterPortal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStage('invocation');
    }, 1000);
  };

  // Add a subtle animation effect on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 
        className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-light mb-6 cosmic-text text-shadow",
          isAnimating ? "animate-fade-out" : "animate-fade-in"
        )}
      >
        Mystic Empowerment
      </h1>
      
      <div 
        className={cn(
          "w-16 h-16 md:w-24 md:h-24 rounded-full mb-10 relative",
          "bg-gradient-to-b from-mystic-gold/20 to-transparent animate-pulse-subtle",
          isAnimating ? "scale-150 opacity-0 transition-all duration-1000" : "scale-100 transition-all duration-500"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-mystic-glow animate-pulse-subtle"></div>
      </div>
      
      <p 
        className={cn(
          "max-w-md mx-auto text-lg md:text-xl text-secondary/80 mb-10",
          "font-light tracking-wide",
          isAnimating ? "animate-fade-out" : "animate-fade-in"
        )}
      >
        Enter a space of reflection, where thoughts dissolve and clarity emerges.
      </p>
      
      <button 
        onClick={enterPortal}
        className={cn(
          "mystic-button",
          isAnimating ? "opacity-0 translate-y-4" : "opacity-100",
          "transition-all duration-500"
        )}
      >
        Begin Journey
      </button>
    </div>
  );
};

export default PortalEntry;
