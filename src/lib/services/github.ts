export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	updated_at: string;
	topics: string[];
	private: boolean;
}

export interface GitHubUser {
	login: string;
	name: string;
	bio: string | null;
	public_repos: number;
	followers: number;
	following: number;
	location: string | null;
	company: string | null;
	avatar_url: string;
	html_url: string;
}

export interface GitHubStats {
	totalRepos: number;
	totalStars: number;
	totalForks: number;
	languages: Record<string, number>;
	mostStarredRepo: GitHubRepo | null;
}

const GITHUB_USERNAME = 'KiefBC';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubUser(): Promise<GitHubUser> {
	const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
	}
	return response.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
	const response = await fetch(
		`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
	);
	if (!response.ok) {
		throw new Error(`Failed to fetch GitHub repos: ${response.statusText}`);
	}
	return response.json();
}

export async function calculateGitHubStats(): Promise<GitHubStats> {
	const repos = await fetchGitHubRepos();
	
	const publicRepos = repos.filter(repo => !repo.private);
	const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
	const totalForks = publicRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
	
	// Calculate language usage
	const languages: Record<string, number> = {};
	publicRepos.forEach(repo => {
		if (repo.language) {
			languages[repo.language] = (languages[repo.language] || 0) + 1;
		}
	});
	
	// Find most starred repo
	const mostStarredRepo = publicRepos.reduce((prev, current) => 
		(prev && prev.stargazers_count && prev.stargazers_count > current.stargazers_count) ? prev : current
	, publicRepos[0] || null);
	
	return {
		totalRepos: publicRepos.length,
		totalStars,
		totalForks,
		languages,
		mostStarredRepo
	};
}