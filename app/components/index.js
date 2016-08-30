import angular from 'angular';
const bulk = require('bulk-require');

const components = bulk(__dirname, ['./**/!(*index|*_spec|app_*).js']);

let componentPath = __dirname.split('/');
componentPath.shift();
const component = componentPath.join('.');
const componentModule = angular.module(component, []);

function declare(componentMap, toDeclare) {
  Object.keys(componentMap).forEach((key) => {
    let item = componentMap[key];
    // console.log(item);
    if (!item) {
      return;
    }

    if (item.fn) { // && typeof item.fn === 'function'
    	switch (toDeclare) {
    		case 'run':
    		case 'config':
    			componentModule[toDeclare](item.fn);
    			break;
    		default:
      		componentModule[toDeclare](item.name, item.fn);
    			break;
    	}
    } else {
      declare(item, key.split('_')[1]);
    }
  });
}

declare(components);

export default componentModule;
