import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { MapaComponent } from './components/Mapa';








createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <MapaComponent></MapaComponent>
  </StrictMode>,
)
