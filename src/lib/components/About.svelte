<script lang="ts">
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';
	
	interface Skill {
		name: string;
		icon: string;
		level: number;
		description: string;
	}
	
	const skills: Skill[] = [
		{ name: 'Rust', icon: '🦀', level: 90, description: 'Built desktop apps with Tauri 2.0 & Leptos (WWE Universe Manager), async web scrapers with tokio/reqwest, games like Asteroids, and shell implementations. Expert in systems programming and WebAssembly.' },
		{ name: 'Git', icon: '📚', level: 90, description: 'Version control across 20+ repositories including complex projects like WWE Universe Manager. Experience with branching, collaboration, and maintaining dotfiles configurations.' },
		{ name: 'TypeScript', icon: '📘', level: 88, description: 'Full-stack development with modern frameworks. Built this portfolio with SvelteKit and TypeScript, focusing on type-safe web applications and component architecture.' },
		{ name: 'Go', icon: '🐹', level: 85, description: 'Backend services, concurrent programming, and microservices architecture. Developed efficient server applications and REST APIs with focus on performance.' },
		{ name: 'Linux', icon: '🐧', level: 85, description: 'System administration and dotfiles management. Comfortable with shell scripting, system configuration, and command-line workflows for development environments.' },
		{ name: 'Python', icon: '🐍', level: 80, description: 'Created Asteroids game with PyGame, built Acuendo SSG with Jinja2 templating, weather apps, todo generators, maze solvers, and financial calculators. Expert in automation and game development.' },
		{ name: 'Docker', icon: '🐳', level: 75, description: 'Containerization for development environments and deployment workflows. Experience with multi-stage builds and container orchestration for Rust and Python applications.' },
		{ name: 'Swift', icon: '🍎', level: 70, description: 'Built iOS, MacOS and WatchOS Apps' }
	];
	
	const interests = [
		'Systems Programming',
		'Game Development',
		'Web Scraping & Automation',
		'Personal Development Tools',
		'Algorithm Implementation',
		'Cross-Platform Development'
	];
	
	let selectedSkill: Skill | null = null;
	
	function selectSkill(skill: Skill) {
		selectedSkill = selectedSkill?.name === skill.name ? null : skill;
	}
	
	function handleKeydown(event: KeyboardEvent, skill: Skill) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectSkill(skill);
		}
	}
</script>

<section id="about" class="py-16 lg:py-20 bg-slate-100 dark:bg-slate-800 transition-colors duration-300 about-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 about-title">About Me</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto about-divider"></div>
		</div>
		
		<!-- Introduction Card -->
		<div class="mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-200"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<div class="bg-white dark:bg-slate-700 rounded-xl p-6 lg:p-8 shadow-lg text-center max-w-4xl mx-auto about-card">
				<h3 class="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 about-card-title">Who I Am</h3>
				<p class="text-slate-300 text-base lg:text-lg leading-relaxed mb-4 lg:mb-6 about-text">
					I'm a passionate developer from British Columbia, Canada 🌲, with a deep interest in systems programming 
					and algorithm implementation. My programming journey spans multiple languages including Python, Rust, Swift and 
					Go, with a particular love for building efficient, performance-focused applications.
				</p>
				<p class="text-slate-300 text-base lg:text-lg leading-relaxed about-text">
					I work with modern frameworks like Svelte, Leptos, and Tauri, and my projects range from classic game 
					implementations to web scrapers and personal productivity tools. I believe in writing code guided by 
					efficiency and constantly exploring new domains to expand my programming horizons. My editor of choice? 
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Neovim, naturally.</span>
				</p>
			</div>
		</div>
		
		<!-- Skills Section -->
		<div class="mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-400"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h3 class="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 text-center about-section-title">Technical Skills</h3>
			<p class="text-slate-400 text-sm lg:text-base text-center mb-6 lg:mb-8 about-hint">Tap any skill to learn more about my experience</p>
			
			<!-- Skills Grid -->
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
				{#each skills as skill}
					<button
						on:click={() => selectSkill(skill)}
						on:keydown={(e) => handleKeydown(e, skill)}
						aria-label="View details for {skill.name} skill"
						aria-expanded={selectedSkill?.name === skill.name}
						class="bg-white dark:bg-slate-700 rounded-lg p-4 lg:p-5 text-left transition-all duration-300 
						       hover:bg-slate-50 dark:hover:bg-slate-600 hover:scale-105 cursor-pointer
						       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800
						       skill-card {selectedSkill?.name === skill.name ? 'selected ring-2 ring-purple-500 bg-slate-50 dark:bg-slate-600' : ''}"
					>
						<div class="flex items-center justify-center mb-2 lg:mb-3">
							<span class="text-2xl lg:text-3xl">{skill.icon}</span>
						</div>
						<h4 class="text-white font-medium text-sm lg:text-base text-center skill-name">{skill.name}</h4>
					</button>
				{/each}
			</div>
			
			<!-- Skill Description -->
			{#if selectedSkill}
				<div 
					class="bg-white dark:bg-slate-700 rounded-lg p-4 lg:p-6 border-2 border-purple-500/30 shadow-lg
					       animate-slide-in max-w-4xl mx-auto skill-details"
					role="region"
					aria-label="Skill details for {selectedSkill.name}"
				>
					<div class="flex items-center justify-between mb-3 lg:mb-4">
						<div class="flex items-center gap-2 lg:gap-3">
							<span class="text-2xl lg:text-3xl">{selectedSkill.icon}</span>
							<h4 class="text-white font-semibold text-lg lg:text-xl skill-details-title">{selectedSkill.name}</h4>
						</div>
						<button 
							on:click={() => selectedSkill = null}
							aria-label="Close skill details"
							class="text-slate-400 hover:text-white text-xl p-2 rounded-md
							       hover:bg-slate-700 transition-all duration-200
							       focus:outline-none focus:ring-2 focus:ring-purple-400 skill-close"
						>
							✕
						</button>
					</div>
					<p class="text-slate-300 text-sm lg:text-base leading-relaxed skill-details-text">{selectedSkill.description}</p>
				</div>
			{/if}
		</div>
		
		<!-- Interests Section -->
		<div class="opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-600"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h3 class="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8 text-center about-section-title">What I'm Passionate About</h3>
			<div class="flex flex-wrap gap-3 lg:gap-4 justify-center max-w-4xl mx-auto">
				{#each interests as interest}
					<span class="px-4 lg:px-6 py-2 lg:py-3 bg-slate-50 dark:bg-slate-600 text-purple-600 dark:text-purple-300 rounded-full text-sm lg:text-base 
					             hover:bg-slate-100 dark:hover:bg-slate-500 hover:text-purple-700 dark:hover:text-purple-200 transition-all duration-300 interest-tag">
						{interest}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.animate-out {
		opacity: 0;
		transform: translateY(20px);
	}
	
	.delay-200 {
		animation-delay: 0.2s;
	}
	
	.delay-400 {
		animation-delay: 0.4s;
	}
	
	.delay-600 {
		animation-delay: 0.6s;
	}
	
	.animate-slide-in {
		animation: slide-in 0.3s ease-out;
	}
	
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(-10px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>