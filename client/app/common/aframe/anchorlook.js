import { registerComponent, utils } from 'aframe';

const warn = AFRAME.utils.debug('components:anchor-look:warn');

const anchorLookComponent = {
	config: {
		dependencies: ['camera'],
	  init() {
	  	this.camera = this.el.components.camera.camera;
	    this.targetAnchor = null;
	  },

	  tick(t) {
	  	const newHash = this.getUpdatedHash();
	  	if (!newHash) return;
	    // Track target object position. Depends on parent object keeping global transforms up
	    // to state with updateMatrixWorld(). In practice, this is handled by the renderer.
	    const target3D = this.target3DFromHash(newHash);
	    if (target3D) {
	      this.targetAnchor = newHash;
	      const vector = this.el.object3D.worldToLocal(target3D.getWorldPosition());
	      console.log(this);

	      this.camera.lookAt(vector);
	      this.camera.updateProjectionMatrix();
	    }
	  },

	  getUpdatedHash() {
	  	return (window.location.hash !== this.targetAnchor) && window.location.hash;
	  },

	  target3DFromHash(hash) {
	    const targetEl = this.el.sceneEl.querySelector(hash);
	    if (!targetEl) {
	      warn(`The anchor "${ hash }" does not point to a valid entity!`);
	      return;
	    }
	    return targetEl.object3D;
	  }
	},
	register() {
		registerComponent('anchor-look', this.config);
	}
}

export default anchorLookComponent;