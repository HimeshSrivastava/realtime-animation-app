import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContexProvider } from './contex/AuthContex';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContexProvider>
    <App />
    </AuthContexProvider>
  </StrictMode>,
)
