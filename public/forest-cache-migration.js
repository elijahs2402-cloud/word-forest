// Only obsolete response caches; never IndexedDB or localStorage.
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>
  (name.startsWith('workbox-')&&!name.includes('forest-v8'))||name==='forest-pages-v2'||name==='forest-pages-v3'||name==='forest-pages-v4'||name==='forest-pages-v5'||name==='forest-pages-v6'||name==='forest-pages-v7'
 ).map(name=>caches.delete(name)))));
});
