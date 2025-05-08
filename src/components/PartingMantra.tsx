
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { getMantraByState } from '@/lib/prompts';

const PartingMantra = () => {
  const { mantra, reflection, mindState, resetJourney, startNewJourney } = useJourney();
  const [isVisible, setIsVisible] = useState(false);
  const [showWords, setShowWords] = useState(true);
  
  // Get state-specific mantra if applicable
  const stateMantra = mindState ? getMantraByState(mindState) : mantra;
  
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
      }, 2000);
      
      return () => clearTimeout(fadeTimer);
    }, 500);
    
    return () => clearTimeout(visibleTimer);
  }, []);

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
              {stateMantra}
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button 
              onClick={startNewJourney}
              variant="mystic"
              className="animate-appear"
              style={{ animationDelay: '2s' }}
            >
              Try Another Reflection
            </Button>
            
            <Button 
              onClick={resetJourney}
              variant="mystic"
              className="animate-appear"
              style={{ animationDelay: '2.5s' }}
            >
              Begin Your Day
            </Button>
            
            <Button 
              onClick={resetJourney}
              variant="outline"
              className="text-white/70 hover:text-white border-white/20 hover:border-white/30 backdrop-blur-sm animate-appear"
              style={{ animationDelay: '3s' }}
            >
              Release These Thoughts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartingMantra;
