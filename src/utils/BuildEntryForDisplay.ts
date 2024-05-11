import { Entry, EntryForDisplay } from "../type/Entry";

export const BuildEntryForDisplay = (
  entry: Entry,
  partNum: number,
  index: number,
  startingTime: Date | null
): EntryForDisplay => {
  {
    const timeFormatter = new Intl.DateTimeFormat("ja-jp", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const stringStartingTime = startingTime
      ? `${timeFormatter.format(startingTime)}`
      : "";

    return {
      playMinutes: entry.time,
      startingTime: stringStartingTime,
      partNum: partNum,
      index: index,
      lastName: entry.lastName,
      firstName: entry.firstName,
      affiliation: entry.affiliation,
      grade: entry.grade,
      composer: entry.composer,
      work: entry.work,
      memo: entry.memo,
    };
  }
};
