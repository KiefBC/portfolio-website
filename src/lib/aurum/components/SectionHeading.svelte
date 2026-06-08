<script lang="ts">
	interface Props {
		index: string;
		title: string;
		subtitle?: string;
	}
	let { index, title, subtitle = '' }: Props = $props();
</script>

<div class="heading">
	<span class="idx mono">{index}</span>
	<div>
		<h2 class="title">{title}</h2>
		{#if subtitle}<p class="sub mono">{subtitle}</p>{/if}
	</div>
	<span class="rule" aria-hidden="true"></span>
</div>

<style>
	.heading {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}
	.idx {
		color: var(--accent-gold);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
	}
	.title {
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 600;
		color: var(--text-main);
		letter-spacing: -0.01em;
	}
	.sub {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: 0.15rem;
	}
	.rule {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--border-color), transparent);
	}
</style>
