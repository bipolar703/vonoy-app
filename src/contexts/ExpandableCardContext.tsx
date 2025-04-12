import React, { createContext, useState, useContext } from 'react';

interface ExpandableCardContextType {
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
  toggleCard: (id: string) => void;
}

const ExpandableCardContext = createContext<ExpandableCardContextType | undefined>(undefined);

/**
 * ExpandableCardProvider Component
 * 
 * Provides context for managing expandable cards, ensuring only one card
 * is expanded at a time for a cleaner user experience.
 */
export const ExpandableCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  
  const toggleCard = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };
  
  return (
    <ExpandableCardContext.Provider value={{ expandedCardId, setExpandedCardId, toggleCard }}>
      {children}
    </ExpandableCardContext.Provider>
  );
};

/**
 * useExpandableCard Hook
 * 
 * Custom hook to access the expandable card context.
 */
export const useExpandableCard = (): ExpandableCardContextType => {
  const context = useContext(ExpandableCardContext);
  
  if (context === undefined) {
    throw new Error('useExpandableCard must be used within an ExpandableCardProvider');
  }
  
  return context;
};

export default ExpandableCardContext;
