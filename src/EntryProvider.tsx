import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import newResponse from "./data/newResponse.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { OldEntryMapBuilder } from "./utils/OldEntryMapBuilder";
import { NewEntryMapBuilder } from "./utils/NewEntryMapBuilder";
import { EntryMap, NewEntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

const initialEntryMap = OldEntryMapBuilder(response.entries);
const initialNewEntryMap = NewEntryMapBuilder(newResponse.entries);
const initialPartMap = PartMapBuilder(response);

interface EntryContextValue {
  entryMap: EntryMap;
  newEntryMap: NewEntryMap;
  partMap: PartMap;
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>;
}

const EntryContext = createContext<EntryContextValue>({
  entryMap: {},
  newEntryMap: {},
  partMap: {},
  setPartMap: () => {},
});
export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const entryMap = initialEntryMap;
  const newEntryMap = initialNewEntryMap;
  const [partMap, setPartMap] = useState(initialPartMap);

  return (
    <EntryContext.Provider value={{ entryMap, newEntryMap, partMap, setPartMap }}>
      {children}
    </EntryContext.Provider>
  );
}
