import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/app/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "react-hot-toast";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./index.css";
import App from "./App.jsx";
let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SimpleBar style={{ maxHeight: "100vh" }} className="h-screen">
          <App />
        </SimpleBar>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
