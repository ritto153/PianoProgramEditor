import { createContext, useContext } from "react";
import response from "./data/response.json";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { EntryMap } from "./type/Entry";

const initialNewEntryMap = EntryMapBuilder(response.entries);

interface EntryContextValue {
  entryMap: EntryMap;
}

const EntryContext = createContext<EntryContextValue>({
  entryMap: {},
});

export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const entryMap = initialNewEntryMap;

  return (
    <EntryContext.Provider value={{ entryMap }}>
      {children}
    </EntryContext.Provider>
  );
}
