<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade, scale } from 'svelte/transition';
	import MatrixRain from './MatrixRain.svelte';
	import { terminalOpen, closeTerminal, toggleTerminal } from '$lib/aurum/stores/terminal';
	import { theme } from '$lib/aurum/stores/theme';
	import { xray } from '$lib/aurum/stores/xray';
	import { systemLog } from '$lib/aurum/stores/systemLog';

	const GITHUB = 'https://github.com/KiefBC';
	const LINKEDIN = 'https://www.linkedin.com/in/kieferh/';
	const bootTime = Date.now();

	// Clickable starter commands shown in the always-visible hint bar.
	const QUICK = ['help', 'whoami', 'ls --projects', 'goto arsenal', 'sudo view --xray'];

	interface Line {
		kind: 'in' | 'out' | 'err';
		text: string;
	}

	let history = $state<Line[]>([
		{ kind: 'out', text: 'aurum shell v1.0 — interactive résumé.' },
		{ kind: 'out', text: "type 'help', or tap a command below ↓" }
	]);
	let input = $state('');
	let inputEl = $state<HTMLInputElement>();
	let scrollEl = $state<HTMLDivElement>();

	function print(text: string, kind: Line['kind'] = 'out') {
		history = [...history, { kind, text }];
	}

	const HELP = [
		'help              show this list',
		'whoami            identity',
		'skills            tech stack',
		'ls --projects     list projects',
		'cat achievements  achievements',
		'goto <page>       home | arsenal | contact | trophies',
		'open --github | --linkedin',
		'theme --light | --dark',
		'sudo view --xray  wireframe mode',
		'status | uptime',
		'clear'
	];

	function run(raw: string) {
		const cmd = raw.trim();
		if (!cmd) return;
		print(`$ ${cmd}`, 'in');
		systemLog.log(`CMD :: ${cmd}`);
		const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
		const arg = rest.join(' ');

		switch (head) {
			case 'help':
				HELP.forEach((l) => print(l));
				break;
			case 'whoami':
				print('Kiefer — Backend & DevOps Developer (Go · Rust · CI/CD).');
				break;
			case 'skills':
				print('Rust · Go · C++ · TypeScript · Python · Swift');
				print('Docker · Dagger · PostgreSQL · Linux · Git · Svelte');
				break;
			case 'ls':
				if (arg.includes('project')) {
					[
						'WWE Universe Manager',
						'HTTP/1.1 Server (Rust)',
						'Seiten — Plex anime manager',
						'Swallow AI — pest ID',
						'Amministratore Delegato (s&box)',
						'The Bevy Book',
						'Pokédex CLI (Go)',
						'Asteroids (Rust/Bevy)',
						'Rust Shell',
						'Acuendo SSG',
						'Maze Solver'
					].forEach((p) => print(`  • ${p}`));
				} else print(`ls: unknown target '${arg}'`, 'err');
				break;
			case 'cat':
				if (arg.includes('achievement')) {
					print('• Led a team of 4 — shipped MVP 3 weeks early (Swallow AI)');
					print('• Improved ML accuracy 72% → 87%, cut inference time 40%');
					print('• Built a from-scratch RFC-compliant HTTP/1.1 server in Rust');
				} else print(`cat: ${arg}: no such file`, 'err');
				break;
			case 'goto': {
				const map: Record<string, string> = {
					home: '/',
					arsenal: '/arsenal',
					projects: '/arsenal',
					contact: '/contact',
					trophies: '/trophies'
				};
				const dest = map[arg];
				if (dest) {
					print(`navigating → ${arg}`);
					goto(dest);
					closeTerminal();
				} else print(`goto: unknown page '${arg}'`, 'err');
				break;
			}
			case 'open':
				if (arg.includes('github')) {
					print('opening github…');
					window.open(GITHUB, '_blank');
				} else if (arg.includes('linkedin')) {
					print('opening linkedin…');
					window.open(LINKEDIN, '_blank');
				} else print(`open: unknown target '${arg}'`, 'err');
				break;
			case 'theme':
				if (arg.includes('light')) {
					theme.set('light');
					print('theme → light');
				} else if (arg.includes('dark')) {
					theme.set('dark');
					print('theme → dark');
				} else print('usage: theme --light | --dark', 'err');
				break;
			case 'sudo':
				if (arg.includes('xray')) {
					xray.toggle();
					print('xray vision toggled.');
				} else print('sudo: permission theatrics denied.', 'err');
				break;
			case 'status':
				print('● all systems nominal — gold standard.');
				break;
			case 'uptime': {
				const s = Math.floor((Date.now() - bootTime) / 1000);
				print(`session uptime: ${s}s`);
				break;
			}
			case 'clear':
				history = [];
				return;
			default:
				print(`command not found: ${head}`, 'err');
		}
	}

	async function submit(e: Event) {
		e.preventDefault();
		run(input);
		input = '';
		await tick();
		if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
	}

	// Run a command from a clickable hint chip, then refocus the input.
	async function runChip(cmd: string) {
		run(cmd);
		await tick();
		if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
		inputEl?.focus();
	}

	// Global hotkeys: Ctrl/Cmd+K or backtick to toggle; Escape to close.
	function onKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			toggleTerminal();
		} else if (e.key === '`' && !$terminalOpen) {
			const tag = (e.target as HTMLElement)?.tagName;
			if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
				e.preventDefault();
				toggleTerminal();
			}
		} else if (e.key === 'Escape' && $terminalOpen) {
			closeTerminal();
		}
	}

	// Focus the input whenever the terminal opens.
	$effect(() => {
		if ($terminalOpen) tick().then(() => inputEl?.focus());
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if $terminalOpen}
	<div
		class="overlay"
		transition:fade={{ duration: 150 }}
		onclick={closeTerminal}
		onkeydown={(e) => e.key === 'Escape' && closeTerminal()}
		role="presentation"
	>
		<div
			class="window mono"
			transition:scale={{ duration: 180, start: 0.96 }}
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-label="Command terminal"
		>
			<MatrixRain />
			<div class="chrome">
				<span class="dot red"></span>
				<span class="dot amber"></span>
				<span class="dot green"></span>
				<span class="title">aurum — zsh</span>
			</div>
			<div class="output" bind:this={scrollEl}>
				{#each history as line, i (i)}
					<div class="line {line.kind}">{line.text}</div>
				{/each}
			</div>
			<div class="hints">
				<span class="hints-label">try</span>
				{#each QUICK as q (q)}
					<button class="hint-chip" type="button" onclick={() => runChip(q)} data-cursor="hover">
						{q}
					</button>
				{/each}
				<span class="esc-hint">esc to close</span>
			</div>
			<form class="prompt" onsubmit={submit}>
				<span class="caret">❯</span>
				<input
					bind:this={inputEl}
					bind:value={input}
					spellcheck="false"
					autocomplete="off"
					placeholder="type a command, or click one above…"
				/>
			</form>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: grid;
		place-items: center;
		padding: 1.5rem;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}
	.window {
		position: relative;
		width: min(680px, 100%);
		height: min(460px, 80vh);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 12px;
		background: rgba(8, 8, 8, 0.92);
		border: 1px solid rgba(var(--accent-gold-rgb), 0.35);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
	}
	.chrome {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.8rem;
		border-bottom: 1px solid var(--border-color);
		background: rgba(0, 0, 0, 0.5);
	}
	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
	}
	.dot.red {
		background: #ff5f56;
	}
	.dot.amber {
		background: #ffbd2e;
	}
	.dot.green {
		background: #27c93f;
	}
	.title {
		margin-left: auto;
		font-size: 0.7rem;
		color: var(--text-muted);
	}
	.output {
		position: relative;
		z-index: 2;
		flex: 1;
		overflow-y: auto;
		padding: 0.9rem 1rem;
		font-size: 0.82rem;
		line-height: 1.5;
		color: #cfcfcf;
	}
	.line.in {
		color: var(--accent-gold);
	}
	.line.err {
		color: #ff6b6b;
	}
	.hints {
		position: relative;
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 1rem;
		border-top: 1px solid var(--border-color);
		background: rgba(0, 0, 0, 0.3);
	}
	.hints-label {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		margin-right: 0.15rem;
	}
	.hint-chip {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-muted);
		background: rgba(var(--accent-gold-rgb), 0.04);
		border: 1px solid var(--border-color);
		border-radius: 5px;
		padding: 0.2rem 0.5rem;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			background-color 0.2s ease;
	}
	.hint-chip:hover {
		color: var(--accent-gold);
		border-color: rgba(var(--accent-gold-rgb), 0.5);
		background: rgba(var(--accent-gold-rgb), 0.1);
	}
	.esc-hint {
		margin-left: auto;
		font-size: 0.65rem;
		color: var(--text-muted);
		opacity: 0.7;
	}
	.prompt {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1rem;
		border-top: 1px solid var(--border-color);
		background: rgba(0, 0, 0, 0.4);
	}
	.caret {
		color: var(--accent-gold);
	}
	.prompt input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text-main);
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}
</style>
