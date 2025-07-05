import { useSavedData } from "../SavedDataProvider";
import { v4 as uuidv4 } from "uuid";
import { Part } from "../type/Part";

export const useCreateEmptySavedData = () => {
  const { setSavedDataMap } = useSavedData();

  const createEmptySavedData = (name: string) => {
    const newDataId = uuidv4();
    const firstPart: Part = {
      id: uuidv4(),
      partNum: 0,
      startingTime: null,
      entryIds: [],
    };
    const emptySavedDatum = {
      id: newDataId,
      name: name || "新しいセーブデータ",
      partMap: {
        [firstPart.id]: firstPart,
      },
      entryMap: {},
      lastUpdated: new Date(),
    };

    setSavedDataMap((prevSavedDataMap) => ({
      ...prevSavedDataMap,
      [newDataId]: emptySavedDatum,
    }));

    return newDataId;
  };

  return { createEmptySavedData };
};
