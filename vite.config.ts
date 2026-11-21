import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {cpSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
/** Fonte única assets/ na raiz. Copia ao dist/ após o build, sem public/ duplicado. */
export default defineConfig({publicDir:false,plugins:[react(),{name:'hype-copy-static',closeBundle(){const out=resolve('dist');mkdirSync(out,{recursive:true});cpSync(resolve('assets'),resolve(out,'assets'),{recursive:true});cpSync(resolve('manifest.webmanifest'),resolve(out,'manifest.webmanifest'));cpSync(resolve('sw.js'),resolve(out,'sw.js'));}}],base:'/',build:{outDir:'dist',sourcemap:false}});
