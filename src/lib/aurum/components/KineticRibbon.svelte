<script lang="ts">
	interface Props {
		items: string[];
		/** Seconds for one full loop. */
		speed?: number;
		reverse?: boolean;
	}

	let { items, speed = 28, reverse = false }: Props = $props();
	// Duplicate the list so the -50% translate loops seamlessly.
	const doubled = $derived([...items, ...items]);
</script>

<div class="ribbon" style="--dur: {speed}s; --dir: {reverse ? 'reverse' : 'normal'};">
	<div class="track">
		{#each doubled as item, i (i)}
			<span class="item mono">{item}</span>
			<span class="dot" aria-hidden="true">◆</span>
		{/each}
	</div>
</div>

<style>
	.ribbon {
		overflow: hidden;
		width: 100%;
		border-block: 1px solid var(--border-color);
		padding-block: 0.85rem;
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}
	.track {
		display: inline-flex;
		align-items: center;
		gap: 1.5rem;
		white-space: nowrap;
		width: max-content;
		animation: aurum-marquee var(--dur) linear infinite;
		animation-direction: var(--dir);
	}
	.ribbon:hover .track {
		animation-play-state: paused;
	}
	.item {
		font-size: 1.15rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-main);
	}
	.dot {
		color: var(--accent-gold);
		font-size: 0.7rem;
	}
</style>
