<script lang="ts">
	import { page } from '$app/state';
	import { House, FolderGit2, Mail, Trophy, TerminalSquare, Sun, Moon } from '@lucide/svelte';
	import { theme } from '$lib/aurum/stores/theme';
	import { openTerminal } from '$lib/aurum/stores/terminal';

	const links = [
		{ href: '/', label: 'Home', icon: House },
		{ href: '/arsenal', label: 'Arsenal', icon: FolderGit2 },
		{ href: '/contact', label: 'Contact', icon: Mail },
		{ href: '/trophies', label: 'Trophies', icon: Trophy }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<nav class="dock" aria-label="Primary">
	{#each links as link (link.href)}
		<a
			href={link.href}
			class="dock-btn"
			class:active={isActive(link.href)}
			aria-label={link.label}
			data-cursor="hover"
		>
			<link.icon size={20} strokeWidth={1.6} />
			<span class="tip mono">{link.label}</span>
		</a>
	{/each}

	<span class="divider" aria-hidden="true"></span>

	<button class="dock-btn" onclick={openTerminal} aria-label="Open command terminal" data-cursor="hover">
		<TerminalSquare size={20} strokeWidth={1.6} />
		<span class="tip mono">⌘K</span>
	</button>
	<button class="dock-btn" onclick={() => theme.toggle()} aria-label="Toggle theme" data-cursor="hover">
		{#if $theme === 'dark'}
			<Sun size={20} strokeWidth={1.6} />
		{:else}
			<Moon size={20} strokeWidth={1.6} />
		{/if}
		<span class="tip mono">Theme</span>
	</button>
</nav>

<style>
	.dock {
		position: fixed;
		z-index: 50;
		display: flex;
		gap: 0.35rem;
		padding: 0.5rem;
		background: rgba(var(--bg-card-rgb), 0.7);
		backdrop-filter: blur(12px);
		border: 1px solid var(--border-color);
		border-radius: 14px;
		/* Desktop: vertical, left-centered */
		flex-direction: column;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
	}
	.dock-btn {
		position: relative;
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border-radius: 10px;
		color: var(--text-muted);
		background: transparent;
		border: none;
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
	}
	.dock-btn:hover {
		color: var(--accent-gold);
		background: rgba(var(--accent-gold-rgb), 0.08);
	}
	.dock-btn.active {
		color: var(--accent-gold);
		background: rgba(var(--accent-gold-rgb), 0.14);
		box-shadow: inset 0 0 0 1px rgba(var(--accent-gold-rgb), 0.35);
	}
	.divider {
		height: 1px;
		background: var(--border-color);
		margin: 0.15rem 0.35rem;
	}
	.tip {
		position: absolute;
		left: calc(100% + 10px);
		top: 50%;
		transform: translateY(-50%) scale(0.9);
		opacity: 0;
		pointer-events: none;
		white-space: nowrap;
		font-size: 0.7rem;
		padding: 2px 7px;
		border-radius: 5px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		color: var(--text-main);
		transition:
			opacity 0.18s ease,
			transform 0.18s ease;
	}
	.dock-btn:hover .tip {
		opacity: 1;
		transform: translateY(-50%) scale(1);
	}

	/* Mobile: horizontal bottom dock */
	@media (max-width: 768px) {
		.dock {
			flex-direction: row;
			top: auto;
			bottom: 2.4rem;
			left: 50%;
			transform: translateX(-50%);
		}
		.divider {
			width: 1px;
			height: auto;
			margin: 0.35rem 0.15rem;
		}
		.tip {
			left: 50%;
			top: auto;
			bottom: calc(100% + 8px);
			transform: translateX(-50%) scale(0.9);
		}
		.dock-btn:hover .tip {
			transform: translateX(-50%) scale(1);
		}
	}
</style>
