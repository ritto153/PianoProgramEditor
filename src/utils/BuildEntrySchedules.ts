import { minutesBetweenSolo } from "../constants/MinutesBetweenEntries";
import { EntryMap } from "../type/Entry";
import { EntrySchedules } from "../type/EntrySchedules";

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
    const firstEntryPlayTime = firstEntry ? firstEntry.time : 0;
    endingTime.setMinutes(endingTime.getMinutes() + firstEntryPlayTime);

    entryIds.forEach((entryId, i) => {
      if (i > 0) {
        // ひとつ前のエントリーの終了時刻 + 間の時間
        startingTime = new Date(endingTime);
        startingTime.setMinutes(startingTime.getMinutes() + minutesBetweenSolo);

        // 開始時刻 + 演奏時間
        endingTime = new Date(startingTime);
        endingTime.setMinutes(endingTime.getMinutes() + entryMap[entryId].time);
      }
      result[entryId] = {
        startingTime: new Date(startingTime),
        endingTime: new Date(endingTime),
      };
    });

    return result;
  }
};
