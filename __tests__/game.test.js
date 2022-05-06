import { createGame } from "../API/Game";

describe("Game API tests: ", () => {
  describe("'createGame' factory function tests: ", () => {
    let game;
    let characters;
    let someInvalidCharacterData;
    beforeAll(() => {
      game = createGame();
      characters = [
        {
          name: "Waldo",
          found: false,
          box: { x: 25, y: 30, width: 45, height: 60 },
        },
        {
          name: "Wizzard",
          found: false,
          box: { x: 150, y: 400, width: 30, height: 40 },
        },
      ];
      someInvalidCharacterData = ["waldo", "wizzard"];
    });

    test("'It returns an object: '", () => {
      expect(typeof game).toBe("object");
    });

    test("calling 'startGame' before 'initGame' should throw an error", () => {
      expect(() => game.startGame()).toThrow();
    });

    test("'initGame' sets the initial game parameters correctly:", () => {
      game.initGame("wwww.someLink.com", characters);
      expect(game.linkToSearchableImage).toBe("wwww.someLink.com");
      expect(game.characters).toEqual(characters);
      expect(game.charactersFound).toBe(0);
      expect(game.isGameRunning).toBe(false);
      expect(game.gameStartTime).toBe(0);
      expect(game.gameEndTime).toBe(0);
    });

    test("'initGame' throws an error only when called with incorrect parameters:", () => {
      expect(() => game.initGame("", "")).toThrow();
      expect(() => game.initGame("", [])).toThrow();
      expect(() => game.initGame("", someInvalidCharacterData)).toThrow();
      expect(() =>
        game.initGame("www.someLink.com", someInvalidCharacterData)
      ).toThrow();
      expect(() => game.initGame("www.someLink.com", characters)).not.toThrow();
    });

    test("'startGame' should correctly set the game running", () => {
      game.initGame("www.someLink.com", characters);
      game.startGame();
      expect(game.isGameRunning).toBe(true);
      expect(game.gameStartTime).not.toBe(0);
      expect(game.characters[0].found).toBe(false);
      expect(game.characters[1].found).toBe(false);
    });

    test("'subscribe' correctly adds a function to the 'subscribers' array and 'runSubscriptions' runs it correctly:", () => {
      const someFunction = jest.fn();
      const anotherFunction = jest.fn();
      const thirdFunction = jest.fn();
      const sampleData = { data: "someData" };

      game.subscribe(someFunction);
      game.subscribe(anotherFunction);
      game.subscribe(thirdFunction);

      game.runSubscriptions(sampleData);

      expect(someFunction).toHaveBeenCalled();
      expect(anotherFunction).toHaveBeenCalled();
      expect(thirdFunction).toHaveBeenCalled();

      expect(someFunction.mock.lastCall).toEqual([sampleData]);
      expect(anotherFunction.mock.lastCall).toEqual([sampleData]);
      expect(thirdFunction.mock.lastCall).toEqual([sampleData]);
    });

    test("subscribe throws an error when not called with a single function as an argument and does nothing when called with no arguments:", () => {
      expect(() => game.subscribe()).not.toThrow();
      expect(() => game.subscribe("a function")).toThrow();
    });

    test("'checkPlayerClickOnImage' should either return true and set the found character's found property as true or should return false:", () => {
      game.initGame("www.someLink.com", [
        {
          name: "Waldo",
          box: { x: 25, y: 30, width: 45, height: 60 },
        },
      ]);

      expect(game.checkPlayerClickOnImage({ x: 21, y: 50 })).toBe(false);
      expect(game.checkPlayerClickOnImage({ x: 35, y: 29 })).toBe(false);
      expect(game.checkPlayerClickOnImage({ x: 24, y: 29 })).toBe(false);
      expect(game.checkPlayerClickOnImage({ x: 71, y: 91 })).toBe(false);
      expect(game.checkPlayerClickOnImage({ x: 25, y: 30 })).toBe(true);
      expect(game.checkPlayerClickOnImage({ x: 70, y: 90 })).toBe(true);
      expect(game.checkPlayerClickOnImage({ x: 27, y: 50 })).toBe(true);
      expect(game.characters[0].found).toBe(true);
    });

    test("'play' should return false if called before 'startGame':", () => {
      expect(game.play({ x: 35, y: 45 })).toBe(false);
    });

    test("'play' should return true if called after 'startGame':", () => {
      game.startGame();
      expect(game.play({ x: 35, y: 45 })).toBe(true);
    });

    test("'play' should not call any subscribers if game is not running:", () => {
      const subscriberFunction1 = jest.fn();

      game.initGame("www.someLink.com", characters);

      game.subscribe(subscriberFunction1);
      game.play({ x: 35, y: 45 });

      expect(subscriberFunction1).not.toHaveBeenCalled();
    });

    test("'play' should call subscribers when game is running:", () => {
      const subscriberFunction1 = jest.fn();

      game.subscribe(subscriberFunction1);
      game.startGame();
      game.play({ x: 35, y: 45 });

      expect(subscriberFunction1).toHaveBeenCalled();
    });

    test("'play' should update game data accordingly on every call:", () => {
      game.initGame("www.someLink.com", characters);
      game.startGame();

      game.play({ x: 26, y: 31 });
      expect(game.attempts).toBe(1);
      expect(game.characters[0].found).toBe(true);
      expect(game.characters[1].found).toBe(false);
      expect(game.isGameWon).toBe(false);
      expect(game.charactersFound).toBe(1);
      expect(game.isGameRunning).toBe(true);

      game.play({ x: 26, y: 31 });
      expect(game.charactersFound).toBe(1);
      expect(game.isGameRunning).toBe(true);
      expect(game.attempts).toBe(2);

      game.play({ x: 151, y: 401 });
      expect(game.attempts).toBe(3);
      expect(game.characters[0].found).toBe(true);
      expect(game.characters[1].found).toBe(true);
      expect(game.isGameWon).toBe(true);
      expect(game.charactersFound).toBe(2);
      expect(game.isGameRunning).toBe(false);
      expect(game.gameEndTime >= game.gameStartTime).toBe(true);

      expect(game.play({ x: 151, y: 401 })).toBe(false);
    });

    test("'play' should call subscriptions with the correct data:", () => {
      game.initGame("www.someLink.com", characters);
      game.startGame();

      const subscriberFunction1 = jest.fn();
      const subscriberFunction2 = jest.fn();

      game.subscribe(subscriberFunction1);
      game.subscribe(subscriberFunction2);

      game.play({ x: 26, y: 31 });
      expect(subscriberFunction1).toHaveBeenCalled();
      expect(subscriberFunction2).toHaveBeenCalled();

      expect(subscriberFunction1.mock.lastCall[0]).toEqual({
        attempts: game.attempts,
        isGameRunning: game.isGameRunning,
        isGameWon: game.isGameWon,
        charactersFound: game.charactersFound,
        characters: game.characters,
        gameStartTime: game.gameStartTime,
        gameEndTime: game.gameEndTime,
      });

      expect(subscriberFunction2.mock.lastCall[0]).toEqual({
        attempts: game.attempts,
        isGameRunning: game.isGameRunning,
        isGameWon: game.isGameWon,
        charactersFound: game.charactersFound,
        characters: game.characters,
        gameStartTime: game.gameStartTime,
        gameEndTime: game.gameEndTime,
      });
    });
  });
});
