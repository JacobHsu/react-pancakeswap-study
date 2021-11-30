import React from 'react'
import { Router } from 'react-router-dom'
import history from './routerHistory'
import './App.css';
import Home from './views/Home';


const App: React.FC = () => {
  return (
    <Router history={history}>
      <Home />
    </Router>
  );
}

export default React.memo(App);
