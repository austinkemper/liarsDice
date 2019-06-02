import React from 'react';

import Player from './Player';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      heroId: null,
      gameState: {
        players: [],
      },
    };
  }

  componentDidMount = async () => {
    let gameId = this.props.gameId;
    let heroId = await this.props.service.joinGame(gameId);
    let newGameState = await
      this.props.service.getGameState(gameId);
    this.setState({
      heroId: heroId,
      gameState: newGameState,
    });
  }

  render() {
    let inviteUrl = this.props.service.getBaseUrl()
      + '/play/'
      + this.props.gameId;

    let playerListItems = this.state.gameState.players.map((player) => {
      let isHero = player.id === this.state.heroId;
      let isPlayersTurn = player.id === this.state.gameState.whosTurnId;
      return <Player
        key={player.id}
        isHero={isHero}
        isMyTurn={isPlayersTurn}
        gamePlayer={player} />
    });


    return (
      <div>
        <h3>Invite your friends: </h3>
        <code>{inviteUrl}</code>
        <div>
          <ul>
            { playerListItems }
          </ul>
        </div>
        <div>
          Number: <input type='text' />
          Dice face: <input type='text' />
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

  onClickBet = () => {
    if (!this.isMyTurn()) {
      console.error('not your turn');
      return;
    }
  }

  onClickCallLiar = () => {
    if (!this.isMyTurn()) {
      console.error('not your turn');
      return;
    }
  }
}

export default Game;