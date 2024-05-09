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

export type EntryMap = {
  [id: string]: Entry;
};

export type EntryForDisplay = {
  partNum: number;
  index: number;
  lastName: string;
  firstName: string;
  affiliation: string;
  grade: number;
  composer: string;
  work: string;
  time: number;
  memo: string;
};
