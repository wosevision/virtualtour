import { registerComponent, utils } from 'aframe';

const warn = AFRAME.utils.debug('components:anchor-look:warn');

const anchorLookComponent = {
	config: {
	  init() {
	    this.target3D = null;
	    this.targetAnchor = null;
	    this.vector = new THREE.Vector3();
	  },

	  tick(t) {
	  	const newHash = this.getUpdatedHash();
	  	if (!newHash) return;
	    // Track target object position. Depends on parent object keeping global transforms up
	    // to state with updateMatrixWorld(). In practice, this is handled by the renderer.
	    const target3D = this.target3DFromHash(newHash);
	    if (target3D) {
	      this.targetAnchor = newHash;
	      const vector = this.el.object3D.parent.worldToLocal(target3D.getWorldPosition());
	      console.log(target3D, vector);
	      return this.el.object3D.lookAt(vector);
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