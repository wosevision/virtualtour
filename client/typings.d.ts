declare module "*.html" {
	const content: string;
	export default content;
}

declare namespace vt {
	export interface ITourState {
		location?: string;
		building?: string;
		scene?: string;
	}

	export interface ITourUser {
		settings: object;
		usage: object;
	}
}