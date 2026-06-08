import type { Experience } from '../types/resume';

export const experience: Experience[] = [
	{
		title: "DevOps Engineer",
		company: "Sandbenders",
		period: "Jan 2026 – Present",
		description: "Building CI/CD infrastructure for reproducible embedded software builds — turning manual, fragile build steps into containerized, repeatable automation.",
		achievements: [
			"Built Dagger-based CI/CD workflows for reproducible embedded builds across Yocto, Bazel, and Lingua Franca",
			"Automated containerized build environments, dependency setup, artifact packaging, and publishing",
			"Debugged Linux/Docker build failures and improved pipeline reliability through caching, isolation, and repeatable execution",
			"Collaborated with engineering stakeholders to convert manual build requirements into maintainable CI workflows"
		]
	},
	{
		title: "Machine Learning Developer",
		company: "Swallow AI",
		period: "Apr 2025 – Sep 2025",
		description: "Built a Python-based machine learning application for pest identification, supporting agricultural use cases across multiple African biomes.",
		achievements: [
			"Led a team of 4 developers to deliver the MVP 3 weeks ahead of schedule",
			"Optimized the ML pipeline, improving accuracy from 72% to 87% and reducing inference time by 40%",
			"Collaborated with product, marketing, and sales teams to align technical solutions with regional and environmental requirements",
			"Diagnosed and resolved production issues through systematic debugging and root-cause analysis"
		]
	},
	{
		title: "R&D Intern",
		company: "RaceRocks",
		period: "Apr 2024 – Aug 2024",
		description: "Developed and maintained Ruby on Rails applications within a large, production codebase as a student intern in the R&D department.",
		achievements: [
			"Developed and maintained Ruby on Rails applications within a large, production codebase",
			"Contributed features and fixes through Agile workflows — sprint planning, stand-ups, and retrospectives",
			"Integrated new functionality while refactoring and improving existing systems",
			"Collaborated with R&D and cross-functional teams to resolve complex technical issues"
		]
	}
];
