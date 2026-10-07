import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';
const base=process.env.GITHUB_PAGES==='true'?'/word-forest/':'/';
export default defineConfig({base,plugins:[react(),VitePWA({
 registerType:'autoUpdate',filename:'forest-sw-v13.js',injectRegister:false,
 includeAssets:['favicon.svg','mongshell-face-icon-192.png','mongshell-face-icon-512.png'],
 manifest:{name:'단어숲',short_name:'단어숲',lang:'ko',description:'68개 불규칙동사 숲 탐험',theme_color:'#27674f',background_color:'#f7f8f3',display:'standalone',start_url:base,scope:base,icons:[{src:base+'mongshell-face-icon-192.png',sizes:'192x192',type:'image/png'},{src:base+'mongshell-face-icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]},
 workbox:{cacheId:'forest-v13',importScripts:[base+'forest-cache-migration.js'],cleanupOutdatedCaches:true,ignoreURLParametersMatching:[/^v$/,/^utm_/,/^fbclid$/],navigateFallback:null,
  runtimeCaching:[
   {urlPattern:({request})=>request.mode==='navigate',handler:'NetworkFirst',options:{cacheName:'forest-pages-v13',networkTimeoutSeconds:4,cacheableResponse:{statuses:[200]}}},
   {urlPattern:({request,url})=>request.destination==='image'&&url.origin===self.location.origin,handler:'CacheFirst',options:{cacheName:'forest-images-v14',expiration:{maxEntries:160,maxAgeSeconds:60*60*24*30},cacheableResponse:{statuses:[200]}}}
  ],
  // Keep the full pronunciation curriculum offline; fetch artwork when seen
  // instead of downloading every source image before installation succeeds.
  globPatterns:['**/*.{js,css,html,svg,woff2,json,mp3}'],maximumFileSizeToCacheInBytes:6000000
 }
})],server:{host:'0.0.0.0',port:4173}});
