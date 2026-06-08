<script lang="ts">
	interface Props {
		size?: number;
	}
	let { size = 280 }: Props = $props();
	const c = $derived(size / 2);
</script>

<svg width={size} height={size} viewBox="0 0 {size} {size}" class="reactor" aria-hidden="true">
	<!-- orbit rings -->
	<g class="orbit o1" style="transform-origin: {c}px {c}px;">
		<ellipse cx={c} cy={c} rx={c - 10} ry={c * 0.42} fill="none" stroke="rgba(var(--accent-gold-rgb),0.5)" stroke-width="1" />
		<circle cx={c + c - 12} cy={c} r="3" fill="var(--accent-gold)" />
	</g>
	<g class="orbit o2" style="transform-origin: {c}px {c}px;">
		<ellipse cx={c} cy={c} rx={c * 0.42} ry={c - 10} fill="none" stroke="rgba(var(--accent-gold-rgb),0.4)" stroke-width="1" />
		<circle cx={c} cy="12" r="2.5" fill="var(--accent-gold)" />
	</g>
	<g class="orbit o3" style="transform-origin: {c}px {c}px;">
		<ellipse cx={c} cy={c} rx={c - 24} ry={c - 24} fill="none" stroke="rgba(var(--accent-gold-rgb),0.25)" stroke-width="1" stroke-dasharray="4 8" />
	</g>
	<g class="orbit o4" style="transform-origin: {c}px {c}px;">
		<ellipse cx={c} cy={c} rx={c * 0.68} ry={c * 0.68} fill="none" stroke="rgba(var(--accent-gold-rgb),0.3)" stroke-width="1" />
		<circle cx={c} cy={c - c * 0.68} r="2" fill="var(--accent-gold)" />
	</g>
	<!-- rotating diamond core -->
	<g class="core" style="transform-origin: {c}px {c}px;">
		<rect
			x={c - 16}
			y={c - 16}
			width="32"
			height="32"
			fill="rgba(var(--accent-gold-rgb),0.12)"
			stroke="var(--accent-gold)"
			stroke-width="1.5"
			transform="rotate(45 {c} {c})"
		/>
	</g>
	<circle cx={c} cy={c} r="5" fill="var(--accent-gold)" class="pulse-core" />
</svg>

<style>
	.orbit {
		animation: aurum-rotate-track linear infinite;
	}
	.o1 {
		animation-duration: 18s;
	}
	.o2 {
		animation-duration: 24s;
		animation-direction: reverse;
	}
	.o3 {
		animation-duration: 40s;
	}
	.o4 {
		animation-duration: 12s;
		animation-direction: reverse;
	}
	.core {
		animation: aurum-rotate-track 9s linear infinite;
	}
	.pulse-core {
		animation: pulse-glow 2.4s ease-in-out infinite;
	}
	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 0.6;
			filter: drop-shadow(0 0 2px var(--accent-gold));
		}
		50% {
			opacity: 1;
			filter: drop-shadow(0 0 10px var(--accent-gold));
		}
	}
</style>
