import React from 'react';
import Game from './Game';
import Login from './Login';

class GameJoiner extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    }
  }

  render = () => {
    let loginOrGame;
    console.log(this.props.service.getUsername());
    console.log(this.props.service.hasUsername());
    if (this.props.service.hasUsername() === true) {
      loginOrGame = <Game
        gameId={this.props.match.params.gameId}
        service={this.props.service} />
    } else {
      loginOrGame = <Login
        service={this.props.service}
        forceUpdateParent={this.forceUpdateSelf}/>
    }
    return (
      <div>
        {loginOrGame}
      </div>
    );
  }

  forceUpdateSelf = () => {
    this.forceUpdate();
  }

}

export default GameJoiner;