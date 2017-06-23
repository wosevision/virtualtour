import angular from 'angular';

import Popup from './popup/popup';
import User from './user/user';
import Util from './util/util';

import './common.scss';

import AframeModule from './aframe/aframe';
AframeModule.registerAll();

let commonModule = angular.module('app.common', [
  Popup,
  User,
  Util
])
  
.name;

export default commonModule;
