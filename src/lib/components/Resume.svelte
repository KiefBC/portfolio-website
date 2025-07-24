<script lang="ts">
	const experience = [
		{
			title: "Senior Software Developer",
			company: "Tech Company",
			period: "2022 - Present",
			description: "Lead development of high-performance backend services using Go and Rust. Architected microservices handling 1M+ requests per day.",
			achievements: [
				"Reduced API response times by 60% through optimization",
				"Led team of 4 developers on critical infrastructure projects",
				"Implemented automated testing reducing deployment issues by 80%"
			]
		},
		{
			title: "Full Stack Developer",
			company: "Startup Inc",
			period: "2020 - 2022",
			description: "Built scalable web applications using modern technologies. Worked across the entire stack from database design to frontend implementation.",
			achievements: [
				"Developed real-time features serving 10k+ concurrent users",
				"Created CI/CD pipelines reducing deployment time by 70%",
				"Mentored junior developers and established coding standards"
			]
		},
		{
			title: "Software Engineer",
			company: "Enterprise Corp",
			period: "2018 - 2020",
			description: "Maintained and enhanced legacy systems while gradually modernizing the technology stack. Focus on performance and reliability improvements.",
			achievements: [
				"Migrated critical systems from monolith to microservices",
				"Improved system uptime from 99.5% to 99.9%",
				"Reduced technical debt through systematic refactoring"
			]
		}
	];
	
	const education = [
		{
			degree: "Bachelor of Science in Computer Science",
			school: "University Name",
			period: "2014 - 2018",
			details: "Focus on Systems Programming, Algorithms, and Software Engineering"
		}
	];
	
	const certifications = [
		"AWS Certified Solutions Architect",
		"Docker Certified Associate",
		"Go Programming Certificate"
	];
</script>

<section id="resume" class="py-20 bg-slate-800">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Resume</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
			<p class="text-slate-300 text-lg max-w-2xl mx-auto">
				My professional journey in software development, focusing on systems programming, 
				performance optimization, and building scalable applications.
			</p>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<!-- Experience -->
			<div class="lg:col-span-2">
				<h3 class="text-2xl font-bold text-white mb-8 flex items-center">
					<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
						💼
					</span>
					Experience
				</h3>
				<div class="space-y-8">
					{#each experience as job}
						<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300">
							<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
								<div>
									<h4 class="text-xl font-bold text-white mb-1">{job.title}</h4>
									<p class="text-purple-400 font-semibold">{job.company}</p>
								</div>
								<span class="text-slate-300 text-sm bg-slate-600 px-3 py-1 rounded-full mt-2 sm:mt-0">
									{job.period}
								</span>
							</div>
							<p class="text-slate-300 mb-4 leading-relaxed">{job.description}</p>
							<ul class="space-y-2">
								{#each job.achievements as achievement}
									<li class="text-slate-300 flex items-start">
										<span class="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
										{achievement}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
			
			<!-- Education & Certifications -->
			<div class="space-y-8">
				<!-- Education -->
				<div>
					<h3 class="text-2xl font-bold text-white mb-6 flex items-center">
						<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
							🎓
						</span>
						Education
					</h3>
					{#each education as edu}
						<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300">
							<h4 class="text-lg font-bold text-white mb-2">{edu.degree}</h4>
							<p class="text-purple-400 font-semibold mb-2">{edu.school}</p>
							<p class="text-slate-300 text-sm mb-3">{edu.period}</p>
							<p class="text-slate-300 text-sm">{edu.details}</p>
						</div>
					{/each}
				</div>
				
				<!-- Certifications -->
				<div>
					<h3 class="text-2xl font-bold text-white mb-6 flex items-center">
						<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
							🏆
						</span>
						Certifications
					</h3>
					<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300">
						<ul class="space-y-3">
							{#each certifications as cert}
								<li class="text-slate-300 flex items-center">
									<span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
									{cert}
								</li>
							{/each}
						</ul>
					</div>
				</div>
				
				<!-- Download Resume -->
				<div class="text-center">
					<a 
						href="/resume.pdf" 
						download
						class="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Download Resume
					</a>
				</div>
			</div>
		</div>
	</div>
</section>