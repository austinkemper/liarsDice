
const LIFECYCLES = ['JOINING', 'IN_ROUND', 'END_ROUND', 'OVER']

class GameState {
  constructor(players, whosTurnId, mostRecentBet, lifeCycle, lastRoundLoserId, lastRoundMessage) {
    console.assert(LIFECYCLES.includes(lifeCycle), 'invalid lifecycle');

    this.players = players;
    this.whosTurnId = whosTurnId;
    this.mostRecentBet = mostRecentBet;
    this.lifeCycle = lifeCycle;
    this.lastRoundLoserId = lastRoundLoserId;
    this.lastRoundMessage = lastRoundMessage;
  }
}

class GamePlayer {
  constructor(id, name, dice, lastBet) {
    this.id = id;
    this.name = name;
    this.dice = dice;
    this.lastBet = lastBet;
  }
}

class Bet {
  constructor(quantity, rank) {
    this.quantity = quantity;
    this.rank = rank;
  }
}

export {
  GameState,
  GamePlayer,
  Bet,
}

