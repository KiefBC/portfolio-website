import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'matrix';

function createThemeStore() {
	// Default to dark theme since current design is dark
	const defaultTheme: Theme = 'dark';
	
	// Get initial theme from localStorage or use default
	const initialTheme: Theme = browser 
		? (localStorage.getItem('theme') as Theme) || defaultTheme
		: defaultTheme;

	const { subscribe, set, update } = writable<Theme>(initialTheme);

	function applyTheme(theme: Theme) {
		if (browser) {
			// Remove all theme classes first
			document.documentElement.classList.remove('dark', 'matrix');
			
			// Add the current theme class
			document.documentElement.classList.add(theme);
		}
	}

	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				applyTheme(theme);
			}
			set(theme);
		},
		toggle: () => {
			update(currentTheme => {
				// Cycle: dark → matrix → dark
				const newTheme = currentTheme === 'dark' ? 'matrix' : 'dark';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					applyTheme(newTheme);
				}
				return newTheme;
			});
		},
		init: () => {
			if (browser) {
				// Apply initial theme to document
				applyTheme(initialTheme);
			}
		}
	};
}

export const theme = createThemeStore();