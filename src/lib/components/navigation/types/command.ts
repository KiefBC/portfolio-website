export interface Command {
	id: string;
	label: string;
	description: string;
	action: () => void;
	shortcut?: string;
	icon?: string;
}