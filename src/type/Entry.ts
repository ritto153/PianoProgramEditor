export type Entry = {
  id: string;
  partId: string;
  participants: {
    id: string;
    lastName: string;
    firstName: string;
    affiliation: string;
    grade: number;
  }[];
  works: {
    id: string;
    composer: string;
    name: string;
  }[];
  time: number;
  memo: string;
};

export type EntryMap = {
  [id: string]: Entry;
};

export type EntryForDisplay = {
  playMinutes: number | null;
  startingTime: string;
  partNum: number;
  index: number;
  lastName: string | null;
  firstName: string | null;
  affiliation: string | null;
  grade: number | null;
  composer: string | null;
  work: string | null;
  memo: string | null;
};
