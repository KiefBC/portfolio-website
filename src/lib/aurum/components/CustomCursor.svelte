<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	const ring = spring({ x: -100, y: -100 }, { stiffness: 0.12, damping: 0.55 });
	const dot = spring({ x: -100, y: -100 }, { stiffness: 0.4, damping: 0.7 });

	let hovering = $state(false);
	let visible = $state(false);

	onMount(() => {
		// Skip entirely on touch / coarse-pointer devices.
		if (!window.matchMedia('(pointer: fine)').matches) return;

		function move(e: PointerEvent) {
			visible = true;
			ring.set({ x: e.clientX, y: e.clientY });
			dot.set({ x: e.clientX, y: e.clientY });
			const el = e.target as HTMLElement | null;
			hovering = !!el?.closest('a, button, [data-cursor]');
		}
		function leave() {
			visible = false;
		}

		window.addEventListener('pointermove', move);
		document.addEventListener('pointerleave', leave);
		return () => {
			window.removeEventListener('pointermove', move);
			document.removeEventListener('pointerleave', leave);
		};
	});
</script>

<div class="cursor-layer" class:visible aria-hidden="true">
	<div
		class="ring"
		class:hovering
		style="transform: translate({$ring.x}px, {$ring.y}px) translate(-50%, -50%);"
	></div>
	<div
		class="dot"
		style="transform: translate({$dot.x}px, {$dot.y}px) translate(-50%, -50%);"
	></div>
</div>

<style>
	.cursor-layer {
		position: fixed;
		inset: 0;
		z-index: 9999;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	.cursor-layer.visible {
		opacity: 1;
	}
	.ring {
		position: absolute;
		top: 0;
		left: 0;
		width: 20px;
		height: 20px;
		border: 1px solid var(--accent-gold);
		border-radius: 50%;
		transition:
			width 0.18s ease,
			height 0.18s ease,
			border-radius 0.18s ease,
			background-color 0.18s ease;
	}
	.ring.hovering {
		width: 34px;
		height: 34px;
		border-radius: 6px;
		background: rgba(var(--accent-gold-rgb), 0.12);
	}
	.dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 4px;
		background: var(--accent-gold);
		border-radius: 50%;
	}
	@media (pointer: coarse) {
		.cursor-layer {
			display: none;
		}
	}
</style>
