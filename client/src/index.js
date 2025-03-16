import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
// import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import "antd/dist/reset.css";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <HelmetProvider>

  <BrowserRouter>
    {" "}
    {/* Only one BrowserRouter in the app */}
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>

  // </HelmetProvider>
);

reportWebVitals();
