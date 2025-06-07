import ReactDOM from "react-dom/client";
import App from "./App";
import EntryProvider from "./EntryProvider";
import PartProvider from "./PartProvider";
import SavedDataProvider from "./SavedDataProvider";
import DataIdInUseProvider from "./DataIdInUseProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SavedDataProvider>
    <DataIdInUseProvider>
      <PartProvider>
        <EntryProvider>
          <App />
        </EntryProvider>
      </PartProvider>
    </DataIdInUseProvider>
  </SavedDataProvider>
);
