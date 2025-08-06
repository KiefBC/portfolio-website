<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TimelineCategory, TimelineItem } from './types/timeline';
	
	export let categories: TimelineCategory[];
	export let selectedCategory: TimelineCategory | null = null;
	export let showAllItems: boolean = false;
	export let items: TimelineItem[];
	export let featuredLength: number = 6;
	
	const dispatch = createEventDispatcher<{
		categorySelect: { category: TimelineCategory | null };
		toggleShowAll: { showAll: boolean };
	}>();
	
	function selectCategory(category: TimelineCategory) {
		selectedCategory = selectedCategory === category ? null : category;
		dispatch('categorySelect', { category: selectedCategory });
	}
	
	function toggleShowAll() {
		showAllItems = !showAllItems;
		dispatch('toggleShowAll', { showAll: showAllItems });
	}
	
	function getCategoryLabel(category: TimelineCategory): string {
		const labels: Record<TimelineCategory, string> = {
			language: 'Languages',
			framework: 'Frameworks', 
			tool: 'Tools',
			project: 'Milestones'
		};
		return labels[category];
	}
	
	function getCategoryIcon(category: TimelineCategory): string {
		const icons: Record<TimelineCategory, string> = {
			language: '💻',
			framework: '⚡',
			tool: '🔧',
			project: '🎯'
		};
		return icons[category];
	}
</script>

<!-- Category Filter -->
<div class="mb-6">
	<div class="flex flex-wrap justify-center gap-3">
		<button
			on:click={() => { selectedCategory = null; dispatch('categorySelect', { category: null }); }}
			class="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 timeline-filter-button {
				selectedCategory === null 
					? 'bg-purple-600 text-white shadow-lg scale-105 active' 
					: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600'
			}"
		>
			<span>📚</span>
			<span>All Items</span>
		</button>
		{#each categories as category}
			<button
				on:click={() => selectCategory(category)}
				class="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 timeline-filter-button {
					selectedCategory === category 
						? 'bg-purple-600 text-white shadow-lg scale-105 active' 
						: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600'
				}"
			>
				<span>{getCategoryIcon(category)}</span>
				<span>{getCategoryLabel(category)}</span>
			</button>
		{/each}
	</div>
</div>

<!-- Expand/Collapse Button -->
{#if !selectedCategory}
	<div class="text-center mt-6">
		<button 
			on:click={toggleShowAll}
			class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm timeline-expand-button"
		>
			{showAllItems ? `Show Less (${items.length - featuredLength} hidden)` : `Show All Timeline (${items.length - featuredLength} more)`}
		</button>
	</div>
{/if}