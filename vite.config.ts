import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {cpSync,mkdirSync,existsSync,writeFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
/** Uma única fonte de assets. Downloads só são publicados quando o arquivo real existe. */
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
   const files={android:'downloads/android/HypeSensi-Android.apk',windows:'downloads/windows/HypeSensi-Desktop.exe'} as const;
   const available:{android:boolean;windows:boolean}={android:false,windows:false};
   for(const [platform,path] of Object.entries(files) as [keyof typeof available,string][]){
    const source=resolve(path);
    if(existsSync(source)&&statSync(source).isFile()&&statSync(source).size>0){
     const dest=resolve(out,path);mkdirSync(resolve(out,'downloads',platform),{recursive:true});cpSync(source,dest);available[platform]=true;
    }
   }
   writeFileSync(resolve(out,'downloads-status.json'),JSON.stringify(available));
  }
 }],
 base:'/',build:{outDir:'dist',sourcemap:false}
});
