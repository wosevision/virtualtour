import { registerPrimitive, primitives, utils } from 'aframe';

const hotSpotPrimitive = {
	config: {
	  defaultComponents: {
	    geometry: {
	    	arc: 360,
	      primitive: 'torus',
				radius: 0.25,
				radiusTubular: 0.015,
				segmentsTubular: 32,
	    },
	    material: {
	    	color: '#0077CA',
	    	shader: 'flat',
	    	opacity: 0.6,
	    	transparent: true
	    },
	    text: {
	    	value: 'i',
	    	height: 5,
	    	side: 'double',
	    	wrapCount: 4,
	    	align: 'center',
	    	color: '#0077CA'
	    },
	    animation: {
	      property: 'rotation',
	      easing: 'easeInOutSine',
	      dur: 2000,
	      from: '0 0 0',
	      to: '0 360 0',
	      loop: true
	    }
	  }
	},
	register() {
		registerPrimitive('hot-spot', utils.extendDeep(primitives.getMeshMixin(), this.config));
	}
};

export default hotSpotPrimitive;