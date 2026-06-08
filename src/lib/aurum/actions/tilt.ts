import type { Action } from 'svelte/action';

interface TiltOptions {
	/** Maximum rotation in degrees. */
	max?: number;
	/** Disable the effect entirely. */
	disabled?: boolean;
}

/**
 * 3D tilt: rotates the node toward the pointer. Sets CSS vars so the
 * transform can be composed in CSS, and gracefully resets on leave.
 */
export const tilt: Action<HTMLElement, TiltOptions | undefined> = (node, options) => {
	let max = options?.max ?? 8;
	let disabled = options?.disabled ?? false;

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function onMove(e: PointerEvent) {
		if (disabled || reduce) return;
		const rect = node.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width; // 0..1
		const py = (e.clientY - rect.top) / rect.height; // 0..1
		const ry = (px - 0.5) * 2 * max;
		const rx = -(py - 0.5) * 2 * max;
		node.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
	}

	function reset() {
		node.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
	}

	node.style.transition = 'transform 0.18s ease-out';
	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerleave', reset);

	return {
		update(next?: TiltOptions) {
			max = next?.max ?? 8;
			disabled = next?.disabled ?? false;
			if (disabled) reset();
		},
		destroy() {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', reset);
		}
	};
};
