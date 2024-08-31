import { EntryForDisplay } from "../../type/Entry";
import { DividedEntryForRow } from "../../type/DividedEntryForRow";
import { StringifyDate } from "../../utils/StringifyDate";

export const BuildEntryForDisplay = (
  dividedEntryForRow: DividedEntryForRow,
  partNum: number,
  startingTime: Date | null
): EntryForDisplay => ({
  playMinutes: dividedEntryForRow.playMinutes,
  startingTime: StringifyDate(startingTime),
  partNum: partNum,
  index: dividedEntryForRow.index,
  lastName: dividedEntryForRow.lastName,
  firstName: dividedEntryForRow.firstName,
  faculty: dividedEntryForRow.faculty,
  grade: dividedEntryForRow.grade,
  composer: dividedEntryForRow.composer,
  work: dividedEntryForRow.work,
  memo: dividedEntryForRow.memo,
});
