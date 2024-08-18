import React, { createContext, useContext, useState } from "react";
import newResponse from "./data/newResponse.json";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { EntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

const initialNewEntryMap = EntryMapBuilder(newResponse.entries);
const initialPartMap = PartMapBuilder(newResponse);
const initialNewPartMap = PartMapBuilder(newResponse);

interface EntryContextValue {
  entryMap: EntryMap;
  partMap: PartMap;
  newPartMap: PartMap;
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>;
}

const EntryContext = createContext<EntryContextValue>({
  entryMap: {},
  partMap: {},
  newPartMap: {},
  setPartMap: () => {},
});
export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const entryMap = initialNewEntryMap;
  const [partMap, setPartMap] = useState(initialPartMap);
  const [newPartMap, setNewPartMap] = useState(initialNewPartMap);

  return (
    <EntryContext.Provider value={{ entryMap, partMap, newPartMap, setPartMap }}>
      {children}
    </EntryContext.Provider>
  );
}
