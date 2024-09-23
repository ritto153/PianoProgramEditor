import { Entry } from "../../type/Entry";
import {
  DividedEntryForRow,
  DividedTopEntry,
  DividedSubordinaryEntry,
} from "../../type/DividedEntryForRow";

type PropsForDivideEntryForRow = {
  entry: Entry;
  partNum: number;
  index: number;
  stringStartingTime: string;
};

// 連弾や複数曲エントリーを持つエントリーは複数行で表示するため、行で表示できるようにEntryを配列に変換する
// Entry をクラスにしてインスタンスメソッドとして定義したほうがきれいかも
export const DivideEntryForRow = (
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
        rowIndexInEntry: i,
        entryId: entry.id,
        playMinutes: entry.time,
        startingTime: stringStartingTime,
        partNum: partNum,
        index: index,
        lastName: participant.lastName,
        firstName: participant.firstName,
        faculty: participant.faculty,
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
        rowIndexInEntry: i,
        entryId: entry.id,
        playMinutes: null,
        startingTime: null,
        partNum: partNum,
        index: index,
        lastName: participant ? participant.lastName : null,
        firstName: participant ? participant.firstName : null,
        faculty: participant ? participant.faculty : null,
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
