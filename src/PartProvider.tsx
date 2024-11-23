import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { PartMap } from "./type/Part";

/**
 * partMap の初期値
 * localStorage の partMap にデータが保存されていればそれを採用する
 */
let initialPartMap: PartMap;
const partMapInLocalStorage = localStorage.getItem("partMap");
if (partMapInLocalStorage === null) {
  initialPartMap = PartMapBuilder(response);
} else {
  initialPartMap = JSON.parse(partMapInLocalStorage);
  for (let part of Object.values(initialPartMap)) {
    part.startingTime = part.startingTime ? new Date(part.startingTime) : null
  }
}

interface PartContextValue {
  partMap: PartMap;
  setPartMap: React.Dispatch<React.SetStateAction<PartMap>>;
}

const PartContext = createContext<PartContextValue>({
  partMap: {},
  setPartMap: () => {},
});

export const useParts = () => useContext(PartContext);

export default function PartProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [partMap, setPartMap] = useState(initialPartMap);

  return (
    <PartContext.Provider value={{ partMap, setPartMap }}>
      {children}
    </PartContext.Provider>
  );
}
