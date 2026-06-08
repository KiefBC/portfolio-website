<script lang="ts">
	import { systemLog } from '$lib/aurum/stores/systemLog';
	import { tick } from 'svelte';

	let stream: HTMLDivElement;

	// Auto-scroll to the newest entry whenever the log changes.
	$effect(() => {
		$systemLog;
		tick().then(() => {
			if (stream) stream.scrollLeft = stream.scrollWidth;
		});
	});

	const latest = $derived($systemLog[$systemLog.length - 1]);
</script>

<footer class="syslog mono" role="log" aria-live="polite" aria-label="System activity log">
	<span class="live">
		<span class="live-dot"></span>LIVE
	</span>
	<div class="stream" bind:this={stream}>
		{#if latest}
			<span class="entry">
				<span class="ts">[{latest.ts}]</span>
				{latest.msg}
			</span>
		{/if}
	</div>
	<span class="brand">aurum://kiefer</span>
</footer>

<style>
	.syslog {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 40;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.4rem 1rem;
		font-size: 0.7rem;
		background: rgba(var(--bg-card-rgb), 0.85);
		backdrop-filter: blur(8px);
		border-top: 1px solid var(--border-color);
		color: var(--text-muted);
	}
	.live {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--accent-gold);
		flex-shrink: 0;
	}
	.live-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent-gold);
		animation: aurum-pulse 1.8s ease-out infinite;
	}
	.stream {
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
	}
	.entry .ts {
		color: var(--accent-gold-dark);
	}
	.brand {
		flex-shrink: 0;
		opacity: 0.6;
	}
	@media (max-width: 640px) {
		.brand {
			display: none;
		}
	}
</style>
