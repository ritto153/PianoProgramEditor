import { PartMap } from "../type/Part";
import { DraggableId, DraggableLocation } from "react-beautiful-dnd";

export function ReorderEntryInPartMap(
  partMap: PartMap,
  draggableId: DraggableId,
  droppableId: string,
  destination: DraggableLocation
): PartMap {
  if (droppableId === destination.droppableId) {
    return ReorderEntryDroppedOnSamePart(partMap, draggableId, destination);
  } else {
    return ReorderEntryDroppedOnOtherPart(
      partMap,
      draggableId,
      droppableId,
      destination
    );
  }
}

function ReorderEntryDroppedOnSamePart(
  partMap: PartMap,
  draggableId: DraggableId,
  destination: DraggableLocation
): PartMap {
  // 同じテーブル内に Drop した場合
  const partId = destination.droppableId;
  const entryIds = partMap[partId].entryIds;

  // ドラッグしたエントリーを除く
  const newEntryIds = entryIds.filter((entryId) => entryId !== draggableId);
  // ドラッグしたエントリーをドロップした場所に追加
  newEntryIds.splice(destination.index, 0, draggableId);

  return {
    ...partMap,
    [partId]: {
      ...partMap[partId],
      entryIds: newEntryIds,
    },
  };
}

function ReorderEntryDroppedOnOtherPart(
  partMap: PartMap,
  draggableId: DraggableId,
  droppableId: string,
  destination: DraggableLocation
): PartMap {
  // ドラッグしたエントリーを除いた、移動元の部のentryIds
  const newHomePartEntryIds = partMap[droppableId].entryIds.filter(
    (entryId) => entryId !== draggableId
  );
  // ドラッグしたエントリーを加えた、移動先の部のentryIds
  const newForeignPartEntryIds = [...partMap[destination.droppableId].entryIds];
  newForeignPartEntryIds.splice(destination.index, 0, draggableId);

  const result = { ...partMap };
  result[droppableId] = {
    ...partMap[droppableId],
    entryIds: newHomePartEntryIds,
  };
  result[destination.droppableId] = {
    ...partMap[destination.droppableId],
    entryIds: newForeignPartEntryIds,
  };

  return result;
}
