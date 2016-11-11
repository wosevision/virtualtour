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

		const hoverEl = document.getElementById(`link_${this.toRender.scene}`);
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
		}

	}
}

export default {
  name: 'PoiCtrl',
  fn: PoiCtrl
};
