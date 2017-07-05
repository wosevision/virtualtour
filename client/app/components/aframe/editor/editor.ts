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

.name;
