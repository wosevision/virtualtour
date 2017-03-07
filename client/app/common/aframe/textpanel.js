import { registerPrimitive, primitives, utils } from 'aframe';

const COMPONENT_NAME = 'text-panel';

const textPanelPrimitive = {
	config: {
	  defaultComponents: {
	    geometry: {
	      primitive: 'plane',
	      height: 'auto',
	      width: 2
	    },
	    material: {
	    	color: '#000000',
	    	opacity: 0.6,
	    	transparent: true
	    },
	    text: {
	    	value: 'Insert text here\nSecond line\nThird, somewhat longer line',
	    	align: 'center',
	    	wrapCount: 25
	    }
	  },
	  mappings: {
	  	content: 'text.value',
	  	height: 'geometry.height',
	  	width: 'geometry.width',
	  	'wrap-count': 'text.wrapCount'
	  }
	},
	register() {
		registerPrimitive(COMPONENT_NAME, utils.extendDeep(primitives.getMeshMixin(), this.config));
	}
};

export default textPanelPrimitive;