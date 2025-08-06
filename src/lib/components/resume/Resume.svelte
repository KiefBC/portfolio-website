<script lang="ts">
	import ExperienceSection from './ExperienceSection.svelte';
	import EducationSection from './EducationSection.svelte';
	import CertificationsSection from './CertificationsSection.svelte';
</script>

<section id="resume" class="py-20 bg-slate-50 dark:bg-slate-900 resume-bg">
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
				<ExperienceSection />
			</div>
			
			<!-- Education & Certifications -->
			<div class="space-y-8">
				<!-- Education -->
				<div>
					<EducationSection />
				</div>
				
				<!-- Certifications -->
				<div>
					<CertificationsSection />
				</div>
			</div>
		</div>
	</div>
</section>