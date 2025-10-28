import React from 'react';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom' ;
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/layouts/header';
import Landing from './components/layouts/landing';
import Footer from './components/layouts/footer';
import NewGame from './pages/NewGame/newGame';
import Favorite from './pages/favorites/favorite';
import Slot from './pages/slot/slot';
import Live from './pages/live/live';
import GameDemo from './pages/live/components/gameDemo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/' Component={ Landing } />
          <Route exact path='/newgame' Component={ NewGame }/>
          <Route exact path='/favorite' Component={ Favorite } />
          <Route exact path='/slot' Component={ Slot } />
          <Route exact path='/live' Component={ Live } />
          <Route exact path='/live/gamedemo' Component={ GameDemo } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
