import { useSavedData } from "../SavedDataProvider";
import { useDataIdInUse } from "../DataIdInUseProvider";

export const useGetSavedData = () => {
  const { savedDataMap } = useSavedData();
  const { dataIdInUse } = useDataIdInUse();

  const getSavedDataMap = () => {
    return savedDataMap;
  };

  const getSavedDataInUse = () => {
    return savedDataMap[dataIdInUse] || null;
  };

  const getPartMapOfSavedDataInUse = () => {
    const savedData = getSavedDataInUse();
    return savedData ? savedData.partMap : {};
  };

  const getEntryMapOfSavedDataInUse = () => {
    const savedData = getSavedDataInUse();
    return savedData ? savedData.entryMap : {};
  };

  return {
    getSavedDataMap,
    getSavedDataInUse,
    getPartMapOfSavedDataInUse,
    getEntryMapOfSavedDataInUse,
  };
};
