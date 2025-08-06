import type { Command } from '../types/command';

// Navigation utility function
function scrollTo(elementId: string) {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

// External link utility function  
function openExternal(url: string) {
	window.open(url, '_blank');
}

export const commands: Command[] = [
	{
		id: 'home',
		label: 'Go to Home',
		description: 'Navigate to the hero section',
		action: () => scrollTo('home'),
		icon: '🏠'
	},
	{
		id: 'about',
		label: 'Go to About',
		description: 'Learn more about me',
		action: () => scrollTo('about'),
		icon: '👨‍💻'
	},
	{
		id: 'projects',
		label: 'View Projects',
		description: 'Explore my portfolio projects',
		action: () => scrollTo('projects'),
		icon: '🚀'
	},
	{
		id: 'resume',
		label: 'View Resume',
		description: 'Check out my experience',
		action: () => scrollTo('resume'),
		icon: '📄'
	},
	{
		id: 'contact',
		label: 'Contact Me',
		description: 'Get in touch',
		action: () => scrollTo('contact'),
		icon: '📧'
	},
	{
		id: 'github',
		label: 'Visit GitHub',
		description: 'Check out my repositories',
		action: () => openExternal('https://github.com/KiefBC'),
		icon: '🐙'
	},
	{
		id: 'linkedin',
		label: 'Visit LinkedIn',
		description: 'Connect with me professionally',
		action: () => openExternal('https://www.linkedin.com/in/kieferh/'),
		icon: '💼'
	}
];