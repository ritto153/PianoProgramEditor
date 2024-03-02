import './App.css';
import EntryTable from './components/EntryTable';
import EntryTableTitle from './components/EntryTableTitle';

function App() {
  return (
    <div className="App">
      <EntryTableTitle title="全エントリー"/>
      <EntryTable/>
    </div>
  )
}

export default App;
