import type { Action } from 'svelte/action';

/**
 * Tracks the pointer over the node and writes --mx / --my (percentages)
 * which the `.premium-card::before` radial-gradient consumes for a
 * mouse-following spotlight + subtle chromatic feel.
 */
export const spotlight: Action<HTMLElement> = (node) => {
	function onMove(e: PointerEvent) {
		const rect = node.getBoundingClientRect();
		const mx = ((e.clientX - rect.left) / rect.width) * 100;
		const my = ((e.clientY - rect.top) / rect.height) * 100;
		node.style.setProperty('--mx', `${mx}%`);
		node.style.setProperty('--my', `${my}%`);
	}

	node.addEventListener('pointermove', onMove);

	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
		}
	};
};
