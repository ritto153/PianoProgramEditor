export type OldEntry = {
  id: number
  part_num: number
  last_name: string
  first_name: string
  affiliation: string
  grade: number
  composer: string
  work: string
  time: number
  memo: string
}

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