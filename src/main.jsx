import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'
import "./firebase.js";
import store from './redux/store.js';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')  // 서비스 워커 등록 (public에 위치)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>

);