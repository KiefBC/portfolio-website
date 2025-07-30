<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	onMount(() => {
		theme.init();
	});

	function handleToggle() {
		theme.toggle();
	}

	$: buttonClass = $theme === 'matrix' 
		? 'bg-black border border-green-500 hover:bg-green-900/20 shadow-[0_0_10px_rgba(0,255,0,0.3)]'
		: 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600';
</script>

<button
	on:click={handleToggle}
	class="relative p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 {buttonClass}"
	aria-label="Toggle theme ({$theme === 'dark' ? 'Switch to Matrix mode' : 'Switch to Dark mode'})"
>
	<div class="relative w-6 h-6">
		<!-- Moon Icon (Dark Mode) -->
		<svg 
			class="absolute inset-0 w-6 h-6 text-slate-300 transition-all duration-300 {$theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}"
			fill="currentColor" 
			viewBox="0 0 24 24"
		>
			<path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
		</svg>
		
		<!-- Matrix Icon (Matrix Mode) -->
		<div 
			class="absolute inset-0 w-6 h-6 flex items-center justify-center transition-all duration-300 {$theme === 'matrix' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}"
		>
			<div class="text-green-500 font-mono text-sm leading-none matrix-icon">
				<div class="flex flex-col items-center">
					<div class="text-[8px] leading-[6px] opacity-80">01</div>
					<div class="text-[8px] leading-[6px] opacity-60">10</div>
					<div class="text-[8px] leading-[6px] opacity-80">11</div>
				</div>
			</div>
		</div>
	</div>
</button>

<style>
	.matrix-icon {
		filter: drop-shadow(0 0 2px rgba(0, 255, 0, 0.8));
		animation: matrix-pulse 2s infinite;
	}
	
	@keyframes matrix-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}
</style>