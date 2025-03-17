import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/Css/index.css";
import App from "./App.jsx";
import { store } from "./Store/Store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
