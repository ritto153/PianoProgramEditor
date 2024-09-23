import ReactDOM from 'react-dom/client';
import App from './App';
import EntryProvider from './EntryProvider';
import PartProvider from './PartProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PartProvider>
    <EntryProvider>
      <App />
    </EntryProvider>
  </PartProvider>
);
