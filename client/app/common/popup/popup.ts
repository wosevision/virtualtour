import angular from 'angular';
import ngMaterial from 'angular-material';

import { ErrorModule } from './error/error';
import { InfoModule } from './info/info';
import { LoginModule } from './login/login';
import { WelcomeModule } from './welcome/welcome';

import { PopupService } from './popup.service';

export const PopupModule = angular.module('popup', [
  ngMaterial,
  ErrorModule,
	InfoModule,
	LoginModule,
	WelcomeModule
])

.service('$popupWindow', PopupService)

.name;
