import { Entry, EntryForDisplay } from "../type/Entry";

export const BuildEntryForDisplay = (
  entry: Entry,
  partNum: number,
  index: number
): EntryForDisplay => ({
  partNum: partNum,
  index: index,
  lastName: entry.lastName,
  firstName: entry.firstName,
  affiliation: entry.affiliation,
  grade: entry.grade,
  composer: entry.composer,
  work: entry.work,
  time: entry.time,
  memo: entry.memo,
});
