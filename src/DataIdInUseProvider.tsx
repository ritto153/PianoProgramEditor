import { createContext, useContext, useState } from "react";
import { useSavedData } from "./SavedDataProvider";

interface DataIdInUseContextValue {
  dataIdInUse: string;
  setDataIdInUse: React.Dispatch<React.SetStateAction<string>>;
}

const DataIdInUseContext = createContext<DataIdInUseContextValue>({
  dataIdInUse: "",
  setDataIdInUse: () => {},
});

export const useDataIdInUse = () => useContext(DataIdInUseContext);

export default function DataIdInUseProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const { savedDataMap } = useSavedData();
  // 初期値は savedDataMap のうち lastUpdated が最も新しいデータの ID
  const initialDataIdInUse = Object.values(savedDataMap).reduce((latestId, datum) => {
    return !latestId || datum.lastUpdated > savedDataMap[latestId].lastUpdated
      ? datum.id
      : latestId;
  }, "");

  const [dataIdInUse, setDataIdInUse] = useState(initialDataIdInUse);

  return (
    <DataIdInUseContext.Provider value={{ dataIdInUse, setDataIdInUse }}>
      {children}
    </DataIdInUseContext.Provider>
  );
}