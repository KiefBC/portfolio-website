<script lang="ts">
	import type { TimelineItem } from './types/timeline';
	
	export let items: TimelineItem[];
	
	$: languageCount = items.filter(item => item.category === 'language').length;
	$: frameworkCount = items.filter(item => item.category === 'framework').length;
	$: toolCount = items.filter(item => item.category === 'tool').length;
	$: projectCount = items.filter(item => item.category === 'project').length;
</script>

<div class="mt-8">
	<div class="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-4 text-white timeline-stats">
		<div class="text-center mb-4">
			<h3 class="text-lg font-bold mb-1 timeline-stats-title">Journey Statistics</h3>
			<p class="text-purple-100 text-xs timeline-stats-subtitle">Growth and continuous learning</p>
		</div>
		
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
			<div class="text-center">
				<div class="text-xl font-bold mb-1 timeline-stats-number">{languageCount}</div>
				<div class="text-purple-100 text-xs timeline-stats-label">Languages</div>
			</div>
			<div class="text-center">
				<div class="text-xl font-bold mb-1 timeline-stats-number">{frameworkCount}</div>
				<div class="text-purple-100 text-xs timeline-stats-label">Frameworks</div>
			</div>
			<div class="text-center">
				<div class="text-xl font-bold mb-1 timeline-stats-number">{toolCount}</div>
				<div class="text-purple-100 text-xs timeline-stats-label">Tools</div>
			</div>
			<div class="text-center">
				<div class="text-xl font-bold mb-1 timeline-stats-number">{projectCount}</div>
				<div class="text-purple-100 text-xs timeline-stats-label">Milestones</div>
			</div>
		</div>
	</div>
</div>