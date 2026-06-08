<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { skills } from '$lib/components/about/data/skills';
	import { interests } from '$lib/components/about/data/interests';
	import { experience } from '$lib/components/resume/data/experience';
	import { education } from '$lib/components/resume/data/education';
	import { calculateGitHubStats, type GitHubStats } from '$lib/services/github';
	import { openTerminal } from '$lib/aurum/stores/terminal';
	import { Mail, Command } from '@lucide/svelte';
	import GithubIcon from '$lib/aurum/components/icons/GithubIcon.svelte';
	import PremiumCard from '$lib/aurum/components/PremiumCard.svelte';
	import SectionHeading from '$lib/aurum/components/SectionHeading.svelte';
	import KineticRibbon from '$lib/aurum/components/KineticRibbon.svelte';
	import LiquidGauge from '$lib/aurum/components/LiquidGauge.svelte';
	import CryptoText from '$lib/aurum/components/CryptoText.svelte';
	import { magneticDrag } from '$lib/aurum/actions/magneticDrag';
	import { inView } from '$lib/aurum/actions/inView';

	// ---- Typing effect for the hero role line ----
	const roles = ['Software Developer', 'DevOps Engineer', 'Backend Developer', 'Rust Developer', 'Go Developer'];
	let typed = $state('');
	let roleIndex = 0;
	let charIndex = 0;
	let deleting = false;

	onMount(() => {
		let timer: ReturnType<typeof setTimeout>;
		const tick = () => {
			const current = roles[roleIndex];
			if (!deleting) {
				typed = current.slice(0, ++charIndex);
				if (charIndex === current.length) {
					deleting = true;
					timer = setTimeout(tick, 1600);
					return;
				}
			} else {
				typed = current.slice(0, --charIndex);
				if (charIndex === 0) {
					deleting = false;
					roleIndex = (roleIndex + 1) % roles.length;
				}
			}
			timer = setTimeout(tick, deleting ? 45 : 90);
		};
		tick();
		return () => clearTimeout(timer);
	});

	// ---- Tech arsenal tabs (derived from existing skills) ----
	const tabs = {
		Languages: ['Rust', 'Go', 'C++', 'TypeScript', 'Python', 'Swift'],
		Frameworks: ['SvelteKit', 'Ruby on Rails', 'Tauri', 'Leptos'],
		'Systems & DevOps': ['Linux', 'Docker', 'Dagger', 'PostgreSQL', 'CI/CD', 'Git'],
		Domains: ['Backend Infrastructure', 'Systems Programming', 'Machine Learning', 'Cross-Platform']
	};
	const tabNames = Object.keys(tabs) as (keyof typeof tabs)[];
	let activeTab = $state<keyof typeof tabs>('Languages');

	// Top skills for the liquid gauges.
	const topSkills = skills.slice(0, 4);
	const ribbonItems = skills.map((s) => s.name);

	// ---- Philosophy quotes (auto-cycling) ----
	const quotes = [
		'Make it work, make it right, make it fast.',
		'Simplicity is the prerequisite for reliability.',
		'Premature optimization is the root of all evil.',
		'The best code is the code you never had to write.',
		'Ownership is freedom — borrow responsibly.'
	];
	let quoteIndex = $state(0);
	onMount(() => {
		const id = setInterval(() => (quoteIndex = (quoteIndex + 1) % quotes.length), 4200);
		return () => clearInterval(id);
	});

	// ---- Live telemetry (GitHub) ----
	let stats = $state<GitHubStats | null>(null);
	let statsError = $state(false);
	onMount(async () => {
		try {
			stats = await calculateGitHubStats();
		} catch {
			statsError = true;
		}
	});
	const topLanguages = $derived(
		stats
			? Object.entries(stats.languages)
					.sort((a, b) => b[1] - a[1])
					.slice(0, 5)
			: []
	);
</script>

<svelte:head>
	<title>Kiefer — Software Developer</title>
	<meta
		name="description"
		content="Portfolio of Kiefer — backend & DevOps developer specializing in Go, Rust, CI/CD automation, and Linux/Docker systems."
	/>
</svelte:head>

<main class="wrap">
	<!-- ===== HERO ===== -->
	<section class="hero">
		<button class="ghost-hint mono" onclick={openTerminal} data-cursor="hover">
			<Command size={13} strokeWidth={1.8} /> press ⌘K for terminal
		</button>

		<div class="hero-grid">
			<div class="hero-copy">
				<span class="status mono"><span class="status-dot"></span>AVAILABLE FOR WORK</span>
				<h1 class="name">Kiefer</h1>
				<p class="role mono">
					<span class="gold-text">{typed}</span><span class="caret">▍</span>
				</p>
				<p class="bio">
					I build and automate backend infrastructure — Go and Rust services, CI/CD pipelines
					with Dagger, and Linux/Docker systems. I run my own secure self-hosted stack and
					care about software that's correct, fast, and a pleasure to maintain.
				</p>
				<div class="hero-actions">
					<a class="btn primary" href="https://github.com/KiefBC" target="_blank" rel="noreferrer" data-cursor="hover">
						<GithubIcon size={17} /> GitHub
					</a>
					<a class="btn" href="/contact" data-cursor="hover">
						<Mail size={17} strokeWidth={1.8} /> Get in touch
					</a>
				</div>
			</div>

			<div class="hero-avatar">
				<div class="orbit-ring"></div>
				<div class="orbit-ring slow"></div>
				<img src="/profile.jpg" alt="Kiefer" loading="lazy" />
			</div>
		</div>
	</section>

	<KineticRibbon items={ribbonItems} />

	<!-- ===== IDENTITY & EDUCATION ===== -->
	<section class="section">
		<SectionHeading index="01" title="Identity" subtitle="who_am_i.sh" />
		<div class="two-col">
			<PremiumCard>
				<h3 class="card-h">What I build</h3>
				<p class="card-p">
					Backend infrastructure and developer tooling: CI/CD pipelines with Dagger,
					containerized builds, and Go &amp; Rust services, plus the occasional Tauri desktop app or
					ML-backed web app. Strong typing and a systems-programming mindset throughout.
				</p>
			</PremiumCard>
			<PremiumCard>
				<h3 class="card-h">Education</h3>
				{#each education as ed (ed.degree)}
					<p class="edu-degree">{ed.degree}</p>
					<p class="edu-school mono">{ed.school}{#if ed.period} · {ed.period}{/if}</p>
					<p class="card-p">{ed.details}</p>
				{/each}
			</PremiumCard>
		</div>
	</section>

	<!-- ===== TECH ARSENAL ===== -->
	<section class="section">
		<SectionHeading index="02" title="Tech Arsenal" subtitle="stack --list" />
		<div class="tabs mono">
			{#each tabNames as name (name)}
				<button class="tab" class:active={activeTab === name} onclick={() => (activeTab = name)} data-cursor="hover">
					{name}
				</button>
			{/each}
		</div>
		<div class="chips">
			{#key activeTab}
				{#each tabs[activeTab] as item, i (item)}
					<span class="chip" in:fade={{ duration: 220, delay: i * 40 }} use:magneticDrag data-cursor="hover">
						{item}
					</span>
				{/each}
			{/key}
		</div>
	</section>

	<!-- ===== PROFICIENCY ===== -->
	<section class="section">
		<SectionHeading index="03" title="Proficiency" subtitle="skill --levels" />
		<div class="gauges">
			{#each topSkills as s (s.name)}
				<LiquidGauge label={s.name} level={s.level} icon={s.icon} />
			{/each}
		</div>
	</section>

	<!-- ===== INTERESTS ===== -->
	<section class="section">
		<SectionHeading index="04" title="Focus Areas" subtitle="interests[]" />
		<div class="interests">
			{#each interests as interest (interest)}
				<span class="tag-chip interest" data-cursor="hover">{interest}</span>
			{/each}
		</div>
	</section>

	<!-- ===== EXPERIENCE ===== -->
	<section class="section">
		<SectionHeading index="05" title="Experience" subtitle="career --log" />
		<div class="exp-list">
			{#each experience as job (job.title)}
				<PremiumCard tiltMax={3}>
					<div class="exp-head">
						<h3 class="card-h">{job.title}</h3>
						<span class="exp-period mono">{job.period || 'Internship'}</span>
					</div>
					<p class="exp-company gold-text mono">{job.company}</p>
					<p class="card-p">{job.description}</p>
					<ul class="exp-achievements">
						{#each job.achievements as a (a)}
							<li>{a}</li>
						{/each}
					</ul>
				</PremiumCard>
			{/each}
		</div>
	</section>

	<!-- ===== LIVE TELEMETRY ===== -->
	<section class="section">
		<SectionHeading index="06" title="Live Telemetry" subtitle="github --stats" />
		<PremiumCard flat>
			{#if stats}
				<div class="telemetry" use:inView>
					<div class="metric">
						<span class="metric-val mono">{stats.totalRepos}</span>
						<span class="metric-label mono">public repos</span>
					</div>
					<div class="metric">
						<span class="metric-val mono">{stats.totalStars}</span>
						<span class="metric-label mono">stars earned</span>
					</div>
					<div class="metric">
						<span class="metric-val mono">{stats.totalForks}</span>
						<span class="metric-label mono">forks</span>
					</div>
					<div class="metric langs">
						<span class="metric-label mono">top languages</span>
						<div class="lang-bars">
							{#each topLanguages as [lang, count] (lang)}
								<span class="lang-chip mono">{lang} · {count}</span>
							{/each}
						</div>
					</div>
				</div>
			{:else if statsError}
				<p class="card-p mono">// telemetry offline — GitHub API unreachable.</p>
			{:else}
				<p class="card-p mono">// fetching live telemetry…</p>
			{/if}
		</PremiumCard>
	</section>

	<!-- ===== PHILOSOPHY ===== -->
	<section class="section philosophy">
		<SectionHeading index="07" title="Core Philosophy" subtitle="echo $WISDOM" />
		<div class="quote-stage">
			{#key quoteIndex}
				<CryptoText as="p" class="quote" text={quotes[quoteIndex]} duration={700} />
			{/key}
		</div>
	</section>
</main>

<style>
	.wrap {
		max-width: 1080px;
		margin: 0 auto;
		padding: 5rem 1.5rem 4rem;
	}
	.section {
		margin-top: 5rem;
	}

	/* hero */
	.hero {
		position: relative;
		padding-top: 1rem;
	}
	.ghost-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.7rem;
		color: var(--text-muted);
		background: rgba(var(--bg-card-rgb), 0.5);
		border: 1px solid var(--border-color);
		border-radius: 999px;
		padding: 0.3rem 0.7rem;
		margin-bottom: 2rem;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: 2.5rem;
		align-items: center;
	}
	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		color: var(--text-muted);
	}
	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #3fbf6f;
		box-shadow: 0 0 8px #3fbf6f;
	}
	.name {
		font-size: clamp(3rem, 9vw, 5.5rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.03em;
		margin: 0.6rem 0 0.4rem;
	}
	.role {
		font-size: clamp(1.1rem, 3vw, 1.6rem);
		min-height: 1.6em;
	}
	.caret {
		animation: aurum-blink 1s step-end infinite;
		color: var(--accent-gold);
	}
	.bio {
		margin-top: 1.2rem;
		max-width: 38ch;
		color: var(--text-muted);
		line-height: 1.65;
	}
	.hero-actions {
		display: flex;
		gap: 0.8rem;
		margin-top: 1.8rem;
		flex-wrap: wrap;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.1rem;
		border-radius: 8px;
		border: 1px solid var(--border-color);
		color: var(--text-main);
		font-size: 0.9rem;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			color 0.2s ease;
	}
	.btn:hover {
		border-color: rgba(var(--accent-gold-rgb), 0.5);
	}
	.btn.primary {
		background: var(--accent-gold);
		color: #0a0a0a;
		border-color: var(--accent-gold);
		font-weight: 500;
	}
	.btn.primary:hover {
		background: var(--accent-gold-dark);
	}

	.hero-avatar {
		position: relative;
		display: grid;
		place-items: center;
		aspect-ratio: 1;
		max-width: 260px;
		margin-inline: auto;
	}
	.hero-avatar img {
		width: 72%;
		height: 72%;
		object-fit: cover;
		border-radius: 50%;
		filter: grayscale(1) contrast(1.05);
		transition: filter 0.4s ease;
		border: 1px solid var(--border-color);
	}
	.hero-avatar:hover img {
		filter: grayscale(0);
	}
	.orbit-ring {
		position: absolute;
		inset: 0;
		border: 1px dashed rgba(var(--accent-gold-rgb), 0.35);
		border-radius: 50%;
		animation: aurum-rotate-track 22s linear infinite;
	}
	.orbit-ring.slow {
		inset: 12%;
		border-style: dotted;
		animation-duration: 34s;
		animation-direction: reverse;
	}

	/* generic cards */
	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}
	.card-h {
		font-size: 1.05rem;
		font-weight: 600;
		margin-bottom: 0.6rem;
	}
	.card-p {
		color: var(--text-muted);
		line-height: 1.6;
		font-size: 0.92rem;
	}
	.edu-degree {
		font-weight: 600;
	}
	.edu-school {
		color: var(--accent-gold);
		font-size: 0.8rem;
		margin: 0.2rem 0 0.6rem;
	}

	/* tabs */
	.tabs {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1.4rem;
	}
	.tab {
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		border: 1px solid var(--border-color);
		background: transparent;
		color: var(--text-muted);
		font-size: 0.78rem;
		transition: all 0.2s ease;
	}
	.tab:hover {
		color: var(--text-main);
	}
	.tab.active {
		color: var(--accent-gold);
		border-color: rgba(var(--accent-gold-rgb), 0.5);
		background: rgba(var(--accent-gold-rgb), 0.08);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		min-height: 3rem;
	}
	.chip {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		border: 1px solid var(--border-color);
		background: rgba(var(--bg-card-rgb), 0.6);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		cursor: grab;
		user-select: none;
	}
	.chip:active {
		cursor: grabbing;
		border-color: var(--accent-gold);
	}

	/* gauges */
	.gauges {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: center;
	}

	/* interests */
	.interests {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.interest {
		font-size: 0.8rem;
		padding: 0.4rem 0.8rem;
	}

	/* experience */
	.exp-list {
		display: grid;
		gap: 1.25rem;
	}
	.exp-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}
	.exp-period {
		font-size: 0.72rem;
		color: var(--text-muted);
		flex-shrink: 0;
	}
	.exp-company {
		font-size: 0.85rem;
		margin: 0.2rem 0 0.7rem;
	}
	.exp-achievements {
		margin-top: 0.8rem;
		padding-left: 1rem;
		display: grid;
		gap: 0.3rem;
	}
	.exp-achievements li {
		color: var(--text-muted);
		font-size: 0.85rem;
		line-height: 1.5;
		list-style: '▸  ';
	}

	/* telemetry */
	.telemetry {
		display: grid;
		grid-template-columns: repeat(3, auto) 1fr;
		gap: 1.5rem;
		align-items: center;
	}
	.metric {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.metric-val {
		font-size: 2rem;
		font-weight: 600;
		color: var(--accent-gold);
		line-height: 1;
	}
	.metric-label {
		font-size: 0.68rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.lang-bars {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.4rem;
	}
	.lang-chip {
		font-size: 0.7rem;
		padding: 0.2rem 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 5px;
		color: var(--text-muted);
	}

	/* philosophy */
	.quote-stage {
		min-height: 4rem;
		display: grid;
		place-items: center;
		text-align: center;
	}
	:global(.quote-stage .quote) {
		font-size: clamp(1.1rem, 3vw, 1.6rem);
		color: var(--text-main);
		max-width: 30ch;
	}

	@media (max-width: 768px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
		.hero-avatar {
			order: -1;
			max-width: 180px;
		}
		.two-col {
			grid-template-columns: 1fr;
		}
		.telemetry {
			grid-template-columns: repeat(3, 1fr);
		}
		.telemetry .langs {
			grid-column: 1 / -1;
		}
	}
</style>
