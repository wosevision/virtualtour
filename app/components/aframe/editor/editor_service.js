import { pick } from 'lodash';
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
class $aframeEditor {
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
		 * @memberof $aframeEditor
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
	 * @param  {Boolean}  $1.notify Whether to notify the user (toast)
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
	 * @param  {Boolean} $0.notify Whether the notify the user (toast)
	 * @return {Promise} 					 Resolves to saved draft
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
	 * @param  {Boolean}  $0.notify Whether the notify the user (toast)
	 * @param  {Function} cb        Callback to run when draft loaded
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
	 * @param  {Boolean}  $1.notify Whether to notify the user (toast)
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
	 * @param  {Boolean}  $0.notify 			Whether to notify the user (toast)
	 */
	revertToDraft(notify = true) {
		this.checkForDraft(false)
			.then( drafts => this.loadDraft(drafts[0]._id, false) )
	  	.then( draftContent => notify && this.$mdToast.show(this.toasts.revertToDraft) );	
	}

	/**
	 * Sends an HTTP `DELETE` request to remove a stored draft by
	 * its database `_id`; notifies user if successful.
	 * 
	 * @param  {string}   id             The id of the draft to delete
	 * @param  {Boolean}  $1.notify			 Whether to notify the user (toast)
	 */
	discardDraft(id, notify = true) {
  	this.DraftResource.remove({ id }).$promise
	  	.then( discardedDraft => notify && this.$mdToast.show(this.toasts.discardDraft) );
	}
	//NOTDONE
}

export default {
  name: '$aframeEditor',
  fn: $aframeEditor
};