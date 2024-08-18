import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import newResponse from "./data/newResponse.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { NewPartMapBuilder } from "./utils/NewPartMapBuilder";
import { EntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

const initialNewEntryMap = EntryMapBuilder(newResponse.entries);
const initialPartMap = PartMapBuilder(response);
const initialNewPartMap = NewPartMapBuilder(newResponse);

interface EntryContextValue {
  newEntryMap: EntryMap;
  partMap: PartMap;
  newPartMap: PartMap;
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>;
}

const EntryContext = createContext<EntryContextValue>({
  newEntryMap: {},
  partMap: {},
  newPartMap: {},
  setPartMap: () => {},
});
export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const newEntryMap = initialNewEntryMap;
  const [partMap, setPartMap] = useState(initialPartMap);
  const [newPartMap, setNewPartMap] = useState(initialNewPartMap);

  return (
    <EntryContext.Provider value={{ newEntryMap, partMap, newPartMap, setPartMap }}>
      {children}
    </EntryContext.Provider>
  );
}
