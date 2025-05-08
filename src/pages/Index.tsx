
import React, { useEffect } from 'react';
import { JourneyProvider, useJourney } from '@/context/JourneyContext';
import ParticleBackground from '@/components/ParticleBackground';
import PortalEntry from '@/components/PortalEntry';
import InvocationPrompt from '@/components/InvocationPrompt';
import ReflectionSpace from '@/components/ReflectionSpace';
import PartingMantra from '@/components/PartingMantra';

// Main component that manages the journey flow
const JourneyContainer = () => {
  const { stage } = useJourney();
  
  // Change page title based on stage
  useEffect(() => {
    const titles = {
      portal: 'Mystic Empowerment | Enter',
      invocation: 'Mystic Empowerment | Daily Invocation',
      reflection: 'Mystic Empowerment | Reflect',
      mantra: 'Mystic Empowerment | Parting Wisdom',
      reset: 'Mystic Empowerment',
    };
    
    document.title = titles[stage];
  }, [stage]);

  return (
    <div className="mystic-container">
      <ParticleBackground />
      
      {/* Render different components based on journey stage */}
      {stage === 'portal' && <PortalEntry />}
      {stage === 'invocation' && <InvocationPrompt />}
      {stage === 'reflection' && <ReflectionSpace />}
      {stage === 'mantra' && <PartingMantra />}
      {stage === 'reset' && (
        <div className="animate-fade-out flex items-center justify-center h-screen">
          <div className="w-12 h-12 rounded-full bg-mystic-gold/30 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

// Wrap the app with the Journey Provider
const Index = () => {
  return (
    <JourneyProvider>
      <JourneyContainer />
    </JourneyProvider>
  );
};

export default Index;
