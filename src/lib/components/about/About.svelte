<script lang="ts">
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';
	import InteractiveTerminal from './InteractiveTerminal.svelte';
	import SkillsSection from './SkillsSection.svelte';
	import InterestsSection from './InterestsSection.svelte';
</script>

<section id="about" class="py-16 lg:py-20 bg-slate-100 dark:bg-slate-800 transition-colors duration-300 about-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 about-title">About Me</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto about-divider"></div>
		</div>
		
		<!-- Introduction Card -->
		<div class="mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-200"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<div class="bg-white dark:bg-slate-700 rounded-xl p-6 lg:p-8 shadow-lg text-center max-w-4xl mx-auto about-card">
				<h3 class="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 about-card-title">Who I Am</h3>
				<p class="text-slate-300 text-base lg:text-lg leading-relaxed mb-4 lg:mb-6 about-text">
					I'm a passionate developer from British Columbia, Canada 🌲, with a deep interest in systems programming 
					and algorithm implementation. My programming journey spans multiple languages including Python, Rust, Swift and 
					Go, with a particular love for building efficient, performance-focused applications.
				</p>
				<p class="text-slate-300 text-base lg:text-lg leading-relaxed about-text">
					I work with modern frameworks like Svelte, Leptos, and Tauri, and my projects range from classic game 
					implementations to web scrapers and personal productivity tools. I believe in writing code guided by 
					efficiency and constantly exploring new domains to expand my programming horizons. My editor of choice? 
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Neovim, naturally.</span>
				</p>
			</div>
		</div>
		
		<!-- Interactive Terminal -->
		<div class="mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-300"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<InteractiveTerminal />
		</div>
		
		<!-- Skills Section -->
		<div class="mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-400"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<SkillsSection />
		</div>
		
		<!-- Interests Section -->
		<div class="opacity-0 translate-y-8 transition-all duration-700 ease-out animate-out delay-600"
			 use:scrollAnimationAction={{ threshold: 0.2 }}>
			<InterestsSection />
		</div>
	</div>
</section>

<style>
	.animate-out {
		opacity: 0;
		transform: translateY(20px);
	}
	
	.delay-200 {
		animation-delay: 0.2s;
	}
	
	.delay-400 {
		animation-delay: 0.4s;
	}
	
	.delay-600 {
		animation-delay: 0.6s;
	}
</style>