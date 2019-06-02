class GameState {

  constructor(players, whosTurnId) {
    this.players = players;
    this.whosTurnId = whosTurnId;
  }

}

class GamePlayer {
  constructor(id, name, dice) {
    this.id = id;
    this.name = name;
    this.dice = dice;
  }
}

export {
  GameState,
  GamePlayer as Player
}

