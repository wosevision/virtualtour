declare module "*.html" {
	const content: string;
	export default content;
}

declare interface TourState {
	location?: string;
	building?: string;
	scene?: string;
}

declare interface Connection {
	network: {
		speeds: {
			download: number,
			upload: number,
			originalDownload: number,
			originalUpload: number
		},
		client: {
			ip: string,
			lat: number,
			lon: number,
			isp: string,
			isprating: number,
			rating: number,
			ispdlavg: number,
			ispulavg: number
		},
		server: {
			host: string,
			lat: number,
			lon: number,
			location: string,
			country: string,
			cc: string,
			sponsor: string,
			distance: number,
			distanceMi: number,
			ping: number,
			id: string
		}
	},
	useragent: {
		ua: string,
		browser: {
			name: string,
			version: string,
			major: string
		},
		engine: {
			version: string,
			name: string,
		},
		os: {
			name: string,
			version: string
		},
		device: {
			type: string
		},
		cpu: any
	}
}

declare interface User {
	settings: object;
	usage: object;
}