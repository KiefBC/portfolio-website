<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';
	
	// Shuffle function using Fisher-Yates algorithm
	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}
	
	const projects = [
		{
			id: 1,
			title: "Asteroids Game in Rust",
			description: "A classic Asteroids arcade game built using the Bevy game engine. Features WASD movement controls, wireframe toggle functionality, and traditional space shooter gameplay mechanics.",
			technologies: ["Rust", "Bevy", "Game Development", "2D Graphics"],
			github: "https://github.com/KiefBC/Asteroids-Rust",
			demo: null,
			image: "🚀",
			featured: true
		},
		{
			id: 2,
			title: "WWE Universe Manager",
			description: "A comprehensive desktop application for managing a professional wrestling universe. Built with modern Rust technologies including Tauri 2.0, Leptos frontend, and SQLite database with responsive WWE-themed interface.",
			technologies: ["Rust", "Tauri", "Leptos", "SQLite", "Diesel ORM", "Tailwind CSS"],
			github: "https://github.com/KiefBC/wwe-universe-manager",
			demo: null,
			image: "🤼",
			featured: true
		},
		{
			id: 3,
			title: "Acuendo Static Site Generator",
			description: "A Python-based static site generator that transforms Markdown content into static HTML websites. Features Jinja2 templating, customizable themes, and fast static file generation with no database required.",
			technologies: ["Python", "Markdown", "Jinja2", "Static Sites", "Shell Scripting"],
			github: "https://github.com/KiefBC/Acuendo-SSG",
			demo: null,
			image: "📝",
			featured: true
		},
		{
			id: 4,
			title: "Python Maze Solver",
			description: "An interactive maze generation and solving application with graphical interface using Tkinter. Features customizable maze dimensions, adjustable animation speed, and visualizes the depth-first search solving process with recursive backtracking.",
			technologies: ["Python", "Tkinter", "Algorithms", "GUI", "Visualization"],
			github: "https://github.com/KiefBC/Python-Depth-Search-Maze-Solver",
			demo: null,
			image: "🧩",
			featured: false
		},
		{
			id: 5,
			title: "Rust Shell",
			description: "A POSIX-compliant shell implementation built in Rust as part of the CodeCrafters challenge. Features command interpretation, external program execution, builtin commands (cd, pwd, echo), and a complete REPL interface.",
			technologies: ["Rust", "Systems Programming", "POSIX", "CLI", "Shell"],
			github: "https://github.com/KiefBC/rust-shell",
			demo: null,
			image: "💻",
			featured: false
		}
	];
	
	let shuffledProjects = projects;
	let showAll = false;
	
	// Shuffle projects on component mount
	onMount(() => {
		shuffledProjects = shuffleArray(projects);
	});
	
	$: displayedProjects = showAll ? shuffledProjects : shuffledProjects.filter(p => p.featured);
</script>

<section id="projects" class="py-20 bg-slate-900">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Personal Projects</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
			<p class="text-slate-300 text-lg max-w-2xl mx-auto">
				Here are some of the projects I've built in my spare time. They reflect my passion for systems programming, 
				performance optimization, and solving real-world problems.
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
			{#each displayedProjects as project}
				<div class="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 hover:scale-105 group perspective-1000 preserve-3d">
					<div class="p-6">
						<div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
							{project.image}
						</div>
						<h3 class="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
							{project.title}
						</h3>
						<p class="text-slate-300 mb-4 leading-relaxed">
							{project.description}
						</p>
						
						<div class="flex flex-wrap gap-2 mb-6">
							{#each project.technologies as tech}
								<span class="px-3 py-1 bg-slate-700 text-purple-300 text-sm rounded-full">
									{tech}
								</span>
							{/each}
						</div>
						
						<div class="flex space-x-4">
							{#if project.github}
								<a 
									href={project.github} 
									target="_blank"
									class="flex items-center text-slate-300 hover:text-white transition-colors duration-200"
								>
									<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
									</svg>
									Code
								</a>
							{/if}
							{#if project.demo}
								<a 
									href={project.demo} 
									target="_blank"
									class="flex items-center text-slate-300 hover:text-white transition-colors duration-200"
								>
									<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
									</svg>
									Demo
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="text-center">
			<button 
				on:click={() => showAll = !showAll}
				class="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
			>
				{showAll ? 'Show Less' : 'View All Projects'}
			</button>
		</div>
	</div>
</section>