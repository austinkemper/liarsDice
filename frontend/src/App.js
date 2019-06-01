import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Navigation />
      <Route path='/' exact component={LandingPage} />
      <Route path='/play/:gameId' exact component={Game}  />
    </Router>
  );
}

export default App;
