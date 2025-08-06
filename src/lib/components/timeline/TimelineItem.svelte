<script lang="ts">
	import type { TimelineItem as TimelineItemType } from './types/timeline';
	
	export let item: TimelineItemType;
	export let index: number;
	export let featuredLength: number = 6;
	export let justExpanded: boolean = false;
	
	let hoveredItem: TimelineItemType | null = null;
	
	function getBorderColor(colorClass: string): string {
		const colorMap: Record<string, string> = {
			'green': '#10b981',
			'yellow': '#f59e0b', 
			'red': '#ef4444',
			'blue': '#3b82f6',
			'purple': '#8b5cf6',
			'orange': '#f97316',
			'indigo': '#6366f1',
			'cyan': '#06b6d4',
			'pink': '#ec4899',
			'gray': '#6b7280',
			'emerald': '#10b981'
		};
		
		for (const [color, hex] of Object.entries(colorMap)) {
			if (colorClass.includes(color)) {
				return hex;
			}
		}
		return '#8b5cf6'; // default purple
	}
</script>

<div 
	class="relative flex items-center {
		index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
	} {
		index >= featuredLength && justExpanded ? 'animate-slide-up' : ''
	}"
	style={index >= featuredLength && justExpanded ? `animation-delay: ${(index - featuredLength) * 100}ms` : ''}
	on:mouseenter={() => hoveredItem = item}
	on:mouseleave={() => hoveredItem = null}
	role="presentation"
>
	<!-- Timeline Node -->
	<div class="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 {item.color} shadow-md z-10 timeline-dot"></div>

	<!-- Content Card -->
	<div class="ml-12 md:ml-0 md:w-5/12 {index % 2 === 0 ? 'md:pr-4' : 'md:pl-4'}">
		<div class="bg-white dark:bg-slate-700 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 timeline-item" 
			 style="border-left-color: {getBorderColor(item.color)}">
			<!-- Year Badge -->
			<div class="flex items-center justify-between mb-3">
				<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {item.color} text-white">
					{item.year}
				</span>
				<span class="text-xl">{item.icon}</span>
			</div>

			<!-- Title -->
			<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors timeline-item-title">
				{item.title}
			</h3>

			<!-- Description -->
			<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3 timeline-item-description">
				{item.description}
			</p>

			<!-- Technologies -->
			<div class="flex flex-wrap gap-2">
				{#each item.technologies as tech}
					<span class="px-2 py-1 bg-slate-50 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs rounded-full border border-slate-200 dark:border-slate-600">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.animate-slide-up {
		animation: slide-up 0.5s ease-out forwards;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(32px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>