import { createContext, useContext, useState } from "react";
import { InputtingEntryToAdd } from "../type/Entry";

interface EntryToAddContextValue {
  entry: InputtingEntryToAdd;
  setEntry: React.Dispatch<React.SetStateAction<InputtingEntryToAdd>>;
}

const blankEntryToAdd = {
  participants: [
    {
      lastName: null,
      firstName: null,
      faculty: null,
      grade: null,
    },
  ],
  works: [
    {
      composer: null,
      name: null,
    },
  ],
  time: null,
  memo: null,
}

const EntryToAddContext = createContext<EntryToAddContextValue>(
  {
    entry: blankEntryToAdd,
    setEntry: () => {},
  }
);

export const useEntryToAddContext = () => useContext(EntryToAddContext);

export default function EntryToAddProvider(props: { children: JSX.Element }) {
  const [entry, setEntry] = useState<InputtingEntryToAdd>(blankEntryToAdd);

  return (
    <EntryToAddContext.Provider value={{entry, setEntry}}>
      {props.children}
    </EntryToAddContext.Provider>
  )
}
