import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppErrorBoundary from './AppErrorBoundary';
import './tokens.css';
import './design.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><svg aria-hidden="true" width="0" height="0" style={{position:'absolute',pointerEvents:'none'}}><defs><filter id="solid-asset" colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="4" intercept="0"/></feComponentTransfer></filter></defs></svg><AppErrorBoundary><App/></AppErrorBoundary></React.StrictMode>);

// Replace the legacy cache controller without touching learning records.
if ('serviceWorker' in navigator) {
 const base=import.meta.env.BASE_URL;
 const worker=navigator.serviceWorker.register(base+'forest-sw-v13.js',{scope:base,updateViaCache:'none'});
 const checkUpdate=()=>{if(document.visibilityState==='visible')worker.then(r=>r.update()).catch(()=>{});};
 window.addEventListener('focus',checkUpdate);
 document.addEventListener('visibilitychange',checkUpdate);
 worker.catch(()=>{});
}
