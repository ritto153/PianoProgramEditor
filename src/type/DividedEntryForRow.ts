export type DividedTopEntry = {
  rowIndexInEntry: number;
  entryId: string;
  playMinutes: number;
  startingTime: string;
  partNum: number;
  index: number;
  lastName: string;
  firstName: string;
  faculty: string;
  grade: number;
  composer: string;
  work: string;
  memo: string;
};

export type DividedSubordinaryEntry = {
  rowIndexInEntry: number;
  entryId: string;
  playMinutes: null;
  startingTime: null;
  partNum: number;
  index: number;
  lastName: string | null;
  firstName: string | null;
  faculty: string | null;
  grade: number | null;
  composer: string | null;
  work: string | null;
  memo: string | null;
};

export type DividedEntryForRow = DividedTopEntry | DividedSubordinaryEntry;
