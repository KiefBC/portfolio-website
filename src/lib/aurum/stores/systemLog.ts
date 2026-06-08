import { writable } from 'svelte/store';

export interface LogEntry {
	ts: string;
	msg: string;
}

const MAX_ENTRIES = 50;

function timestamp(): string {
	return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

function createSystemLog() {
	const { subscribe, update } = writable<LogEntry[]>([
		{ ts: timestamp(), msg: 'SYS.BOOT :: aurum runtime online' }
	]);

	return {
		subscribe,
		log(msg: string) {
			update((entries) => {
				const next = [...entries, { ts: timestamp(), msg }];
				return next.length > MAX_ENTRIES ? next.slice(next.length - MAX_ENTRIES) : next;
			});
		}
	};
}

export const systemLog = createSystemLog();
