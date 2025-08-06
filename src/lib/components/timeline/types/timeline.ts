export interface TimelineItem {
	year: string;
	title: string;
	description: string;
	technologies: string[];
	category: 'language' | 'framework' | 'tool' | 'project';
	icon: string;
	color: string;
}

export type TimelineCategory = 'language' | 'framework' | 'tool' | 'project';