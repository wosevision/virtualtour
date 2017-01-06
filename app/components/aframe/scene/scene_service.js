import { isArray, isObject } from 'angular';
import { pick } from 'lodash';

/** @function Shorthand helper for getting all own property names of object */
function getProps(obj) {
	return Object.getOwnPropertyNames(obj);
}

/**
 * Scene service class
 * @memberOf app.components.aframe.scene
 */
class $aframeScene {
	/**
	 * Initialize dependencies; convert EDITOR_MESSAGES constant
	 * into $mdToast configs for use in instance methods
	 * @param  {object} $timeout        
	 * @param  {object} $mdToast        
	 * @param  {object} $tourApi        Tour $resource factory service
	 * @param  {object} DraftResource   Draft $resource factory
	 * @param  {object} EDITOR_MESSAGES Constant to define toast configs
	 */
	constructor(
		$timeout, $mdToast,
		$tourApi, DraftResource,
		EDITOR_MESSAGES) {
		'ngInject';
		this.$timeout = $timeout;
		this.$mdToast = $mdToast;
		this.SceneResource = $tourApi.scene;
		this.DraftResource = DraftResource;
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
	 * Getter/setter for internal scene data
	 * @type {object}
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
		this.sceneData = this.lastPublished = sceneData; // { _id, sceneLinks, hotSpots, sky };
	}
	/**
	 * Getter/setter for formatting sky URL from sceneData
	 * @type {string}
	 * @example
	 * 'http://res.cloudinary.com/uoit-virtual-tour/image/upload/v1480529929/scenes/panorama/k23dnerigdctblxgq5vm.jpg'
	 */
	get sky() {
		return this.sceneData ? [ this.sceneData.panorama.version, this.sceneData.panorama.public_id].join('/') : null;
	}
	set sky(panorama) {
		this.sceneData.panorama = panorama;
	}
	//
	// DRAFT METHODS
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
	discardDraft(id, { notify = true } = {}, cb) {
  	this.DraftResource.remove({ id }).$promise.then(response => {
			notify&&this.$mdToast.show(this.toasts.discardDraft);
	  	cb&&cb(response);
  	});
	}
	revertToDraft({ notify = true } = {}, cb) {
		// if (this.lastDraft) {
		// 	this.sceneData = this.lastDraft;
		// 	cb&&cb(this.sceneData);
		// } else {
			this.checkForDraft({ notify: false }).then(drafts => {
      	this.loadDraft(drafts[0]._id, { notify: true }, cb);
	  	});
			// this.saveDraft({ notify: false }, cb);
		// }
		notify&&this.$mdToast.show(this.toasts.revertToDraft);
	}
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
  //
  // SCENE MANIPULATION
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
	//
	// PUBLISHING
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
		// const action = _newData ? 'save' : 'update';

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