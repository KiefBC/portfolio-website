<script lang="ts">
	import { skills } from './data/skills';
	import type { Skill } from './types/about';
	
	let selectedSkill: Skill | null = null;
	
	function selectSkill(skill: Skill) {
		selectedSkill = selectedSkill?.name === skill.name ? null : skill;
	}
	
	function handleKeydown(event: KeyboardEvent, skill: Skill) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectSkill(skill);
		}
	}
</script>

<h3 class="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 text-center about-section-title">Technical Skills</h3>
<p class="text-slate-400 text-sm lg:text-base text-center mb-6 lg:mb-8 about-hint">Tap any skill to learn more about my experience</p>

<!-- Skills Grid -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
	{#each skills as skill}
		<button
			on:click={() => selectSkill(skill)}
			on:keydown={(e) => handleKeydown(e, skill)}
			aria-label="View details for {skill.name} skill"
			aria-expanded={selectedSkill?.name === skill.name}
			class="bg-white dark:bg-slate-700 rounded-lg p-4 lg:p-5 text-left transition-all duration-300 
			       hover:bg-slate-50 dark:hover:bg-slate-600 hover:scale-105 cursor-pointer
			       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800
			       skill-card {selectedSkill?.name === skill.name ? 'selected ring-2 ring-purple-500 bg-slate-50 dark:bg-slate-600' : ''}"
		>
			<div class="flex items-center justify-center mb-2 lg:mb-3">
				<span class="text-2xl lg:text-3xl">{skill.icon}</span>
			</div>
			<h4 class="text-white font-medium text-sm lg:text-base text-center skill-name">{skill.name}</h4>
		</button>
	{/each}
</div>

<!-- Skill Description -->
{#if selectedSkill}
	<div 
		class="bg-white dark:bg-slate-700 rounded-lg p-4 lg:p-6 border-2 border-purple-500/30 shadow-lg
		       animate-slide-in max-w-4xl mx-auto skill-details"
		role="region"
		aria-label="Skill details for {selectedSkill.name}"
	>
		<div class="flex items-center justify-between mb-3 lg:mb-4">
			<div class="flex items-center gap-2 lg:gap-3">
				<span class="text-2xl lg:text-3xl">{selectedSkill.icon}</span>
				<h4 class="text-white font-semibold text-lg lg:text-xl skill-details-title">{selectedSkill.name}</h4>
			</div>
			<button 
				on:click={() => selectedSkill = null}
				aria-label="Close skill details"
				class="text-slate-400 hover:text-white text-xl p-2 rounded-md
				       hover:bg-slate-700 transition-all duration-200
				       focus:outline-none focus:ring-2 focus:ring-purple-400 skill-close"
			>
				✕
			</button>
		</div>
		<p class="text-slate-300 text-sm lg:text-base leading-relaxed skill-details-text">{selectedSkill.description}</p>
	</div>
{/if}

<style>
	.animate-slide-in {
		animation: slide-in 0.3s ease-out;
	}
	
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(-10px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>