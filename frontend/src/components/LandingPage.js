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
        <h3>Instructions</h3>
        <p>Players take turns making increasing bets until someone Calls Liar</p>
        <p>A bet consists of a rank and a quantity of dice that you believe to exist among all players.</p>
        <p>For example, a bet of "four sixes" has rank=6, quantity=4, and conveys that you
          believe that there exist four sixes among all of the dice on the board.
        </p>
        <p>An increasing bet either rises in quantity, or is equal in quantity but higher in rank than the previous bet.</p>
        <p>For example, "three fours" is a higher bet than "three twos", but "two sixes" is not.</p>
        <p>Ones are wild.</p>
        <p>If it's your turn, you can either raise the bet or Call Liar.</p>
        <p>Calling Liar is challenging the previous bet. Whoever loses the challenge loses 1 die for the next round.</p>
        <p>For example, if Alice bets "four threes", and Bob Calls Liar, and there are three threes and one one on the board, Bob loses a die.</p>        
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