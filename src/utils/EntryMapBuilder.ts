import { NewEntry, EntryMap } from "../type/Entry";

export const EntryMapBuilder = (entries: NewEntry[]): EntryMap => {
  const result: EntryMap = {};

  entries.forEach((entry) => {
    result[entry.id] = entry;
  });

  return result;
};
