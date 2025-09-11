import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NavbarComponent } from './components/Navbar'

import HomeBanner from './components/HomeBanner'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <NavbarComponent></NavbarComponent>
   <HomeBanner></HomeBanner>
  </StrictMode>
)
