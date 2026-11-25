// 신상명 Q&A 서비스 워커: 앱 설치와 알림 클릭 처리만 담당 (데이터는 저장하지 않음)
const SHELL = "qa-shell-v1";
self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(["./", "./icon-192.png"])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// 페이지는 항상 최신본을 먼저 받고, 인터넷이 끊겼을 때만 저장본을 보여 줌
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(SHELL).then(c => c.put("./", copy)); return r; }).catch(() => caches.match("./")));
  }
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const hash = (e.notification.data && e.notification.data.hash) || "board";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if ("focus" in c) { c.postMessage({ hash }); return c.focus(); } }
    return self.clients.openWindow("./#" + hash);
  }));
});
