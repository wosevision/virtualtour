import angular from 'angular';
import bindCompileDirective from './bindCompile.directive';

const domModule = angular.module('util.dom', [])

.directive('bindHtmlCompile', bindCompileDirective)

.name;

export default domModule;
