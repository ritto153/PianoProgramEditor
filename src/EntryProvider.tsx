import React, { createContext, useContext, useState } from "react";
import initialEntries from "./data/entries.json";
import { Entry } from "./type/Entry";

interface EntryContextValue {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const EntryContext = createContext<EntryContextValue>({
  entries: [],
  setEntries: () => {},
});
export const useEntries = () => useContext(EntryContext);

export default function EntryProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [entries, setEntries] = useState(initialEntries);

  return (
    <EntryContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntryContext.Provider>
  );
}
