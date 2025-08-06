<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';
	import { projects } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types/project';
	
	// Shuffle function using Fisher-Yates algorithm
	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}
	
	
	let shuffledProjects: Project[] = projects;
	let showAll = false;
	
	// Shuffle projects on component mount
	onMount(() => {
		shuffledProjects = shuffleArray(projects);
	});
	
	$: displayedProjects = showAll ? shuffledProjects : shuffledProjects.filter(p => p.featured);
</script>

<section id="projects" class="py-20 bg-slate-50 dark:bg-slate-900 projects-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4 projects-title">Personal Projects</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto mb-6 projects-divider"></div>
			<p class="text-slate-300 text-lg max-w-2xl mx-auto projects-description">
				Here are some of the projects I've built in my spare time. They reflect my passion for systems programming, 
				performance optimization, and solving real-world problems.
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
			{#each displayedProjects as project}
				<ProjectCard {project} />
			{/each}
		</div>
		
		<div class="text-center">
			<button 
				on:click={() => showAll = !showAll}
				class="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 projects-button"
			>
				{showAll ? 'Show Less' : 'View All Projects'}
			</button>
		</div>
	</div>
</section>