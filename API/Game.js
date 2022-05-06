import { isUrlValidFormat } from "./helperFunctions";

const createDefaultGameData = () => ({
  linkToSearchableImage: "",
  characters: [],
  charactersFound: 0,
  isGameRunning: false,
  gameStartTime: 0,
  gameEndTime: 0,
  attempts: 0,
  isGameWon: false,
  initGame: (imageLink, characters) => {},
  startGame: () => {},
  subscribe: (subscriber) => {},
  runSubscriptions: () => {},
  checkPlayerClickOnImage: (coords) => {},
  play: (coords) => {},
});

const createGame = () => {
  const subscribers = [];

  const gameObject = createDefaultGameData();

  const coordsInsideBox = (coords, box) => {
    const { x, y } = coords;
    const { x: boxX, y: boxY, width: boxWidth, height: BoxHeight } = box;
    if (x < boxX || y < boxY) {
      return false;
    }

    if (x > boxX + boxWidth || y > boxY + BoxHeight) {
      return false;
    }

    return true;
  };

  const checkAndUpdateGameStatus = () => {
    let foundCharacters = 0;
    gameObject.characters.forEach((character) => {
      if (character.found) {
        foundCharacters++;
      }
    });
    gameObject.charactersFound = foundCharacters;
    if (gameObject.charactersFound === gameObject.characters.length) {
      gameObject.gameEndTime = Date.now();
      gameObject.isGameWon = true;
      gameObject.isGameRunning = false;
    }
  };

  gameObject.initGame = (imageLink, characters) => {
    if (!Array.isArray(characters) || characters.length < 1) {
      throw new Error(
        "characters should be an array and have at least one character! "
      );
    }

    try {
      characters.forEach((character) => {
        if (!character.box) {
          throw new Error(`There should be a 'box' property on ${character}`);
        }
      });
    } catch (error) {
      throw error;
    }

    if (!isUrlValidFormat(imageLink)) {
      throw new Error("imageLink doesn't appear to be a valid format!");
    }

    gameObject.linkToSearchableImage = imageLink;
    gameObject.characters = [...characters];
    gameObject.charactersFound = 0;
    gameObject.isGameRunning = false;
    gameObject.gameStartTime = 0;
    gameObject.gameEndTime = 0;
  };

  gameObject.startGame = () => {
    if (
      !gameObject.linkToSearchableImage ||
      gameObject.characters.length === 0
    ) {
      throw new Error("Check if game has been initialized!");
    }

    gameObject.characters.forEach((character) => {
      character.found = false;
    });

    gameObject.isGameRunning = true;
    gameObject.gameStartTime = Date.now();
    gameObject.attempts = 0;
    gameObject.isGameWon = false;
  };

  //A more general variant can be written taking multiple subscribers as arguments but I don't think it is necessary here.
  gameObject.subscribe = (subscriber) => {
    if (!subscriber) {
      return;
    }

    if (!(typeof subscriber === "function")) {
      throw new Error(
        "The subscriber you are trying to subscribe is not a function!"
      );
    }

    subscribers.push(subscriber);
  };

  gameObject.runSubscriptions = (data) => {
    subscribers.forEach((subscriber) => subscriber(data));
  };

  gameObject.checkPlayerClickOnImage = (coords) => {
    let result = false;
    gameObject.characters.forEach((character, idx) => {
      if (coordsInsideBox(coords, character.box)) {
        result = true;
        gameObject.characters[idx].found = true;
      }
    });
    return result;
  };

  gameObject.play = (coords) => {
    if (gameObject.isGameRunning) {
      gameObject.attempts++;
      gameObject.checkPlayerClickOnImage(coords);
      checkAndUpdateGameStatus();
      gameObject.runSubscriptions({
        attempts: gameObject.attempts,
        isGameRunning: gameObject.isGameRunning,
        isGameWon: gameObject.isGameWon,
        charactersFound: gameObject.charactersFound,
        characters: gameObject.characters,
        gameStartTime: gameObject.gameStartTime,
        gameEndTime: gameObject.gameEndTime,
      });
      return true;
    }
    return false;
  };

  return gameObject;
};

export { createGame, createDefaultGameData };
