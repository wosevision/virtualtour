import { isArray, isObject } from 'angular';

/**
 * The scene service class is the lead orchestrator of the `<aframe-scene/>`
 * component's business logic. It is the application and component's main
 * interface to the current scene data.
 *
 * Scene manipulation is accomplished using the `$aframeScene.scene` getter
 * and setter property; internally, the scene data is stored in the service
 * "raw" under the property `sceneData`. The getter and setter are
 * responsible for transliterating changes into the "raw" data object and
 * back again. The setter also sets the `$aframeSky.sky` property, thus kicking
 * off a sky change from its respective service.
 *
 * @param {object} $mdToast        ng-material's toast service
 * @param {object} $aframeSky			 The sky service
 * @param {object} EDITOR_MESSAGES Constant to define toast configs
 */
class SceneService {
	constructor($mdToast, $aframeSky, EDITOR_MESSAGES) {
		'ngInject';

		this.$mdToast = $mdToast;
		this.$aframeSky = $aframeSky;

		this.toasts = {};
		Object.keys( EDITOR_MESSAGES ).forEach(type => {
			const toast = $mdToast.simple();
			const toastConfig = EDITOR_MESSAGES[type];
			Object.keys(toastConfig).forEach(prop => {
				toast[prop]( toastConfig[prop] );
			});
			this.toasts[type] = toast;
		});
	}
	/**
	 * Getter and setter pair for internal scene data.
	 * 
	 * @param  {[Object]} sceneData Incoming scene data to set
	 * @return {[Object]}						The scene's current data
	 * @example
	 * {
	 *   _id: '583f17cfd2cd0c0400072d9c',
	 *   parent: '57a8e38b12ad99fe889c95f3',
	 *   code: '2b',
	 *   name: 'Atrium 2B',
	 *   hotSpots: [ ... ],
	 *   sceneLinks: [ ... ],
	 *   panorama: { ... }
	 * }
	 */
	get scene() {
		if (this.sceneData) {
			return this.sceneData;
		}
	}
	set scene(sceneData) {
		this.$aframeSky.sky = sceneData.panorama;
		this.sceneData = this.lastPublished = sceneData; // { _id, sceneLinks, hotSpots, sky };
	}

	/**
	 * Method for `Array.splice()`ing items out of scene elements (`sceneLinks`,
	 * `hotSpots`) for removal from the active scene (what is being viewed, not
	 * necessarily what is saved on the server).
	 *
	 * Confirms with the user before deleting, saves a draft after, and
	 * offers to publish once removed (which will commit the changes).
	 *
	 * @example
	 * $aframeScene.removeItemFrom(
	 *   { name: 'thing' },
	 *   [{ name: 'thing' }, { name: 'thung' }, { name: 'thong' }],
	 *   () => this.updateView()
	 * );
	 * // ...results in:
	 * // >> [{ name: 'thung' }, { name: 'thong' }]
	 * 
	 * @param  {object}   		 item       The item being removed
	 * @param  {Array<Object>} collection The array it will be removed from
	 * @param  {Function} 		 cb         Callback to run when item removed
	 * @return {Promise}									Promise resolves to result of toast
	 */
  removeItemFrom(item, collection, cb) {
    this.$mdToast.show(this.toasts.confirm).then(response => {
      if ( response == 'ok' ) {
			  const index = collection.indexOf(item);
			  if (index !== -1) {
			  	collection.splice(index, 1);
	      	cb&&cb();
	      	return this.$mdToast.show(this.toasts.itemRemoved);
			  } 
      }
    }).then(response => {
      if ( response == 'ok' ) {
      	this.$aframeEditor.publish();
      }
    });
	}

	/**
	 * Method for `Array.push()`ing items onto the list of current scene
	 * elements (`sceneLinks`, `hotSpots`) for display in the scene.
	 *
	 * Checks validity of collection and item; adds item and informs user
	 * of the newly added item's default position. Offers to publish changes.
	 * 
	 * @param {Object}   			item       The item being added
	 * @param {Array<Object>} collection The array it will be added to
	 * @param {Function}			cb         Callback to run when item added
	 */
	addItemTo(item, collection, cb) {
	  if (isObject(item) && isArray(collection)) {
	  	collection.push(item)
    	cb&&cb(collection);
    	if (item.position && item.position.length) {
    		this.toasts.itemAdded.textContent(`Item added at ${ item.position.join(', ') }!`);
    	}
	    this.$mdToast.show(this.toasts.itemAdded).then(response => {
	      if ( response == 'ok' ) {
			  	this.$aframeEditor.publish();
	      }
	    });
	  }
	}
}

export default SceneService;