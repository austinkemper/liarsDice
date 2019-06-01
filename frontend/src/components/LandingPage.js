import React from 'react';

class LandingPage extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome to LiarsDice!</h1>
        <button onClick={this.onClickCreateGame}>Create Game</button>
      </div>

    );
  }

  onClickCreateGame = () =>{ 
    console.log('clicked createGame button');
    // TODO(ak): Make Firebase call
    this.props.history.push('/play/123');
  }
}

export default LandingPage;