import React from 'react';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    let inviteUrl = this.props.service.getBaseUrl()
      + '/play/'
      + this.props.match.params.gameId;
    return (
      <div>
        {/* Invite your friends link with service.baseUrl + /play/gameId */}
        <h3>Invite your friends: </h3>
        <code>{inviteUrl}</code>
      </div>

    );
  }
}

export default Game;