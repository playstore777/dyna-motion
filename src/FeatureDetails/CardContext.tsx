import React, { createContext, useState, useContext } from "react";

// Define the shape of the context
type CardContextType = {
  numCards: number;
  setNumCards: (x: number) => void;
  framesPerCard: number;
  setFramesPerCard: (x: number) => void;
  totalDurationInFrames: number;
  updateTotalDurationInFrames: (value: number) => void;
};

// Create a Context with a default value (null for now)
const CardContext = createContext<CardContextType | null>(null);

// Custom hook to use the CardContext
export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};

// Context Provider to wrap the App and share the state
interface props {
  children: React.ReactNode;
}
export const CardProvider: React.FC<Readonly<props>> = ({ children }) => {
  const [numCards, setNumCards] = useState(3); // Shared state for the number of cards
  const [framesPerCard, setFramesPerCard] = useState(40);
  const [totalDurationInFrames, setTotalDurationInFrames] = useState<number>(
    numCards * framesPerCard
  );

  const updateTotalDurationInFrames = (frames: number) => {
    setTotalDurationInFrames(numCards * framesPerCard + frames);
  };

  return (
    <CardContext.Provider
      value={{
        numCards,
        setNumCards,
        framesPerCard,
        setFramesPerCard,
        totalDurationInFrames,
        updateTotalDurationInFrames,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
