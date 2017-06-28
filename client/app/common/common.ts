import angular from 'angular';

import { PopupModule } from './popup/popup';
import User from './user/user';
import { UtilModule } from './util/util';
import { ResourceModule } from './resource/resource';

import './common.scss';

import AframeModule from './aframe/aframe';
AframeModule.registerAll();

let commonModule = angular.module('app.common', [
  PopupModule,
  User,
  UtilModule,
  ResourceModule,
])
  
.name;

export default commonModule;
