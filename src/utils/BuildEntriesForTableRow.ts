import { Entry, EntryMap } from "../type/Entry";
import {
  DividedEntryForRow,
  DividedTopEntry,
  DividedSubordinaryEntry,
} from "../type/DividedEntryForRow";
import { EntrySchedules } from "../type/EntrySchedules";
import { StringifyDate } from "./StringifyDate";

type PropsForBuildEntriesForTableRow = {
  entryIds: string[];
  entryMap: EntryMap;
  partNum: number;
  entrySchedules: EntrySchedules;
};

// 連弾や複数曲エントリーを持つエントリーは複数行で表示するため、行で表示できるようにEntryを配列に変換する
export const BuildEntriesForTableRow = (
  props: PropsForBuildEntriesForTableRow
): DividedEntryForRow[] => {
  const { entryIds, entryMap, partNum, entrySchedules } = props;

  const result: DividedEntryForRow[] = [];

  entryIds.forEach((entryId, i) => {
    const entry = entryMap[entryId];
    const dividedEntries = DivideEntryForRow({
      entry: entry,
      partNum: partNum,
      index: i + 1,
      stringStartingTime: StringifyDate(entrySchedules[entryId].startingTime),
    });

    dividedEntries.forEach((entry) => {
      result.push(entry);
    });
  });

  return result;
};

type PropsForDivideEntryForRow = {
  entry: Entry;
  partNum: number;
  index: number;
  stringStartingTime: string;
};

// 連弾や複数曲エントリーを持つエントリーは複数行で表示するため、行で表示できるようにEntryを配列に変換する
// Entry をクラスにしてインスタンスメソッドとして定義したほうがきれいかも
const DivideEntryForRow = (
  props: PropsForDivideEntryForRow
): DividedEntryForRow[] => {
  const { entry, partNum, index, stringStartingTime } = props;

  const sizeOfDivdedEntries = Math.max(
    entry.participants.length,
    entry.works.length
  );

  const result: DividedEntryForRow[] = [];

  for (let i = 0; i < sizeOfDivdedEntries; i++) {
    // 最初の行はエントリーの基本的な情報をすべて持つ
    if (i === 0) {
      const participant = entry.participants[0];
      const work = entry.works[0];

      const dividedTopEntry: DividedTopEntry = {
        isTopRow: true,
        id: entry.id,
        playMinutes: entry.time,
        startingTime: stringStartingTime,
        partNum: partNum,
        index: index,
        lastName: participant.lastName,
        firstName: participant.firstName,
        affiliation: participant.affiliation,
        grade: participant.grade,
        composer: work.composer,
        work: work.name,
        memo: entry.memo,
      };

      result.push(dividedTopEntry);
    } else {
      const participant =
        i < entry.participants.length ? entry.participants[i] : null;
      const work = i < entry.works.length ? entry.works[i] : null;

      const dividedSubordinaryEntry: DividedSubordinaryEntry = {
        isTopRow: false,
        id: entry.id,
        playMinutes: null,
        startingTime: null,
        partNum: partNum,
        index: null,
        lastName: participant ? participant.lastName : null,
        firstName: participant ? participant.firstName : null,
        affiliation: participant ? participant.affiliation : null,
        grade: participant ? participant.grade : null,
        composer: work ? work.composer : null,
        work: work ? work.name : null,
        memo: null,
      };

      result.push(dividedSubordinaryEntry);
    }
  }

  return result;
};
