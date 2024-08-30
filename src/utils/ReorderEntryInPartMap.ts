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

  // 部のテーブルに並ぶエントリーを列の数だけ並べた配列を作る
  const entryIdsShownInTable = BuildEntryIdsShownInTable(
    entryIds,
    mapOfRowCountOfEntry
  );
  
  // 移動先の列のエントリーのIDを取得
  const destinationEntryId = entryIdsShownInTable[destination.index];
  
  if (draggedEntryId === destinationEntryId) {
    return partMap; // 同じエントリーの列にドロップした場合は順番を変更しない
  }

  // ドラッグしたエントリーを除いた entryIdの配列
  const newEntryIds = entryIds.filter((entryId) => entryId !== draggedEntryId);
  // ドラッグしたエントリーをドロップした場所に追加
  InsertAfterValue(newEntryIds, destinationEntryId, draggedEntryId);

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

  // ドラッグしたエントリーを除いた、移動元の部のentryIds
  const newHomePartEntryIds = partMap[droppableId].entryIds.filter(
    (entryId) => entryId !== draggedEntryId
  );

  // 移動先の部のentryIds
  const foreignPartEntryIds = partMap[destination.droppableId].entryIds;

  // 移動先の部のテーブルに並ぶエントリーを列の数だけ並べた配列を作る
  const entryIdsShownInTable = BuildEntryIdsShownInTable(
    foreignPartEntryIds,
    mapOfRowCountOfEntry
  );

  // 移動先の列のエントリーのIDを取得
  const destinationEntryId = entryIdsShownInTable[destination.index];

  // 移動先の部のentryIdsのコピー
  const newForeignPartEntryIds = [...foreignPartEntryIds];
  // ドラッグしたエントリーをドロップした場所に追加
  InsertAfterValue(newForeignPartEntryIds, destinationEntryId, draggedEntryId);

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
 * テーブルに並ぶエントリーのIDを順番に並べる
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
 * 与えられた配列のある値の直後に値を挿入して、新しい配列を返す破壊的関数
 */
function InsertAfterValue<T>(arr: T[], targetValue: T, newValue: T): void {
  const index = arr.indexOf(targetValue);

  if (index === -1) {
    throw new Error(`配列内に${targetValue}が存在しません`);
  }

  arr.splice(index + 1, 0, newValue);
}
