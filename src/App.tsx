import React from 'react'
import { Router } from 'react-router-dom'
import { ResetCSS } from 'npm-react-uikit'  // '@pancakeswap/uikit'
import history from './routerHistory'
import './App.css';
import Home from './views/Home';


const App: React.FC = () => {
  return (
    <Router history={history}>
      <ResetCSS />
      <Home />
    </Router>
  );
}

export default React.memo(App);
