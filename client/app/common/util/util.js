import angular from 'angular';

import UtilDom from './dom/dom';
import UtilModel from './model/model';
import { ResourceModule } from './resource/resource';

let utilModule = angular.module('util', [
  UtilDom,
  UtilModel,
  ResourceModule
])

.name;

export default utilModule;
