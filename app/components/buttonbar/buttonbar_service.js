class $buttonBar {
	init(bar) {
		this.items = bar.items;
		this.open = bar.open || true;
		this.condensed = bar.condensed || true;
	}
	toggleOpen() {
		this.open = !this.open;
	}
	toggleCondensed() {
		this.condensed = !this.condensed;
	}
}

export default {
  name: '$buttonBar',
  fn: $buttonBar
};