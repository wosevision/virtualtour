import angular from 'angular';
const bulk = require('bulk-require');

const components = bulk('app/components', ['./**/!(*index|*_spec|app_*).js']);
const componentModule = angular.module('app.components', []);
const TYPEID_POS = 1; // position of the component's toDeclare type

function declare(componentMap, toDeclare = null) {
  Object.keys(componentMap).forEach((key) => {

    const item = componentMap[key];

    if (!item) {
      return;
    }

    if (item.fn) {
    	switch (toDeclare) {
    		case 'run':
    		case 'config':
/***** UNCOMMENT TO DEBUG *****/
// console.log(toDeclare, item.fn);
    			componentModule[toDeclare](item.fn);
    			break;
    		default:
/***** UNCOMMENT TO DEBUG *****/
// console.log(toDeclare, item.name, item.fn);
      		componentModule[toDeclare](item.name, item.fn);
    			break;
    	}
    } else {
/***** UNCOMMENT TO DEBUG *****/
// console.log(item, key);
      declare(item, key.split('_')[TYPEID_POS]);
    }
  });
}

declare(components);

export default componentModule;
