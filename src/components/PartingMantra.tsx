
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';

const PartingMantra = () => {
  const { mantra, reflection, resetJourney } = useJourney();
  const [isVisible, setIsVisible] = useState(false);
  const [showWords, setShowWords] = useState(true);
  
  useEffect(() => {
    // Sequence of animations:
    // 1. Show the reflection briefly
    // 2. Fade out the reflection
    // 3. Show the mantra
    
    // First, make the component visible
    const visibleTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Then, fade out the reflection words after 2 seconds
      const fadeTimer = setTimeout(() => {
        setShowWords(false);
        
        // Finally, automatically reset after a delay
        const resetTimer = setTimeout(() => {
          resetJourney();
        }, 6000);
        
        return () => clearTimeout(resetTimer);
      }, 2000);
      
      return () => clearTimeout(fadeTimer);
    }, 500);
    
    return () => clearTimeout(visibleTimer);
  }, [resetJourney]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className={cn(
        "max-w-xl mx-auto text-center transition-all duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}>
        {showWords && (
          <div className="animate-dissolve mb-10">
            <p className="text-xl md:text-2xl text-white/60 font-light italic">
              {reflection}
            </p>
          </div>
        )}
        
        <div className={cn(
          "transition-all duration-1000",
          !showWords ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="mantra-box my-8 animate-appear" style={{ animationDelay: '1.5s' }}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal cosmic-text">
              {mantra}
            </h1>
          </div>
          
          <button 
            onClick={resetJourney}
            className={cn(
              "mystic-button mt-8",
              "animate-appear opacity-0"
            )}
            style={{ animationDelay: '3s' }}
          >
            Return to Beginning
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartingMantra;
