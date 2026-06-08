import type { Action } from 'svelte/action';

const GLYPHS = '0123456789ABCDEF<>/\\{}[]#$%&*+=~';

function rand(set: string): string {
	return set[Math.floor(Math.random() * set.length)];
}

/**
 * "Decrypts" the node's text when it first scrolls into view: each character
 * scrambles through random glyphs before settling on the final letter.
 * Honours prefers-reduced-motion (reveals instantly).
 */
export const cryptoReveal: Action<HTMLElement, { duration?: number } | undefined> = (
	node,
	options
) => {
	const finalText = node.textContent ?? '';
	const duration = options?.duration ?? 900;
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let started = false;
	let frame = 0;

	function run() {
		if (reduce) {
			node.textContent = finalText;
			return;
		}
		const start = performance.now();
		const tick = (now: number) => {
			const progress = Math.min((now - start) / duration, 1);
			const revealCount = Math.floor(progress * finalText.length);
			let out = '';
			for (let i = 0; i < finalText.length; i++) {
				const ch = finalText[i];
				if (ch === ' ') out += ' ';
				else if (i < revealCount) out += ch;
				else out += rand(GLYPHS);
			}
			node.textContent = out;
			if (progress < 1) frame = requestAnimationFrame(tick);
			else node.textContent = finalText;
		};
		frame = requestAnimationFrame(tick);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !started) {
					started = true;
					run();
					observer.disconnect();
				}
			}
		},
		{ threshold: 0.4 }
	);
	observer.observe(node);

	return {
		destroy() {
			cancelAnimationFrame(frame);
			observer.disconnect();
		}
	};
};
