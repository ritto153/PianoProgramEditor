export type Part = {
  id: number;
  partNum: number;
  startingTime: string | null;
  entryIds: number[];
}

export type PartMap = {
  [id: number]: Part;
}