import angular from 'angular';

import UtilDom from './dom/dom';
import UtilModel from './model/model';
import UtilResource from './resource/resource';

let utilModule = angular.module('util', [
  UtilDom,
  UtilModel,
  UtilResource
])

.name;

export default utilModule;
