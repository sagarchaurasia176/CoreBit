import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { StataManage } from "./context/StataManage.jsx";

//CreateRoot applied here so we get !
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* CONTEXT API */}
      <StataManage>
        <App />
      </StataManage>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
