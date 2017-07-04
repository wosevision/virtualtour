import angular from 'angular';
import ngMaterial from 'angular-material';
import 'ng-wig';

import { EditorDirective } from './editor.directive';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';

import { EditorDialogController as controller} from './editor-dialog.controller';
import template from './editor-dialog.html';

import './editor.scss';

export const EditorModule = angular.module('aframe.editor', [
  ngMaterial, 'ngWig'
])

.directive('editable', EditorDirective)

.component('sceneEditor', EditorComponent)

.service('$aframeEditor', EditorService)

.config(($mdPanelProvider) => {
  'ngInject';
	$mdPanelProvider.definePreset('editorDialog', {
		template,
		controller,
    attachTo: angular.element(document.body),
    controllerAs: '$ctrl',
	  bindToController: true,
    panelClass: 'editor-dialog',
		clickOutsideToClose: true,
		escapeToClose: true,
    focusOnOpen: true,
    zIndex: 85
  });
})

.constant('EDITOR_MESSAGES', {
	confirm: {
		textContent: 'Are you sure?',
		action: 'Confirm',
		highlightAction: true,
		highlightClass: 'md-warn',
		position: 'bottom left',
		hideDelay: 0
	},
	itemRemoved: {
		textContent: 'Item removed!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	itemAdded: {
		textContent: 'Item added!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	draftLoaded: {
		textContent: 'Draft loaded!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	saveDraft: {
		textContent: 'Draft saved!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	draftFound: {
		textContent: 'Saved drafts found!',
		action: 'Load most recent',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	publish: {
		textContent: 'Changes published!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 5000
	},
	discardDraft: {
		textContent: 'Draft discarded!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 1000
	},
	revertToDraft: {
		textContent: 'Reverted to last draft!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 2000
	}
})

.name;
