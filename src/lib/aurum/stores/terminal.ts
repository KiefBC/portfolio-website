import { writable } from 'svelte/store';

/** Controls the Ctrl+K command terminal overlay. */
export const terminalOpen = writable<boolean>(false);

export function openTerminal() {
	terminalOpen.set(true);
}
export function closeTerminal() {
	terminalOpen.set(false);
}
export function toggleTerminal() {
	terminalOpen.update((v) => !v);
}
