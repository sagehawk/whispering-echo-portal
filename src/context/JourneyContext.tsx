
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTodaysInvocation, getRandomMantra } from '@/lib/prompts';

// Define the journey stages
export type JourneyStage = 'portal' | 'invocation' | 'reflection' | 'mantra' | 'reset';

// Define the context shape
type JourneyContextType = {
  stage: JourneyStage;
  reflection: string;
  invocation: string;
  mantra: string;
  setStage: (stage: JourneyStage) => void;
  setReflection: (text: string) => void;
  resetJourney: () => void;
  submitReflection: () => void;
};

// Create the context
const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

// Context provider component
export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<JourneyStage>('portal');
  const [reflection, setReflection] = useState<string>('');
  const [invocation, setInvocation] = useState<string>('');
  const [mantra, setMantra] = useState<string>('');

  // Initialize invocation on first load
  useEffect(() => {
    setInvocation(getTodaysInvocation());
    setMantra(getRandomMantra());
  }, []);

  // Function to handle reflection submission
  const submitReflection = () => {
    if (reflection.trim()) {
      setStage('mantra');
    }
  };

  // Reset journey back to beginning
  const resetJourney = () => {
    setStage('reset');
    setReflection('');
    
    // After a brief pause, return to portal
    setTimeout(() => {
      setStage('portal');
    }, 1500);
  };

  // Context value
  const value = {
    stage,
    reflection,
    invocation,
    mantra,
    setStage,
    setReflection,
    resetJourney,
    submitReflection
  };

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
};

// Custom hook for using the journey context
export const useJourney = (): JourneyContextType => {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
