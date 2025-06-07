import { PartMap } from "./Part";
import { EntryMap } from "./Entry";

export type SavedDatum = {
  id: string;
  name: string;
  partMap: PartMap;
  entryMap: EntryMap;
  lastUpdated: Date;
};

export type SavedDataMap = {
  [id: string]: SavedDatum;
}