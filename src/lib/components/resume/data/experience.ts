import type { Experience } from '../types/resume';

export const experience: Experience[] = [
	{
		title: "Machine Learning Software Developer",
		company: "Swallow AI (Remote)",
		period: "Capstone",
		description: "Developed a full-stack agricultural pest identification system using SvelteKit SSR with TypeScript frontend and Flask API backend. Built machine learning solutions with ResNet50 deep learning technology to help farmers identify insect species and receive pesticide recommendations for effective crop management.",
		achievements: [
			"Built SvelteKit SSR frontend with TypeScript and Flask REST API backend",
			"Integrated ResNet50 ML model for accurate insect classification from uploaded images",
			"Implemented dual pesticide recommendation system with chemical and eco-friendly options",
			"Developed comprehensive testing suite including unit, API, and end-to-end tests"
		]
	},
	{
		title: "Student Intern Software Developer",
		company: "Racerocks 3D (Remote)",
		period: "",
		description: "Worked remotely in the R&D Department at an Indigenous women-led technology company partnering with the Canadian Defence sector. Contributed to the development of a Learning Management System (LMS) designed for training.",
		achievements: [
			"Developed full-stack components for a LMS platform using backend and frontend technologies",
			"Gained comprehensive experience across the entire software development lifecycle",
			"Successfully collaborated with distributed teams across multiple time zones on defence training solutions",
			"Adapted effectively to remote work environment and developed strong virtual communication skills"
		]
	}
];