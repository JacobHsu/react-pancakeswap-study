import React, { useMemo, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import useActiveWeb3React from './hooks/useActiveWeb3React';
import { BLOCKED_ADDRESSES } from './config/constants';
import './index.css';
import App from './App';
import Providers from './Providers'
import reportWebVitals from './reportWebVitals';

function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React();
  const blocked: boolean = useMemo(
    () => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1),
    [account]
  );
  if (blocked) {
    return <div>Blocked address</div>;
  }
  return <>{children}</>;
}

ReactDOM.render(
  <React.StrictMode>
    <Blocklist>
      <Providers>
        <App />
      </Providers>
    </Blocklist>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
