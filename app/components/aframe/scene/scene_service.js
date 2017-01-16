import { isArray, isObject } from 'angular';
import { pick } from 'lodash';

/**
 * Shorthand helper for getting all own property names of object
 * @memberof $aframeScene
 * @param  {Object} obj Object to get properties of
 * @return {Array}     	Array of property names
 */
function getProps(obj) {
	return Object.getOwnPropertyNames(obj);
}

/**
 * The scene service class is the lead orchestrator of the `<aframe-scene/>`
 * component's business logic. It is the application and component's main
 * interface to the current scene data, as well as a hub between the data
 * and it's model representation in the database.
 *
 * Scene manipulation is accomplished using the `$aframeScene.scene` getter
 * and setter property; internally, the scene data is stored in the service
 * "raw" under the property `sceneData`. The getter and setter are
 * responsible for transliterating changes into the "raw" data object and
 * back again. The setter also sets the `$aframeSky.sky` property, thus kicking
 * off a sky change from its respective service.
 *
 * The service also contains methods for drafting and publishing scenes.
 *
 * @param  {object} $timeout        Angular's timeout service
 * @param  {object} $mdToast        ng-material's toast service
 * @param  {object} $tourApi        Tour $resource factory service
 * @param  {object} DraftResource   Draft $resource factory
 * @param  {object} EDITOR_MESSAGES Constant to define toast configs
 */
class $aframeScene {
	/**
	 * Initialize dependencies; convert EDITOR_MESSAGES constant
	 * into $mdToast configs for use in instance methods using static
	 * utility method `getProps()`.
	 */
	constructor(
		$timeout, $mdToast,
		$tourApi, DraftResource,
		$aframeSky,
		EDITOR_MESSAGES) {
		'ngInject';

		this.$timeout = $timeout;
		this.$mdToast = $mdToast;
		this.SceneResource = $tourApi.scene;
		this.DraftResource = DraftResource;
		this.$aframeSky = $aframeSky;

		this.toasts = {};
		getProps( EDITOR_MESSAGES ).forEach(type => {
			const toast = $mdToast.simple();
			const toastConfig = EDITOR_MESSAGES[type];
			getProps(toastConfig).forEach(prop => {
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
	 * If there is scene data available, queries the database by the current
	 * scene ID via the `DraftResource` factory to check for active drafts
	 * held by the current logged in user.
	 *
	 * If drafts are found, notifies the user; offers to load the latest draft.
	 * Loads draft if user confirms and notifies them of load success.
	 * 
	 * @param  {Boolean}  $0.notify Whether the notify the user (toast)
	 * @param  {Function} cb        Callback to run when draft loaded
	 * @return {Promise}            Promise that will resolve to draft list
	 */
	checkForDraft({ notify = true } = {}, cb) {
		if (this.sceneData) {
			return this.DraftResource.query({
				sort: '-updatedAt',
				filter: {
					original: this.sceneData._id
				}
			}).$promise.then(drafts => {
				drafts.length&&notify&&this.$mdToast.show(this.toasts.draftFound).then(response => {
		      if ( response == 'ok' ) {
		      	this.loadDraft(drafts[0]._id, { notify: true }, cb);
		      }
		    });
		    return drafts;
	  	});
		}
	}

	/**
	 * Gets a single stored draft by its database `_id` and passes
	 * the result to a callback; notifies user that draft was loaded and
	 * offers to publish.
	 * 
	 * @param  {string}   id             The id of the draft to fetch
	 * @param  {Boolean}  $1.notify			 Whether to notify the user (toast)
	 * @param  {Function} cb             Callback to run when draft loaded
	 */
	loadDraft(id, { notify = true } = {}, cb) {
  	this.DraftResource.get({ id }).$promise.then(draft => {
	  	cb&&cb(draft.content);
	  	this.lastDraft = draft.content;
	    notify&&this.$mdToast.show(this.toasts.loadDraft).then(response => {
	      if ( response == 'ok' ) {
	      	this.publish();
	      }
	    });
  	});
	}
	// TODO: PROMISE RETURN

	/**
	 * Sends an HTTP `DELETE` request to remove a stored draft by
	 * its database `_id`; notifies user if successful.
	 * 
	 * @param  {string}   id             The id of the draft to delete
	 * @param  {Boolean}  $1.notify			 Whether to notify the user (toast)
	 * @param  {Function} cb             Callback to run when draft deleted
	 */
	discardDraft(id, { notify = true } = {}, cb) {
  	this.DraftResource.remove({ id }).$promise.then(response => {
			notify&&this.$mdToast.show(this.toasts.discardDraft);
	  	cb&&cb(response);
  	});
	}
	// TODO: PROMISE RETURN

	/**
	 * Immediately load last saved draft of current scene.
	 * @param  {Boolean}  $0.notify 			Whether to notify the user (toast)
	 * @param  {Function} cb              Callback to run when draft loaded
	 */
	revertToDraft({ notify = true } = {}, cb) {
		this.checkForDraft({ notify: false }).then(drafts => {
    	this.loadDraft(drafts[0]._id, { notify: true }, cb);
  	});
		notify&&this.$mdToast.show(this.toasts.revertToDraft);
	}
	// TODO: PROMISE RETURN

	/**
	 * Sends an HTTP `POST` request to save a draft of the current scene.
	 * 
	 * @param  {Boolean}  $0.notify 			Whether the notify the user (toast)
	 * @param  {Function} cb              Callback to run when draft saved
	 */
	saveDraft({ notify = true } = {}, cb) {
  	this.DraftResource.save({
  		content: this.sceneData,
  		kind: 'Scene',
  		original: this.sceneData._id
  	}).$promise.then(draft => {
	  	cb&&cb(draft);
	  	this.lastDraft = draft.content;
	    notify&&this.$mdToast.show(this.toasts.saveDraft).then(response => {
	      if ( response == 'ok' ) {
	      	this.publish();
	      }
	    });
  	});
  }
	// TODO: PROMISE RETURN

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
			  	this.saveDraft({ notify: false });
	      	cb&&cb();
	      	return this.$mdToast.show(this.toasts.itemRemoved);
			  } 
      }
    }).then(response => {
      if ( response == 'ok' ) {
      	this.publish();
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
			  	this.publish();
	      }
	    });
	  }
	}

	/**
	 * Sends an HTTP `POST` or `PATCH` request via the `$tourApi`'s
	 * scene resource to publish (save) the current scene.
	 *
	 * If the scene is new, the first parameter of this method can be
	 * set to `true` to send the request as a new scene creation. If
	 * left to default, it will assume the scene already exists and
	 * is being updated. Uses lodash's `pick()` method to grab applicable
	 * properties without creating them.
	 * 
	 * @param  {Boolean}  _newData			Whether incoming data should be treated as new
	 * @param  {Boolean}  $1.notify 		Whether to notify the user (toast)
	 * @param  {Function} cb      			Callback to run when item published
	 */
	publish(_newData = false, { notify = true } = {}, cb) {
		let action = 'update';
		const newData = _newData ? _newData : pick(this.sceneData, [
			'_id',
			'code',
			'name',
			'assets',
			'entities',
			'hotSpots',
			'sceneLinks',
			'panorama',
			'parent',
			'script'
		]);
		newData.updatedAt = new Date();
		if (_newData) {
			newData.createdAt = newData.updatedAt;
			action = 'save';
		}

  	this.SceneResource[action](_newData ? null : { 
  		id: newData._id
  	}, newData)
  	.$promise.then(scene => {
			this.lastPublished = this.sceneData || scene;
			// this.discardDraft({ notify: false })
	  	this.unpublishedChanges = false;
  		notify&&this.$mdToast.show(this.toasts.publish);
  		cb&&cb(scene);
  	});
	}
	//
}

export default {
  name: '$aframeScene',
  fn: $aframeScene
};