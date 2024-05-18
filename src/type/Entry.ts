export type Entry = {
  id: string;
  partId: string;
  lastName: string;
  firstName: string;
  affiliation: string;
  grade: number;
  composer: string;
  work: string;
  time: number;
  memo: string;
};

export type NewEntry = {
  id: string;
  partId: string;
  participants: {
    id: string;
    lastName: string;
    firstName: string;
    affiliation: string;
    grade: number;
  };
  composer: string;
  work: string;
  time: number;
  memo: string;
};

export type EntryMap = {
  [id: string]: Entry;
};

export type NewEntryMap = {
  [id: string]: NewEntry;
};

export type EntryForDisplay = {
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
