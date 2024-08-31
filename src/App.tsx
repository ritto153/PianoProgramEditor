import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import CsvDownloadButton from "./components/CsvDownloadButton";
import { ReorderEntryInPartMap } from "./utils/ReorderEntryInPartMap";
import { useEntries } from "./EntryProvider";
import { useParts } from "./PartProvider";
import { DropResult } from "./type/DropResult";
import { Entry } from "./type/Entry";

export default function App() {
  const { partMap, setPartMap } = useParts();
  const { entryMap } = useEntries();

  const nonAssinedPart = Object.values(partMap).find(
    (part) => part.partNum === 0
  );
  if (!nonAssinedPart) {
    throw new Error("配置前のエントリーを格納する部が消えています");
  }

  const onDragEnd = (result: DropResult) => {
    // 表の外にドロップされた場合
    if (!result.destination) return;

    // 同じテーブルの同じ場所にドロップされた場合
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;

    const reorderedPartMap = ReorderEntryInPartMap({
      partMap: partMap,
      entryMap: entryMap,
      draggableId: result.draggableId,
      droppableId: result.source.droppableId,
      destination: result.destination,
    });

    setPartMap(reorderedPartMap);
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
