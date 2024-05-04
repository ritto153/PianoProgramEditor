import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { Entry, EntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

const initialEntries = response["entries"];
const initialEntryMap = EntryMapBuilder(initialEntries);
const initialPartMap = PartMapBuilder(response);

interface EntryContextValue {
  entryMap: EntryMap;
  partMap: PartMap;
  setEntryMap: React.Dispatch<React.SetStateAction<EntryMap>>;
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>;
}

const EntryContext = createContext<EntryContextValue>({
  entryMap: {},
  partMap: {},
  setEntryMap: () => {},
  setPartMap: () => {},
});
export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [entryMap, setEntryMap] = useState(initialEntryMap);
  const [partMap, setPartMap] = useState(initialPartMap);

  return (
    <EntryContext.Provider value={{ entryMap, partMap, setEntryMap, setPartMap }}>
      {children}
    </EntryContext.Provider>
  );
}
