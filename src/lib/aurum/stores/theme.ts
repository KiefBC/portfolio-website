import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'aurum-theme';

function readInitial(): Theme {
	if (!browser) return 'dark';
	const saved = localStorage.getItem(STORAGE_KEY);
	return saved === 'light' ? 'light' : 'dark';
}

function createTheme() {
	const { subscribe, set, update } = writable<Theme>(readInitial());

	function apply(value: Theme) {
		if (!browser) return;
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem(STORAGE_KEY, value);
	}

	return {
		subscribe,
		set(value: Theme) {
			apply(value);
			set(value);
		},
		toggle() {
			update((v) => {
				const next: Theme = v === 'dark' ? 'light' : 'dark';
				apply(next);
				return next;
			});
		},
		/** Sync the DOM with the current store value (call once on mount). */
		init() {
			set(readInitial());
			if (browser) document.documentElement.setAttribute('data-theme', readInitial());
		}
	};
}

export const theme = createTheme();
