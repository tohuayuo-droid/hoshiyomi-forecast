import { readdir, readFile, rm, mkdir, cp, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const docs = path.join(root, 'docs');

async function files(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await files(full, base));
    else out.push('/hoshiyomi-forecast/' + path.relative(base, full).split(path.sep).join('/'));
  }
  return out;
}

const assets = (await files(dist)).filter((f) => !f.endsWith('/sw.js'));
const cacheName = `hoshiyomi-${Date.now()}`;
const sw = `const CACHE_NAME=${JSON.stringify(cacheName)};\nconst APP_SHELL=${JSON.stringify(assets, null, 2)};\nself.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});\nself.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});\nself.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==location.origin)return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('/hoshiyomi-forecast/')))})});\n`;
await writeFile(path.join(dist, 'sw.js'), sw, 'utf8');
await rm(docs, { recursive: true, force: true });
await mkdir(docs, { recursive: true });
await cp(dist, docs, { recursive: true });
console.log('PWA build complete:', assets.length, 'files cached');
