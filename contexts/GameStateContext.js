import { createContext } from "react";
import { createDefaultGameData } from "../API/Game";

const defaultGameContext = {
  game: createDefaultGameData(),
  user: {name: ""},
  availableGames: [],
  onInitGame: () => {},
  onStartGame: () => {},
};

const GameStateContext = createContext(defaultGameContext);

export { GameStateContext, defaultGameContext };
