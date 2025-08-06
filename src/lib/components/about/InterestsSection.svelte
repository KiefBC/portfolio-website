<script lang="ts">
	import { interests } from './data/interests';
</script>

<h3 class="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8 text-center about-section-title">What I'm Passionate About</h3>
<div class="flex flex-wrap gap-3 lg:gap-4 justify-center max-w-4xl mx-auto">
	{#each interests as interest}
		<span class="px-4 lg:px-6 py-2 lg:py-3 bg-slate-50 dark:bg-slate-600 text-purple-600 dark:text-purple-300 rounded-full text-sm lg:text-base 
		             hover:bg-slate-100 dark:hover:bg-slate-500 hover:text-purple-700 dark:hover:text-purple-200 transition-all duration-300 interest-tag">
			{interest}
		</span>
	{/each}
</div>