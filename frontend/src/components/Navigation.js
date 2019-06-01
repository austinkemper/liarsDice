import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <nav>
        <Link to='/'>Home</Link>
      </nav>

    );
  }
}

export default Navigation;