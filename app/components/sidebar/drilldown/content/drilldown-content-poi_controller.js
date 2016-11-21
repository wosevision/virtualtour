class PoiCtrl {
	static get $inject() {
		return ['$element', '$state', 'SceneResource'];
	}
	constructor($element, $state, SceneResource) {
		'ngInject';
		this.$element = $element;
		this.$state = $state;
		this.SceneResource = SceneResource;
	}
	$onInit() {

		const hoverEl = document.getElementById(
			this.toRender.scene 
			? `link_${this.toRender.scene}`
			: `hotspot_${this.toRender._id}`
		);
		this.$element.on('mouseenter', () => {
			hoverEl.emit('mouseenter');
		});
		this.$element.on('mouseleave', () => {
			hoverEl.emit('mouseleave');
		});

		if (this.toRender.scene) {
			this.SceneResource.get({ id: this.toRender.scene }, scene => {
				this.scene = scene;
			});
		} else {
			this.hotspot = this.toRender;
		}

	}
	goto({code, parent}) {
		console.log(code, parent);
	}
}

export default {
  name: 'PoiCtrl',
  fn: PoiCtrl
};
