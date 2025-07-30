<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	interface Command {
		id: string;
		label: string;
		description: string;
		action: () => void;
		shortcut?: string;
		icon?: string;
	}

	let isOpen = false;
	let searchQuery = '';
	let selectedIndex = 0;
	let searchInput: HTMLInputElement;
	
	const dispatch = createEventDispatcher();

	const commands: Command[] = [
		{
			id: 'home',
			label: 'Go to Home',
			description: 'Navigate to the hero section',
			action: () => scrollTo('home'),
			icon: '🏠'
		},
		{
			id: 'about',
			label: 'Go to About',
			description: 'Learn more about me',
			action: () => scrollTo('about'),
			icon: '👨‍💻'
		},
		{
			id: 'projects',
			label: 'View Projects',
			description: 'Explore my portfolio projects',
			action: () => scrollTo('projects'),
			icon: '🚀'
		},
		{
			id: 'blog',
			label: 'Read Blog',
			description: 'Technical articles and insights',
			action: () => scrollTo('blog'),
			icon: '📝'
		},
		{
			id: 'resume',
			label: 'View Resume',
			description: 'Check out my experience',
			action: () => scrollTo('resume'),
			icon: '📄'
		},
		{
			id: 'contact',
			label: 'Contact Me',
			description: 'Get in touch',
			action: () => scrollTo('contact'),
			icon: '📧'
		},
		{
			id: 'github',
			label: 'Visit GitHub',
			description: 'Check out my repositories',
			action: () => window.open('https://github.com/KiefBC', '_blank'),
			icon: '🐙'
		},
		{
			id: 'linkedin',
			label: 'Visit LinkedIn',
			description: 'Connect with me professionally',
			action: () => window.open('https://www.linkedin.com/in/kieferh/', '_blank'),
			icon: '💼'
		}
	];

	$: filteredCommands = commands.filter(command =>
		command.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
		command.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function scrollTo(elementId: string) {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		closeModal();
	}

	function openModal() {
		isOpen = true;
		selectedIndex = 0;
		searchQuery = '';
		// Focus the input after the modal opens
		setTimeout(() => {
			if (searchInput) {
				searchInput.focus();
			}
		}, 100);
	}

	function closeModal() {
		isOpen = false;
		searchQuery = '';
		selectedIndex = 0;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				closeModal();
				break;
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (filteredCommands[selectedIndex]) {
					filteredCommands[selectedIndex].action();
				}
				break;
		}
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		// Open command palette with Cmd+K or Ctrl+K
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			openModal();
		}
	}

	onMount(() => {
		// Add global keyboard listener
		document.addEventListener('keydown', handleGlobalKeydown);
		
		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});

	// Update selected index when filtered commands change
	$: if (filteredCommands.length > 0 && selectedIndex >= filteredCommands.length) {
		selectedIndex = filteredCommands.length - 1;
	}
</script>

<!-- Command Palette Trigger (visible hint) -->
<div class="fixed bottom-6 right-6 z-40">
	<button
		on:click={openModal}
		class="bg-slate-800 dark:bg-slate-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-600"
		aria-label="Open command palette (⌘K)"
		title="Open command palette (⌘K)"
	>
		<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l8-8M8 8l8 8"/>
		</svg>
	</button>
</div>

<!-- Command Palette Modal -->
{#if isOpen}
	<div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="command-palette-title">
		<!-- Backdrop -->
		<button 
			class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 cursor-default"
			on:click={closeModal}
			aria-label="Close command palette"
		></button>
		
		<!-- Modal Content -->
		<div class="flex min-h-full items-start justify-center p-4 pt-[10vh]">
			<div 
				class="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-600 overflow-hidden transform transition-all duration-300 scale-100"
				on:keydown={handleKeydown}
				role="combobox"
				aria-expanded="true"
				aria-haspopup="listbox"
				aria-controls="command-list"
				tabindex="0"
			>
				<!-- Search Input -->
				<div class="border-b border-slate-200 dark:border-slate-600 px-4 py-4">
					<div class="flex items-center space-x-3">
						<svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
						</svg>
						<input
							bind:this={searchInput}
							bind:value={searchQuery}
							placeholder="Search commands..."
							class="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none text-lg"
							id="command-palette-title"
							aria-label="Search commands"
							role="searchbox"
							aria-autocomplete="list"
							aria-controls="command-list"
						/>
						<div class="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded" aria-hidden="true">
							ESC
						</div>
					</div>
				</div>

				<!-- Commands List -->
				<div class="max-h-80 overflow-y-auto" role="listbox" id="command-list" aria-label="Available commands">
					{#if filteredCommands.length === 0}
						<div class="px-4 py-8 text-center text-slate-500" role="status">
							No commands found for "{searchQuery}"
						</div>
					{:else}
						{#each filteredCommands as command, index}
							<button
								class="w-full px-4 py-3 flex items-center space-x-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left {
									index === selectedIndex ? 'bg-purple-50 dark:bg-purple-900/20 border-r-2 border-purple-500' : ''
								}"
								on:click={command.action}
								role="option"
								aria-selected={index === selectedIndex}
								aria-label="{command.label} - {command.description}"
							>
								<div class="text-xl">{command.icon}</div>
								<div class="flex-1 min-w-0">
									<div class="text-slate-900 dark:text-white font-medium truncate">
										{command.label}
									</div>
									<div class="text-slate-500 dark:text-slate-400 text-sm truncate">
										{command.description}
									</div>
								</div>
								{#if command.shortcut}
									<div class="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
										{command.shortcut}
									</div>
								{/if}
							</button>
						{/each}
					{/if}
				</div>

				<!-- Footer -->
				<div class="border-t border-slate-200 dark:border-slate-600 px-4 py-3 bg-slate-50 dark:bg-slate-700/50">
					<div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
						<div class="flex items-center space-x-4">
							<div class="flex items-center space-x-1">
								<kbd class="bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded text-xs">↑↓</kbd>
								<span>Navigate</span>
							</div>
							<div class="flex items-center space-x-1">
								<kbd class="bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded text-xs">↵</kbd>
								<span>Select</span>
							</div>
						</div>
						<div class="flex items-center space-x-1">
							<kbd class="bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded text-xs">⌘K</kbd>
							<span>to open</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	kbd {
		font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
	}
</style>