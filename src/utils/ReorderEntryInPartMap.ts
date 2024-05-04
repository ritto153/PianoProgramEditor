import { PartMap } from "../type/Part";
import { DraggableId, DraggableLocation } from "react-beautiful-dnd";

export const ReorderEntryInPartMap = (
  partMap: PartMap,
  draggableId: DraggableId,
  source: DraggableLocation,
  destination: DraggableLocation
): PartMap => {
  // 同じテーブル内に Drop した場合
  if (source.droppableId === destination.droppableId) {
    const entryIds = partMap[destination.droppableId].entryIds;

    const newEntryIds = entryIds.filter((entryId) => entryId !== draggableId);
    newEntryIds.splice(destination.index, 0, draggableId);

    const result = {...partMap};
    result[destination.droppableId] = {
      ...partMap[destination.droppableId],
      entryIds: newEntryIds,
    };

    return result;
  } else {
    // 異なるテーブルに Drop した場合
    // 未実装
    return partMap;
  }
};