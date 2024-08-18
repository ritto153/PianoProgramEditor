import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import newResponse from "./data/newResponse.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { NewEntryMapBuilder } from "./utils/NewEntryMapBuilder";
import { NewPartMapBuilder } from "./utils/NewPartMapBuilder";
import { NewEntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

const initialNewEntryMap = NewEntryMapBuilder(newResponse.entries);
const initialPartMap = PartMapBuilder(response);
const initialNewPartMap = NewPartMapBuilder(newResponse);

interface EntryContextValue {
  newEntryMap: NewEntryMap;
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
