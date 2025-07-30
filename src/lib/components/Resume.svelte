<script lang="ts">
	const experience = [
		{
			title: "Student Intern",
			company: "Racerocks 3D (Remote)",
			period: "2023 - 2025",
			description: "Worked remotely in the R&D Department at an Indigenous women-led technology company partnering with the Canadian Defence sector. Contributed to the development of a Learning Management System (LMS) designed for training future military personnel.",
			achievements: [
				"Developed full-stack components for military LMS platform using backend and frontend technologies",
				"Built and maintained RESTful APIs for the training management system",
				"Gained comprehensive experience across the entire software development lifecycle",
				"Successfully collaborated with distributed teams across multiple time zones on defence training solutions"
			]
		}
	];
	
	const education = [
		{
			degree: "Information & Computer Systems Diploma",
			school: "Camosun College",
			period: "2023 - 2025",
			details: "A 2.5-year program equivalent in scope to an Associate Degree, with emphasis on software development, databases, systems analysis, networking, and hands-on projects using industry-standard tools."
		}
	];
	
	const certifications = [
		"Harvard CS50X Online Computer Science Program"
	];
</script>

<section id="resume" class="py-20 bg-slate-800 resume-bg">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4 resume-title">Resume</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto mb-6 resume-divider"></div>
			<p class="text-slate-300 text-lg max-w-2xl mx-auto projects-description">
				My professional journey in software development, focusing on building robust systems, 
				optimizing performance, and creating scalable applications.
			</p>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<!-- Experience -->
			<div class="lg:col-span-2">
				<h3 class="text-2xl font-bold text-white mb-8 flex items-center resume-section-title">
					<span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
						💼
					</span>
					Experience
				</h3>
				<div class="space-y-8">
					{#each experience as job}
						<div class="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors duration-300 resume-item">
							<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
								<div>
									<h4 class="text-xl font-bold text-white mb-1 resume-item-title">{job.title}</h4>
									<p class="text-purple-400 font-semibold resume-item-company">{job.company}</p>
								</div>
								<span class="text-slate-300 text-sm bg-slate-600 px-3 py-1 rounded-full mt-2 sm:mt-0 resume-item-date">
									{job.period}
								</span>
							</div>
							<p class="text-slate-300 mb-4 leading-relaxed resume-item-description">{job.description}</p>
							<ul class="space-y-2">
								{#each job.achievements as achievement}
									<li class="text-slate-300 flex items-start resume-item-description">
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
				</div>
				
				<!-- Certifications -->
				<div>
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
				</div>
				
				<!-- Download Resume -->
				<div class="text-center">
					<a 
						href="/resume.pdf" 
						download
						class="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 resume-download-button"
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
