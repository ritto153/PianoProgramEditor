import { BuildEntryForDisplay } from "./BuildEntryForDisplay";
import { Entry, EntryForDisplay } from "../type/Entry";

export const BuildEntriesForDisplay = (entries: Entry[]): EntryForDisplay[] => {
  const result: EntryForDisplay[] = [];

  entries.forEach((entry) => {
    result.push(BuildEntryForDisplay(entry, 0, 0, null));
  });

  return result;
};
