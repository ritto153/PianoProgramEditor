import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import { useEntries } from "./EntryProvider";
import { Entry } from "./type/Entry";
import { DropResult } from "./type/DropResult";

export default function App() {
  const { entries, setEntries } = useEntries();
  const maxPartNum = Math.max(...entries.map((entry) => entry.part_num === null ? 0 : entry.part_num));

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/reorder.js#L6
  const reorderEntry = (
    list: Entry[],
    startIndex: number,
    endIndex: number
  ): Entry[] => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    result = result.map((entry, i) => ({
      ...entry,
      sort: i + 1,
    }));

    return result;
  };

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/table/with-fixed-columns.jsx#L107
  const onDragEnd = (result: DropResult) => {
    // 表の外にドロップされた場合
    if (!result.destination) return;

    // 同じ場所にドロップされた場合
    if (result.destination.index === result.source.index) return;

    const reorderedEntries = reorderEntry(
      entries,
      result.source.index,
      result.destination.index
    );
    setEntries(reorderedEntries);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* まだ部に割り振られていないエントリーを表示するテーブル */}
        <Part part_num={null} />

        {/* 各部のエントリーを表示するテーブル。全エントリーの最大部数まで描画する */}
        {[...Array(maxPartNum)].map((_, i) => (
          <Part key={i + 1} part_num={i + 1} />
        ))}
      </DragDropContext>
    </div>
  );
}

