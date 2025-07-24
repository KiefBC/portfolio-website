<script lang="ts">
	let isMenuOpen = false;
	
	const menuItems = [
		{ name: 'Home', href: '#home' },
		{ name: 'About', href: '#about' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Resume', href: '#resume' },
		{ name: 'Contact', href: '#contact' }
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center py-4">
			<div class="text-xl font-bold text-white">Portfolio</div>
			
			<!-- Desktop Menu -->
			<div class="hidden md:flex space-x-8">
				{#each menuItems as item}
					<a 
						href={item.href} 
						class="text-slate-300 hover:text-white transition-colors duration-200"
					>
						{item.name}
					</a>
				{/each}
			</div>
			
			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden text-slate-300 hover:text-white"
				on:click={() => isMenuOpen = !isMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button>
		</div>
		
		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="md:hidden pb-4">
				{#each menuItems as item}
					<a 
						href={item.href} 
						class="block py-2 text-slate-300 hover:text-white transition-colors duration-200"
						on:click={() => isMenuOpen = false}
					>
						{item.name}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>