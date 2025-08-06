<script lang="ts">
	import { timelineItems } from './data/timelineData';
	import TimelineItem from './TimelineItem.svelte';
	import TimelineStats from './TimelineStats.svelte';
	import CategoryFilter from './CategoryFilter.svelte';
	import type { TimelineCategory, TimelineItem as TimelineItemType } from './types/timeline';

	let selectedCategory: TimelineCategory | null = null;
	let hoveredItem: TimelineItemType | null = null;
	let showAllItems = false;
	let justExpanded = false;

	// Show only the most recent/important items by default
	const featuredItems = timelineItems.slice(0, 6);
	
	$: filteredItems = selectedCategory 
		? timelineItems.filter(item => item.category === selectedCategory)
		: (showAllItems ? timelineItems : featuredItems);

	$: categories = [...new Set(timelineItems.map(item => item.category))] as TimelineCategory[];

	function handleCategorySelect(event: CustomEvent<{ category: TimelineCategory | null }>) {
		selectedCategory = event.detail.category;
		showAllItems = false; // Reset to condensed view when filtering
		justExpanded = false;
	}

	function handleToggleShowAll(event: CustomEvent<{ showAll: boolean }>) {
		const newShowAll = event.detail.showAll;
		
		if (!showAllItems && newShowAll) {
			justExpanded = true;
			// Reset animation flag after animation completes
			setTimeout(() => {
				justExpanded = false;
			}, 800);
		} else if (showAllItems && !newShowAll) {
			// When collapsing, scroll smoothly to the Journey section title
			setTimeout(() => {
				const title = document.querySelector('.timeline-title');
				if (title) {
					title.scrollIntoView({ 
						behavior: 'smooth', 
						block: 'center'
					});
				}
			}, 150);
		}
		
		showAllItems = newShowAll;
		selectedCategory = null; // Clear any category filter
	}
</script>

<section class="py-8 bg-slate-100 dark:bg-slate-800 transition-colors duration-300 timeline-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-6">
			<h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 timeline-title">Learning Journey</h2>
			<div class="w-12 h-0.5 bg-purple-500 mx-auto mb-3 projects-divider"></div>
			<p class="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto projects-description">
				My evolution as a software developer, from first lines of code to building complex applications
			</p>
		</div>

		<CategoryFilter 
			{categories} 
			{selectedCategory}
			{showAllItems}
			items={timelineItems}
			featuredLength={featuredItems.length}
			on:categorySelect={handleCategorySelect}
			on:toggleShowAll={handleToggleShowAll}
		/>

		<!-- Timeline -->
		<div class="relative">
			<!-- Timeline Line -->
			<div class="absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 timeline-line"></div>

			<!-- Timeline Items -->
			<div class="space-y-6">
				{#each filteredItems as item, index}
					<TimelineItem 
						{item} 
						{index} 
						featuredLength={featuredItems.length} 
						{justExpanded} 
					/>
				{/each}
			</div>
		</div>

		<!-- Stats Summary - Only show when all items are visible -->
		{#if showAllItems || selectedCategory}
			<TimelineStats items={timelineItems} />
		{/if}
	</div>
</section>