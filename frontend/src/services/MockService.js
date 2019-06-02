import { GameState, GamePlayer, Bet} from "../shared/GameObjects";

const LOCAL_STORAGE_USERNAME_KEY = 'liarsDiceUsername';

class MockService {
  createGame = async () => {
    return 'abc';
  }

  getBaseUrl = () => {
    return 'localhost:3000';
  }

  hasUsername = () => {
    return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) !== null;
  }

  setUsername = (username) => {
    localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);
  }

  getUsername = () => {
    return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
  }

  clearUsername = () => {
    localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
  }

  // Returns heroId.
  joinGame = async (gameId, heroName) => {
    return 'heroId';
  }

  getGameState = async (gameId) => {
    let mostRecentBet = new Bet(10, 6);
    let hero = new GamePlayer('heroId', this.getUsername(), [1, 1, 4, 5, 6], mostRecentBet);
    let villan1 = new GamePlayer('oia', 'Mr. Krabs', [2, 2, 4], new Bet(2, 3));
    let villan2 = new GamePlayer('awoiefe', 'Spongebob', [6, 6, 6, 6, 6]);
    let villan3 = new GamePlayer('109j3', 'Sandy', [4, 1, 2, 2, 2], new Bet(2, 5));
    let players = [
      hero,
      villan1,
      villan2,
      villan3,
    ];
    return new GameState(players, 'heroId', mostRecentBet, 'END_ROUND');
  }

  setGameState = async (gameId, gameState) => {

  }

}

export default MockService;