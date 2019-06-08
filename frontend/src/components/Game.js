import React from 'react';

import Player from './Player';
import { Bet } from '../shared/GameObjects';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      heroId: null,
      gameId: null,
      quantity: -1,
      rank: -1,
      gameState: {
        players: [],
      },
    };
  }

  componentDidMount = async () => {
    let gameId = this.props.gameId;
    let heroId = await this.props.service.joinGame(gameId, this.props.service.getUsername());
    let newGameState = await
      this.props.service.getGameState(gameId);
    this.setState({
      heroId: heroId,
      gameId: gameId,
      gameState: newGameState,
    });
    this.props.service.subscribeToGameStateChanges(gameId, (updatedGameState) => {
      this.setState({
        gameState: updatedGameState,
      })
    });
  }

  render() {
    let inviteUrl = this.props.service.getBaseUrl()
      + '/play/'
      + this.props.gameId;

    let readyStartGameButton;
    if (this.state.gameState.lifeCycle === 'JOINING') {
      readyStartGameButton = <button onClick={this.onClickStartGame}>Start Game</button>
    }

    let readyNextRoundButton;
    if (this.state.gameState.lifeCycle === 'END_ROUND') {
      readyNextRoundButton = <button onClick={this.onClickNextRound}>Next Round</button>
    }

    console.log('akGameState: ', this.state.gameState);
    let playerListItems = this.state.gameState.players.map((player) => {
      let isHero = player.id === this.state.heroId;
      let isPlayersTurn = player.id === this.state.gameState.whosTurnId;
      return <Player
        key={player.id}
        isHero={isHero}
        isMyTurn={isPlayersTurn}
        lifeCycle={this.state.gameState.lifeCycle}
        gamePlayer={player} />
    });


    return (
      <div>
        <div>
          <h3>Invite your friends: </h3>
          <code>{inviteUrl}</code>
          <br></br><br></br>
        </div>
        <div>
          Game lifecycle phase: {this.state.gameState.lifeCycle}
          {readyStartGameButton} {readyNextRoundButton}
        </div>
        <div>
          {this.state.gameState.lastRoundMessage}
        </div>
        <div>
          <ul>
            { playerListItems }
          </ul>
        </div>
        <div>
          Quantity: <input
            type='text'
            onChange={(event) => {this.onChangeQuantity(event.target.value)}}
            placeholder='1'/>
          Rank: <input
            type='text'
            onChange={(event) => {this.onChangeRank(event.target.value)}}
            placeholder='6'/>
          <button onClick={this.onClickBet}>Bet!</button>
        </div>
        <div>
          <button onClick={this.onClickCallLiar}>Call Liar!</button>
        </div>
      </div>
    );
  }

  isMyTurn = () => {
    return this.state.heroId === this.state.gameState.whosTurnId;
  }

  onChangeQuantity = (quantity) => {
    this.setState({
      quantity: quantity,
    });
  }

  onChangeRank = (rank) => {
    this.setState({
      rank: rank,
    });
  }  

  onClickStartGame = () => {
    let newGameState = this.state.gameState;
    this.dealNewRound(newGameState);
    this.props.service.setGameState(this.state.gameId, newGameState);
    this.setState({gameState: newGameState}); // TODO: necessary?
  }

  onClickNextRound = () => {
    let newGameState = this.state.gameState;
    this.dealNewRound(newGameState);
    this.props.service.setGameState(this.state.gameId, newGameState);
    this.setState({gameState: newGameState}); // TODO: necessary?
  }  

  dealNewRound = (newGameState) => {
    if (newGameState.lifeCycle === 'JOINING') {
      newGameState.players.forEach((p) => {
        p.dice = [-1, -1, -1, -1, -1];
      });
    }
    newGameState.lifeCycle = 'IN_ROUND';
    if (newGameState.lastRoundLoserId) {
      newGameState.players.find(p => p.id === newGameState.lastRoundLoserId).dice.pop();
      newGameState.whosTurnId = newGameState.lastRoundLoserId;
    } else {
      newGameState.whosTurnId = newGameState.players[0].id;
    }
    newGameState.mostRecentBet = null;
    newGameState.players.forEach((p) => {
      for (let i = 0; i < p.dice.length; i++) {
        p.dice[i] = Math.floor(Math.random() * 6) + 1;
        p.lastBet = null;
      }
    });
  }

  onClickBet = () => {
    if (this.state.gameState.lifeCycle !== 'IN_ROUND') {
      console.error(
        `lifeCycle must be IN_ROUND to bet. Is: ${this.state.gameState.lifeCycle}`);
        return;
    }
    if (!this.isMyTurn()) {
      console.error('not your turn');
      return;
    }
    let quantity = Number(this.state.quantity);
    let rank = Number(this.state.rank);

    if (isNaN(quantity) || isNaN(rank)){ 
      console.error('Ya cant bet Nan man');
      return;
    }
    if (quantity <= 0 || quantity > 200 || rank <= 1 || rank >= 7) {
      console.error('stop betting like that');
      return;
    }
    if (this.state.gameState.mostRecentBet) {
      if (quantity < this.state.gameState.mostRecentBet.quantity){ 
        console.error('quantity must be at least the last bet quantity');
        return;
      }
      if (quantity === this.state.gameState.mostRecentBet.quantity
        && rank <= this.state.gameState.mostRecentBet.rank) { 
          console.error('rank must be higher');
          return;
      }
    }

    // It's a valid bet.
    // This betting logic should probably be done by the service or by
    // Cloud Functions instead of here in the view.

    let newBet = new Bet(quantity, rank);
    let newGameState = this.state.gameState;
    let heroIndex = newGameState.players.findIndex (p => p.id === this.state.heroId);
    newGameState.players[heroIndex].lastBet = newBet;
    newGameState.mostRecentBet = newBet;
    let nextTurnId = (heroIndex + 1) % newGameState.players.length;
    newGameState.whosTurnId = nextTurnId;

    this.props.service.setGameState(this.state.gameId, newGameState);

    // on success. TODO: neceessary? we can just subscribe to updates.
    this.setState({
      gameState: newGameState,
    });    
  }

  onClickCallLiar = () => {
    if (this.state.gameState.lifeCycle !== 'IN_ROUND') {
      console.error(
        `lifeCycle must be IN_ROUND to callLiar. Is: ${this.state.gameState.lifeCycle}`);
        return;
    }
    if (!this.state.gameState.mostRecentBet) { 
      console.error('cant call liar as first bet');
      return;
    }
    if (!this.isMyTurn()) {
      console.error('not your turn');
      return;
    }

    // Valid time to call liar. Again, hacky to put this in the view.

    let newGameState = this.state.gameState;

    let heroIndex = newGameState.players.findIndex (p => p.id === this.state.heroId);
    let betterInQuestionIndex =
      (heroIndex - 1 + newGameState.players.length) % newGameState.players.length;
    let betterInQuestionId = newGameState.players[betterInQuestionIndex].id;
    
    let quantityBet = newGameState.mostRecentBet.quantity;
    let rankBet = newGameState.mostRecentBet.rank;

    let actualQuantity = 0;

    newGameState.players.forEach(
      (player) => {
        player.dice.forEach(
          (die) => {
            if (die === 1 || die === rankBet) {
              actualQuantity++;
            }
          }
        )
      }
    )

    let loserId = betterInQuestionId;
    if (actualQuantity >= quantityBet){ 
      loserId = this.state.heroId;
    }
    newGameState.lastRoundLoserId = loserId;

    let loserName = newGameState.players.find(p => p.id === loserId).name;
    let heroName = newGameState.players.find(p => p.id === this.state.heroId).name;
    let betterInQuestionName = newGameState.players.find(p => p.id === betterInQuestionId).name;
    let lastRoundMessage = 
      `Last round, ${betterInQuestionName} bet ${quantityBet} ${rankBet}'s.
       ${heroName} called liar.
       There were ${actualQuantity} ${rankBet}'s and 1's.
       ${loserName} lost 1 die.`;
    newGameState.lastRoundMessage = lastRoundMessage;

    let numPlayersWithDice = 0;
    newGameState.players.forEach(
      (p) => { 
        if (p.id === loserId && p.dice.length >= 2) {
          numPlayersWithDice++;
        } else if (p.dice.length >= 1) {
          numPlayersWithDice++;
        }
      }
    );

    if (numPlayersWithDice > 1) {
      newGameState.lifeCycle = 'END_ROUND';
    } else {
      newGameState.lifeCycle = 'OVER;'
    }

    this.props.service.setGameState(this.state.gameId, newGameState);
    this.setState({gameState: newGameState}); // TODO: necessary?
  }
}

export default Game;