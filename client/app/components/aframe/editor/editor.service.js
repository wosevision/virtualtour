import { pick } from 'lodash';
import { isObject, isArray } from 'angular';
/**
 * Service for handling all CRUD operations pertaining to scenes.
 *
 * Contains methods for drafting and publishing; interfaces directly
 * with the `$aframeScene` service for a reference to the current
 * scene object. Uses:
 * 
 * - ng-material's `$mdToast` service to display UI messages to user
 * - the `$tourApi`'s scene resource and the `DraftResource` for CRUD ops
 * - the 'EDITOR_MESSAGES' constant to provide prebuilt dialogs and toasts
 * 
 * @param  {object} $mdToast        ng-material's toast service
 * @param  {object} $tourApi        Tour $resource factory service
 * @param  {object} DraftResource   Draft $resource factory
 * @param  {object} EDITOR_MESSAGES Constant to define toast configs
 */
class EditorService {
	constructor($mdToast, $aframeScene, $tourApi, DraftResource, EDITOR_MESSAGES) {
		'ngInject';
		this.$mdToast = $mdToast;
		this.$aframeScene = $aframeScene;
		this.DraftResource = DraftResource;
		this.SceneResource = $tourApi.scene;
		/**
		 * Property to hold an array of fully initialized toast config objects; loops
		 * through `EDITOR_MESSAGES` and sets properties using the methods provided
		 * by `$mdToast.simple()`'s return.
		 *
		 * @memberof EditorService
		 * @type {Object}
		 */
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
	 * Sends an HTTP `POST` or `PATCH` request via the `$tourApi`'s
	 * scene resource to publish (save) the current scene.
	 *
	 * If the scene is new, the first parameter of this method can be
	 * passed the new scene data, which makes it implicity truthy and
	 * tells the method to send the request as a new scene creation. If
	 * left to default, it will stay false and the method will assume
	 * the scene already exists and is being updated.
	 * 
	 * In the case of an update, Lodash's `pick()` method is used to grab
	 * applicable properties from the current `$aframeScene.scene` _without_
	 * creating ones that don't exist. A new `updatedAt` property is assigned
	 * a date for every action; if the data was new, the same date is given
	 * to a `createdAt` property.
	 * 
	 * @param  {Boolean}  _newData	Whether incoming data should be treated as new
	 * @param  {Boolean}  notify 		Whether to notify the user (toast)
	 * @return {Promise} 						Resolves to latest scene data
	 */
	publish(_newData = false, notify = true) {
		let action = 'update';
		const newData = _newData || pick(this.$aframeScene.scene, [
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

  	return this.SceneResource[action](_newData ? null : { 
  		id: newData._id
  	}, newData)
  	.$promise.then(scene => {
			this.lastPublished = this.$aframeScene.scene || scene;
  		notify&&this.$mdToast.show(this.toasts.publish);
  		return scene;
  	});
	}

	/**
	 * Sends an HTTP `POST` request to save a draft of the current scene.
	 * Offers to publish the scene when the draft is done saving; calls
	 * `publish()` if the user confirms.
	 * 
	 * @param  {Boolean} notify 	Whether to notify the user (toast)
	 * @return {Promise} 					Resolves to saved draft
	 */
	saveDraft(notify = true) {
  	return this.DraftResource.save({
  		content: this.$aframeScene.scene,
  		kind: 'Scene',
  		original: this.$aframeScene.scene._id
  	}).$promise.then(draft => {
	  	this.lastDraft = draft.content;
	    notify&&this.$mdToast.show(this.toasts.saveDraft).then(response => {
	      if ( response == 'ok' ) {
	      	this.publish();
	      }
	    });
	    return draft;
  	});
  }

	/**
	 * If there is scene data available, queries the database by the current
	 * scene ID via the `DraftResource` factory to check for active drafts
	 * held by the current logged in user.
	 * 
	 * @param  {Boolean}  notify 		Whether to notify the user (toast)
	 * @return {Promise}            Promise that will resolve to draft list
	 */
	checkForDraft(notify = true) {
		return (this.$aframeScene.scene)&&this.DraftResource.query({
			sort: '-updatedAt',
			filter: {
				original: this.$aframeScene.scene._id
			}
		}).$promise;
	}

	/**
	 * Informs a user that draft[s] have been found for the scene
	 * they are viewing and offers to load the most recent draft; calls
	 * `loadDraft()` if the user confirms and supplies it the `_id` of
	 * the first draft in the found draft list.
	 * 
	 * @param  {Array}   drafts A list of available drafts
	 * @return {Promise}      	Resolves to toast result » loadDraft promise
	 */
	draftFound(drafts) {
		return this.$mdToast.show(this.toasts.draftFound)
			.then( response => (response === 'ok') && this.loadDraft(drafts[0]._id) );
	}

	/**
	 * Gets a single stored draft by its database `_id` and passes
	 * the result to a callback; notifies user that draft was loaded and
	 * offers to publish.
	 * 
	 * @param  {string}   id        The id of the draft to fetch
	 * @param  {Boolean}  notify 		Whether to notify the user (toast)
	 * @return {Promise} 					  Resolves to content of the loaded draft
	 */
	loadDraft(id, notify = true) {
  	return this.DraftResource.get({ id }).$promise.then(draft => {
	  	this.lastDraft = draft.content;
	    notify && this.$mdToast.show(this.toasts.draftLoaded)
		    .then( response => ( response === 'ok' ) && this.publish() );
	    return draft.content;
  	});
	}

	/**
	 * Immediately load last saved draft of current scene.
	 * @param  {Boolean}  notify 		Whether to notify the user (toast)
	 * @return {Promise} 					  Resolves to state of confirm toast
	 */
	revertToDraft(notify = true) {
		return this.checkForDraft(false)
			.then( drafts => this.loadDraft(drafts[0]._id, false) )
	  	.then( draftContent => notify && this.$mdToast.show(this.toasts.revertToDraft) );	
	}

	/**
	 * Sends an HTTP `DELETE` request to remove a stored draft by
	 * its database `_id`; notifies user if successful.
	 * 
	 * @param  {string}   id        The id of the draft to delete
	 * @param  {Boolean}  notify 		Whether to notify the user (toast)
	 * @return {Promise} 					  Resolves to state of confirm toast
	 */
	discardDraft(id, notify = true) {
  	return this.DraftResource.remove({ id }).$promise
	  	.then( discardedDraft => notify && this.$mdToast.show(this.toasts.discardDraft) );
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
}

export default EditorService;