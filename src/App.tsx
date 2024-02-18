import React, {useState} from 'react';
import './App.css';
import initialEntries from './data/entries.json';
import EntryTable from './components/EntryTable';
import EntryTableTitle from './components/EntryTableTitle';
import Entry from './type/entry';

function App() {
  const [entries, setEntries] = useState(initialEntries)

  function hundleChangeEntries(editedEntry: Entry) {
    setEntries(entries.map(entry => {
      if (entry.id === editedEntry.id) {
        return editedEntry;
      } else {
        return entry;
      }
    }))
  }

  return (
    <div className="App">
      <EntryTableTitle title="全エントリー" entries={entries}/>
      <EntryTable initialEntries={entries} onChangeEntry={hundleChangeEntries}/>
    </div>
  );
}

export default App;
