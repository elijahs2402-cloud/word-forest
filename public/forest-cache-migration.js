// Only obsolete response caches; never IndexedDB or localStorage.
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>
  (name.startsWith('workbox-')&&!name.includes('forest-v13'))||name==='forest-pages-v2'||name==='forest-pages-v3'||name==='forest-pages-v4'||name==='forest-pages-v5'||name==='forest-pages-v6'||name==='forest-pages-v7'||name==='forest-pages-v8'||name==='forest-pages-v9'||name==='forest-pages-v10'||name==='forest-pages-v11'||name==='forest-pages-v12'
 ).map(name=>caches.delete(name)))));
});
