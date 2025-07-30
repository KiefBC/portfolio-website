import { onMount } from 'svelte';

export interface ScrollAnimationOptions {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

export function createScrollAnimation(
	element: HTMLElement,
	options: ScrollAnimationOptions = {}
) {
	const { threshold = 0.1, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					entry.target.classList.remove('animate-out');
					
					if (once) {
						observer.unobserve(entry.target);
					}
				} else if (!once) {
					entry.target.classList.remove('animate-in');
					entry.target.classList.add('animate-out');
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(element);

	return () => observer.disconnect();
}

export function scrollAnimationAction(
	node: HTMLElement,
	options: ScrollAnimationOptions = {}
) {
	const { threshold = 0.1, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					entry.target.classList.remove('animate-out');
					
					// Dispatch custom event for additional handling
					entry.target.dispatchEvent(new CustomEvent('intersect', {
						detail: { entry, isIntersecting: true }
					}));
					
					if (once) {
						observer.unobserve(entry.target);
					}
				} else if (!once) {
					entry.target.classList.remove('animate-in');
					entry.target.classList.add('animate-out');
					
					// Dispatch custom event for additional handling
					entry.target.dispatchEvent(new CustomEvent('intersect', {
						detail: { entry, isIntersecting: false }
					}));
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);
	
	return {
		destroy: () => observer.disconnect()
	};
}