import { Entry, EntryForDisplay } from "../type/Entry";
import { StringifyDate } from "./StringifyDate";

export const OldBuildEntryForDisplay = (
  entry: Entry,
  partNum: number,
  index: number,
  startingTime: Date | null
): EntryForDisplay => ({
  playMinutes: entry.time,
  startingTime: StringifyDate(startingTime),
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
