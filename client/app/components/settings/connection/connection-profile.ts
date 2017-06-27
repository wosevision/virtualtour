export class ConnectionProfile {
	public auto: vt.INetworkConnectionVal;
	public compression: vt.INetworkConnectionVal;
	public preloading: vt.INetworkConnectionVal;
	public resolution: vt.INetworkConnectionVal;
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