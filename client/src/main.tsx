import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import "./i18n";

// 👇 Importá el Provider
import { ReservationProvider } from "./contexts/ReservationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReservationProvider>
      <App />
    </ReservationProvider>
  </StrictMode>
);
