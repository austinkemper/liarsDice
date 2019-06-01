import React from 'react';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome to a game with id {this.props.match.params.gameId}</h1>
      </div>

    );
  }
}

export default Game;