import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createXray() {
	const { subscribe, set, update } = writable<boolean>(false);

	function apply(value: boolean) {
		if (!browser) return;
		if (value) document.documentElement.setAttribute('data-xray', '');
		else document.documentElement.removeAttribute('data-xray');
	}

	return {
		subscribe,
		set(value: boolean) {
			apply(value);
			set(value);
		},
		toggle() {
			update((v) => {
				apply(!v);
				return !v;
			});
		}
	};
}

export const xray = createXray();
