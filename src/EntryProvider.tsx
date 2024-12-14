import { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { EntryMap } from "./type/Entry";

const initialNewEntryMap = EntryMapBuilder(response.entries);

interface EntryContextValue {
  entryMap: EntryMap;
  setEntryMap: React.Dispatch<React.SetStateAction<EntryMap>>;
}

const EntryContext = createContext<EntryContextValue>({
  entryMap: {},
  setEntryMap: () => {},
});

export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [entryMap, setEntryMap] = useState(initialNewEntryMap);

  return (
    <EntryContext.Provider value={{ entryMap, setEntryMap }}>
      {children}
    </EntryContext.Provider>
  );
}
