import { browser } from '$app/environment';

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let isInstallable = false;

export function initializePWA() {
	if (!browser) return;

	// Register service worker
	registerServiceWorker();

	// Handle install prompt
	setupInstallPrompt();

	// Handle app installed
	handleAppInstalled();
}

async function registerServiceWorker() {
	if (!('serviceWorker' in navigator)) {
		console.log('Service Worker not supported');
		return;
	}

	try {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/'
		});

		console.log('Service Worker registered successfully:', registration);

		// Handle updates
		registration.addEventListener('updatefound', () => {
			const newWorker = registration.installing;
			if (!newWorker) return;

			newWorker.addEventListener('statechange', () => {
				if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
					// New content available, show update notification
					showUpdateNotification();
				}
			});
		});

		// Check for updates periodically
		setInterval(() => {
			registration.update();
		}, 60000); // Check every minute

	} catch (error) {
		console.error('Service Worker registration failed:', error);
	}
}

function setupInstallPrompt() {
	window.addEventListener('beforeinstallprompt', (e: Event) => {
		const event = e as BeforeInstallPromptEvent;
		
		// Prevent the mini-infobar from appearing on mobile
		event.preventDefault();
		
		// Stash the event so it can be triggered later
		deferredPrompt = event;
		isInstallable = true;

		// Show custom install button
		showInstallButton();
	});
}

function handleAppInstalled() {
	window.addEventListener('appinstalled', () => {
		console.log('PWA was installed');
		deferredPrompt = null;
		isInstallable = false;
		hideInstallButton();
		
		// Track installation (analytics)
		trackPWAInstall();
	});
}

function showUpdateNotification() {
	// Create update notification
	const notification = document.createElement('div');
	notification.id = 'pwa-update-notification';
	notification.className = 'fixed top-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
	notification.innerHTML = `
		<div class="flex items-center space-x-3">
			<div class="flex-shrink-0">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
				</svg>
			</div>
			<div class="flex-1">
				<p class="text-sm font-medium">Update Available</p>
				<p class="text-xs opacity-90">New content is available</p>
			</div>
			<div class="flex-shrink-0">
				<button id="update-btn" class="text-xs bg-white text-purple-600 px-2 py-1 rounded hover:bg-purple-50 transition-colors">
					Update
				</button>
				<button id="dismiss-btn" class="text-xs ml-2 opacity-75 hover:opacity-100">
					×
				</button>
			</div>
		</div>
	`;

	document.body.appendChild(notification);

	// Handle update button click
	document.getElementById('update-btn')?.addEventListener('click', () => {
		window.location.reload();
	});

	// Handle dismiss button click
	document.getElementById('dismiss-btn')?.addEventListener('click', () => {
		notification.remove();
	});

	// Auto-dismiss after 10 seconds
	setTimeout(() => {
		if (document.getElementById('pwa-update-notification')) {
			notification.remove();
		}
	}, 10000);
}

function showInstallButton() {
	// Check if button already exists
	if (document.getElementById('pwa-install-button')) return;

	// Create install button
	const installButton = document.createElement('button');
	installButton.id = 'pwa-install-button';
	installButton.className = 'fixed bottom-20 right-6 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 z-40';
	installButton.innerHTML = `
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
		</svg>
	`;
	installButton.title = 'Install Portfolio App';

	installButton.addEventListener('click', promptInstall);
	document.body.appendChild(installButton);

	// Add entrance animation
	setTimeout(() => {
		installButton.style.transform = 'scale(1)';
	}, 100);
}

function hideInstallButton() {
	const button = document.getElementById('pwa-install-button');
	if (button) {
		button.remove();
	}
}

export async function promptInstall() {
	if (!deferredPrompt) {
		console.log('Install prompt not available');
		return;
	}

	// Show the install prompt
	deferredPrompt.prompt();

	// Wait for the user to respond to the prompt
	const { outcome } = await deferredPrompt.userChoice;
	
	console.log(`User response to install prompt: ${outcome}`);
	
	// Track the outcome
	trackInstallPrompt(outcome);

	// Clear the deferredPrompt
	deferredPrompt = null;
	isInstallable = false;
	hideInstallButton();
}

export function isPWAInstallable(): boolean {
	return isInstallable;
}

export function isPWAInstalled(): boolean {
	if (!browser) return false;
	
	// Check if running in standalone mode
	return window.matchMedia('(display-mode: standalone)').matches ||
		   (window.navigator as any).standalone === true;
}

function trackPWAInstall() {
	// Track PWA installation for analytics
	console.log('PWA installed - tracking event');
	
	// Implementation would depend on your analytics provider
	// Example: gtag('event', 'pwa_install', { event_category: 'engagement' });
}

function trackInstallPrompt(outcome: string) {
	// Track install prompt response for analytics
	console.log(`Install prompt ${outcome} - tracking event`);
	
	// Implementation would depend on your analytics provider
	// Example: gtag('event', 'pwa_install_prompt', { event_category: 'engagement', outcome });
}

// Utility function to check if device supports PWA features
export function checkPWASupport() {
	const support = {
		serviceWorker: 'serviceWorker' in navigator,
		pushNotifications: 'PushManager' in window,
		notifications: 'Notification' in window,
		backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
		webShare: 'share' in navigator,
		installPrompt: 'onbeforeinstallprompt' in window
	};

	console.log('PWA Support:', support);
	return support;
}