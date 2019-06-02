import React from 'react';

class Player extends React.Component {

  render() {
    let gamePlayer = this.props.gamePlayer;

    let diceString;

    if (this.props.isHero === true) {
      diceString = gamePlayer.dice.toString();
    } else {
      diceString = gamePlayer.dice.length + ' dice.';
    }

    let youString = '';
    if (this.props.isHero) {
      youString = ' <----- YOU';
    }

    let turnString = '';
    if (this.props.isMyTurn) {
      turnString = '[My turn]';
    }

    return (
      <li>
        {gamePlayer.name}, has {diceString} <b>{turnString}{youString}</b>
      </li>
    );
  }
}

export default Player;