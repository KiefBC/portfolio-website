import type { Project } from '$lib/types/project';

export const projects: Project[] = [
	{
		id: 1,
		title: "Swallow AI - Pest Identification System",
		description: "Flask-based machine learning application that identifies insects from uploaded images using ResNet50 deep learning technology. Designed for agricultural professionals to quickly identify insect species and receive appropriate pesticide recommendations for effective pest management.",
		technologies: ["Python", "Flask", "ResNet50", "Machine Learning", "Docker", "Swagger API", "Computer Vision"],
		github: null,
		previewUrl: null,
		image: "🌾",
		featured: true
	},
	{
		id: 2,
		title: "Asteroids Game in Rust",
		description: "A classic Asteroids arcade game built using the Bevy game engine. Features WASD movement controls, wireframe toggle functionality, and traditional space shooter gameplay mechanics.",
		technologies: ["Rust", "Bevy", "Game Development", "2D Graphics"],
		github: "https://github.com/KiefBC/Asteroids-Rust",
		previewUrl: null,
		image: "🚀",
		featured: true
	},
	{
		id: 3,
		title: "WWE Universe Manager",
		description: "A comprehensive desktop application for managing a professional wrestling universe. Built with modern Rust technologies including Tauri 2.0, Leptos frontend, and SQLite database with responsive WWE-themed interface.",
		technologies: ["Rust", "Tauri", "Leptos", "SQLite", "Diesel ORM", "Tailwind CSS"],
		github: "https://github.com/KiefBC/wwe-universe-manager",
		previewUrl: null,
		image: "🤼",
		featured: true
	},
	{
		id: 4,
		title: "Acuendo Static Site Generator",
		description: "A Python-based static site generator that transforms Markdown content into static HTML websites. Features Jinja2 templating, customizable themes, and fast static file generation with no database required.",
		technologies: ["Python", "Markdown", "Jinja2", "Static Sites", "Shell Scripting"],
		github: "https://github.com/KiefBC/Acuendo-SSG",
		previewUrl: "http://kiefx.tech/Acuendo-SSG/",
		image: "📝",
		featured: false
	},
	{
		id: 5,
		title: "Python Maze Solver",
		description: "An interactive maze generation and solving application with graphical interface using Tkinter. Features customizable maze dimensions, adjustable animation speed, and visualizes the depth-first search solving process with recursive backtracking.",
		technologies: ["Python", "Tkinter", "Algorithms", "GUI", "Visualization"],
		github: "https://github.com/KiefBC/Python-Depth-Search-Maze-Solver",
		previewUrl: null,
		image: "🧩",
		featured: false
	},
	{
		id: 6,
		title: "Rust Shell",
		description: "A POSIX-compliant shell implementation built in Rust as part of the CodeCrafters challenge. Features command interpretation, external program execution, builtin commands (cd, pwd, echo), and a complete REPL interface.",
		technologies: ["Rust", "Systems Programming", "POSIX", "CLI", "Shell"],
		github: "https://github.com/KiefBC/rust-shell",
		previewUrl: null,
		image: "💻",
		featured: false
	}
];