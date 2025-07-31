<script lang="ts">
	import { scrollAnimationAction } from '$lib/utils/scrollAnimation';

	interface TimelineItem {
		year: string;
		title: string;
		description: string;
		technologies: string[];
		category: 'language' | 'framework' | 'tool' | 'project';
		icon: string;
		color: string;
	}

	const timelineItems: TimelineItem[] = [
		{
			year: '2020',
			title: 'First Steps with Python',
			description: 'Started my programming journey with Python, learning the fundamentals of programming logic, data structures, and problem-solving.',
			technologies: ['Python', 'Programming Fundamentals', 'Problem Solving'],
			category: 'language',
			icon: '🐍',
			color: 'bg-green-500'
		},
		{
			year: '2021',
			title: 'Web Development Discovery',
			description: 'Dove into JavaScript and TypeScript, discovering the power of web development and interactive user interfaces.',
			technologies: ['JavaScript', 'TypeScript', 'DOM Manipulation', 'Web APIs'],
			category: 'language',
			icon: '🌐',
			color: 'bg-yellow-500'
		},
		{
			year: '2022',
			title: 'Ruby on Rails & Backend Development',
			description: 'Explored Ruby and Rails framework, learning about MVC architecture, database integration, and full-stack web development.',
			technologies: ['Ruby', 'Ruby on Rails', 'MVC', 'Database Integration'],
			category: 'language',
			icon: '💎',
			color: 'bg-red-500'
		},
		{
			year: '2022',
			title: 'Self-Hosting Journey Begins',
			description: 'Started my homelab and self-hosting adventure, setting up my first server with basic services and learning about system administration.',
			technologies: ['Linux', 'Server Administration', 'Networking', 'Docker'],
			category: 'tool',
			icon: '🏠',
			color: 'bg-blue-500'
		},
		{
			year: '2022-2023',
			title: 'Expanding Homelab Infrastructure',
			description: 'Added Nextcloud for file storage, Pi-hole for network-wide ad blocking, and began exploring containerization with Docker.',
			technologies: ['Nextcloud', 'Pi-hole', 'Docker', 'Container Orchestration'],
			category: 'tool',
			icon: '🔧',
			color: 'bg-purple-500'
		},
		{
			year: '2023',
			title: 'Started Computer Systems Program',
			description: 'Began my formal journey into software development at Camosun College, focusing on systems programming and modern development practices.',
			technologies: ['Programming Fundamentals', 'Computer Science', 'Mathematics'],
			category: 'project',
			icon: '🎓',
			color: 'bg-blue-500'
		},
		{
			year: '2023',
			title: 'Advanced Self-Hosting Solutions',
			description: 'Implemented Plex media server, GitLab for code hosting, and Prometheus/Grafana for monitoring my growing infrastructure.',
			technologies: ['Plex', 'GitLab', 'Prometheus', 'Grafana', 'Monitoring'],
			category: 'tool',
			icon: '📊',
			color: 'bg-orange-500'
		},
		{
			year: '2023',
			title: 'Discovered Rust',
			description: 'Fell in love with Rust\'s approach to memory safety and performance. Started with small CLI tools and gradually built more complex applications.',
			technologies: ['Rust', 'Cargo', 'Systems Programming'],
			category: 'language',
			icon: '🦀',
			color: 'bg-orange-500'
		},
		{
			year: '2024',
			title: 'Full-Stack Self-Hosting',
			description: 'Deployed comprehensive self-hosted solutions including Bitwarden for password management, Jellyfin for media streaming, and Traefik for reverse proxy.',
			technologies: ['Bitwarden', 'Jellyfin', 'Traefik', 'Reverse Proxy', 'SSL/TLS'],
			category: 'tool',
			icon: '🛡️',
			color: 'bg-indigo-500'
		},
		{
			year: '2024',
			title: 'Go Programming',
			description: 'Learned Go for its simplicity and excellent concurrency model. Applied it to backend services and concurrent programming challenges.',
			technologies: ['Go', 'Concurrency', 'Backend Development', 'APIs'],
			category: 'language',
			icon: '🐹',
			color: 'bg-cyan-500'
		},
		{
			year: '2024',
			title: 'Modern Web Development Stack',
			description: 'Mastered modern web frameworks including SvelteKit, focusing on performance, accessibility, and user experience.',
			technologies: ['SvelteKit', 'Tailwind CSS', 'Modern JavaScript', 'Performance Optimization'],
			category: 'framework',
			icon: '⚡',
			color: 'bg-purple-500'
		},
		{
			year: '2024',
			title: 'Tauri & Desktop Apps',
			description: 'Explored cross-platform desktop development with Tauri 2.0, combining Rust backend with modern web frontend technologies.',
			technologies: ['Tauri', 'Leptos', 'Desktop Development', 'Cross-platform'],
			category: 'framework',
			icon: '🖥️',
			color: 'bg-indigo-500'
		},
		{
			year: '2024',
			title: 'Game Development',
			description: 'Experimented with game development using Bevy engine in Rust, implementing ECS architecture and creating interactive experiences.',
			technologies: ['Bevy', 'Game Development', 'ECS', 'Graphics'],
			category: 'framework',
			icon: '🎮',
			color: 'bg-pink-500'
		},
		{
			year: '2024',
			title: 'Infrastructure as Code',
			description: 'Advanced my self-hosting setup with automated deployments, backup strategies, and infrastructure monitoring using modern DevOps practices.',
			technologies: ['Docker Compose', 'Automated Backups', 'Infrastructure Monitoring', 'CI/CD'],
			category: 'tool',
			icon: '🚀',
			color: 'bg-gray-500'
		},
		{
			year: '2024',
			title: 'Professional Experience',
			description: 'Applied skills in a professional setting at Racerocks 3D, working on military LMS systems and gaining real-world development experience.',
			technologies: ['Full-stack Development', 'Professional Workflow', 'Team Collaboration'],
			category: 'project',
			icon: '💼',
			color: 'bg-emerald-500'
		},
		{
			year: '2025',
			title: 'Advanced Projects',
			description: 'Building sophisticated applications like WWE Universe Manager, combining multiple technologies into cohesive, production-ready software.',
			technologies: ['Complex Architecture', 'Database Design', 'User Experience'],
			category: 'project',
			icon: '🚀',
			color: 'bg-red-500'
		}
	];

	let selectedCategory: string | null = null;
	let hoveredItem: TimelineItem | null = null;
	let showAllItems = false;
	let justExpanded = false;

	// Show only the most recent/important items by default
	$: featuredItems = timelineItems.slice(0, 6); // Show first 6 items
	
	$: filteredItems = selectedCategory 
		? timelineItems.filter(item => item.category === selectedCategory)
		: (showAllItems ? timelineItems : featuredItems);

	$: categories = [...new Set(timelineItems.map(item => item.category))];

	function selectCategory(category: string) {
		selectedCategory = selectedCategory === category ? null : category;
		showAllItems = false; // Reset to condensed view when filtering
		justExpanded = false;
	}

	function toggleShowAll() {
		if (!showAllItems) {
			justExpanded = true;
			// Reset animation flag after animation completes
			setTimeout(() => {
				justExpanded = false;
			}, 800);
		} else {
			// When collapsing, scroll smoothly to the Journey section title
			setTimeout(() => {
				const title = document.querySelector('.timeline-title');
				if (title) {
					title.scrollIntoView({ 
						behavior: 'smooth', 
						block: 'center'
					});
				}
			}, 150); // Slightly longer delay to ensure DOM update
		}
		showAllItems = !showAllItems;
		selectedCategory = null; // Clear any category filter
	}

	function getCategoryLabel(category: string): string {
		const labels: Record<string, string> = {
			language: 'Languages',
			framework: 'Frameworks',
			tool: 'Tools',
			project: 'Milestones'
		};
		return labels[category] || category;
	}

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			language: '💻',
			framework: '⚡',
			tool: '🔧',
			project: '🎯'
		};
		return icons[category] || '📂';
	}
</script>

<section class="py-8 bg-slate-100 dark:bg-slate-800 transition-colors duration-300 timeline-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-6">
			<h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 timeline-title">Learning Journey</h2>
			<div class="w-12 h-0.5 bg-purple-500 mx-auto mb-3 projects-divider"></div>
			<p class="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto projects-description">
				My evolution as a software developer, from first lines of code to building complex applications
			</p>
		</div>

		<!-- Category Filter -->
		<div class="mb-6">
			<div class="flex flex-wrap justify-center gap-3">
				<button
					on:click={() => selectedCategory = null}
					class="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 timeline-filter-button {
						selectedCategory === null 
							? 'bg-purple-600 text-white shadow-lg scale-105 active' 
							: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600'
					}"
				>
					<span>📚</span>
					<span>All Items</span>
				</button>
				{#each categories as category}
					<button
						on:click={() => selectCategory(category)}
						class="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 timeline-filter-button {
							selectedCategory === category 
								? 'bg-purple-600 text-white shadow-lg scale-105 active' 
								: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600'
						}"
					>
						<span>{getCategoryIcon(category)}</span>
						<span>{getCategoryLabel(category)}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Timeline -->
		<div class="relative">
			<!-- Timeline Line -->
			<div class="absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 timeline-line"></div>

			<!-- Timeline Items -->
			<div class="space-y-6">
				{#each filteredItems as item, index}
					<div 
						class="relative flex items-center {
							index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
						} {
							index >= featuredItems.length && justExpanded ? 'animate-slide-up' : ''
						}"
						style={index >= featuredItems.length && justExpanded ? `animation-delay: ${(index - featuredItems.length) * 100}ms` : ''}
						on:mouseenter={() => hoveredItem = item}
						on:mouseleave={() => hoveredItem = null}
						role="presentation"
					>
						<!-- Timeline Node -->
						<div class="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 {item.color} shadow-md z-10 timeline-dot"></div>

						<!-- Content Card -->
						<div class="ml-12 md:ml-0 md:w-5/12 {index % 2 === 0 ? 'md:pr-4' : 'md:pl-4'}">
							<div class="bg-white dark:bg-slate-700 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 timeline-item" style="border-left-color: {item.color.includes('green') ? '#10b981' : item.color.includes('yellow') ? '#f59e0b' : item.color.includes('red') ? '#ef4444' : item.color.includes('blue') ? '#3b82f6' : item.color.includes('purple') ? '#8b5cf6' : item.color.includes('orange') ? '#f97316' : item.color.includes('indigo') ? '#6366f1' : item.color.includes('cyan') ? '#06b6d4' : item.color.includes('pink') ? '#ec4899' : item.color.includes('gray') ? '#6b7280' : item.color.includes('emerald') ? '#10b981' : '#8b5cf6'}">
								<!-- Year Badge -->
								<div class="flex items-center justify-between mb-3">
									<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {item.color} text-white">
										{item.year}
									</span>
									<span class="text-xl">{item.icon}</span>
								</div>

								<!-- Title -->
								<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors timeline-item-title">
									{item.title}
								</h3>

								<!-- Description -->
								<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3 timeline-item-description">
									{item.description}
								</p>

								<!-- Technologies -->
								<div class="flex flex-wrap gap-2">
									{#each item.technologies as tech}
										<span class="px-2 py-1 bg-slate-50 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs rounded-full border border-slate-200 dark:border-slate-600">
											{tech}
										</span>
									{/each}
								</div>

							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Expand/Collapse Button -->
		{#if !selectedCategory}
			<div class="text-center mt-6">
				<button 
					on:click={toggleShowAll}
					class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm timeline-expand-button"
				>
					{showAllItems ? `Show Less (${timelineItems.length - featuredItems.length} hidden)` : `Show All Timeline (${timelineItems.length - featuredItems.length} more)`}
				</button>
			</div>
		{/if}

		<!-- Stats Summary - Only show when all items are visible -->
		{#if showAllItems || selectedCategory}
			<div class="mt-8">
				<div class="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-4 text-white timeline-stats">
					<div class="text-center mb-4">
						<h3 class="text-lg font-bold mb-1 timeline-stats-title">Journey Statistics</h3>
						<p class="text-purple-100 text-xs timeline-stats-subtitle">Growth and continuous learning</p>
					</div>
					
					<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
						<div class="text-center">
							<div class="text-xl font-bold mb-1 timeline-stats-number">{timelineItems.filter(item => item.category === 'language').length}</div>
							<div class="text-purple-100 text-xs timeline-stats-label">Languages</div>
						</div>
						<div class="text-center">
							<div class="text-xl font-bold mb-1 timeline-stats-number">{timelineItems.filter(item => item.category === 'framework').length}</div>
							<div class="text-purple-100 text-xs timeline-stats-label">Frameworks</div>
						</div>
						<div class="text-center">
							<div class="text-xl font-bold mb-1 timeline-stats-number">{timelineItems.filter(item => item.category === 'tool').length}</div>
							<div class="text-purple-100 text-xs timeline-stats-label">Tools</div>
						</div>
						<div class="text-center">
							<div class="text-xl font-bold mb-1 timeline-stats-number">{timelineItems.filter(item => item.category === 'project').length}</div>
							<div class="text-purple-100 text-xs timeline-stats-label">Milestones</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.animate-slide-up {
		animation: slide-up 0.5s ease-out forwards;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(32px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
