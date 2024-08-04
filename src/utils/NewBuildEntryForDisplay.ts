import { EntryForDisplay } from "../type/Entry";
import { DividedEntryForRow } from "../type/DividedEntryForRow";
import { StringifyDate } from "./StringifyDate";

export const NewBuildEntryForDisplay = (
  dividedEntryForRow: DividedEntryForRow,
  partNum: number,
  index: number,
  startingTime: Date | null
): EntryForDisplay => ({
  playMinutes: dividedEntryForRow.playMinutes,
  startingTime: StringifyDate(startingTime),
  partNum: partNum,
  index: index,
  lastName: dividedEntryForRow.lastName,
  firstName: dividedEntryForRow.firstName,
  affiliation: dividedEntryForRow.affiliation,
  grade: dividedEntryForRow.grade,
  composer: dividedEntryForRow.composer,
  work: dividedEntryForRow.work,
  memo: dividedEntryForRow.memo,
});
