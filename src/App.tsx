import "./App.css";
import Part from "./components/Part";
import { useEntries } from "./EntryProvider";

export default function App() {
  const { entries } = useEntries();
  const maxPartNum = Math.max(...entries.map((entry) => entry.part_num === null ? 0 : entry.part_num));

  return (
    <div className="App">
      <Part part_num={null} />
      {[...Array(maxPartNum)].map((_, i) => (
        <Part key={i + 1} part_num={i + 1} />
      ))}
    </div>
  );
}

