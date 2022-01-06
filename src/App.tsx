import React, { lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ResetCSS } from 'npm-react-uikit'; // '@pancakeswap/uikit'
import history from './routerHistory';
import GlobalStyle from './style/Global';
import Menu from './components/Menu';
import './App.css';
import Home from './views/Home';
// const Home = lazy(() => import('./views/Home'));

const App: React.FC = () => {
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu></Menu>
      {/* <Home /> */}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default React.memo(App);
