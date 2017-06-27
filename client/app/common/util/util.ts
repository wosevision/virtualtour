import angular from 'angular';

import { ToNumberDirective } from './to-number.directive';
import { BindCompileDirective } from './bind-compile.directive';

export const UtilModule = angular.module('util', [])

.directive('toNumber', ToNumberDirective)
.directive('bindCompile', BindCompileDirective)

.name;
