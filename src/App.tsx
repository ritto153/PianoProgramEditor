import React from 'react';
import './App.css';
import EntryTable from './components/EntryTable';
import entries from './data/entries.json';

function App() {
  return (
    <div className="App">
      <EntryTable entries={entries} />
    </div>
  );
}

export default App;
