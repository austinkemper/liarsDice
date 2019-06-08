import React from 'react';

class Player extends React.Component {

  render() {
    let gamePlayer = this.props.gamePlayer;

    let diceString;

    if (this.props.lifeCycle === 'JOINING') {
      diceString = '';
    } else if (this.props.isHero === true || this.props.lifeCycle === 'END_ROUND' || this.props.lifeCycle === 'OVER') {
      diceString = 'dice: ' + gamePlayer.dice.toString();
    } else {
      diceString = `has ${gamePlayer.dice.length} dice`;
    }

    let youString = '';
    if (this.props.isHero) {
      youString = ' <----- YOU';
    }

    let turnString = '';
    if (this.props.isMyTurn) {
      turnString = '[My turn]';
    }

    let lastBetString = '';
    if (gamePlayer.lastBet !== undefined &&  gamePlayer.lastBet !== null) {
      lastBetString = `last bet: ${gamePlayer.lastBet.quantity} ${gamePlayer.lastBet.rank}'s`
    }

    return (
      <li>
        {gamePlayer.name} <b>{turnString}{youString}</b> <br></br>
        {diceString} <br></br>
        {lastBetString} <br></br>
        -----------------------------
      </li>
    );
  }
}

export default Player;