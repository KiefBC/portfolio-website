<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { initializePWA } from '$lib/utils/pwa';
	import { theme } from '$lib/aurum/stores/theme';
	import { systemLog } from '$lib/aurum/stores/systemLog';
	import CustomCursor from '$lib/aurum/components/CustomCursor.svelte';
	import FloatingNav from '$lib/aurum/components/FloatingNav.svelte';
	import CommandTerminal from '$lib/aurum/components/CommandTerminal.svelte';
	import SystemLogFooter from '$lib/aurum/components/SystemLogFooter.svelte';

	injectAnalytics();

	let { children } = $props();
	const baseTitle = 'Kiefer — Software Developer';

	onMount(() => {
		document.documentElement.classList.add('js-loaded');
		theme.init();
		initializePWA();

		// Tab telemetry: react to the user leaving/returning to the tab.
		function onVisibility() {
			if (document.hidden) {
				document.title = '[SYS.SLEEP] Connection Lost…';
				systemLog.log('TAB :: focus lost — entering sleep');
			} else {
				document.title = baseTitle;
				systemLog.log('TAB :: focus restored');
			}
		}
		document.addEventListener('visibilitychange', onVisibility);
		return () => document.removeEventListener('visibilitychange', onVisibility);
	});

	// Log route changes.
	$effect(() => {
		systemLog.log(`NAV :: ${page.url.pathname}`);
	});
</script>

<div class="aurum-root aurum-grid-bg">
	<CustomCursor />
	<FloatingNav />
	<CommandTerminal />

	{#key page.url.pathname}
		<div class="page-shell" in:fly={{ y: 18, duration: 320, delay: 80 }} out:fade={{ duration: 120 }}>
			{@render children()}
		</div>
	{/key}

	<SystemLogFooter />
</div>

<style>
	.aurum-root {
		min-height: 100vh;
		width: 100%;
		overflow-x: hidden;
	}
	.page-shell {
		padding-bottom: 3rem;
	}
</style>
