import { Entry, EntryForDisplay } from "../type/Entry";

export const BuildEntryForDisplay = (
  entry: Entry,
  partNum: number,
  index: number,
  startingTime: Date | null,
): EntryForDisplay => ({
  playMinutes: entry.time,
  startingTime: startingTime,
  partNum: partNum,
  index: index,
  lastName: entry.lastName,
  firstName: entry.firstName,
  affiliation: entry.affiliation,
  grade: entry.grade,
  composer: entry.composer,
  work: entry.work,
  memo: entry.memo,
});
