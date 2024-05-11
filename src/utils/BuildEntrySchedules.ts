import { minutesBetweenSolo } from "../constants/MinutesBetweenEntries";
import { EntryMap } from "../type/Entry";

type EntrySchedules = {
  [entryId: string]: {
    startingTime: Date | null;
    endingTime: Date | null;
  };
};

export const BuildEntrySchedules = (
  entryIds: string[],
  entryMap: EntryMap,
  partStartingTime: Date | null
): EntrySchedules => {
  const result: EntrySchedules = {};

  if (partStartingTime === null) {
    entryIds.forEach((entryId) => {
      result[entryId] = {
        startingTime: null,
        endingTime: null,
      };
    });
    return result;
  } else {
    const firstEntry = entryMap[entryIds[0]];
    const startingTime = new Date(partStartingTime);
    const endingTime = new Date(startingTime);
    endingTime.setMinutes(startingTime.getMinutes() + firstEntry.time);

    entryIds.forEach((entryId) => {
      result[entryId] = {
        startingTime: new Date(startingTime),
        endingTime: new Date(endingTime),
      };

      startingTime.setMinutes(endingTime.getMinutes() + minutesBetweenSolo);
      endingTime.setMinutes(startingTime.getMinutes() + entryMap[entryId].time);
    });

    return result;
  }
};
