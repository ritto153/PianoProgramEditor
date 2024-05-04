import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { EntryMap } from "./type/Entry";
import { PartMap } from "./type/Part";

const initialEntryMap = EntryMapBuilder(response.entries);
const initialPartMap = PartMapBuilder(response);

interface EntryContextValue {
  entryMap: EntryMap;
  partMap: PartMap;
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>;
}

const EntryContext = createContext<EntryContextValue>({
  entryMap: {},
  partMap: {},
  setPartMap: () => {},
});
export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const entryMap = initialEntryMap;
  const [partMap, setPartMap] = useState(initialPartMap);
  console.log("EntryProvider の確認ログ")

  return (
    <EntryContext.Provider value={{ entryMap, partMap, setPartMap }}>
      {children}
    </EntryContext.Provider>
  );
}
