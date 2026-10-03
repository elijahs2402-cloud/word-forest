// Only obsolete response caches; never IndexedDB or localStorage.
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>
  (name.startsWith('workbox-')&&!name.includes('forest-v5'))||name==='forest-pages-v2'||name==='forest-pages-v3'||name==='forest-pages-v4'
 ).map(name=>caches.delete(name)))));
});
