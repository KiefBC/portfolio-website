<script lang="ts">
	import { certifications } from './data/certifications';
</script>

<h3 class="text-2xl font-bold text-white mb-6 flex items-center resume-section-title">
	<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
		🏆
	</span>
	Certifications
</h3>
<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300 resume-item">
	<ul class="space-y-3">
		{#each certifications as cert}
			<li class="text-slate-300 flex items-center resume-item-description">
				<span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
				{cert}
			</li>
		{/each}
	</ul>
</div>

<!-- Download Resume -->
<div class="text-center mt-8">
	<button 
		disabled
		class="inline-flex items-center px-6 py-3 bg-gray-500 text-gray-300 font-semibold rounded-lg cursor-not-allowed resume-download-button"
	>
		<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
		</svg>
		Download Resume
	</button>
</div>