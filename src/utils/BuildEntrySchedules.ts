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
    let startingTime = new Date(partStartingTime);
    let endingTime = new Date(startingTime);
    endingTime.setMinutes(endingTime.getMinutes() + firstEntry.time);

    entryIds.forEach((entryId) => {
      result[entryId] = {
        startingTime: new Date(startingTime),
        endingTime: new Date(endingTime),
      };

      startingTime = new Date(endingTime);
      startingTime.setMinutes(startingTime.getMinutes() + minutesBetweenSolo);

      endingTime = new Date(startingTime);
      endingTime.setMinutes(endingTime.getMinutes() + entryMap[entryId].time);
    });

    return result;
  }
};
