<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Project } from './types/project';
	
	export let projects: Project[];
	export let showAll: boolean = false;
	
	const dispatch = createEventDispatcher<{
		toggle: { showAll: boolean };
		filtered: { projects: Project[] };
	}>();
	
	// Calculate filtered projects based on showAll state
	$: displayedProjects = showAll ? projects : projects.filter(p => p.featured);
	
	// Dispatch filtered projects whenever they change
	$: dispatch('filtered', { projects: displayedProjects });
	
	function handleToggle() {
		showAll = !showAll;
		dispatch('toggle', { showAll });
	}
</script>

<div class="text-center">
	<button 
		on:click={handleToggle}
		class="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 projects-button"
	>
		{showAll ? 'Show Less' : 'View All Projects'}
	</button>
</div>