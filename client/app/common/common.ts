import angular from 'angular';

import Popup from './popup/popup';
import User from './user/user';
import { UtilModule } from './util/util';
import { ResourceModule } from './resource/resource';

import './common.scss';

import AframeModule from './aframe/aframe';
AframeModule.registerAll();

let commonModule = angular.module('app.common', [
  Popup,
  User,
  UtilModule,
  ResourceModule,
])
  
.name;

export default commonModule;
