import { useGetSavedData } from "./useGetSavedData";
import { useSetSavedData } from "./useSetSavedData";
import { Entry } from "../type/Entry";

/**
 * エントリーを編集するためのカスタムフック。
 * EntryMap 内のエントリーを更新します
 * @return {function(Entry): void} エントリーを更新する関数
 */
export const useEditEntry = () => {
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const { entryMap } = savedDataInUse;
  const { setEntryMapOfSavedDataInUse } = useSetSavedData();

  const editEntry = (updatedEntry: Entry): void => {
    // エントリーIDを取得
    const entryId = updatedEntry.id;

    // 更新されたエントリーをエントリーマップに追加
    const updatedEntryMap = {
      ...entryMap,
      [entryId]: updatedEntry,
    };

    // 状態を更新
    setEntryMapOfSavedDataInUse(updatedEntryMap);
  };

  return { editEntry };
};
