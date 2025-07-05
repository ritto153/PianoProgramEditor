import { useSavedData } from "../SavedDataProvider";
import { useDataIdInUse } from "../DataIdInUseProvider";

export const useRemoveSavedData = () => {
  const { savedDataMap, setSavedDataMap } = useSavedData();
  const { dataIdInUse } = useDataIdInUse();

  const removeSavedData = (dataId: string) => {
    // Check if the dataId exists in the savedDataMap
    if (!savedDataMap[dataId]) {
      console.error(`No saved data found for dataId: ${dataId}`);
      return;
    }

    if (dataId === dataIdInUse) {
      alert("現在使用中のセーブデータは削除できません。");
      return;
    }

    // Create a new map without the specified dataId
    const updatedSavedDataMap = { ...savedDataMap };
    delete updatedSavedDataMap[dataId];

    // Update the saved data map in the context
    setSavedDataMap(updatedSavedDataMap);
  };

  return { removeSavedData };
}
