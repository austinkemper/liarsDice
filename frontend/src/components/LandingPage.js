import React from 'react';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render = () => {
    let clearUsernameButton;
    if (this.props.service.hasUsername()) {
      clearUsernameButton =
        <button onClick={this.onClickClearUsername} >
          Clear username (currently {this.props.service.getUsername()})
        </button>
    }
    return (
      <div>
        <h1>Welcome to LiarsDice!</h1>
        <button onClick={this.onClickCreateGame}>Create Game</button>
        <br></br>
        {clearUsernameButton}
      </div>

    );
  }

  onClickCreateGame = async () => { 
    console.log(this.props);
    console.log('clicked createGame button');
    let gameId = await this.props.service.createGame();
    this.props.history.push(`/play/${gameId}`);
  }

  onClickClearUsername = () => {
    this.props.service.clearUsername();
    this.forceUpdate();
  }
}

export default LandingPage;