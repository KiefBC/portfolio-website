<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Resume from '$lib/components/Resume.svelte';
	import Contact from '$lib/components/Contact.svelte';
	
	import { onMount } from 'svelte';
	
	onMount(() => {
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

<div class="min-h-screen bg-slate-900">
	<Navigation />
	<Hero />
	<About />
	<Projects />
	<Resume />
	<Contact />
</div>
