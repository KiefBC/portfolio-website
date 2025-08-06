<script lang="ts">
	import { experience } from './data/experience';
</script>

<h3 class="text-2xl font-bold text-white mb-8 flex items-center resume-section-title">
	<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
		💼
	</span>
	Experience
</h3>
<div class="space-y-8">
	{#each experience as job}
		<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300 resume-item">
			<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
				<div>
					<h4 class="text-xl font-bold text-white mb-1 resume-item-title">{job.title}</h4>
					<p class="text-purple-400 font-semibold resume-item-company">{job.company}</p>
				</div>
				<span class="text-slate-300 text-sm bg-slate-600 px-3 py-1 rounded-full mt-2 sm:mt-0 resume-item-date">
					{job.period}
				</span>
			</div>
			<p class="text-slate-300 mb-4 leading-relaxed resume-item-description">{job.description}</p>
			<ul class="space-y-2">
				{#each job.achievements as achievement}
					<li class="text-slate-300 flex items-start resume-item-description">
						<span class="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
						{achievement}
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>