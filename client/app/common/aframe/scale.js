import { registerComponent } from 'aframe';

const levelScaleToComponent = {
	config: {
	  schema: {
	    type: 'selector'
	  },
	  init() {
	    const scaleToLevel = this.data.getAttribute('scale'),
	        	currentScale = this.el.getAttribute('scale'),
	        	adjusted = {
				      x: currentScale.x / scaleToLevel.x,
				      y: currentScale.y / scaleToLevel.y,
				      z: currentScale.z / scaleToLevel.z
				    };
	    this.el.setAttribute('scale', adjusted);
	  }
	},
	register() {
		registerComponent('level-scale-to', this.config);
	}
}

export default levelScaleToComponent;