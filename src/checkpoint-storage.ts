// Prefer durable storage so a closed tab can resume; tests/private environments
// may provide only session storage. Callers handle unavailable storage safely.
export const checkpointStorage={
 getItem:(key:string)=>(typeof localStorage!=='undefined'?localStorage:sessionStorage).getItem(key),
 setItem:(key:string,value:string)=>(typeof localStorage!=='undefined'?localStorage:sessionStorage).setItem(key,value),
 removeItem:(key:string)=>(typeof localStorage!=='undefined'?localStorage:sessionStorage).removeItem(key)
};
