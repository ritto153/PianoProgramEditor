import { useParts } from "../PartProvider";
import { useEntries } from "../EntryProvider";
import { useGetSavedData } from "./useGetSavedData";
import { useSetSavedData } from "./useSetSavedData";

/**
 * エントリを削除するためのカスタムフック。
 * PartMapとEntryMapから指定されたエントリを削除し、状態を更新します。
 * @returns {function(string): void} エントリIDを引数にとる削除関数
 */
export const useRemoveEntry = () => {
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const { partMap, entryMap } = savedDataInUse;
  const { setPartMapOfSavedDataInUse, setEntryMapOfSavedDataInUse } =
    useSetSavedData();
  // const { partMap, setPartMap } = useParts();
  // const { entryMap, setEntryMap } = useEntries();

  const removeEntry = (entryId: string): void => {
    // Find the part that contains the entry
    const partId = Object.keys(partMap).find((id) =>
      partMap[id].entryIds.includes(entryId)
    );

    if (!partId) {
      console.error(`Entry with ID ${entryId} not found in any part.`);
      return;
    }

    // Remove the entry from the part's entryIds
    const updatedPart = {
      ...partMap[partId],
      entryIds: partMap[partId].entryIds.filter((id) => id !== entryId),
    };

    // Update the partMap with the modified part
    const updatedPartMap = {
      ...partMap,
      [partId]: updatedPart,
    };

    // Remove the entry from the entryMap
    const updatedEntryMap = { ...entryMap };
    delete updatedEntryMap[entryId];

    // Update the state with the new partMap and entryMap
    setPartMapOfSavedDataInUse(updatedPartMap);
    setEntryMapOfSavedDataInUse(updatedEntryMap);
    console.log(`Entry with ID ${entryId} has been removed.`);
  };

  return { removeEntry };
};