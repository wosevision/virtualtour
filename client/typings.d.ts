declare module "*.html" {
	const content: string;
	export default content;
}

declare interface TourState {
	location?: string;
	building?: string;
	scene?: string;
}