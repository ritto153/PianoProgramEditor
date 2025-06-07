import { useSavedData } from "../SavedDataProvider";
import { useDataIdInUse } from "../DataIdInUseProvider";

export const useGetSavedData = () => {
  const { savedDataMap } = useSavedData();
  const { dataIdInUse } = useDataIdInUse();

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

  return { getSavedDataInUse, getPartMapOfSavedDataInUse, getEntryMapOfSavedDataInUse};
};
