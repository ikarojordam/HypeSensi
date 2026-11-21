export function getStored<T>(key:string, fallback:T):T {
  try { const raw=localStorage.getItem(key); return raw?JSON.parse(raw) as T:fallback; }
  catch {return fallback;}
}
export function store(key:string,value:unknown):void {
  try {localStorage.setItem(key, JSON.stringify(value));} catch { /* storage unavailable */ }
}
export function downloadJson(data:unknown, fileName:string):void {
  const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download=fileName;link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
