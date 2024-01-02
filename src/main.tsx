import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Renderiza el componente raíz de la aplicación.
 * @param {HTMLElement} rootElement - El elemento raíz para renderizar la aplicación en.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
