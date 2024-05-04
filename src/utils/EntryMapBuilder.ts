import { Entry, EntryMap } from "../type/Entry";

export const EntryMapBuilder = (entries: Entry[]): EntryMap => {
  const result: EntryMap = {};

  entries.forEach((entry) => {
    result[entry.id] = entry;
  });

  return result;
};
