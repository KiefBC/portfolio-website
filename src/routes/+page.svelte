<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import GitHubStats from '$lib/components/GitHubStats.svelte';
	import InteractiveTerminal from '$lib/components/InteractiveTerminal.svelte';
	import TechTimeline from '$lib/components/TechTimeline.svelte';
	import Resume from '$lib/components/Resume.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	
	import { onMount } from 'svelte';
	import { initializePWA } from '$lib/utils/pwa';
	
	onMount(() => {
		// Mark that JavaScript has loaded
		document.documentElement.classList.add('js-loaded');
		
		// Initialize PWA functionality
		initializePWA();
		
		// Smooth scrolling for anchor links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', (e: Event) => {
				e.preventDefault();
				const href = (anchor as HTMLAnchorElement).getAttribute('href');
				if (href) {
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth'
						});
					}
				}
			});
		});
	});
</script>

<svelte:head>
	<title>Kiefer - Software Developer Portfolio</title>
	<meta name="description" content="Portfolio of Kiefer, a passionate software developer specializing in Rust, Go, and systems programming. Explore my projects and experience." />
</svelte:head>

<div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-x-hidden">
	<!-- Main Content -->
	<div class="relative z-10">
		<Navigation />
		<Hero />
		<About />
		<Projects />
		<GitHubStats />
		<InteractiveTerminal />
		<TechTimeline />
		<Resume />
		<Contact />
	</div>
	
	<CommandPalette />
</div>
