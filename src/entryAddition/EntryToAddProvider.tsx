import { createContext, useContext, useState } from "react";
import { Entry } from "../type/Entry";

interface EntryToAddContextValue {
  entry: Entry | null;
  setEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
}

const EntryToAddContext = createContext<EntryToAddContextValue>(
  {
    entry: null,
    setEntry: () => {},
  }
);

export const useEntryToAddContext = () => useContext(EntryToAddContext);

export default function EntryToAddProvider(props: { children: JSX.Element }) {
  const [entry, setEntry] = useState<Entry | null>(null);

  return (
    <EntryToAddContext.Provider value={{entry, setEntry}}>
      {props.children}
    </EntryToAddContext.Provider>
  )
}
