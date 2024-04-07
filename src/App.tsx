import "./App.css";
import EntryTable from "./components/EntryTable";
import EntryTableTitle from "./components/EntryTableTitle";

export default function App() {
  return (
    <div className="App">
      <EntryTableTitle part_num={null} title="全エントリー" />
      <EntryTable part_num={null}/>
    </div>
  );
}

