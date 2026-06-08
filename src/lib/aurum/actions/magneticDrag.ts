import type { Action } from 'svelte/action';
import { spring } from 'svelte/motion';

/**
 * Makes a node draggable with a springy snap-back to its origin — used for
 * the bouncy skill tags on the Home page.
 */
export const magneticDrag: Action<HTMLElement> = (node) => {
	const coords = spring(
		{ x: 0, y: 0 },
		{ stiffness: 0.18, damping: 0.42 }
	);

	const unsub = coords.subscribe(({ x, y }) => {
		node.style.transform = `translate(${x}px, ${y}px)`;
	});

	let dragging = false;
	let startX = 0;
	let startY = 0;

	function onDown(e: PointerEvent) {
		dragging = true;
		startX = e.clientX;
		startY = e.clientY;
		node.setPointerCapture(e.pointerId);
		node.style.zIndex = '20';
	}

	function onMove(e: PointerEvent) {
		if (!dragging) return;
		coords.set({ x: e.clientX - startX, y: e.clientY - startY });
	}

	function onUp(e: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		node.releasePointerCapture(e.pointerId);
		node.style.zIndex = '';
		coords.set({ x: 0, y: 0 }); // snap back to origin
	}

	node.style.touchAction = 'none';
	node.addEventListener('pointerdown', onDown);
	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerup', onUp);
	node.addEventListener('pointercancel', onUp);

	return {
		destroy() {
			unsub();
			node.removeEventListener('pointerdown', onDown);
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerup', onUp);
			node.removeEventListener('pointercancel', onUp);
		}
	};
};
