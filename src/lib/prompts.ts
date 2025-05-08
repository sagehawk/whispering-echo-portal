
// Daily invocations - thought-provoking questions
export const invocations = [
  "What truth do you seek today?",
  "What is the weight you wish to set down?",
  "What light guides you forward in this moment?",
  "What forgotten strength waits to be reclaimed?",
  "What shadow must you face to find clarity?",
  "What voice within you needs to be heard?",
  "What path calls to your spirit today?",
  "What dream seeks to be born through you?",
  "What ancient wisdom resonates in your bones?",
  "What barriers dissolve when you honor your truth?",
  "What mystery beckons you forward?",
  "What flame needs tending in your inner sanctuary?",
  "What story about yourself are you ready to release?",
  "What hidden strength emerges in your stillness?",
  "What star guides your journey tonight?",
];

// Parting mantras - affirmations after reflection
export const mantras = [
  "You have spoken. Now, act.",
  "The fog clears as you rise.",
  "Step forward, unburdened.",
  "Your words have power. Let them manifest.",
  "Clarity comes to those who seek within.",
  "The answer was always yours to find.",
  "What is named can be transformed.",
  "In recognition lies freedom.",
  "The path reveals itself to the awakened heart.",
  "Your truth is a flame that cannot be extinguished.",
  "The universe bends toward your authentic voice.",
  "Shadows flee from acknowledged light.",
  "Your courage illuminates the way forward.",
  "Ancient wisdom flows through your modern steps.",
  "The circle is complete. Begin anew.",
];

// Context-specific prompts
export const statePrompts = {
  morning: [
    "Imagine the sun's first light rising within you—what ignites?",
    "You stand at the threshold of possibility—what will you build today?",
    "As dawn breaks in your mind, what clarity emerges?"
  ],
  afternoon: [
    "See yourself at the peak of your day—what have you already conquered?",
    "A second wind flows through you—what task now calls?",
    "The day's middle path unfolds—where will you direct your energy?"
  ],
  creative: [
    "A blank canvas waits—what colors will you pour from your mind?",
    "Hear the whisper of a new idea—what shape does it take?",
    "Creativity stirs in the depths—what wants to emerge through you?"
  ],
  stress: [
    "Feel a weight lift from your shoulders—what does freedom feel like?",
    "Picture a storm clearing in your mind—what clarity remains?",
    "As tension dissolves, what truth surfaces in its place?"
  ],
  gratitude: [
    "Recall one small miracle of today—how does your heart open?",
    "A soft glow fills your being—what are you thankful for right now?",
    "In this moment of appreciation, what blessings come into focus?"
  ],
  evening: [
    "Trace the footsteps of today—where did you grow?",
    "The moon invites stillness—what lesson do you carry forward?",
    "As the day's light fades, what wisdom remains illuminated?"
  ]
};

// State-specific mantras
export const stateMantras = {
  morning: "May your purpose guide every step.",
  afternoon: "Your momentum is unwavering.",
  creative: "Inspiration flows through you.",
  stress: "Peace returns with every breath.",
  gratitude: "Grace grows in a thankful heart.",
  evening: "Rest now, wisdom wakes tomorrow."
};

// Get a random item from an array
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Get today's invocation (persistent for the day)
export const getTodaysInvocation = (): string => {
  const today = new Date().toLocaleDateString();
  // Use the date string to create a consistent "random" index for today
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash) + today.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  const index = positiveHash % invocations.length;
  return invocations[index];
};

// Get a random mantra
export const getRandomMantra = (): string => {
  return getRandomItem(mantras);
};

// Get prompt based on mind state
export const getPromptByState = (state: 'morning' | 'afternoon' | 'creative' | 'stress' | 'gratitude' | 'evening'): string => {
  const statePromptsArray = statePrompts[state];
  return getRandomItem(statePromptsArray);
};

// Get mantra based on mind state
export const getMantraByState = (state: 'morning' | 'afternoon' | 'creative' | 'stress' | 'gratitude' | 'evening'): string => {
  return stateMantras[state];
};
