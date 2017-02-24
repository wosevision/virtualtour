import { registerPrimitive, primitives, utils } from 'aframe';

const sceneLinkPrimitive = {
	config: {
	  defaultComponents: {
	    geometry: {
	      primitive: 'cone',
	      height: 0.5,
	      radiusBottom: 0.5,
	      radiusTop: 0,
	      segmentsHeight: 1,
	      segmentsRadial: 4
	    },
	    scale: {
	      x: 0.1,
	      y: 1,
	      z: 1
	    },
	    animation: {
	      property: 'position',
	      dir: 'alternate',
	      dur: 1200,
	      easing: 'easeInOutSine',
	      from: '0 0 0',
	      to: '0 -0.1 0',
	      loop: true
	    }
	  }
	},
	register() {
		registerPrimitive('scene-link', utils.extendDeep(primitives.getMeshMixin(), this.config));
	}
};

export default sceneLinkPrimitive;