export interface Experience {
	title: string;
	company: string;
	period: string;
	description: string;
	achievements: string[];
}

export interface Education {
	degree: string;
	school: string;
	period?: string;
	details: string;
}

export type Certification = string;