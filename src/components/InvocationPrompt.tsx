
import React, { useState, useEffect } from 'react';
import { useJourney } from '@/context/JourneyContext';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const InvocationPrompt = () => {
  const { invocation, setStage, mindState, setMindState } = useJourney();
  const [isVisible, setIsVisible] = useState(false);
  const [showStateSelection, setShowStateSelection] = useState(true);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Fade in the component with a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMindStateSelect = (state: 'morning' | 'afternoon' | 'creative' | 'stress' | 'gratitude' | 'evening') => {
    setIsTransitioning(true);
    
    // Transition timing
    setTimeout(() => {
      setMindState(state);
      setShowStateSelection(false);
      setIsTransitioning(false);
    }, 600);
  };

  const handleRadioChange = (state: string) => {
    setSelectedState(state);
    // Automatically continue after selection
    handleMindStateSelect(state as any);
  };

  const handleFinalContinue = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setStage('reflection');
      }, 500);
    }, 300);
  };

  const handleExitJourney = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setStage('portal');
      }, 500);
    }, 300);
  };

  const mindStateOptions = [
    { id: 'morning', label: 'Morning Launch', description: 'Start your day with intention' },
    { id: 'afternoon', label: 'Afternoon Momentum', description: 'Maintain or regain midday focus' },
    { id: 'creative', label: 'Creative Spark', description: 'Seek inspiration and new ideas' },
    { id: 'stress', label: 'Stress Release', description: 'Let go of tension and overwhelm' },
    { id: 'gratitude', label: 'Gratitude Pause', description: 'Cultivate appreciation and calm' },
    { id: 'evening', label: 'Evening Reflection', description: 'Close your day with awareness' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className={cn(
        "max-w-xl mx-auto text-center transition-all duration-1000",
        isVisible ? "opacity-100" : "opacity-0 translate-y-4"
      )}>
        {showStateSelection ? (
          <div className={cn(
            "animate-fade-in transition-all duration-500",
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}>
            <h2 className="text-xl md:text-2xl font-normal text-mystic-gold mb-8">
              Where is your mind in this moment?
            </h2>
            
            <div className="mantra-box bg-gradient-to-b from-mystic-purple/20 to-mystic-blue/20 p-6 backdrop-blur-sm">
              <RadioGroup className="space-y-4 text-left" value={selectedState || ''} onValueChange={handleRadioChange}>
                {mindStateOptions.map((option) => (
                  <label 
                    key={option.id}
                    className={cn(
                      "flex items-start p-4 rounded-md transition-all duration-300 cursor-pointer",
                      selectedState === option.id 
                        ? "bg-gradient-to-r from-mystic-gold/20 to-transparent border border-mystic-gold/30" 
                        : "hover:bg-white/5 border border-white/10"
                    )}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <div className="ml-3">
                      <div className={cn(
                        "font-medium",
                        selectedState === option.id ? "text-mystic-gold" : "text-white"
                      )}>
                        {option.label}
                      </div>
                      <div className="text-sm text-white/60">{option.description}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className={cn(
            "transition-all duration-500",
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}>
            <h2 className="text-xl md:text-2xl font-normal text-mystic-gold mb-4">
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleFinalContinue}
                variant="mystic"
              >
                Continue
              </Button>
              
              <Button 
                onClick={handleExitJourney}
                variant="outline"
                className="text-white/70 hover:text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
              >
                Release These Thoughts
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvocationPrompt;
