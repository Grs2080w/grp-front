const cacheName = "v1"
const cacheAssets = ["/", "/create", "/home", "/home/account", "/home/ebooks/add", "/home/files", "/home/files/add", "/home/metrics", "/home/pass", "/home/pass/add", "/home/tasks", "/login", "/master", "/reset", "/secret", "/g-logo-192.png", "/g-logo-256.png", "/g-logo-512.png", "/globals.css", "/offline.html", "logo_white.svg"]
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(cacheName).then(async (cache) => {
			for (const url of cacheAssets) {
				try {
					const res = await fetch(url)
					if (!res.ok) throw new Error(`${url} retornou ${res.status}`)
					await cache.put(url, res)
					console.log(`[SW] Cached ${url}`)
				} catch (err) {
					console.error(`[SW] Falha ao cachear ${url}:`, err)
				}
			}
			return self.skipWaiting()
		})
	)
})
self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== cacheName) {
						console.log("clearing old cache")
						return caches.delete(cache)
					}
				})
			)
		})
	)
})
self.addEventListener("fetch", (e) => {
	const url = new URL(e.request.url)

	if (e.request.mode === "navigate") {
		e.respondWith(
			fetch(e.request)
				.then((res) => res)
				.catch(async () => {
					const cache = await caches.open(cacheName)

					return cache.match("/offline.html")
				})
		)
		return
	}

	if (url.pathname.startsWith("/api/")) {
		e.respondWith(
			fetch(e.request).catch(
				() =>
					new Response(JSON.stringify({ error: "Offline" }), {
						headers: { "Content-Type": "application/json" },
						status: 503,
					})
			)
		)
		return
	}

	e.respondWith(
		caches
			.match(e.request)
			.then((cached) => cached || fetch(e.request))
			.catch(() => {})
	)
})
