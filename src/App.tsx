import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import { useEntries } from "./EntryProvider";
import { Entry } from "./type/Entry";
import { DropResult, DraggableLocation } from "./type/DropResult";

export default function App() {
  const { entries, setEntries } = useEntries();
  const maxPartNum = Math.max(
    ...entries.map((entry) => (entry.part_num))
  );

  // memo: 複数選択してテーブル間移動する story。参考にする
  // https://github.com/atlassian/react-beautiful-dnd/tree/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/multi-drag

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/reorder.js#L6
  const reorderEntry = (
    list: Entry[],
    source: DraggableLocation,
    destination: DraggableLocation
  ): Entry[] => {
    // 同じテーブル内に Drop した場合
    if (source.droppableId === destination.droppableId) {
      let result = Array.from(list);

      // TODO: 表の中のデータだけでreorderして、それをresultと合体させる
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);

      result = result.map((entry, i) => ({
        ...entry,
        sort: i + 1,
      }));

      return result;
    } else {
      // 異なるテーブルに Drop した場合
      // TODO: 実装する
      return list;
    }
  };

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/table/with-fixed-columns.jsx#L107
  const onDragEnd = (result: DropResult) => {
    // 表の外にドロップされた場合
    if (!result.destination) return;

    // 同じ場所にドロップされた場合
    if (result.destination.index === result.source.index) return;

    const reorderedEntries = reorderEntry(
      entries,
      result.source,
      result.destination
    );
    setEntries(reorderedEntries);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* まだ部に割り振られていないエントリーを表示するテーブル */}
        <Part part_num={0} />

        {/* 各部のエントリーを表示するテーブル。全エントリーの最大部数まで描画する */}
        {[...Array(1)].map((_, i) => (
          <Part key={i + 1} part_num={i + 1} />
        ))}
      </DragDropContext>
    </div>
  );
}
