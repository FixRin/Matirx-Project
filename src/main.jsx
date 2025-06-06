import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/Css/index.css";
import App from "./App.jsx";
import { store } from "./Store/Store.js";
import { Provider } from "react-redux";
import { CartProvider } from "react-use-cart";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>
);
