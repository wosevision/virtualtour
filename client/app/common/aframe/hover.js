import { registerComponent } from 'aframe';

const COMPONENT_NAME 			= 'hover-animation',
			START_EVENTS 				= 'mouseenter,focus',
			PAUSE_EVENTS 				= 'mouseleave,blur',
			DEFAULT_EASING			= 'linear',
			DEFAULT_ELASTICITY	= 600,
			DEFAULT_DURATION		= 600;

const hoverAnimationComponent = {
	config: {
	  schema: {
	    scaleFactor: {
	      default: 1.1
	    },
	    opacityFactor: {
	      default: 0.9
	    },
	    fillColor: {
	      type: 'color',
	      default: false
	    },
	    textColor: {
	      type: 'color',
	      default: false
	    }
	  },
	  
	  init() {
	    this.defaultScale = { x: 1, y: 1, z: 1 };
	    this.defaultOpacity = 1;
	    this.defaultColor = '#FFF';
	    
	    if (!this.el.getAttribute('tabindex')) {
	      this.el.setAttribute('tabindex', 0);
	    }
	    
	    this.setOpacityAnimation();
	    this.setScaleAnimation();
	    if (this.data.fillColor) this.setFillColorAnimation();
	    if (this.data.textColor) this.setTextColorAnimation();
	  },

	  setAnimation({
      property,
      from,
      to,
      dur = DEFAULT_DURATION,
      easing = DEFAULT_EASING,
      elasticity = DEFAULT_ELASTICITY,
      startEvents = START_EVENTS,
      pauseEvents = PAUSE_EVENTS
    }) {
	  	this.el.setAttribute(`animation__${property}-enter`, {
	      property,
	      from,
	      to,
	      dur,
	      easing,
	      elasticity,
	      startEvents,
	      pauseEvents
	    });
	  	this.el.setAttribute(`animation__${property}-leave`, {
	      property,
	      from: to,
	      to: from,
	      dur,
	      easing,
	      elasticity,
	      startEvents: pauseEvents,
	      pauseEvents: startEvents
	    });
    },
	  
	  setScaleAnimation() {
	    const originalScale = this.el.getAttribute('scale') || this.defaultScale,
	        factoredScale = {
	          x: (originalScale.x * this.data.scaleFactor),
	          y: (originalScale.y * this.data.scaleFactor),
	          z: (originalScale.z * this.data.scaleFactor)
	        };
	    this.setAnimation({
	    	property: 'scale',
	      from: originalScale,
	      to: factoredScale,
	      easing: 'easeOutElastic'
	    });
	  },
	  
	  setOpacityAnimation() {
	  	const originalOpacity = this.el.getAttribute('material').opacity || this.defaultOpacity,
	    		factoredOpacity = originalOpacity * this.data.opacityFactor;
	    this.setAnimation({
	    	property: 'opacity',
	      from: originalOpacity,
	      to: factoredOpacity
	    });
	  },
	  
	  setFillColorAnimation() {
	  	const originalColor = this.el.getAttribute('material').color || this.defaultColor;
	    this.setAnimation({
	    	property: 'color',
	      from: originalColor,
	      to: this.data.fillColor,
	      dur: DEFAULT_DURATION / 2,
	    });
	  },

	  setTextColorAnimation() {
	  	const originalColor = this.el.components.text.data.color || this.defaultColor;
	    this.setAnimation({
	    	property: 'text.color',
	      from: originalColor,
	      to: this.data.textColor,
	      dur: DEFAULT_DURATION / 2,
	    });
	  }
	},
	register() {
		registerComponent(COMPONENT_NAME, this.config);
	}
}

export default hoverAnimationComponent;