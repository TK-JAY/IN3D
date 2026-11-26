/* Transactional IndexedDB autosave, isolated from business data. */
const JaySession=(()=>{
 const MAX=256*1024*1024,COUNT=12;
 function bytes(snapshots){const unique=new Set();let size=0;for(let s of snapshots)for(let p of s.parts)for(let a of [p.v,p.f,p.cs])if(!unique.has(a.buffer)){unique.add(a.buffer);size+=a.buffer.byteLength}return size;}
 function trim(undo,redo,current,source){while(undo.length>COUNT)undo.shift();while(redo.length>COUNT)redo.shift();while(bytes([current,source,...undo,...redo])>MAX&&(undo.length||redo.length)){if(undo.length)undo.shift();else redo.shift();}}
 let dbPromise;
 function db(){if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{if(typeof indexedDB==='undefined'){reject(Error('IndexedDB không khả dụng'));return}let req=indexedDB.open('jayit-mesh-session-v1-'+(typeof location==='undefined'?'test':location.pathname.replace(/[^/]*$/,'')),1);req.onupgradeneeded=()=>req.result.createObjectStore('sessions');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('IndexedDB bị khóa'))});return dbPromise;}
 async function put(data){let d=await db();return new Promise((resolve,reject)=>{let t=d.transaction('sessions','readwrite');t.objectStore('sessions').put(data,'active');t.oncomplete=()=>resolve();t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||Error('Autosave bị hủy'));});}
 async function get(){let d=await db();return new Promise((resolve,reject)=>{let t=d.transaction('sessions','readonly'),r=t.objectStore('sessions').get('active');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
 return {MAX,COUNT,bytes,trim,put,get};
})();
