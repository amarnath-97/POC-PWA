import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// index.js (client entry)
(function () {
  if (typeof window === 'undefined') return;

  // namespaced object to avoid accidental collisions
  window.__MY_APP_PWA__ = window.__MY_APP_PWA__ || { deferredPrompt: null };

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('global beforeinstallprompt captured');
    e.preventDefault();
    window.__MY_APP_PWA__.deferredPrompt = e;
    // notify components
    window.dispatchEvent(new CustomEvent('myapp:pwa-install-available'));
  });

  window.addEventListener('appinstalled', () => {
    window.__MY_APP_PWA__.deferredPrompt = null;
    window.dispatchEvent(new CustomEvent('myapp:pwa-installed'));
  });
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
