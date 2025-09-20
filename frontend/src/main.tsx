import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App.tsx"; // seu App principal
import "./index.css";

<<<<<<< HEAD
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
=======
import { MapaComponent } from './components/Mapa';








createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <MapaComponent></MapaComponent>
  </StrictMode>,
)
>>>>>>> joao
