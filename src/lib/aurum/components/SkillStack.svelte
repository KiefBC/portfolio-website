<script lang="ts">
	interface Props {
		/** Skill names — rendered as terminal tokens. */
		items: string[];
	}

	let { items }: Props = $props();

	// Terminal-style tokens: lowercase, spaces → hyphens (e.g. "Ruby on Rails" → "ruby-on-rails").
	const tokens = $derived(items.map((s) => s.toLowerCase().replace(/\s+/g, '-')));
</script>

<div class="stack-card">
	<div class="chrome">
		<span class="dot" style="--d:#ff5f56"></span>
		<span class="dot" style="--d:#ffbd2e"></span>
		<span class="dot" style="--d:#27c93f"></span>
		<span class="chrome-title mono">stack.sh</span>
	</div>

	<div class="body mono">
		<p class="prompt-line">
			<span class="prompt">$</span> skills --all<span class="caret">▍</span>
		</p>
		<ul class="grid">
			{#each tokens as t (t)}
				<li class="row">
					<span class="marker" aria-hidden="true">▸</span>{t}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.stack-card {
		border: 1px solid var(--border-color);
		border-radius: 8px;
		background: rgba(var(--bg-card-rgb), 0.6);
		backdrop-filter: blur(12px);
		overflow: hidden;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.stack-card:hover {
		border-color: rgba(var(--accent-gold-rgb), 0.4);
		box-shadow: 0 0 24px rgba(var(--accent-gold-rgb), 0.08);
	}

	.chrome {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0.9rem;
		border-bottom: 1px solid var(--border-color);
		background: rgba(0, 0, 0, 0.25);
	}
	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--d);
		opacity: 0.85;
	}
	.chrome-title {
		margin-left: 0.4rem;
		font-size: 0.72rem;
		color: var(--text-muted);
	}

	.body {
		padding: 1.1rem 1.25rem 1.35rem;
	}
	.prompt-line {
		font-size: 0.82rem;
		color: var(--text-muted);
		margin-bottom: 1.1rem;
	}
	.prompt {
		color: var(--accent-gold);
		margin-right: 0.4rem;
	}
	.caret {
		color: var(--accent-gold);
		margin-left: 2px;
		animation: aurum-blink 1s step-end infinite;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		gap: 0.6rem 1.2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		color: var(--text-main);
		transition: color 0.2s ease;
	}
	.marker {
		color: var(--accent-gold);
		font-size: 0.8rem;
	}
	.row:hover {
		color: var(--accent-gold);
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		}
	}
</style>
