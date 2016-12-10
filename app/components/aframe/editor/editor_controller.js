import { isUndefined, equals, element } from 'angular';

const attachTo = element(document.body);
let draftTimeout;

class EditorCtrl {
	constructor(
		$mdPanel, $mdDialog,
		$aframeScene
	) {
		'ngInject';
	  // INIT VARS
		this.unpublishedChanges = false;
		this.$mdPanel = $mdPanel;
		this.$mdDialog = $mdDialog;
		this.$aframeScene = $aframeScene;
	}
	$onInit() {
		const SceneCtrl = this.SceneCtrl;
		const updateSceneData = data => {
			Object.assign(SceneCtrl, data);
			this.$aframeScene.scene = data;
		}
		//
		this.publish = (newData, notify = true) => {
			this.$aframeScene.publish(newData, { notify }, updateSceneData);
		}
		this.saveDraft = (notify = true) => {
			this.$aframeScene.saveDraft({ notify });
		}
		this.loadDraft = (draft, notify = true) => {
			this.$aframeScene.loadDraft(draft._id, { notify }, updateSceneData);
		}
		this.revertToDraft = (notify = true) => {
			this.$aframeScene.revertToDraft({ notify }, updateSceneData);
		}
		this.discardDraft = (draft, notify = true) => {
			const confirm = this.$mdDialog.confirm()
        .title('Are you sure?')
        .textContent('This action cannot be undone.')
        .ok('Confirm')
        .cancel('Cancel');
	    this.$mdDialog.show(confirm).then(() => {
				this.$aframeScene.discardDraft(draft._id, { notify });
	    });
		}
		this.checkForDraft = (notify = true) => {
			this.draftList = null;
			this.$aframeScene.checkForDraft({ notify }, updateSceneData).then(drafts => {
				this.draftList = drafts;
			});
		}
		SceneCtrl.checkForDraft = this.checkForDraft;
		// 
		//
		const contextMenu = ev => {
		  ev.stopPropagation();
			if (!SceneCtrl._rightClick) {
				SceneCtrl._rightClick = ev;
				ev.preventDefault();
				SceneCtrl.$sceneEl.on('mouseup', () => {
					SceneCtrl._rightClick = false;
					SceneCtrl.$sceneEl.off('mouseup')
				});
			}
		};
		SceneCtrl.$sceneEl.on('contextmenu', contextMenu);
		//
		SceneCtrl._editable = true;
		SceneCtrl.openEditor = (ev, item, collection) => {
			// Animation to open dialog from and close to right click
			// Position to hold in bottom left of screen
			const position = this.$mdPanel.newPanelPosition()
	      .absolute()
	      .bottom(0)
	      .left(0);
	    const animation = this.$mdPanel.newPanelAnimation()
	      .openFrom({top: ev.clientY - 150, left: ev.clientX})
	      .withAnimation(this.$mdPanel.animation.SCALE)
	      .closeTo({top: ev.clientY - 150, left: ev.clientX});
	    const onDomRemoved = () => {
				this.panelRef&&this.panelRef.destroy();
			};

			const locals = { item };
	    locals.publish = this.publish;
	    locals.saveDraft = this.saveDraft;
			locals.removeThis = () => {
				this.$aframeScene.removeItemFrom(item, collection, () => {
					this.panelRef&&this.panelRef.close();
				});
			}
			locals.closeDialog = () => {
				this.panelRef&&this.panelRef.close();
			}
	    // Build dialog config
			const config = {
				templateUrl: 'aframe/editor/_editor-dialog.html',
				// panelClass: 'demo-menu-example',
				controller: 'EditorDialogCtrl',
			  bindToController: true,
			  controllerAs: '$ctrl',
				clickOutsideToClose: true,
				escapeToClose: true,
				focusOnOpen: true,
				zIndex: 85,
				onDomRemoved,
				position,
				animation,
				attachTo,
				locals
			};
	    this.$mdPanel.open(config)
	      .then(result => {
	        this.panelRef = result;
	      });
		}
	}
	addItem(ev, collection) {
		let locals;
		switch(collection) {
			case 'sceneLinks':
				locals = { item: { scene: '', position: [0,0,0], rotation: [0,0,70] } };
				break;
			case 'hotSpots':
				locals = { item: { linked: false, name: '', desc: '', feature: '', position: [0,0,0] } };
				break;
		}
		locals.newItem = true;
    locals.publish = () => {
    	this.$mdDialog&&this.$mdDialog.hide('ok');
    }
		locals.removeThis = () => {
			this.$mdDialog&&this.$mdDialog.cancel();
		}
		locals.closeDialog = locals.removeThis;
    locals.saveDraft = this.saveDraft;
    this.$mdDialog.show({
      controller: 'EditorDialogCtrl',
			templateUrl: 'aframe/editor/_editor-dialog.html',
      parent: attachTo,
      targetEvent: ev,
		  bindToController: true,
		  controllerAs: '$ctrl',
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true,
			locals
    })
    .then(answer => {
    	if (answer === 'ok') {
				this.$aframeScene.addItemTo( locals.item, this.SceneCtrl[collection], newData => {
					this.$aframeScene.scene[collection] = newData;
				});
    	}
    }, () => {
			// this.$aframeScene.removeItemFrom(locals.item, this.SceneCtrl[collection]);
			this.$aframeScene.discardDraft();
    });
	}
	newScene(ev) {
		let locals = { 
			item: {
				code: '',
				name: '',
				panorama: '',
				parent: ''
			}
		};
		locals.newItem = true;
    locals.publish = () => {
    	this.$mdDialog&&this.$mdDialog.hide('ok');
    }
		locals.removeThis = () => {
			this.$mdDialog&&this.$mdDialog.cancel();
		}
		locals.closeDialog = locals.removeThis;
    locals.saveDraft = this.saveDraft;
    this.$mdDialog.show({
      controller: 'EditorDialogCtrl',
			templateUrl: 'aframe/editor/_editor-dialog.html',
      parent: attachTo,
      targetEvent: ev,
		  bindToController: true,
		  controllerAs: '$ctrl',
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true,
			locals
    })
    .then(answer => {
    	if (answer === 'ok') {
				this.$aframeScene.publish(locals.item);
    	}
    }, () => {
			this.$aframeScene.discardDraft();
    });
	}
}

export default {
  name: 'EditorCtrl',
  fn: EditorCtrl
};