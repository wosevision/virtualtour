import angular from 'angular';
import ngMaterial from 'angular-material';

import PopupError from './error/error';
import { InfoModule } from './info/info';
import { LoginModule } from './login/login';
import PopupWelcome from './welcome/welcome';

import { PopupService } from './popup.service';

let popupModule = angular.module('popup', [
  ngMaterial,
  PopupError,
	InfoModule,
	LoginModule,
	PopupWelcome
])

.service('$popupWindow', PopupService)

.name;

export default popupModule;
