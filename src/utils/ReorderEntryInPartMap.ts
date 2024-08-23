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

/**
 * 同じ部の中にDropした場合のReorderのロジック
 */
function ReorderEntryDroppedOnSamePart(
  partMap: PartMap,
  draggableId: DraggableId,
  destination: DraggableLocation
): PartMap {
  const partId = destination.droppableId;
  const entryIds = partMap[partId].entryIds;

  // draggableIdはentryIdとrowIndexInEntryが+で連結された文字列なので、entryIdを抽出する
  const draggedEntryId = draggableId.split("+")[0];
  // ToDo: 移動先の列のindexからそのエントリーのentryIdを取得する
  // const destinationEntryId =

  // ドラッグしたエントリーを除いた entryIdの配列
  const newEntryIds = entryIds.filter((entryId) => entryId !== draggedEntryId);
  // ドラッグしたエントリーをドロップした場所に追加
  newEntryIds.splice(destination.index, 0, draggedEntryId);

  return {
    ...partMap,
    [partId]: {
      ...partMap[partId],
      entryIds: newEntryIds,
    },
  };
}

/**
 * 異なるテーブルにDropしたときのReorerのロジック
 */
function ReorderEntryDroppedOnOtherPart(
  partMap: PartMap,
  draggableId: DraggableId,
  droppableId: string,
  destination: DraggableLocation
): PartMap {
  // draggableIdはentryIdとrowIndexInEntryが+で連結された文字列なので、entryIdを抽出する
  const draggedEntryId = draggableId.split("+")[0];
  // ToDo: 移動先の列のindexからそのエントリーのentryIdを取得する
  // const destinationEntryId =

  // ドラッグしたエントリーを除いた、移動元の部のentryIds
  const newHomePartEntryIds = partMap[droppableId].entryIds.filter(
    (entryId) => entryId !== draggedEntryId
  );
  // ドラッグしたエントリーを加えた、移動先の部のentryIds
  const newForeignPartEntryIds = [...partMap[destination.droppableId].entryIds];
  newForeignPartEntryIds.splice(destination.index, 0, draggedEntryId);

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
