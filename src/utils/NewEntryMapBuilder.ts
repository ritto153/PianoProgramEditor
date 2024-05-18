import { NewEntry, NewEntryMap } from "../type/Entry";

export const NewEntryMapBuilder = (entries: NewEntry[]): NewEntryMap => {
  const result: NewEntryMap = {};

  entries.forEach((entry) => {
    result[entry.id] = entry;
  });

  return result;
};
