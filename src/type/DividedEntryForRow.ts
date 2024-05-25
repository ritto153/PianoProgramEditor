export type DividedTopEntry = {
  isTopRow: boolean;
  id: string;
  playMinutes: number;
  startingTime: string;
  partNum: number;
  index: number;
  lastName: string;
  firstName: string;
  affiliation: string;
  grade: number;
  composer: string;
  work: string;
  memo: string;
};

export type DividedSubordinaryEntry = {
  isTopRow: boolean;
  id: null;
  playMinutes: null;
  startingTime: null;
  partNum: number;
  index: null;
  lastName: string | null;
  firstName: string | null;
  affiliation: string | null;
  grade: number | null;
  composer: string | null;
  work: string | null;
  memo: string | null;
};

export type DividedEntryForRow = DividedTopEntry | DividedSubordinaryEntry;
