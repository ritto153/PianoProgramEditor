export type Entry = {
  id: number
  partId: number
  lastName: string
  firstName: string
  affiliation: string
  grade: number
  composer: string
  work: string
  time: number
  memo: string
}

export type EntryMap = {
  [id: number]: Entry;
}