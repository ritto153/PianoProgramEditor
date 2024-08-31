import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";
import { PartMap } from "./type/Part";

const initialPartMap = PartMapBuilder(response);

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
