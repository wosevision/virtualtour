import { registerComponent } from 'aframe';

const hoverAnimationComponent = {
	config: {
	  schema: {
	    scaleFactor: {
	      default: 1.1
	    },
	    opacityFactor: {
	      default: 0.9
	    },
	    colorFactor: {
	      type: 'color',
	      default: '#FFFFFF'
	    }
	  },
	  
	  init() {
	    this.defaultScale = { x: 1, y: 1, z: 1 };
	    this.defaultOpacity = 1;
	    this.defaultColor = '#FFF';
	    
	    if (!this.el.getAttribute('tabindex')) {
	      this.el.setAttribute('tabindex', 0);
	    }
	    
	    this.setColorAnimation();
	    this.setOpacityAnimation();
	    this.setScaleAnimation();
	  },
	  
	  setScaleAnimation() {
	    const originalScale = this.el.getAttribute('scale') || this.defaultScale,
	        factoredScale = {
	          x: (originalScale.x * this.data.scaleFactor),
	          y: (originalScale.y * this.data.scaleFactor),
	          z: (originalScale.z * this.data.scaleFactor)
	        };
	    this.el.setAttribute('animation__scale-mouseenter', {
	      property: 'scale',
	      from: originalScale,
	      to: factoredScale,
	      dur: 600,
	      easing: 'easeOutElastic',
	      elasticity: 600,
	      startEvents: 'mouseenter,focus',
	      pauseEvents: 'mouseleave,blur'
	    });
	    this.el.setAttribute('animation__scale-mouseleave', {
	      property: 'scale',
	      from: factoredScale,
	      to: originalScale,
	      dur: 600,
	      easing: 'easeOutElastic',
	      elasticity: 600,
	      startEvents: 'mouseleave,blur',
	      pauseEvents: 'mouseenter,focus'
	    });
	  },
	  
	  setOpacityAnimation() {
	  	const originalOpacity = this.el.getAttribute('material').opacity || this.defaultOpacity,
	    		factoredOpacity = originalOpacity * this.data.opacityFactor;
	    this.el.setAttribute('animation__opacity-mouseenter', {
	      property: 'opacity',
	      from: originalOpacity,
	      to: factoredOpacity,
	      dur: 300,
	      easing: 'linear',
	      startEvents: 'mouseenter,focus',
	      pauseEvents: 'mouseleave,blur'
	    });
	    this.el.setAttribute('animation__opacity-mouseleave', {
	      property: 'opacity',
	      from: factoredOpacity,
	      to: originalOpacity,
	      dur: 300,
	      easing: 'linear',
	      startEvents: 'mouseleave,blur',
	      pauseEvents: 'mouseenter,focus'
	    });
	  },
	  
	  setColorAnimation() {
	  	const originalColor = this.el.getAttribute('material').color || this.defaultColor;
	    this.el.setAttribute('animation__color-mouseenter', {
	      property: 'color',
	      from: originalColor,
	      to: this.data.colorFactor,
	      dur: 100,
	      easing: 'linear',
	      startEvents: 'mouseenter,focus',
	      pauseEvents: 'mouseleave,blur'
	    });
	    this.el.setAttribute('animation__color-mouseleave', {
	      property: 'color',
	      from: this.data.colorFactor,
	      to: originalColor,
	      dur: 100,
	      easing: 'linear',
	      startEvents: 'mouseleave,blur',
	      pauseEvents: 'mouseenter,focus'
	    });
	  }
	},
	register() {
		registerComponent('hover-animation', this.config);
	}
}

export default hoverAnimationComponent;