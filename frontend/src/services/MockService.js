import { GameState, Player } from "../shared/GameObjects";

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

  // Returns heroId.
  joinGame = async (gameId, heroName) => {
    return 'heroId';
  }

  getGameState = async (gameId) => {
    let hero = new Player('heroId', this.getUsername(), [1, 1, 4, 5, 6]);
    let villan1 = new Player('oia', 'Mr. Krabs', [2, 2, 4]);
    let villan2 = new Player('awoiefe', 'Spongebob', [6, 6, 6, 6, 6, 6]);
    let villan3 = new Player('109j3', 'Sandy', [4, 1, 2, 2, 2]);
    let players = [
      hero,
      villan1,
      villan2,
      villan3
    ];
    return new GameState(players, 'oia');
  }
}

export default MockService;