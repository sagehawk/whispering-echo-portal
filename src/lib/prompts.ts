
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
