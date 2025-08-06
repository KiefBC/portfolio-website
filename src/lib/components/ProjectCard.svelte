<script lang="ts">
	import type { Project } from '$lib/types/project';
	import ProjectLink from './ProjectLink.svelte';

	export let project: Project;
</script>

<div class="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 hover:scale-105 group perspective-1000 preserve-3d project-card h-full">
	<div class="p-6 h-full flex flex-col">
		<div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
			{project.image}
		</div>
		<h3 class="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors project-title">
			{project.title}
		</h3>
		<p class="text-slate-300 mb-4 leading-relaxed project-description flex-grow">
			{project.description}
		</p>
		
		<div class="mt-auto">
			<div class="flex flex-wrap gap-2 mb-6">
				{#each project.technologies as tech}
					<span class="px-3 py-1 bg-slate-700 text-purple-300 text-sm rounded-full project-tech-tag">
						{tech}
					</span>
				{/each}
			</div>
			
			<div class="flex justify-between items-center">
				<div class="flex-shrink-0">
					{#if project.github}
						<ProjectLink type="github" url={project.github} />
					{:else}
						<ProjectLink type="private" />
					{/if}
				</div>
				<div class="flex-shrink-0">
					{#if project.previewUrl}
						<ProjectLink type="preview" url={project.previewUrl} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>