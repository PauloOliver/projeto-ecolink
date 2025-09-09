import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NavigationBar } from "./components/Navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode> 
    <NavigationBar />
  </StrictMode>
);
