import React from 'react';
import './App.css';
import entries from './data/entries.json';
import EntryTable from './components/EntryTable';
import EntryTableTitle from './components/EntryTableTitle';

function App() {
  return (
    <div className="App">
      <EntryTableTitle title="全エントリー" entries={entries}/>
      <EntryTable entries={entries} />
    </div>
  );
}

export default App;
