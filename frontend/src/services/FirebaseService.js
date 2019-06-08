import * as firebase from 'firebase';

import { GameState, GamePlayer } from "../shared/GameObjects";

const LOCAL_STORAGE_USERNAME_KEY = 'liarsDiceProdUsername';
const DEFAULT_GAME_STATE = new GameState([], null, null, 'JOINING', null, null);

class FirebaseService {

  constructor() {
    let firebaseConfig = {
      apiKey: "AIzaSyDNB00hsAZfrH_E9_YskFquArDxxuuqu0g",
      authDomain: "akliarsdice-242600.firebaseapp.com",
      databaseURL: "https://akliarsdice-242600.firebaseio.com",
      projectId: "akliarsdice-242600",
      storageBucket: "akliarsdice-242600.appspot.com",
      messagingSenderId: "164196684566",
      appId: "1:164196684566:web:3eb85c2959b57250"
    };
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database(); 
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

  createGame = async () => {
    let gameState = new GameState([], null,
      null, 'JOINING', null, null);
    let gameId = this.database.ref().child('games').push(gameState).key;
    return gameId;
  }

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }  

  // Returns heroId.
  joinGame = async (gameId, heroName) => {
    let newGamePlayer = new GamePlayer(this.uuidv4(), heroName, [], null);
    let gameRef = this.database.ref('games/' + gameId);
    let joinTransaction = (game) => { 
      if (!game)  {
        console.error('couldnt find that game');
        return DEFAULT_GAME_STATE;
      }
      if (game.lifeCycle !== 'JOINING') {
        console.error('cant join game in progress');
        return;
      }
      if (!game.players) {
        game.players = [];
      }
      game.players.push(newGamePlayer);
      return game;
    };
    let handleError = (error, committed, snapshot) => {
      console.log('post joinGame transaction.');
      if (error) {
        console.error('abnormal joinGame transaction failure: ', error);
        return;
      } else if (!committed) {
        console.error('aborted joinGame transaction');
        return;
      } else {
        console.log('successfully joined game as ', snapshot.val());
      }
    }
    gameRef.transaction(joinTransaction, handleError);
    return newGamePlayer.id;
  }

  getGameState = async (gameId) => {
    let dataSnapshot = await this.database.ref('games/' + gameId).once('value');
    let gameStateData = dataSnapshot.val();
    return this.transformGameStateForView(gameStateData);
  }

  subscribeToGameStateChanges = (gameId, callback) => {
    this.database.ref('games/' + gameId).on('value', (dataSnapshot) => {
      let transformedGamestate = this.transformGameStateForView(dataSnapshot.val());
      console.log('received subcription: ', transformedGamestate);
      callback(transformedGamestate);
    });
  }

  transformGameStateForView = (gameState) =>  {
    if (!gameState.players) {
      gameState.players = [];
    } else if (typeof gameState.players === 'object') { 
      gameState.players = Object.values(gameState.players);
    }
    gameState.players.forEach((p) => {
      if (!p.dice) {
        p.dice = [];
      }
    });
    return gameState;
  }

  // subscribe to gamestate.

  setGameState = async (gameId, gameState) => {
    let gameRef = this.database.ref('games/' + gameId);
    gameRef.set(gameState);
  }
}

export default FirebaseService;