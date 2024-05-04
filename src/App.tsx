import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import { useEntries } from "./EntryProvider";
import { PartMap } from "./type/Part";
import { DropResult, DraggableLocation, DraggableId } from "./type/DropResult";

export default function App() {
  const { partMap, setPartMap } = useEntries();

  const nonAssinedPart = Object.values(partMap).find(
    (part) => part.partNum === 0
  );
  if (!nonAssinedPart) {
    throw new Error("配置前のエントリーを格納する部が消えています");
  }

  // memo: 複数選択してテーブル間移動する story。参考にする
  // https://github.com/atlassian/react-beautiful-dnd/tree/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/multi-drag

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/reorder.js#L6
  const reorderEntry = (
    draggableId: DraggableId,
    source: DraggableLocation,
    destination: DraggableLocation
  ): PartMap => {
    // 同じテーブル内に Drop した場合
    if (source.droppableId === destination.droppableId) {
      const entryIds = partMap[destination.droppableId].entryIds;

      const newEntryIds = entryIds.filter((entryId) => entryId !== draggableId);
      newEntryIds.splice(destination.index, 0, draggableId);

      const result = partMap;
      result[destination.droppableId] = {
        ...partMap[destination.droppableId],
        entryIds: newEntryIds,
      };

      return result;
    } else {
      // 異なるテーブルに Drop した場合
      // TODO: 実装する
      return partMap;
    }
  };

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/table/with-fixed-columns.jsx#L107
  const onDragEnd = (result: DropResult) => {
    // 表の外にドロップされた場合
    if (!result.destination) return;

    // 同じ場所にドロップされた場合
    if (result.destination.index === result.source.index) return;

    const newPartMap = reorderEntry(
      result.draggableId,
      result.source,
      result.destination
    );

    setPartMap(newPartMap);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(partMap).map((partId) => (
          <Part key={partId} partId={partId} />
        ))}
      </DragDropContext>
    </div>
  );
}
