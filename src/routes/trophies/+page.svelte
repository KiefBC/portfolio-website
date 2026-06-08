<script lang="ts">
	import PremiumCard from '$lib/aurum/components/PremiumCard.svelte';
	import SectionHeading from '$lib/aurum/components/SectionHeading.svelte';
	import CryptoText from '$lib/aurum/components/CryptoText.svelte';
	import { inView } from '$lib/aurum/actions/inView';
	import { certifications } from '$lib/components/resume/data/certifications';
	import { education } from '$lib/components/resume/data/education';
	import { timelineItems } from '$lib/components/timeline/data/timelineData';
	import { Award, GraduationCap, CheckCircle } from '@lucide/svelte';

	let shown = $state<Set<number>>(new Set());

	function reveal(i: number) {
		shown.add(i);
		shown = new Set(shown);
	}
</script>

<svelte:head>
	<title>Trophies — Kiefer</title>
	<meta
		name="description"
		content="Trophy vault — credentials, education and the road here, by Kiefer."
	/>
</svelte:head>

<main class="wrap">
	<!-- ===== HERO ===== -->
	<section class="hero">
		<CryptoText as="h1" class="hero-title" text="TROPHY_VAULT" duration={1000} />
		<p class="hero-sub mono">// credentials &amp; the road here</p>
	</section>

	<!-- ===== 01 — CREDENTIALS ===== -->
	<section class="section">
		<SectionHeading index="01" title="Credentials" subtitle="verified" />
		<div class="seal-grid">
			{#each certifications as cert (cert)}
				<PremiumCard tiltMax={8}>
					<article class="seal">
						<div class="seal-mark" aria-hidden="true">
							<span class="diamond">
								<Award size={26} strokeWidth={1.6} />
							</span>
						</div>
						<p class="seal-title">{cert}</p>
						<span class="verified mono">
							<CheckCircle size={13} strokeWidth={2} />
							VERIFIED
						</span>
					</article>
				</PremiumCard>
			{/each}

			{#each education as edu (edu.degree)}
				<PremiumCard tiltMax={8}>
					<article class="seal">
						<div class="seal-mark" aria-hidden="true">
							<span class="diamond">
								<GraduationCap size={26} strokeWidth={1.6} />
							</span>
						</div>
						<p class="seal-title">{edu.degree}</p>
						<p class="seal-school gold-text mono">{edu.school} · {edu.period}</p>
						<p class="seal-details">{edu.details}</p>
						<span class="verified mono">
							<CheckCircle size={13} strokeWidth={2} />
							ACADEMIC
						</span>
					</article>
				</PremiumCard>
			{/each}
		</div>
	</section>

	<!-- ===== 02 — THE JOURNEY ===== -->
	<section class="section">
		<SectionHeading index="02" title="The Journey" subtitle="git log --reverse" />
		<ol class="timeline">
			{#each timelineItems as item, i (i)}
				<li
					class="entry"
					class:shown={shown.has(i)}
					use:inView={{ threshold: 0.2, onEnter: () => reveal(i) }}
				>
					<span class="node" aria-hidden="true"></span>
					<div class="entry-body">
						<div class="entry-meta mono">
							<span class="year gold-text">{item.year}</span>
							<span class="emoji" aria-hidden="true">{item.icon}</span>
						</div>
						<CryptoText as="h3" class="entry-title" text={item.title} />
						<p class="entry-desc">{item.description}</p>
						<div class="tags">
							{#each item.technologies as tech (tech)}
								<span class="tag-chip">{tech}</span>
							{/each}
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</section>
</main>

<style>
	.wrap {
		max-width: 1080px;
		margin: 0 auto;
		padding: 5rem 1.5rem 4rem;
	}

	/* ===== hero ===== */
	.hero {
		padding-bottom: 1rem;
	}
	:global(.hero .hero-title) {
		font-size: clamp(2.2rem, 7vw, 4.2rem);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: 0.04em;
		color: var(--text-main);
		word-break: break-word;
	}
	.hero-sub {
		margin-top: 1rem;
		font-size: clamp(0.85rem, 2vw, 1rem);
		color: var(--text-muted);
	}

	/* ===== sections ===== */
	.section {
		margin-top: 5rem;
	}

	/* ===== credentials / seals ===== */
	.seal-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}
	.seal {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.seal-mark {
		display: flex;
		margin-bottom: 1.1rem;
	}
	.diamond {
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		color: var(--accent-gold);
		border: 1px solid rgba(var(--accent-gold-rgb), 0.45);
		background: radial-gradient(
			circle at 30% 25%,
			rgba(var(--accent-gold-rgb), 0.16),
			rgba(var(--accent-gold-rgb), 0.03)
		);
		border-radius: 14px;
		transform: rotate(45deg);
		transition:
			transform 0.4s ease,
			border-color 0.4s ease;
	}
	.diamond > :global(svg) {
		transform: rotate(-45deg);
	}
	:global(.premium-card:hover) .diamond {
		transform: rotate(45deg) scale(1.05);
		border-color: rgba(var(--accent-gold-rgb), 0.85);
	}
	.seal-title {
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.4;
		color: var(--text-main);
		transition: color 0.25s ease;
	}
	:global(.premium-card:hover) .seal-title {
		color: var(--accent-gold);
	}
	.seal-school {
		margin-top: 0.5rem;
		font-size: 0.76rem;
		letter-spacing: 0.02em;
	}
	.seal-details {
		margin-top: 0.6rem;
		font-size: 0.84rem;
		line-height: 1.6;
		color: var(--text-muted);
	}
	.verified {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 1.1rem;
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		color: var(--accent-gold);
	}

	/* ===== timeline ===== */
	.timeline {
		position: relative;
		list-style: none;
		margin: 0;
		padding: 0 0 0 1.75rem;
	}
	/* continuous trace line */
	.timeline::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 6px;
		bottom: 6px;
		width: 1px;
		background: linear-gradient(
			180deg,
			transparent,
			rgba(var(--accent-gold-rgb), 0.55) 8%,
			rgba(var(--accent-gold-rgb), 0.55) 92%,
			transparent
		);
	}

	.entry {
		position: relative;
		padding-bottom: 2.75rem;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}
	.entry:last-child {
		padding-bottom: 0;
	}
	.entry.shown {
		opacity: 1;
		transform: translateY(0);
	}

	/* pulsing node dot on the trace line */
	.node {
		position: absolute;
		left: calc(-1.75rem + 1px);
		top: 7px;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--accent-gold);
		box-shadow: 0 0 0 4px var(--bg-surface);
		animation: aurum-pulse 1.8s ease-out infinite;
	}

	.entry-body {
		min-width: 0;
	}
	.entry-meta {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.78rem;
		letter-spacing: 0.08em;
	}
	.year {
		font-weight: 600;
	}
	.emoji {
		font-size: 1.05rem;
		line-height: 1;
		filter: grayscale(0.15);
	}
	:global(.entry .entry-title) {
		margin-top: 0.4rem;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--text-main);
	}
	.entry-desc {
		margin-top: 0.5rem;
		font-size: 0.86rem;
		line-height: 1.6;
		color: var(--text-muted);
		max-width: 64ch;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.9rem;
	}
	.tags .tag-chip {
		font-size: 0.68rem;
		padding: 0.22rem 0.55rem;
	}

	/* ===== responsive ===== */
	@media (max-width: 768px) {
		.seal-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
