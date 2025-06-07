import ReactDOM from "react-dom/client";
import App from "./App";
import SavedDataProvider from "./SavedDataProvider";
import DataIdInUseProvider from "./DataIdInUseProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SavedDataProvider>
    <DataIdInUseProvider>
      <App />
    </DataIdInUseProvider>
  </SavedDataProvider>
);
