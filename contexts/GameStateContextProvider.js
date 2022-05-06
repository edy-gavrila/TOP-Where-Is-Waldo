import React, { useState } from "react";
import { defaultGameContext, GameStateContext } from "./GameStateContext";

function GameStateContextProvider({ children }) {
  const gameState = useState(defaultGameContext);
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
}

export default GameStateContextProvider;
