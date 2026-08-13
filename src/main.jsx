import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Employer360Dashboard from "./Employer360Dashboard";
import ThemeProvider from "./theme/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Employer360Dashboard />
    </ThemeProvider>
  </StrictMode>,
);
