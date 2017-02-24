import angular from 'angular';

import toNumberDirective from './toNumber.directive';

let modelModule = angular.module('util.model', [])

.directive('toNumber', toNumberDirective)

.name;

export default modelModule;
