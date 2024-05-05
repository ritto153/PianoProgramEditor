export type Part = {
  id: string;
  partNum: number;
  startingTime: Date | null;
  entryIds: string[];
}

export type PartMap = {
  [id: string]: Part;
}