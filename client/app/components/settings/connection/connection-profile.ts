export class ConnectionProfile {
	public auto: vt.cnx.IConnectionValue;
	public compression: vt.cnx.IConnectionValue;
	public preloading: vt.cnx.IConnectionValue;
	public resolution: vt.cnx.IConnectionValue;
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