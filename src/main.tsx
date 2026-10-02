import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

// Refresh only the app worker; IndexedDB learning records are untouched.
if ('serviceWorker' in navigator) {
 const checkUpdate=()=>{if(document.visibilityState==='visible')navigator.serviceWorker.getRegistrations().then(rs=>Promise.allSettled(rs.map(r=>r.update()))).catch(()=>{});};
 window.addEventListener('focus',checkUpdate);
 document.addEventListener('visibilitychange',checkUpdate);
 checkUpdate();
}
