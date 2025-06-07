import { createContext, useContext, useState } from "react";
import { SavedDatum, SavedDataMap } from "./type/SavedDatum";
import response from "./data/response.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { EntryMapBuilder } from "./utils/EntryMapBuilder";
import { v4 as uuidv4 } from "uuid";

/**
 * savedDataMap の初期値
 * localStorage の savedDataMap にデータが保存されていればそれを採用する
 */
let initialSavedDataMap: SavedDataMap = {};
const savedDataMapInLocalStorage = localStorage.getItem("savedDataMap");
if (savedDataMapInLocalStorage == null) {
  const initialPartMap = PartMapBuilder(response);
  const initialEntryMap = EntryMapBuilder(response.entries);
  const initialSavedDatum: SavedDatum = {
    id: uuidv4(),
    name: "サンプルデータ",
    partMap: initialPartMap,
    entryMap: initialEntryMap,
    lastUpdated: new Date(),
  };
  initialSavedDataMap = {
    [initialSavedDatum.id]: initialSavedDatum,
  }
} else {
  initialSavedDataMap = JSON.parse(savedDataMapInLocalStorage);
}

interface SavedDataContextValue {
  savedDataMap: SavedDataMap;
  setSavedDataMap: React.Dispatch<React.SetStateAction<SavedDataMap>>;
}

const SavedDataContext = createContext<SavedDataContextValue>({
  savedDataMap: {},
  setSavedDataMap: () => {},
});

export const useSavedData = () => useContext(SavedDataContext);

export default function SavedDataProvider(props: { children: JSX.Element }) {
  const { children } = props;

  // 初期値は空のオブジェクト
  const [savedDataMap, setSavedDataMap] = useState<SavedDataMap>(initialSavedDataMap);

  return (
    <SavedDataContext.Provider value={{ savedDataMap, setSavedDataMap }}>
      {children}
    </SavedDataContext.Provider>
  );
}
