import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EntryProvider from './EntryProvider';
import reportWebVitals from './reportWebVitals';
import initialEntries from './data/entries.json';

export const EntryContext = createContext({initialEntries});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <EntryProvider>
    <App />
  </EntryProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
