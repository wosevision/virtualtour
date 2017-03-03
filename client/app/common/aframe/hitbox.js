import { registerPrimitive, primitives, utils } from 'aframe';

const COMPONENT_NAME = 'hit-box';
const HIT_EVENTS = [
	'mouseenter',
	'focus',
	'mouseleave',
	'blur',
	'click'
];

const sceneLinkPrimitive = {
	config: {
	  defaultComponents: {
	    geometry: {
	      primitive: 'box'
	    },
	    material: {
	    	shader: 'flat',
	    	flatShading: true,
	    	wireframe: true,
	    	opacity: 0,
	    	transparent: true
	    },
	    'delegate-event': {
	    	events: HIT_EVENTS,
	    	elements: []
	    }
	  },
	  mappings: {
	  	hit: 'delegate-event.elements'
	  }
	},
	register() {
		registerPrimitive(COMPONENT_NAME, utils.extendDeep(primitives.getMeshMixin(), this.config));
	}
};

export default sceneLinkPrimitive;