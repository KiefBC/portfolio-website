<script lang="ts">
	import { projects } from '$lib/data/projects';
	import PremiumCard from '$lib/aurum/components/PremiumCard.svelte';
	import SectionHeading from '$lib/aurum/components/SectionHeading.svelte';
	import CryptoText from '$lib/aurum/components/CryptoText.svelte';
	import ReactorCore from '$lib/aurum/components/ReactorCore.svelte';
	import GithubIcon from '$lib/aurum/components/icons/GithubIcon.svelte';
	import { ExternalLink, Lock } from '@lucide/svelte';

	const coreSystems = $derived(projects.filter((p) => p.featured));
	const utilities = $derived(projects.filter((p) => !p.featured));
</script>

<svelte:head>
	<title>Arsenal — Kiefer</title>
	<meta
		name="description"
		content="Project arsenal — systems, tools and experiments built by Kiefer."
	/>
</svelte:head>

<main class="wrap">
	<!-- ===== HERO ===== -->
	<section class="hero">
		<div class="hero-copy">
			<CryptoText as="h1" class="hero-title" text="PROJECT_ARSENAL" duration={1000} />
			<p class="hero-sub mono">// systems, tools &amp; experiments</p>
			<p class="hero-count mono">
				<span class="gold-text">{projects.length}</span> deployments cataloged
			</p>
		</div>
		<div class="hero-reactor" aria-hidden="true">
			<ReactorCore size={260} />
		</div>
	</section>

	<!-- ===== TIER 1 — CORE SYSTEMS ===== -->
	<section class="section">
		<SectionHeading index="01" title="Core Systems" subtitle="featured" />
		<div class="grid grid-2">
			{#each coreSystems as project (project.id)}
				<PremiumCard>
					<article class="project">
						<span class="sigil" aria-hidden="true">{project.image}</span>
						<h3 class="project-title">{project.title}</h3>
						<p class="project-desc">{project.description}</p>
						<div class="tags">
							{#each project.technologies as tech (tech)}
								<span class="tag-chip">{tech}</span>
							{/each}
						</div>
						<div class="links mono">
							{#if project.github}
								<a
									class="link"
									href={project.github}
									target="_blank"
									rel="noreferrer"
									data-cursor="hover"
								>
									<GithubIcon size={15} />
									<span>{project.githubSubtext ?? 'Source'}</span>
								</a>
							{/if}
							{#if project.previewUrl}
								<a
									class="link"
									href={project.previewUrl}
									target="_blank"
									rel="noreferrer"
									data-cursor="hover"
								>
									<ExternalLink size={15} strokeWidth={1.8} />
									<span>{project.previewSubtext ?? 'Live'}</span>
								</a>
							{/if}
							{#if !project.github && !project.previewUrl}
								<span class="link private">
									<Lock size={13} strokeWidth={1.8} />
									<span>private</span>
								</span>
							{/if}
						</div>
					</article>
				</PremiumCard>
			{/each}
		</div>
	</section>

	<!-- ===== TIER 2 — UTILITIES ===== -->
	<section class="section">
		<SectionHeading index="02" title="Utilities" subtitle="archive" />
		<div class="grid grid-3">
			{#each utilities as project (project.id)}
				<PremiumCard>
					<article class="project">
						<span class="sigil" aria-hidden="true">{project.image}</span>
						<h3 class="project-title">{project.title}</h3>
						<p class="project-desc">{project.description}</p>
						<div class="tags">
							{#each project.technologies as tech (tech)}
								<span class="tag-chip">{tech}</span>
							{/each}
						</div>
						<div class="links mono">
							{#if project.github}
								<a
									class="link"
									href={project.github}
									target="_blank"
									rel="noreferrer"
									data-cursor="hover"
								>
									<GithubIcon size={15} />
									<span>{project.githubSubtext ?? 'Source'}</span>
								</a>
							{/if}
							{#if project.previewUrl}
								<a
									class="link"
									href={project.previewUrl}
									target="_blank"
									rel="noreferrer"
									data-cursor="hover"
								>
									<ExternalLink size={15} strokeWidth={1.8} />
									<span>{project.previewSubtext ?? 'Live'}</span>
								</a>
							{/if}
							{#if !project.github && !project.previewUrl}
								<span class="link private">
									<Lock size={13} strokeWidth={1.8} />
									<span>private</span>
								</span>
							{/if}
						</div>
					</article>
				</PremiumCard>
			{/each}
		</div>
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
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 2rem;
		padding-bottom: 1rem;
	}
	.hero-copy {
		min-width: 0;
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
	.hero-count {
		margin-top: 0.5rem;
		font-size: 0.78rem;
		letter-spacing: 0.06em;
		color: var(--text-muted);
	}
	.hero-reactor {
		display: grid;
		place-items: center;
	}

	/* ===== sections ===== */
	.section {
		margin-top: 5rem;
	}

	.grid {
		display: grid;
		gap: 1.25rem;
	}
	.grid-2 {
		grid-template-columns: repeat(2, 1fr);
	}
	.grid-3 {
		grid-template-columns: repeat(3, 1fr);
	}

	/* ===== project card ===== */
	.project {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.sigil {
		font-size: 2.2rem;
		line-height: 1;
		display: inline-block;
		filter: grayscale(0.2);
		transition:
			transform 0.35s ease,
			filter 0.35s ease;
	}
	:global(.premium-card:hover) .sigil {
		transform: translateY(-2px) scale(1.06);
		filter: grayscale(0);
	}
	.project-title {
		margin-top: 0.9rem;
		font-size: 1.02rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--text-main);
		transition: color 0.25s ease;
	}
	:global(.premium-card:hover) .project-title {
		color: var(--accent-gold);
	}
	.project-desc {
		margin-top: 0.55rem;
		font-size: 0.86rem;
		line-height: 1.6;
		color: var(--text-muted);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 1rem;
	}
	.tags .tag-chip {
		font-size: 0.68rem;
		padding: 0.22rem 0.55rem;
	}

	/* ===== links footer ===== */
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: auto;
		padding-top: 1.1rem;
	}
	/* push the footer down so cards in a row align */
	.tags {
		margin-bottom: 0.25rem;
	}
	.links::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background: linear-gradient(90deg, var(--border-color), transparent);
	}
	.links {
		position: relative;
	}
	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.76rem;
		color: var(--text-muted);
		transition: color 0.2s ease;
	}
	a.link:hover {
		color: var(--accent-gold);
	}
	.link.private {
		color: var(--text-muted);
		opacity: 0.7;
	}

	/* ===== responsive ===== */
	@media (max-width: 920px) {
		.grid-3 {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 768px) {
		.hero {
			grid-template-columns: 1fr;
			text-align: left;
		}
		.hero-reactor {
			display: none;
		}
		.grid-2,
		.grid-3 {
			grid-template-columns: 1fr;
		}
	}
</style>
