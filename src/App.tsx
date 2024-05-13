import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import CsvDownloadButton from "./components/CsvDownloadButton";
import { ReorderEntryInPartMap } from "./utils/ReorderEntryInPartMap";
import { useEntries } from "./EntryProvider";
import { DropResult } from "./type/DropResult";
import { Entry } from "./type/Entry";

export default function App() {
  const { partMap, entryMap, setPartMap } = useEntries();

  const nonAssinedPart = Object.values(partMap).find(
    (part) => part.partNum === 0
  );
  if (!nonAssinedPart) {
    throw new Error("配置前のエントリーを格納する部が消えています");
  }

  // memo: 複数選択してテーブル間移動する story。参考にする
  // https://github.com/atlassian/react-beautiful-dnd/tree/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/multi-drag

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/table/with-fixed-columns.jsx#L107
  const onDragEnd = (result: DropResult) => {
    // 表の外にドロップされた場合
    if (!result.destination) return;

    // 同じテーブルの同じ場所にドロップされた場合
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const newPartMap = ReorderEntryInPartMap(
      partMap,
      result.draggableId,
      result.source,
      result.destination
    );

    setPartMap(newPartMap);
  };

  const sortedParts = Object.values(partMap).sort(
    (a, b) => a.partNum - b.partNum
  );

  const csvData: Entry[] = sortedParts
    .map((entry) =>
      Object.values(entry.entryIds).map((entryId) => entryMap[entryId])
    )
    .flat();

  return (
    <div className="App">
      <CsvDownloadButton csvData={csvData} />
      <DragDropContext onDragEnd={onDragEnd}>
        {sortedParts.map((part) => (
          <Part key={part.id} partId={part.id} />
        ))}
      </DragDropContext>
    </div>
  );
}
