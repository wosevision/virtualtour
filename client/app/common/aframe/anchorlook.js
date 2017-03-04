import { registerComponent, utils } from 'aframe';

const warn = AFRAME.utils.debug('components:anchor-look:warn');

const anchorLookComponent = {
	config: {
	  // schema: {
	  //   type: 'selector'
	  // },
	  init() {
	    this.target3D = null;
	    this.targetAnchor = null;
	    this.vector = new THREE.Vector3();
	  }
	  // update() {
	    // var self = this;
	    // var target = self.data;
	    // var object3D = self.el.object3D;
	    // var targetEl;

	    // // No longer looking at anything (i.e., look-at="").
	    // if (!target || (typeof target === 'object' && !Object.keys(target).length)) {
	    //   return self.remove();
	    // }

	    // // Look at a position.
	    // if (typeof target === 'object') {
	    //   return object3D.lookAt(new THREE.Vector3(target.x, target.y, target.z));
	    // }
	  // },

	  tick(t) {
	  	const newHash = this.getUpdatedHash();
	  	if (!newHash) return;
	    // Track target object position. Depends on parent object keeping global transforms up
	    // to state with updateMatrixWorld(). In practice, this is handled by the renderer.
	    const target3D = this.target3DFromHash(newHash);
	    if (target3D) {
	      this.targetAnchor = newHash;
	      const vector = this.el.object3D.parent.worldToLocal(target3D.getWorldPosition());
	      return this.el.object3D.lookAt(vector);
	    }
	  },

	  getUpdatedHash() {
	  	return (window.location.hash !== this.targetAnchor) && window.location.hash;
	  },

	  target3DFromHash(hash) {
	    targetEl = self.el.sceneEl.querySelector(hash);
	    if (!targetEl) {
	      warn(`The anchor "${ target }" does not point to a valid entity!`);
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