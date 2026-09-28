const CACHE='planilhado-v3';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.svg','./icon-512.svg']))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));

self.addEventListener('push',event=>{let data={title:'Planilhado',body:'Você tem um lembrete de conta.'};try{if(event.data)data={...data,...event.data.json()}}catch(e){}event.waitUntil(self.registration.showNotification(data.title||'Planilhado',{body:data.body||'Você tem um lembrete.',icon:'icon-192.png',badge:'icon-192.png',data:{url:'./'}}))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});
