export type Part = {
  part_num: number;
  entryIds: number[];
}

export type PartMap = {
  [part_num: number]: Part;
}