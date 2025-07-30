<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	
	let isMenuOpen = false;
	
	const menuItems = [
		{ name: 'Home', href: '#home' },
		{ name: 'About', href: '#about' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Resume', href: '#resume' },
		{ name: 'Contact', href: '#contact' }
	];
	
	function smoothScrollTo(targetId: string) {
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
	
	function handleNavClick(event: Event, href: string) {
		event.preventDefault();
		const targetId = href.substring(1); // Remove the '#'
		smoothScrollTo(targetId);
		isMenuOpen = false; // Close mobile menu if open
	}
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center py-4">
			<div class="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300"></div>
			
			<!-- Desktop Menu -->
			<div class="hidden md:flex items-center space-x-8">
				{#each menuItems as item}
					<a 
						href={item.href} 
						class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
						on:click={(e) => handleNavClick(e, item.href)}
					>
						{item.name}
					</a>
				{/each}
				<ThemeToggle />
			</div>
			
			<!-- Mobile Menu Controls -->
			<div class="md:hidden flex items-center space-x-4">
				<ThemeToggle />
				<button 
					class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
					on:click={() => isMenuOpen = !isMenuOpen}
					aria-label="Toggle menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
			</div>
		</div>
		
		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="md:hidden pb-4">
				{#each menuItems as item}
					<a 
						href={item.href} 
						class="block py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
						on:click={(e) => handleNavClick(e, item.href)}
					>
						{item.name}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>
