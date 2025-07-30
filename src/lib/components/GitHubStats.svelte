<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';
	import { calculateGitHubStats, type GitHubStats } from '$lib/services/github';

	let stats: GitHubStats | null = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			stats = await calculateGitHubStats();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load GitHub stats';
			console.error('GitHub stats error:', err);
		} finally {
			loading = false;
		}
	});

	$: topLanguages = stats ? 
		Object.entries(stats.languages)
			.sort(([,a], [,b]) => b - a)
			.slice(0, 5) : [];
</script>

<section class="py-16 bg-slate-100 dark:bg-slate-800 transition-colors duration-300 github-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 github-title">GitHub Activity</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto mb-4 projects-divider"></div>
			<p class="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto projects-description">
				Real-time insights from my open source contributions and coding activity
			</p>
		</div>

		{#if loading}
			<div class="flex justify-center items-center py-12">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
			</div>
		{:else if error}
			<div class="text-center py-12">
				<div class="text-red-500 dark:text-red-400 mb-2">⚠️ Failed to load GitHub stats</div>
				<p class="text-slate-600 dark:text-slate-400 text-sm">{error}</p>
			</div>
		{:else if stats}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
				<!-- Total Repositories -->
				<div class="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-4 animate-out github-stat-card"
					 use:scrollAnimationAction={{ threshold: 0.3 }}>
					<div class="flex items-center justify-between mb-4">
						<div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
							<svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
						</div>
					</div>
					<h3 class="text-2xl font-bold text-slate-900 dark:text-white github-stat-number">{stats.totalRepos}</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">Public Repositories</p>
				</div>

				<!-- Total Stars -->
				<div class="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-4 animate-out github-stat-card"
					 use:scrollAnimationAction={{ threshold: 0.3 }}
					 style="transition-delay: 100ms">
					<div class="flex items-center justify-between mb-4">
						<div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
							<svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
							</svg>
						</div>
					</div>
					<h3 class="text-2xl font-bold text-slate-900 dark:text-white github-stat-number">{stats.totalStars}</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">Stars Earned</p>
				</div>

				<!-- Total Forks -->
				<div class="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-4 animate-out github-stat-card"
					 use:scrollAnimationAction={{ threshold: 0.3 }}
					 style="transition-delay: 200ms">
					<div class="flex items-center justify-between mb-4">
						<div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
							<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
								<path d="M16 1.01L21 6v2h-4l-5-5V1.01M1 5l4 4-4 4v8l4-4 4 4v-8l-4-4 4-4V1L5 5l4 4H1V5z"/>
							</svg>
						</div>
					</div>
					<h3 class="text-2xl font-bold text-slate-900 dark:text-white github-stat-number">{stats.totalForks}</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">Total Forks</p>
				</div>

				<!-- Most Starred Repo -->
				<div class="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-4 animate-out github-stat-card"
					 use:scrollAnimationAction={{ threshold: 0.3 }}
					 style="transition-delay: 300ms">
					<div class="flex items-center justify-between mb-4">
						<div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
							<svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
							</svg>
						</div>
					</div>
					{#if stats.mostStarredRepo}
						<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate github-stat-number">{stats.mostStarredRepo.name}</h3>
						<p class="text-slate-600 dark:text-slate-300 text-sm">{stats.mostStarredRepo.stargazers_count} ⭐</p>
					{:else}
						<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 github-stat-number">No starred repos</h3>
						<p class="text-slate-600 dark:text-slate-300 text-sm">0 ⭐</p>
					{/if}
				</div>
			</div>

			<!-- Top Languages -->
			{#if topLanguages.length > 0}
				<div class="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-lg opacity-0 translate-y-8 animate-out github-stat-card"
					 use:scrollAnimationAction={{ threshold: 0.3 }}>
					<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center github-stat-number">Most Used Languages</h3>
					<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
						{#each topLanguages as [language, count], index}
							<div class="text-center p-4 bg-slate-50 dark:bg-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors duration-200 opacity-0 translate-y-4 animate-out github-stat-card"
								 use:scrollAnimationAction={{ threshold: 0.4 }}
								 style="transition-delay: {(index + 1) * 100}ms">
								<div class="text-2xl font-bold text-purple-600 dark:text-purple-400 github-stat-number">{count}</div>
								<div class="text-sm text-slate-600 dark:text-slate-300 mt-1">{language}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</section>