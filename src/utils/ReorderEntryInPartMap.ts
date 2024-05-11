import { PartMap } from "../type/Part";
import { DraggableId, DraggableLocation } from "react-beautiful-dnd";

export const ReorderEntryInPartMap = (
  partMap: PartMap,
  draggableId: DraggableId,
  source: DraggableLocation,
  destination: DraggableLocation
): PartMap => {
  if (source.droppableId === destination.droppableId) {
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
  } else {
    // 異なるテーブルにドロップした場合

    // ドラッグしたエントリーを除いた、移動元の部のentryIds
    const newHomePartEntryIds = partMap[source.droppableId].entryIds.filter(
      (entryId) => entryId !== draggableId
    );
    // ドラッグしたエントリーを加えた、移動先の部のentryIds
    const newForeignPartEntryIds = [
      ...partMap[destination.droppableId].entryIds,
    ];
    newForeignPartEntryIds.splice(destination.index, 0, draggableId);

    const result = { ...partMap };
    result[source.droppableId] = {
      ...partMap[source.droppableId],
      entryIds: newHomePartEntryIds,
    };
    result[destination.droppableId] = {
      ...partMap[destination.droppableId],
      entryIds: newForeignPartEntryIds,
    };

    return result;
  }
};
