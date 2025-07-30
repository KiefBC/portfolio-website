<script lang="ts">
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';
	
	const skills = [
		{ name: 'Rust', icon: '🦀', level: 90, description: 'Built desktop apps with Tauri 2.0 & Leptos (WWE Universe Manager), async web scrapers with tokio/reqwest, games like Asteroids, and shell implementations. Expert in systems programming and WebAssembly.' },
		{ name: 'Git', icon: '📚', level: 90, description: 'Version control across 20+ repositories including complex projects like WWE Universe Manager. Experience with branching, collaboration, and maintaining dotfiles configurations.' },
		{ name: 'TypeScript', icon: '📘', level: 88, description: 'Full-stack development with modern frameworks. Built this portfolio with SvelteKit and TypeScript, focusing on type-safe web applications and component architecture.' },
		{ name: 'Go', icon: '🐹', level: 85, description: 'Backend services, concurrent programming, and microservices architecture. Developed efficient server applications and REST APIs with focus on performance.' },
		{ name: 'Linux', icon: '🐧', level: 85, description: 'System administration and dotfiles management. Comfortable with shell scripting, system configuration, and command-line workflows for development environments.' },
		{ name: 'Python', icon: '🐍', level: 80, description: 'Created Asteroids game with PyGame, built Acuendo SSG with Jinja2 templating, weather apps, todo generators, maze solvers, and financial calculators. Expert in automation and game development.' },
		{ name: 'Docker', icon: '🐳', level: 75, description: 'Containerization for development environments and deployment workflows. Experience with multi-stage builds and container orchestration for Rust and Python applications.' }
	];
	
	const interests = [
		'Systems Programming',
		'Game Development',
		'Web Scraping & Automation',
		'Personal Development Tools',
		'Algorithm Implementation',
		'Cross-Platform Development'
	];
</script>

<section id="about" class="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">About Me</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto"></div>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div class="opacity-0 translate-x-[-50px] transition-all duration-700 ease-out delay-200 animate-out"
				 use:scrollAnimationAction={{ threshold: 0.3 }}>
				<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Who I Am</h3>
				<p class="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed transition-colors duration-300">
					I'm a passionate developer from British Columbia, Canada 🌲, with a deep interest in systems programming 
					and algorithm implementation. My programming journey spans multiple languages including Rust, Swift, 
					C, and Go, with a particular love for building efficient, performance-focused applications.
				</p>
				<p class="text-slate-300 text-lg mb-6 leading-relaxed">
					I work with modern frameworks like Svelte, Leptos, and Tauri, and my projects range from classic game 
					implementations to web scrapers and personal productivity tools. I believe in writing code guided by 
					efficiency and constantly exploring new domains to expand my programming horizons. My editor of choice? 
					Neovim, naturally.
				</p>
				
				<h4 class="text-xl font-semibold text-white mb-4">What I'm Passionate About</h4>
				<div class="grid grid-cols-2 gap-3">
					{#each interests as interest}
						<div class="flex items-center text-slate-300">
							<span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
							{interest}
						</div>
					{/each}
				</div>
			</div>
			
			<div class="opacity-0 translate-x-[50px] transition-all duration-700 ease-out delay-400 animate-out"
				 use:scrollAnimationAction={{ threshold: 0.3 }}>
				<h3 class="text-2xl font-bold text-white mb-6">Technical Skills</h3>
				<div class="space-y-4">
					{#each skills as skill, index}
						<div class="group relative bg-slate-700 rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:bg-slate-600 hover:shadow-lg cursor-pointer opacity-0 translate-x-[30px] animate-out"
							 use:scrollAnimationAction={{ threshold: 0.2 }}
							 style="transition-delay: {(index + 1) * 100}ms">
							<div class="flex justify-between items-center mb-2">
								<span class="text-white font-medium flex items-center">
									<span class="mr-2 transform transition-transform duration-300 hover:scale-110">{skill.icon}</span>
									{skill.name}
								</span>
								<span class="text-slate-300 text-sm">{skill.level}%</span>
							</div>
							<div class="w-full bg-slate-600 rounded-full h-2">
								<div 
									class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
									style="width: {skill.level}%"
								></div>
							</div>
							
							<!-- Tooltip -->
							<div class="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-10 max-w-xs sm:max-w-sm whitespace-normal">
								<p class="text-center leading-relaxed">{skill.description}</p>
								<!-- Tooltip arrow -->
								<div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>