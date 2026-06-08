<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Mail, Send, MapPin, Clock, Loader } from '@lucide/svelte';
	import GithubIcon from '$lib/aurum/components/icons/GithubIcon.svelte';
	import LinkedinIcon from '$lib/aurum/components/icons/LinkedinIcon.svelte';
	import PremiumCard from '$lib/aurum/components/PremiumCard.svelte';
	import SectionHeading from '$lib/aurum/components/SectionHeading.svelte';
	import { systemLog } from '$lib/aurum/stores/systemLog';

	// ---- Form state ----
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	type Status = 'idle' | 'submitting' | 'success' | 'error';
	let status = $state<Status>('idle');
	let formError = $state('');

	// ---- Toast ----
	let toast = $state<{ msg: string; kind: 'success' | 'error' } | null>(null);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function showToast(msg: string, kind: 'success' | 'error') {
		if (toastTimer) clearTimeout(toastTimer);
		toast = { msg, kind };
		toastTimer = setTimeout(() => (toast = null), 5000);
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'submitting') return;
		formError = '';

		const n = name.trim();
		const e = email.trim();
		const s = subject.trim();
		const m = message.trim();

		if (!n || !e || !s || !m) {
			formError = 'ERR :: all fields are required.';
			return;
		}
		if (!EMAIL_RE.test(e)) {
			formError = 'ERR :: invalid email address.';
			return;
		}

		status = 'submitting';
		systemLog.log('CONTACT :: submit');

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: n, email: e, subject: s, message: m })
			});

			if (!res.ok) throw new Error('bad response');

			status = 'success';
			name = '';
			email = '';
			subject = '';
			message = '';
			systemLog.log('CONTACT :: 200 OK — payload delivered');
			showToast('TRANSMISSION_SUCCESS — payload delivered securely', 'success');
		} catch {
			status = 'error';
			systemLog.log('CONTACT :: ERR — connection lost');
			showToast('TRANSMISSION_FAILED — connection lost. retry.', 'error');
		}
	}
</script>

<svelte:head>
	<title>Contact — Kiefer</title>
	<meta name="description" content="Open a channel — get in touch with Kiefer." />
</svelte:head>

<main class="wrap">
	<div class="grid">
		<!-- ===== LEFT COLUMN ===== -->
		<div class="left">
			<SectionHeading index="01" title="Let's Connect" subtitle="open a channel" />

			<p class="intro">
				Have a project, a role, or just a question worth asking? Open a channel below — or reach
				out directly. I read everything and reply when there's signal worth answering.
			</p>

			<div class="channels">
				<a class="channel" href="mailto:kiefx@pm.me" data-cursor="hover">
					<span class="channel-icon"><Mail size={18} strokeWidth={1.7} /></span>
					<span class="channel-body">
						<span class="channel-label mono">email</span>
						<span class="channel-val">kiefx@pm.me</span>
					</span>
				</a>
				<a
					class="channel"
					href="https://github.com/KiefBC"
					target="_blank"
					rel="noreferrer"
					data-cursor="hover"
				>
					<span class="channel-icon"><GithubIcon size={18} /></span>
					<span class="channel-body">
						<span class="channel-label mono">github</span>
						<span class="channel-val">github.com/KiefBC</span>
					</span>
				</a>
				<a
					class="channel"
					href="https://www.linkedin.com/in/kieferh/"
					target="_blank"
					rel="noreferrer"
					data-cursor="hover"
				>
					<span class="channel-icon"><LinkedinIcon size={18} /></span>
					<span class="channel-body">
						<span class="channel-label mono">linkedin</span>
						<span class="channel-val">linkedin.com/in/kieferh</span>
					</span>
				</a>
			</div>

			<PremiumCard flat class="avail-card">
				<div class="avail-head">
					<span class="pulse-dot" aria-hidden="true"></span>
					<span class="avail-title">Available for work</span>
				</div>
				<div class="avail-line mono">
					<MapPin size={15} strokeWidth={1.7} /> Victoria, BC · Canada
				</div>
				<div class="avail-line mono">
					<Clock size={15} strokeWidth={1.7} /> PST / PDT
				</div>
			</PremiumCard>
		</div>

		<!-- ===== RIGHT COLUMN — TERMINAL ===== -->
		<div class="right">
			<PremiumCard flat class="terminal">
				<div class="chrome">
					<span class="dot" style="--d:#ff5f56"></span>
					<span class="dot" style="--d:#ffbd2e"></span>
					<span class="dot" style="--d:#27c93f"></span>
					<span class="chrome-title mono">contact.sh</span>
				</div>

				<form class="form" onsubmit={handleSubmit} novalidate>
					<label class="field">
						<span class="field-label mono"><span class="prompt">&gt;</span> name</span>
						<input
							type="text"
							class="input mono"
							bind:value={name}
							placeholder="Ada Lovelace"
							autocomplete="name"
							data-cursor="hover"
						/>
					</label>

					<label class="field">
						<span class="field-label mono"><span class="prompt">&gt;</span> email</span>
						<input
							type="email"
							class="input mono"
							bind:value={email}
							placeholder="ada@analytical.engine"
							autocomplete="email"
							data-cursor="hover"
						/>
					</label>

					<label class="field">
						<span class="field-label mono"><span class="prompt">&gt;</span> subject</span>
						<input
							type="text"
							class="input mono"
							bind:value={subject}
							placeholder="Re: a worthwhile idea"
							data-cursor="hover"
						/>
					</label>

					<label class="field">
						<span class="field-label mono"><span class="prompt">&gt;</span> message</span>
						<textarea
							class="input textarea mono"
							bind:value={message}
							rows="5"
							placeholder="Compose your transmission…"
							data-cursor="hover"
						></textarea>
					</label>

					{#if formError}
						<p class="form-error mono" role="alert">{formError}</p>
					{/if}

					<button
						type="submit"
						class="transmit mono"
						disabled={status === 'submitting'}
						data-cursor="hover"
					>
						{#if status === 'submitting'}
							<Loader size={16} strokeWidth={2} class="spin" /> TRANSMITTING…
						{:else}
							<Send size={16} strokeWidth={2} /> TRANSMIT
						{/if}
					</button>
				</form>
			</PremiumCard>
		</div>
	</div>
</main>

{#if toast}
	<div
		class="toast mono {toast.kind}"
		role="status"
		transition:fly={{ y: 24, duration: 320 }}
	>
		{toast.msg}
	</div>
{/if}

<style>
	.wrap {
		max-width: 1080px;
		margin: 0 auto;
		padding: 5rem 1.5rem 4rem;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1.05fr;
		gap: 3rem;
		align-items: start;
	}

	/* ---- Left column ---- */
	.intro {
		color: var(--text-muted);
		line-height: 1.7;
		max-width: 42ch;
		margin-bottom: 2rem;
	}
	.channels {
		display: grid;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}
	.channel {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.85rem 1rem;
		border: 1px solid var(--border-color);
		border-radius: 10px;
		background: rgba(var(--bg-card-rgb), 0.4);
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			transform 0.2s ease;
	}
	.channel:hover {
		border-color: rgba(var(--accent-gold-rgb), 0.5);
		background: rgba(var(--accent-gold-rgb), 0.06);
		transform: translateX(3px);
	}
	.channel-icon {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		flex-shrink: 0;
		border-radius: 8px;
		border: 1px solid var(--border-color);
		color: var(--accent-gold);
	}
	.channel-body {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.channel-label {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-muted);
	}
	.channel-val {
		color: var(--text-main);
		font-size: 0.92rem;
	}

	/* ---- Availability card ---- */
	:global(.premium-card.avail-card) {
		padding: 1.3rem 1.4rem;
	}
	.avail-head {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.9rem;
	}
	.avail-title {
		font-weight: 600;
		color: var(--text-main);
		font-size: 0.95rem;
	}
	.pulse-dot {
		position: relative;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: #3fbf6f;
		box-shadow: 0 0 8px #3fbf6f;
		flex-shrink: 0;
	}
	.pulse-dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: #3fbf6f;
		animation: avail-pulse 1.8s ease-out infinite;
	}
	@keyframes avail-pulse {
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		100% {
			transform: scale(3);
			opacity: 0;
		}
	}
	.avail-line {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: 0.45rem;
	}
	.avail-line :global(svg) {
		color: var(--accent-gold);
		flex-shrink: 0;
	}

	/* ---- Right column — terminal ---- */
	:global(.premium-card.terminal) {
		padding: 0;
		overflow: hidden;
	}
	.chrome {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-color);
		background: rgba(0, 0, 0, 0.35);
	}
	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--d);
	}
	.chrome-title {
		margin-left: auto;
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 0.04em;
	}
	.form {
		display: grid;
		gap: 1.1rem;
		padding: 1.5rem;
	}
	.field {
		display: grid;
		gap: 0.4rem;
	}
	.field-label {
		font-size: 0.72rem;
		color: var(--text-muted);
		letter-spacing: 0.05em;
	}
	.prompt {
		color: var(--accent-gold);
		margin-right: 0.25rem;
	}
	.input {
		width: 100%;
		background: rgba(0, 0, 0, 0.25);
		border: 1px solid var(--border-color);
		border-radius: 7px;
		padding: 0.65rem 0.8rem;
		color: var(--text-main);
		font-size: 0.88rem;
		caret-color: var(--accent-gold);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}
	.input::placeholder {
		color: rgba(136, 136, 136, 0.55);
	}
	.input:focus {
		outline: none;
		border-color: var(--accent-gold);
		background: rgba(var(--accent-gold-rgb), 0.04);
		box-shadow: 0 0 0 3px rgba(var(--accent-gold-rgb), 0.12);
	}
	.textarea {
		resize: vertical;
		min-height: 6.5rem;
		line-height: 1.55;
	}
	.form-error {
		color: #ff6b6b;
		font-size: 0.78rem;
		margin: -0.3rem 0 0;
	}
	.transmit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		padding: 0.75rem 1.2rem;
		border-radius: 8px;
		border: 1px solid var(--accent-gold);
		background: var(--accent-gold);
		color: #0a0a0a;
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			opacity 0.2s ease,
			transform 0.1s ease;
	}
	.transmit:hover:not(:disabled) {
		background: var(--accent-gold-dark);
	}
	.transmit:active:not(:disabled) {
		transform: translateY(1px);
	}
	.transmit:disabled {
		opacity: 0.6;
		cursor: progress;
	}
	.transmit :global(.spin) {
		animation: aurum-spin 0.9s linear infinite;
	}
	@keyframes aurum-spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ---- Toast ---- */
	.toast {
		position: fixed;
		bottom: 3.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 60;
		max-width: min(90vw, 30rem);
		padding: 0.75rem 1.1rem;
		border-radius: 8px;
		font-size: 0.8rem;
		letter-spacing: 0.03em;
		background: rgba(10, 10, 10, 0.94);
		backdrop-filter: blur(6px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	}
	.toast.success {
		border: 1px solid #27c93f;
		color: #7ee89a;
	}
	.toast.error {
		border: 1px solid #ff5f56;
		color: #ff9a93;
	}

	@media (max-width: 860px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}
</style>
