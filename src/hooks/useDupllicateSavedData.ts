import { useSavedData } from "../SavedDataProvider";
import { v4 as uuidv4 } from "uuid";

export const useDuplicateSavedData = () => {
  const { savedDataMap, setSavedDataMap } = useSavedData();

  const duplicateSavedData = (dataId: string) => {
    // Check if the dataId exists in the savedDataMap
    if (!savedDataMap[dataId]) {
      console.error(`No saved data found for dataId: ${dataId}`);
      return;
    }

    // Create a new dataId for the duplicated data
    const newDataId = uuidv4();
    const originalSavedData = savedDataMap[dataId];
    const duplicatedSavedData = {
      ...originalSavedData,
      id: newDataId, // Assign a new ID
      name: `${originalSavedData.name} (コピー)`, // Append "(コピー)" to the name
      lastUpdated: new Date(), // Update the last updated time
    };

    // Update the saved data map with the duplicated data
    setSavedDataMap((prevSavedDataMap) => ({
      ...prevSavedDataMap,
      [newDataId]: duplicatedSavedData,
    }));

    console.log(`Saved data with dataId: ${dataId} has been duplicated to ${newDataId}.`);
  };
  return { duplicateSavedData };
};