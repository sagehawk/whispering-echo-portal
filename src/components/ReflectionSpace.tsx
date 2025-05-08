
import React, { useState, useEffect, useRef } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';

const ReflectionSpace = () => {
  const { invocation, reflection, setReflection, submitReflection } = useJourney();
  const [isVisible, setIsVisible] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Fade in the component
    const timer = setTimeout(() => {
      setIsVisible(true);
      textareaRef.current?.focus();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Create ripple effect when typing
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 500);
    
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (reflection.trim()) {
      setIsVisible(false);
      setTimeout(() => {
        submitReflection();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className={cn(
        "max-w-2xl w-full mx-auto text-center transition-all duration-1000",
        isVisible ? "opacity-100" : "opacity-0 translate-y-4"
      )}>
        <h2 className="text-xl md:text-2xl font-normal text-mystic-gold/80 mb-2">
          Your Reflection
        </h2>
        
        <p className="text-md text-white/60 mb-8 font-light">
          {invocation}
        </p>
        
        <div className={cn(
          "relative mx-auto max-w-md w-full mb-10",
          isRippling ? "after:animate-pulse-subtle" : ""
        )}>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-mystic-gold/5 to-transparent rounded-lg transform scale-105 blur-md"></div>
          <textarea
            ref={textareaRef}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Begin writing your thoughts..."
            className="ethereal-input min-h-[150px] text-white/90 resize-none"
            rows={5}
          />
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!reflection.trim()}
          className={cn(
            "mystic-button",
            !reflection.trim() ? "opacity-50 cursor-not-allowed" : "opacity-100"
          )}
        >
          Release These Thoughts
        </button>
        
        <p className="text-sm text-white/40 mt-4 font-light">
          Your words will dissolve, leaving only their essence.
        </p>
      </div>
    </div>
  );
};

export default ReflectionSpace;
