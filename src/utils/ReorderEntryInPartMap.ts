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

    const result = { ...partMap };
    result[destination.droppableId] = {
      ...partMap[destination.droppableId],
      entryIds: newEntryIds,
    };

    return result;
  } else {
    const homePartEntryIds = partMap[source.droppableId].entryIds;
    const foreignPartEntryIds = partMap[destination.droppableId].entryIds;

    const newHomePartEntryIds = homePartEntryIds.filter(
      (entryId) => entryId !== draggableId
    );

    foreignPartEntryIds.splice(
      destination.index,
      0,
      draggableId
    );
    const newForeignPartEntryIds = [...foreignPartEntryIds];

    const result = { ...partMap };
    result[source.droppableId] = {
     ...partMap[source.droppableId],
      entryIds: newHomePartEntryIds,
    };
    result[destination.droppableId] = {
     ...partMap[destination.droppableId],
      entryIds: newForeignPartEntryIds,
    };

    console.log(result);
    return result;
  }
};
