export type Part = {
  id: string;
  partNum: number;
  startingTime: string | null;
  entryIds: string[];
}

export type PartMap = {
  [id: string]: Part;
}