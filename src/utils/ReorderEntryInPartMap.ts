import { PartMap } from "../type/Part";
import { EntryMap, RowCountOfEntryMap } from "../type/Entry";
import { DraggableId, DraggableLocation } from "react-beautiful-dnd";

type Props = {
  partMap: PartMap;
  entryMap: EntryMap;
  draggableId: DraggableId;
  droppableId: string;
  destination: DraggableLocation;
};

export function ReorderEntryInPartMap(props: Props): PartMap {
  const { partMap, entryMap, draggableId, droppableId, destination } = props;
  const mapOfRowCountOfEntry = BuildMapOfRowCountOfEntry(entryMap);

  if (droppableId === destination.droppableId) {
    return ReorderEntryDroppedOnSamePart(
      partMap,
      mapOfRowCountOfEntry,
      draggableId,
      destination
    );
  } else {
    return ReorderEntryDroppedOnOtherPart(
      partMap,
      mapOfRowCountOfEntry,
      draggableId,
      droppableId,
      destination
    );
  }
}

/**
 * 各エントリーが何行に分割されるかを示すObjectを作る
 */
function BuildMapOfRowCountOfEntry(entryMap: EntryMap): RowCountOfEntryMap {
  const result: RowCountOfEntryMap = {};

  Object.entries(entryMap).forEach(([id, entry], _) => {
    result[id] = Math.max(entry.participants.length, entry.works.length);
  });

  return result;
}

/**
 * 同じ部の中にドロップした場合のReorderのロジック
 */
function ReorderEntryDroppedOnSamePart(
  partMap: PartMap,
  mapOfRowCountOfEntry: RowCountOfEntryMap,
  draggableId: DraggableId,
  destination: DraggableLocation
): PartMap {
  const partId = destination.droppableId;
  const entryIds = partMap[partId].entryIds;

  // ドラッグ中のエントリーのID
  // draggableIdはentryIdとrowIndexInEntryが+で連結された文字列なので、entryIdを抽出する
  const draggedEntryId = draggableId.split("+")[0];

  // ドロップ先のエントリーのID
  const destinationEntryId = FindDestinationEntryId(
    entryIds,
    draggedEntryId,
    mapOfRowCountOfEntry,
    destination.index,
    true
  );

  if (draggedEntryId === destinationEntryId) {
    return partMap; // 同じエントリーの列にドロップした場合は順番を変更しない
  }

  const newEntryIds = entryIds.filter((entryId) => entryId !== draggedEntryId);
  if (destinationEntryId === "end") {
    newEntryIds.push(draggedEntryId);
  } else {
    InsertBeforeValue(newEntryIds, destinationEntryId, draggedEntryId);
  }

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
  mapOfRowCountOfEntry: RowCountOfEntryMap,
  draggableId: DraggableId,
  droppableId: string,
  destination: DraggableLocation
): PartMap {
  // ドラッグ中のエントリーのID
  // draggableIdはentryIdとrowIndexInEntryが+で連結された文字列なので、entryIdを抽出する
  const draggedEntryId = draggableId.split("+")[0];

  // 移動先の部のentryIds
  const foreignPartEntryIds = partMap[destination.droppableId].entryIds;

  // 移動先の列のエントリーのIDを取得
  const destinationEntryId = FindDestinationEntryId(
    foreignPartEntryIds,
    draggedEntryId,
    mapOfRowCountOfEntry,
    destination.index,
    false,
  );

  const newForeignPartEntryIds = [...foreignPartEntryIds];
  if (destinationEntryId === "end") {
    newForeignPartEntryIds.push(draggedEntryId);
  } else {
    InsertBeforeValue(
      newForeignPartEntryIds,
      destinationEntryId,
      draggedEntryId
    );
  }

  // ドラッグしたエントリーを除いた、移動元の部のentryIds
  const newHomePartEntryIds = partMap[droppableId].entryIds.filter(
    (entryId) => entryId !== draggedEntryId
  );

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

/**
 * 移動先のエントリーのIDを見つけるロジック
 */
function FindDestinationEntryId(
  entryIds: string[],
  draggedEntryId: string,
  mapOfRowCountOfEntry: RowCountOfEntryMap,
  destination_index: number,
  isSamePart: boolean,
): string {
  // 部のテーブルに並ぶエントリーを列の数だけ並べた配列を作る
  const entryIdsShownInTable = BuildEntryIdsShownInTable(
    entryIds,
    mapOfRowCountOfEntry
  );

  // beautiful-dndのdestination_indexは、ドラッグ中のエントリーをテーブルから省いてから数えている
  // よって、同じテーブル内での移動では、移動中のentryIdを ShownInTableから取り除いてから特定する
  if (isSamePart) {
    entryIdsShownInTable.splice(
      entryIdsShownInTable.indexOf(draggedEntryId),
      1,
    );
  }

  // 最後の列へドロップした場合はエントリーIDの直前への挿入はできないため、'end'を返して
  // 後続の並び替えで最終行に追加する
  if (destination_index === entryIdsShownInTable.length) {
    return "end";
  }

  if (!entryIdsShownInTable[destination_index]) {
    throw new Error(
      `destinationEntryIdが見つかりません ${destination_index} ${entryIdsShownInTable}`
    );
  }

  return entryIdsShownInTable[destination_index];
}

/**
 * テーブルに並ぶエントリーのIDを順番に並べる。
 * 非破壊的
 * example: [
 *  majima, majima, kiryuu, nishiki, nishiki, nishiki
 * ]
 */
function BuildEntryIdsShownInTable(
  entryIds: string[],
  mapOfRowCountOfEntry: RowCountOfEntryMap
) {
  const result: string[] = [];

  entryIds.forEach((entryId) => {
    const rowCount = mapOfRowCountOfEntry[entryId];
    for (let i = 0; i < rowCount; i++) {
      result.push(entryId);
    }
  });

  return result;
}

/**
 * 与えられた配列のある値の直前に値を挿入して、新しい配列を返す破壊的関数
 */
function InsertBeforeValue<T>(arr: T[], targetValue: T, newValue: T): void {
  const index = arr.indexOf(targetValue);

  if (index === -1) {
    throw new Error(`配列内に${targetValue}が存在しません`);
  }

  arr.splice(index, 0, newValue);
}
