import angular from 'angular';
import ngMaterial from 'angular-material';

import PopupError from './error/error';
import PopupInfo from './info/info';
import PopupLogin from './login/login';
import PopupWelcome from './welcome/welcome';

import { PopupService } from './popup.service';

let popupModule = angular.module('popup', [
  ngMaterial,
  PopupError,
	PopupInfo,
	PopupLogin,
	PopupWelcome
])

.service('$popupWindow', PopupService)

.name;

export default popupModule;
