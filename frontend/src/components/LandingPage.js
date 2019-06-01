import React from 'react';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
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

  onClickCreateGame = async () => { 
    console.log(this.props);
    console.log('clicked createGame button');
    let gameId = await this.props.service.createGame();
    this.props.history.push(`/play/${gameId}`);
  }
}

export default LandingPage;