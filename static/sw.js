const CACHE_NAME = 'kiefer-portfolio-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
	'/',
	'/manifest.json',
	'/favicon.svg'
];

// Assets to cache dynamically
const CACHE_STRATEGIES = {
	// Cache first for static assets
	CACHE_FIRST: [
		'/favicon.svg',
		'/manifest.json'
	],
	// Network first for API calls
	NETWORK_FIRST: [
		'api.github.com'
	],
	// Stale while revalidate for pages
	STALE_WHILE_REVALIDATE: [
		'/'
	]
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
	console.log('Service Worker: Installing...');
	
	event.waitUntil(
		caches.open(STATIC_CACHE)
			.then((cache) => {
				console.log('Service Worker: Caching static assets');
				return cache.addAll(STATIC_ASSETS);
			})
			.then(() => {
				console.log('Service Worker: Skip waiting');
				return self.skipWaiting();
			})
			.catch((error) => {
				console.error('Service Worker: Cache failed', error);
			})
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	console.log('Service Worker: Activating...');
	
	event.waitUntil(
		caches.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
							console.log('Service Worker: Deleting old cache', cacheName);
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => {
				console.log('Service Worker: Claiming clients');
				return self.clients.claim();
			})
	);
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== 'GET') {
		return;
	}

	// Skip external requests (except GitHub API)
	if (url.origin !== location.origin && !url.hostname.includes('api.github.com')) {
		return;
	}

	// Determine cache strategy
	let strategy = 'STALE_WHILE_REVALIDATE'; // default

	if (CACHE_STRATEGIES.CACHE_FIRST.some(pattern => url.pathname.includes(pattern))) {
		strategy = 'CACHE_FIRST';
	} else if (CACHE_STRATEGIES.NETWORK_FIRST.some(pattern => url.hostname.includes(pattern))) {
		strategy = 'NETWORK_FIRST';
	}

	// Apply strategy
	switch (strategy) {
		case 'CACHE_FIRST':
			event.respondWith(cacheFirst(request));
			break;
		case 'NETWORK_FIRST':
			event.respondWith(networkFirst(request));
			break;
		case 'STALE_WHILE_REVALIDATE':
			event.respondWith(staleWhileRevalidate(request));
			break;
	}
});

// Cache first strategy
async function cacheFirst(request) {
	try {
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		const networkResponse = await fetch(request);
		if (networkResponse.status === 200) {
			const cache = await caches.open(STATIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.error('Cache first failed:', error);
		return new Response('Network Error', { status: 503 });
	}
}

// Network first strategy
async function networkFirst(request) {
	try {
		const networkResponse = await fetch(request);
		if (networkResponse.status === 200) {
			const cache = await caches.open(DYNAMIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.log('Network failed, trying cache:', error);
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}
		return new Response('Offline - No cached version available', { 
			status: 503,
			headers: { 'Content-Type': 'text/plain' }
		});
	}
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
	const cache = await caches.open(DYNAMIC_CACHE);
	const cachedResponse = await cache.match(request);

	// Fetch in background to update cache
	const fetchPromise = fetch(request)
		.then((networkResponse) => {
			if (networkResponse.status === 200) {
				cache.put(request, networkResponse.clone());
			}
			return networkResponse;
		})
		.catch((error) => {
			console.log('Background fetch failed:', error);
		});

	// Return cached response immediately if available
	if (cachedResponse) {
		return cachedResponse;
	}

	// Otherwise wait for network
	try {
		return await fetchPromise;
	} catch (error) {
		return new Response('Offline - Content not available', { 
			status: 503,
			headers: { 'Content-Type': 'text/plain' }
		});
	}
}

// Handle background sync (for future use)
self.addEventListener('sync', (event) => {
	console.log('Service Worker: Background sync', event.tag);
	
	if (event.tag === 'github-data-sync') {
		event.waitUntil(syncGitHubData());
	}
});

// Sync GitHub data in background
async function syncGitHubData() {
	try {
		// This would sync GitHub data when back online
		console.log('Service Worker: Syncing GitHub data...');
		// Implementation would go here
	} catch (error) {
		console.error('Service Worker: GitHub sync failed', error);
	}
}

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
	console.log('Service Worker: Push received');
	
	const options = {
		body: event.data ? event.data.text() : 'New update available!',
		icon: '/favicon.svg',
		badge: '/favicon.svg',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		},
		actions: [
			{
				action: 'explore',
				title: 'View Portfolio',
				icon: '/favicon.svg'
			},
			{
				action: 'close',
				title: 'Close',
				icon: '/favicon.svg'
			}
		]
	};

	event.waitUntil(
		self.registration.showNotification('Kiefer Portfolio', options)
	);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
	console.log('Service Worker: Notification click received');
	
	event.notification.close();

	if (event.action === 'explore') {
		event.waitUntil(
			clients.openWindow('/')
		);
	}
});