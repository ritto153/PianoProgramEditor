import "./App.css";
import { useEntries } from "./EntryProvider";
import EntryTable from "./components/EntryTable";
import EntryTableTitle from "./components/EntryTableTitle";

function App() {
  const { entries } = useEntries();

  return (
    <div className="App">
      <EntryTableTitle title="全エントリー" />
      <EntryTable entries={entries} />
    </div>
  );
}

export default App;
