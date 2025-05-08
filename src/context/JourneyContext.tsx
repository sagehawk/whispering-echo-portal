
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTodaysInvocation, getRandomMantra, getPromptByState } from '@/lib/prompts';

// Define the journey stages
export type JourneyStage = 'portal' | 'invocation' | 'reflection' | 'mantra' | 'reset';

// Define mind states
export type MindState = 'morning' | 'afternoon' | 'creative' | 'stress' | 'gratitude' | 'evening' | null;

// Define the context shape
type JourneyContextType = {
  stage: JourneyStage;
  reflection: string;
  invocation: string;
  mantra: string;
  mindState: MindState;
  setStage: (stage: JourneyStage) => void;
  setReflection: (text: string) => void;
  setMindState: (state: MindState) => void;
  resetJourney: () => void;
  startNewJourney: () => void;
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
  const [mindState, setMindState] = useState<MindState>(null);

  // Initialize invocation on first load
  useEffect(() => {
    setInvocation(getTodaysInvocation());
    setMantra(getRandomMantra());
  }, []);

  // Update invocation when mind state changes
  useEffect(() => {
    if (mindState) {
      setInvocation(getPromptByState(mindState));
    }
  }, [mindState]);

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
    setMindState(null);
    
    // After a brief pause, return to portal
    setTimeout(() => {
      setStage('portal');
    }, 1500);
  };

  // Start a new journey (keeping the same phase but getting new prompts)
  const startNewJourney = () => {
    setStage('invocation');
    setReflection('');
    setInvocation(getPromptByState(mindState || 'morning'));
    setMantra(getRandomMantra());
  };

  // Context value
  const value = {
    stage,
    reflection,
    invocation,
    mantra,
    mindState,
    setStage,
    setReflection,
    setMindState,
    resetJourney,
    startNewJourney,
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
