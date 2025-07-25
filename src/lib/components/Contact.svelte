<script lang="ts">
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	
	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission (replace with actual endpoint)
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitStatus = 'success';
			formData = { name: '', email: '', subject: '', message: '' };
		} catch (error) {
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
			setTimeout(() => submitStatus = 'idle', 3000);
		}
	}
	
	const contactInfo = [
		{
			icon: '📧',
			title: 'Email',
			link: 'mailto:kiefx@pm.me'
		},
		{
			icon: '💼',
			title: 'LinkedIn',
			link: 'https://www.linkedin.com/in/kieferh/'
		},
		{
			icon: '🐙',
			title: 'GitHub',
			link: 'https://github.com/KiefBC'
		}
	];
</script>

<section id="contact" class="py-20 bg-slate-900">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
			<div class="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
			<p class="text-slate-300 text-lg max-w-2xl mx-auto">
				I'm always interested in discussing new opportunities, collaborating on projects, 
				or having a chat about technology and programming.
			</p>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Contact Info -->
			<div>
				<h3 class="text-2xl font-bold text-white mb-8">Let's Connect</h3>
				<p class="text-slate-300 text-lg mb-8 leading-relaxed">
					Whether you want to discuss technology, pitch a project, or simply say hello, 
					I'd love to hear from you. Reach out through any of the channels below.
				</p>
				
				<div class="space-y-6">
					{#each contactInfo as info}
						<a 
							href={info.link}
							target="_blank"
							class="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 group hover:scale-105 transform"
						>
							<div class="flex items-center">
								<span class="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
									{info.icon}
								</span>
								<div>
									<h4 class="text-white font-semibold group-hover:text-purple-400 transition-colors duration-300">{info.title}</h4>
								</div>
							</div>
						</a>
					{/each}
				</div>
				
				<div class="mt-8 p-6 bg-slate-800 rounded-lg">
					<h4 class="text-white font-semibold mb-3">💡 Looking for</h4>
					<ul class="text-slate-300 space-y-2">
						<li class="flex items-center">
							<span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
							Interesting backend/systems programming projects
						</li>
						<li class="flex items-center">
							<span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
							Open source collaboration opportunities
						</li>
						<li class="flex items-center">
							<span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
							Technical discussions about Rust, Go, and performance
						</li>
					</ul>
				</div>
			</div>
			
			<!-- Contact Form -->
			<div>
				<h3 class="text-2xl font-bold text-white mb-8">Send a Message</h3>
				
				<form on:submit={handleSubmit} class="space-y-6">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<label for="name" class="block text-slate-300 font-medium mb-2">Name</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
								placeholder="Your Name"
							/>
						</div>
						<div>
							<label for="email" class="block text-slate-300 font-medium mb-2">Email</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
								placeholder="your.email@example.com"
							/>
						</div>
					</div>
					
					<div>
						<label for="subject" class="block text-slate-300 font-medium mb-2">Subject</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
							placeholder="What's this about?"
						/>
					</div>
					
					<div>
						<label for="message" class="block text-slate-300 font-medium mb-2">Message</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="5"
							class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-vertical"
							placeholder="Tell me about your project or what you'd like to discuss..."
						></textarea>
					</div>
					
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
					>
						{#if isSubmitting}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
					
					{#if submitStatus === 'success'}
						<div class="p-4 bg-green-800 border border-green-600 rounded-lg text-green-200">
							✅ Thank you! Your message has been sent successfully.
						</div>
					{:else if submitStatus === 'error'}
						<div class="p-4 bg-red-800 border border-red-600 rounded-lg text-red-200">
							❌ Something went wrong. Please try again or contact me directly.
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>