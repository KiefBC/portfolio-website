<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { inView } from '$lib/aurum/actions/inView';

	interface Props {
		label: string;
		/** Fill level 0..100 */
		level: number;
		size?: number;
		icon?: string;
	}

	let { label, level, size = 110, icon = '' }: Props = $props();

	// Animated fill (0..100) that runs once the gauge enters view.
	const fill = tweened(0, { duration: 1400, easing: cubicOut });

	function start() {
		fill.set(level);
	}

	// SVG geometry: a circle of radius r; the wave's vertical position maps to fill.
	const r = $derived(size / 2 - 4);
	const cx = $derived(size / 2);
	const cy = $derived(size / 2);
	// y of the water surface inside the circle
	const surfaceY = $derived(cy + r - ($fill / 100) * (r * 2));
</script>

<div class="flex flex-col items-center gap-2" use:inView={{ onEnter: start }}>
	<svg width={size} height={size} viewBox="0 0 {size} {size}" class="overflow-hidden">
		<defs>
			<clipPath id="clip-{label}">
				<circle {cx} {cy} {r} />
			</clipPath>
		</defs>
		<!-- ring -->
		<circle {cx} {cy} {r} fill="none" stroke="var(--border-color)" stroke-width="3" />
		<circle
			{cx}
			{cy}
			{r}
			fill="none"
			stroke="rgba(var(--accent-gold-rgb), 0.35)"
			stroke-width="1"
		/>
		<!-- liquid -->
		<g clip-path="url(#clip-{label})">
			<g style="transform: translateY({surfaceY}px);">
				<path
					class="wave"
					d="M0 8 q {size / 4} -12 {size / 2} 0 t {size / 2} 0 t {size / 2} 0 t {size /
						2} 0 V {size} H 0 Z"
					fill="rgba(var(--accent-gold-rgb), 0.55)"
				/>
			</g>
		</g>
		<!-- label -->
		<text
			x={cx}
			y={cy + 5}
			text-anchor="middle"
			class="mono"
			font-size="18"
			fill="var(--text-main)"
		>
			{Math.round($fill)}
		</text>
	</svg>
	<span class="mono text-xs" style="color: var(--text-muted);">
		{#if icon}{icon} {/if}{label}
	</span>
</div>

<style>
	.wave {
		animation: aurum-wave 3s linear infinite;
		width: 200%;
	}
</style>
