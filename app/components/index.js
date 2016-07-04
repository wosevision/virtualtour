import angular from 'angular';

import './constants'
import './main';
import './filters';
import './entity';
import './entities';
import './sidebar';
import './scene';

const components = angular.module('app.components', [
	'app.components.constants',
	'app.components.main',
	'app.components.filters',
	'app.components.entity',
	'app.components.entities',
	'app.components.sidebar',
	'app.components.scene'
]);

export default components;
