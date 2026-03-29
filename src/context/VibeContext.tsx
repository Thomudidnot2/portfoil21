import React, { createContext, useContext, useState, ReactNode } from 'react';

type Vibe = 'electric' | 'gamer' | 'trader';

interface VibeContextType {
  vibe: Vibe;
  setVibe: (vibe: Vibe) => void;
  accentColor: string;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

export function VibeProvider({ children }: { children: ReactNode }) {
  const [vibe, setVibe] = useState<Vibe>('electric');

  const accentColor = vibe === 'electric' ? '#00FF41' : vibe === 'gamer' ? '#FF00FF' : '#00FFFF';

  return (
    <VibeContext.Provider value={{ vibe, setVibe, accentColor }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe() {
  const context = useContext(VibeContext);
  if (context === undefined) {
    throw new Error('useVibe must be used within a VibeProvider');
  }
  return context;
}
