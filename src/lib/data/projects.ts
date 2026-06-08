import type { Project } from '$lib/components/projects/types/project';

export const projects: Project[] = [
	// ===== Core Systems (featured) =====
	{
		id: 1,
		title: "WWE Universe Manager",
		description: "A native desktop application for running a pro-wrestling universe — managing wrestlers, championships, shows, and match booking through a multi-window interface. Built end-to-end in Rust.",
		technologies: ["Rust", "Tauri 2.0", "Leptos", "SQLite", "Diesel ORM", "Tailwind CSS"],
		github: "https://github.com/KiefBC/wwe-universe-manager",
		previewUrl: null,
		image: "🤼",
		featured: true
	},
	{
		id: 2,
		title: "HTTP/1.1 Server in Rust",
		description: "An HTTP/1.1 server written from scratch on raw TCP primitives, conforming to RFC 9110/9112. Supports keep-alive connections, gzip/deflate/brotli compression, content negotiation, range requests for streaming, and dynamic routing.",
		technologies: ["Rust", "HTTP/1.1", "TCP", "Networking", "Concurrency"],
		github: "https://github.com/KiefBC/rust-http-server",
		previewUrl: null,
		image: "🌐",
		featured: true
	},
	{
		id: 3,
		title: "Seiten 正典",
		description: "A self-hosted tool that builds canon-only anime collections in Plex — scraping episode data from AnimeFillerList, caching it locally, and generating filler-free collections. Full-stack Rust with a Leptos SSR frontend.",
		technologies: ["Rust", "Leptos (SSR)", "Axum", "SeaORM", "Plex", "Tailwind CSS"],
		github: "https://github.com/KiefBC/seiten",
		previewUrl: null,
		image: "📺",
		featured: true
	},
	{
		id: 4,
		title: "Swallow AI - Pest Identification System",
		description: "Flask-based machine learning application that identifies insects from uploaded images using ResNet50 deep learning technology. Designed for agricultural professionals to quickly identify insect species and receive appropriate pesticide recommendations for effective crop management.",
		technologies: ["Python", "Flask", "ResNet50", "Machine Learning", "Docker", "Swagger API", "Computer Vision"],
		github: null,
		previewUrl: "https://bright-tartufo-3f0dbc.netlify.app",
		image: "🌾",
		featured: true,
		previewSubtext: "Frontend Only"
	},
	// ===== Utilities & Experiments =====
	{
		id: 5,
		title: "Amministratore Delegato",
		description: "A work-in-progress RPG built in the s&box engine. Features modular systems for combat, economy, and AI-driven units — a business-meets-underworld management sim written in C#.",
		technologies: ["C#", "s&box", "Game Development", "ECS"],
		github: "https://github.com/KiefBC/amministratore-delegato",
		previewUrl: null,
		image: "🎮",
		featured: false,
		githubSubtext: "WIP · Source"
	},
	{
		id: 6,
		title: "The Bevy Book",
		description: "A community mdBook teaching the Bevy game engine, filling the gap left by sparse tutorials. Five core chapters plus hands-on guides — a rain effect and Wave-Function-Collapse sockets — and an API glossary.",
		technologies: ["Rust", "Bevy", "mdBook", "Documentation"],
		github: "https://github.com/KiefBC/bevy_book",
		previewUrl: "http://kiefx.tech/bevy_book/",
		image: "📖",
		featured: false,
		previewSubtext: "Read the Book"
	},
	{
		id: 7,
		title: "Pokédex CLI",
		description: "A delightfully simple command-line Pokédex in Go. Renders Pokémon as colored ASCII art in a neofetch-style layout with stat bars, type-based theming, realistic catch mechanics, and local sprite caching.",
		technologies: ["Go", "CLI", "PokéAPI", "ASCII Art"],
		github: "https://github.com/KiefBC/pokedexGO",
		previewUrl: null,
		image: "🔴",
		featured: false
	},
	{
		id: 8,
		title: "Asteroids Game in Rust",
		description: "A feature-rich take on Asteroids built with Bevy and the Avian2D physics engine. Thrust-based movement, particle effects, screen wrapping, a wireframe toggle, and a modular ECS architecture.",
		technologies: ["Rust", "Bevy", "Avian2D", "ECS", "Game Development"],
		github: "https://github.com/KiefBC/Asteroids-Rust",
		previewUrl: null,
		image: "🚀",
		featured: false
	},
	{
		id: 9,
		title: "Rust Shell",
		description: "A POSIX-compliant shell implementation built in Rust as part of the CodeCrafters challenge. Features command interpretation, external program execution, builtin commands (cd, pwd, echo, type), and a complete REPL interface.",
		technologies: ["Rust", "Systems Programming", "POSIX", "CLI", "Shell"],
		github: "https://github.com/KiefBC/rust-shell",
		previewUrl: null,
		image: "💻",
		featured: false
	},
	{
		id: 10,
		title: "Acuendo Static Site Generator",
		description: "A Python-based static site generator that transforms Markdown content into static HTML websites. Features Jinja2 templating, customizable themes, and fast static file generation with no database required.",
		technologies: ["Python", "Markdown", "Jinja2", "Static Sites", "Shell Scripting"],
		github: "https://github.com/KiefBC/Acuendo-SSG",
		previewUrl: "http://kiefx.tech/Acuendo-SSG/",
		image: "📝",
		featured: false,
		previewSubtext: "Functioning Website"
	},
	{
		id: 11,
		title: "Python Maze Solver",
		description: "An interactive maze generation and solving application with graphical interface using Tkinter. Features customizable maze dimensions, adjustable animation speed, and visualizes the depth-first search solving process with recursive backtracking.",
		technologies: ["Python", "Tkinter", "Algorithms", "GUI", "Visualization"],
		github: "https://github.com/KiefBC/Python-Depth-Search-Maze-Solver",
		previewUrl: null,
		image: "🧩",
		featured: false
	}
];
