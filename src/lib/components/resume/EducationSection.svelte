<script lang="ts">
	import { education } from './data/education';
</script>

<h3 class="text-2xl font-bold text-white mb-6 flex items-center resume-section-title">
	<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
		🎓
	</span>
	Education
</h3>
{#each education as edu}
	<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300 resume-item">
		<h4 class="text-lg font-bold text-white mb-2 resume-item-title">{edu.degree}</h4>
		<p class="text-purple-400 font-semibold mb-2 resume-item-company">{edu.school}</p>
		<p class="text-slate-300 text-sm mb-3 resume-item-date">{edu.period}</p>
		<p class="text-slate-300 text-sm resume-item-description">{edu.details}</p>
	</div>
{/each}