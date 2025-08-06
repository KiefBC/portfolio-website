export interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	github: string | null;
	previewUrl: string | null;
	image: string;
	featured: boolean;
}

export type ProjectLinkType = 'github' | 'preview' | 'private';

export interface ProjectLinkProps {
	type: ProjectLinkType;
	url?: string | null;
	className?: string;
}