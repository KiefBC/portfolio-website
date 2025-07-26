<script lang="ts">
	const skills = [
		{ name: 'Rust', icon: '🦀', level: 90 },
		{ name: 'Git', icon: '📚', level: 90 },
		{ name: 'TypeScript', icon: '📘', level: 88 },
		{ name: 'Go', icon: '🐹', level: 85 },
		{ name: 'Linux', icon: '🐧', level: 85 },
		{ name: 'Python', icon: '🐍', level: 80 },
		{ name: 'Docker', icon: '🐳', level: 75 }
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

<section id="about" class="py-20 bg-slate-800">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto"></div>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h3 class="text-2xl font-bold text-white mb-6">Who I Am</h3>
				<p class="text-slate-300 text-lg mb-6 leading-relaxed">
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
			
			<div>
				<h3 class="text-2xl font-bold text-white mb-6">Technical Skills</h3>
				<div class="space-y-4">
					{#each skills as skill}
						<div class="bg-slate-700 rounded-lg p-4">
							<div class="flex justify-between items-center mb-2">
								<span class="text-white font-medium flex items-center">
									<span class="mr-2">{skill.icon}</span>
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
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>