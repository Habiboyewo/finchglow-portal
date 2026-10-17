import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PortalProvider } from './context/PortalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalProvider>
      <App />
    </PortalProvider>
  </StrictMode>,
)