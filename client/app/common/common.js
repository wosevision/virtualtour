import angular from 'angular';

import ButtonBar from './buttonbar/buttonbar';
import Popup from './popup/popup';
import TitleBar from './titlebar/titlebar';
import User from './user/user';
import Util from './util/util';

let commonModule = angular.module('app.common', [
  ButtonBar,
  Popup,
  TitleBar,
  User,
  Util
])
  
.name;

export default commonModule;
