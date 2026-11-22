import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {cpSync,mkdirSync,existsSync,writeFileSync,statSync,readdirSync} from 'node:fs';
import {resolve,extname,basename} from 'node:path';

/** Assets compartilhados e instaladores publicados somente se existirem de verdade. */
export default defineConfig({
 publicDir:false,
 plugins:[react(),{
  name:'hypesensi-publish-files',
  closeBundle(){
   const out=resolve('dist');mkdirSync(out,{recursive:true});
   const assets=resolve('assets');if(!existsSync(assets))throw new Error('A pasta assets/ está ausente.');
   cpSync(assets,resolve(out,'assets'),{recursive:true});
   for(const file of ['style.css','responsive.css','animations.css','landing.css']){
    if(!existsSync(resolve(out,'assets','css',file)))throw new Error('Falha ao publicar CSS obrigatório: '+file);
   }
   for(const item of ['manifest.webmanifest','sw.js'])cpSync(resolve(item),resolve(out,item));

   type DownloadInfo={available:boolean;url:string|null;filename:string|null;format:string|null;bytes:number};
   const empty=():DownloadInfo=>({available:false,url:null,filename:null,format:null,bytes:0});
   const available:{android:DownloadInfo;windows:DownloadInfo}={android:empty(),windows:empty()};
   const supported:{android:string[];windows:string[]}={android:['.apk'],windows:['.msixbundle','.msix','.exe','.appxbundle']};
   for(const platform of ['android','windows'] as const){
    const folder=resolve('downloads',platform);
    if(!existsSync(folder))continue;
    const files=readdirSync(folder).filter(name=>{
     const extension=extname(name).toLowerCase();const full=resolve(folder,name);
     return supported[platform].includes(extension)&&statSync(full).isFile()&&statSync(full).size>0;
    });
    if(!files.length)continue;
    const candidate=files.sort((a,b)=>supported[platform].indexOf(extname(a).toLowerCase())-supported[platform].indexOf(extname(b).toLowerCase()) || a.localeCompare(b))[0];
    const source=resolve(folder,candidate);
    const dest=resolve(out,'downloads',platform,candidate);
    mkdirSync(resolve(out,'downloads',platform),{recursive:true});
    cpSync(source,dest);
    available[platform]={available:true,url:'/downloads/'+platform+'/'+encodeURIComponent(basename(candidate)),filename:candidate,format:extname(candidate).slice(1).toUpperCase(),bytes:statSync(source).size};
   }
   writeFileSync(resolve(out,'downloads-status.json'),JSON.stringify(available,null,2));
  }
 }],
 base:'/',build:{outDir:'dist',sourcemap:false}
});
