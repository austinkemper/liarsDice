import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from './Navigation';
import LandingPage from './LandingPage';
import Game from './Game';
import MockService from '../services/MockService';
import FirebaseService from '../services/FirebaseService';

class Root extends React.Component {

  constructor() {
    super();
    let isProd = false;
    let service = new MockService();
    if (isProd) {
      service = new FirebaseService();
    }
    this.state = {
      service: service,
    };
  }

  render() {
    return (
      <Router>
        <Navigation />
        <Route
          path='/' exact
          render={(props) =>
            <LandingPage {...props} service={this.state.service} />} />
        <Route
          path='/play/:gameId' exact
          render={(props) =>
            <Game {...props} service={this.state.service} />} />
      </Router>
    );
  }
}

export default Root;