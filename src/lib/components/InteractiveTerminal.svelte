<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';

	interface TerminalLine {
		type: 'command' | 'output' | 'comment';
		content: string;
		delay?: number;
	}

	let currentLineIndex = 0;
	let currentCharIndex = 0;
	let displayedLines: { type: string; content: string; complete: boolean }[] = [];
	let isTyping = false;
	let terminalContainer: HTMLElement;

	const terminalSequence: TerminalLine[] = [
		{ type: 'comment', content: '# Welcome to my development environment', delay: 500 },
		{ type: 'command', content: '$ whoami', delay: 1000 },
		{ type: 'output', content: 'kiefer - software developer', delay: 800 },
		{ type: 'command', content: '$ ls favorite_languages/', delay: 1200 },
		{ type: 'output', content: 'rust/  go/  typescript/  python/', delay: 600 },
		{ type: 'command', content: '$ cat current_focus.txt', delay: 1000 },
		{ type: 'output', content: 'Systems programming with Rust 🦀', delay: 800 },
		{ type: 'output', content: 'Building fast, reliable software', delay: 600 },
		{ type: 'command', content: '$ cargo run --bin passion', delay: 1200 },
		{ type: 'output', content: 'Compiling creative solutions...', delay: 500 },
		{ type: 'output', content: '✓ Finished building awesome projects!', delay: 800 },
		{ type: 'comment', content: '# Ready to collaborate? Let\'s connect!', delay: 1000 }
	];

	async function typeWriter() {
		if (currentLineIndex >= terminalSequence.length) return;

		const currentLine = terminalSequence[currentLineIndex];
		
		if (currentCharIndex === 0) {
			// Add new line to display
			displayedLines = [...displayedLines, { 
				type: currentLine.type, 
				content: '', 
				complete: false 
			}];
			isTyping = true;
		}

		if (currentCharIndex < currentLine.content.length) {
			// Type next character
			displayedLines[displayedLines.length - 1].content = currentLine.content.slice(0, currentCharIndex + 1);
			displayedLines = [...displayedLines]; // Trigger reactivity
			currentCharIndex++;
			
			// Scroll to bottom
			if (terminalContainer) {
				terminalContainer.scrollTop = terminalContainer.scrollHeight;
			}
			
			setTimeout(typeWriter, 50 + Math.random() * 100); // Variable typing speed
		} else {
			// Line complete
			displayedLines[displayedLines.length - 1].complete = true;
			displayedLines = [...displayedLines]; // Trigger reactivity
			currentCharIndex = 0;
			currentLineIndex++;
			isTyping = false;
			
			// Wait before next line
			const delay = currentLine.delay || 800;
			setTimeout(typeWriter, delay);
		}
	}

	function restartAnimation() {
		currentLineIndex = 0;
		currentCharIndex = 0;
		displayedLines = [];
		isTyping = false;
		typeWriter();
	}

	let hasStarted = false;
	let terminalElement: HTMLElement;

	function handleIntersection() {
		if (!hasStarted) {
			hasStarted = true;
			setTimeout(typeWriter, 1000); // Start after a brief delay
		}
	}

	onMount(() => {
		// Set up intersection observer for terminal animation
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasStarted) {
						handleIntersection();
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (terminalElement) {
			observer.observe(terminalElement);
		}

		return () => observer.disconnect();
	});
</script>

<section class="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 terminal-bg">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4 terminal-title">Interactive Terminal</h2>
			<div class="w-24 h-1 bg-green-500 mx-auto mb-4 projects-divider"></div>
			<p class="text-slate-300 text-lg max-w-2xl mx-auto projects-description">
				Step into my development workflow and see the tools I use daily
			</p>
		</div>

		<div class="opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.3, once: true }}
			 bind:this={terminalElement}>
			
			<!-- Terminal Window -->
			<div class="bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-600 terminal-window">
				<!-- Terminal Header -->
				<div class="bg-slate-700 px-4 py-3 flex items-center space-x-2 terminal-header">
					<div class="flex space-x-2">
						<div class="w-3 h-3 bg-red-500 rounded-full"></div>
						<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
						<div class="w-3 h-3 bg-green-500 rounded-full"></div>
					</div>
					<div class="flex-1 text-center">
						<span class="text-slate-300 text-sm font-mono terminal-text">kiefer@dev-machine:~</span>
					</div>
					<button 
						on:click={restartAnimation}
						class="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
						title="Restart animation"
					>
						↻
					</button>
				</div>

				<!-- Terminal Content -->
				<div 
					bind:this={terminalContainer}
					class="bg-slate-900 p-6 font-mono text-sm h-80 overflow-y-auto terminal-text"
				>
					{#each displayedLines as line, index}
						<div class="mb-2 leading-relaxed">
							{#if line.type === 'command'}
								<span class="text-green-400 terminal-prompt">$ </span><span class="text-white terminal-text">{line.content}</span>
								{#if !line.complete && index === displayedLines.length - 1}
									<span class="text-green-400 animate-pulse terminal-prompt">|</span>
								{/if}
							{:else if line.type === 'output'}
								<span class="text-blue-300 ml-2 terminal-text">{line.content}</span>
								{#if !line.complete && index === displayedLines.length - 1}
									<span class="text-blue-300 animate-pulse terminal-prompt">|</span>
								{/if}
							{:else if line.type === 'comment'}
								<span class="text-slate-500 terminal-text">{line.content}</span>
								{#if !line.complete && index === displayedLines.length - 1}
									<span class="text-slate-500 animate-pulse terminal-prompt">|</span>
								{/if}
							{/if}
						</div>
					{/each}
					
					{#if displayedLines.length > 0 && !isTyping && currentLineIndex >= terminalSequence.length}
						<div class="mt-4 text-green-400">
							<span class="terminal-prompt">$ </span><span class="animate-pulse terminal-prompt">|</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Controls -->
			<div class="text-center mt-6">
				<button 
					on:click={restartAnimation}
					class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
				>
					Restart Animation
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	/* Custom scrollbar for terminal */
	.bg-slate-900::-webkit-scrollbar {
		width: 8px;
	}
	
	.bg-slate-900::-webkit-scrollbar-track {
		background: #1e293b;
	}
	
	.bg-slate-900::-webkit-scrollbar-thumb {
		background: #475569;
		border-radius: 4px;
	}
	
	.bg-slate-900::-webkit-scrollbar-thumb:hover {
		background: #64748b;
	}
</style>