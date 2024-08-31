import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import CsvDownloadButton from "./csvDownload/CsvDownloadButton";
import { ReorderEntryInPartMap } from "./utils/ReorderEntryInPartMap";
import { useEntries } from "./EntryProvider";
import { useParts } from "./PartProvider";
import { DropResult } from "./type/DropResult";
import { EntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

export default function App() {
  const { partMap, setPartMap } = useParts();
  const { entryMap } = useEntries();

  const onDragEnd = (result: DropResult) => {
    setPartMapOnDragEnd(result, partMap, entryMap, setPartMap);
  };

  const sortedParts = Object.values(partMap).sort(
    (a, b) => a.partNum - b.partNum
  );

  return (
    <div className="App">
      <CsvDownloadButton/>
      <DragDropContext onDragEnd={onDragEnd}>
        {sortedParts.map((part) => (
          <Part key={part.id} partId={part.id} />
        ))}
      </DragDropContext>
    </div>
  );
}

function setPartMapOnDragEnd(
  dropResult: DropResult,
  initialPartMap: PartMap,
  entryMap: EntryMap,
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>
): void {
  // 表の外にドロップされた場合
  if (!dropResult.destination) return;

  // 同じテーブルの同じ場所にドロップされた場合
  if (
    dropResult.destination.droppableId === dropResult.source.droppableId &&
    dropResult.destination.index === dropResult.source.index
  )
    return;

  const reorderedPartMap = ReorderEntryInPartMap({
    partMap: initialPartMap,
    entryMap: entryMap,
    draggableId: dropResult.draggableId,
    droppableId: dropResult.source.droppableId,
    destination: dropResult.destination,
  });

  setPartMap(reorderedPartMap);
}
