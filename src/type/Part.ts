export type Part = {
  id: string;
  partNum: number;
  startingTime: string | null;
  entryIds: number[];
}

export type PartMap = {
  [id: string]: Part;
}