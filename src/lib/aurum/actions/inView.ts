import type { Action } from 'svelte/action';

interface InViewOptions {
	threshold?: number;
	/** Called once, the first time the node scrolls into view. */
	onEnter?: () => void;
}

/**
 * Fires `onEnter` the first time the node scrolls into view. Useful for
 * triggering count-ups, fade-ups, and scroll traces.
 */
export const inView: Action<HTMLElement, InViewOptions | undefined> = (node, options) => {
	const threshold = options?.threshold ?? 0.25;
	let onEnter = options?.onEnter;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					onEnter?.();
					observer.disconnect();
				}
			}
		},
		{ threshold }
	);
	observer.observe(node);

	return {
		update(next?: InViewOptions) {
			onEnter = next?.onEnter;
		},
		destroy() {
			observer.disconnect();
		}
	};
};
