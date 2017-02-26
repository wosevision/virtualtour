import { registerPrimitive, primitives, utils } from 'aframe';

const textPanelPrimitive = {
	config: {
	  defaultComponents: {
	    geometry: {
	      primitive: 'plane',
	      height: 1,
	      width: 2
	    },
	    material: {
	    	color: '#000000',
	    	opacity: 0.6,
	    	transparent: true
	    },
	    text: {
	    	value: 'Insert text here\nSecond line\nThird, somewhat longer line',
	    	align: 'center'
	    },
	    'hover-animation': {
	      scaleFactor: 1000,
	      colorFactor: '#000000',
	      opacityFactor: 1
	    }
	  },
	  mappings: {
	  	content: 'text.value'
	  }
	},
	register() {
		registerPrimitive('text-panel', utils.extendDeep(primitives.getMeshMixin(), this.config));
	}
};

export default textPanelPrimitive;