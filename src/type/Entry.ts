export type Entry = {
  id: string;
  partId: string;
  participants: {
    id: string;
    lastName: string;
    firstName: string;
    faculty: string;
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

export type InputtingEntryToAdd = {
  participants: {
    lastName: string | null;
    firstName: string | null;
    faculty: string | null;
    grade: number | null;
  }[];
  works: {
    composer: string | null;
    name: string | null;
  }[];
  time: number | null;
  memo: string | null;
}

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
  faculty: string | null;
  grade: number | null;
  composer: string | null;
  work: string | null;
  memo: string | null;
};

