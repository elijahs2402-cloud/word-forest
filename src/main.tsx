import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

// Replace the legacy cache controller without touching learning records.
if ('serviceWorker' in navigator) {
 const worker=navigator.serviceWorker.register('/forest-sw-v8.js',{scope:'/',updateViaCache:'none'});
 const checkUpdate=()=>{if(document.visibilityState==='visible')worker.then(r=>r.update()).catch(()=>{});};
 window.addEventListener('focus',checkUpdate);
 document.addEventListener('visibilitychange',checkUpdate);
 worker.catch(()=>{});
}
