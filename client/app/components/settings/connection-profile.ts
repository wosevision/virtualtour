export interface ConnectionValue {
	val: boolean | number;
}

export class ConnectionProfile {
	public auto: ConnectionValue;
	public compression: ConnectionValue;
	public preloading: ConnectionValue;
	public resolution: ConnectionValue;
	constructor(
		auto,
		compression,
		preloading,
		resolution
	) {
		this.auto = { val: auto };
		this.compression = { val: compression };
		this.preloading = { val: preloading };
		this.resolution = { val: resolution };
	}
}