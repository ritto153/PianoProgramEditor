import { useSavedData } from "../SavedDataProvider";
import { useDataIdInUse } from "../DataIdInUseProvider";
import { useGetSavedData } from "./useGetSavedData";
import { PartMap } from "../type/Part";
import { EntryMap } from "../type/Entry";
import { SavedDatum } from "../type/SavedDatum";

export const useSetSavedData = () => {
  const { getSavedDataInUse } = useGetSavedData();
  const { setSavedDataMap } = useSavedData();
  const { dataIdInUse } = useDataIdInUse();

  const setPartMapOfSavedDataInUse = (partMap: PartMap) => {
    const savedData = getSavedDataInUse();
    if (!savedData) {
      console.error("No saved data found for the current dataIdInUse.");
      return;
    }

    const updatedSavedData: SavedDatum = {
      ...savedData,
      partMap: partMap,
      lastUpdated: new Date(),
    };

    setSavedDataMap((prevSavedDataMap) => ({
      ...prevSavedDataMap,
      [dataIdInUse]: updatedSavedData,
    }));
  }

  const setEntryMapOfSavedDataInUse = (entryMap: EntryMap) => {
    const savedData = getSavedDataInUse();
    if (!savedData) {
      console.error("No saved data found for the current dataIdInUse.");
      return;
    }

    const updatedSavedData: SavedDatum = {
      ...savedData,
      entryMap: entryMap,
      lastUpdated: new Date(),
    };

    setSavedDataMap((prevSavedDataMap) => ({
      ...prevSavedDataMap,
      [dataIdInUse]: updatedSavedData,
    }));
  };

  const setEntryMapAndPartMapOfSavedDataInUse = (
    entryMap: EntryMap,
    partMap: PartMap
  ) => {
    const savedData = getSavedDataInUse();
    if (!savedData) {
      console.error("No saved data found for the current dataIdInUse.");
      return;
    }
    const updatedSavedData: SavedDatum = {
      ...savedData,
      entryMap: entryMap,
      partMap: partMap,
      lastUpdated: new Date(),
    };
    setSavedDataMap((prevSavedDataMap) => ({
      ...prevSavedDataMap,
      [dataIdInUse]: updatedSavedData,
    }));
  };

  return { setPartMapOfSavedDataInUse, setEntryMapOfSavedDataInUse, setEntryMapAndPartMapOfSavedDataInUse };
}


    

  