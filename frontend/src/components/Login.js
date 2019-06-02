import React from 'react';

const suggestedUsernames = [
  'squadJams',
  'squadHams',
  'squadFams',
  'squadClams',
  'squadLambs',
  'squadGrahamCrackers',
  'squadPrograms',
  'squadAmsterdams',
  'squadHolograms',
  'squadTrafficJams',
  'squadUncleSams',
  'squadWhamKablams',
  'squadAbrahams',
  'squadAnagrams',
  'squadMilligrams',
  'squad',

  'PWN3Ds@VaGe-N00Bsn1per420',
  'squadHoverboards',
  'the floor is Java!',
  'DontPanic',
  'Scout',

  // TODO(ak): make sure firebase accepts these.
  'ヾ(⌐■_■)ノ♪',
  '༼ つ ◕_◕ ༽つ',
  '¯\\_(ツ)_/¯',
];

class Login extends React.Component {
  constructor() {
    let suggestedUsernameIndex = Math.floor(Math.random() * suggestedUsernames.length)
    let suggestedUsername = suggestedUsernames[suggestedUsernameIndex];    
    super();
    this.state = {
      suggestedUsername: suggestedUsername,
      inputValue: suggestedUsername,
    };
  }

  render() {
    return (
      <div>
        <h2>Pick a name: </h2>
        <input 
          type='text' 
          name='username'
          onChange={(event) => {this.onChangeInput(event.target.value)}}
          defaultValue={this.state.suggestedUsername}/>
        <button onClick={this.onClickJoin}>Join</button>
      </div>
    );
  }

  onChangeInput = (inputValue) => {
    this.setState({
      inputValue: inputValue
    });
  }

  onClickJoin = () => {
    this.props.service.setUsername(this.state.inputValue);
    this.props.forceUpdateParent();
  }

}

export default Login;