const DATA_MODELS = {
	scene: {
		name: '',
		code: '',
		// state: ''
		parent: '',
		panorama: ''//{}
		// sceneLinks: []
		// hotSpots: []
		// assets: []
		// entities: []
		// script: ''
	},
	sceneLinks: {
		scene: '',
		position: [
			0,
			0,
			0
		],
		rotation: [
			0,
			0,
			70
		]
	},
	hotSpots: {
		linked: false,
		name: '',
		desc: '',
		feature: '',
		position: [
			0,
			0,
			0
		]
	}
}

export default {
  name: 'DATA_MODELS',
  fn: DATA_MODELS
};

