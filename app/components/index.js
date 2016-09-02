// import angular from 'angular';
const bulk = require('bulk-require');

const components = bulk('app/components', ['./**/!(*index|*_spec|app_*).js']);

// let componentPath = __dirname.split('/');
//     	console.log(componentPath);
// componentPath.shift();
//     	console.log(componentPath);
// const component = componentPath.join('.');
const componentModule = angular.module('app.components', []);

function declare(componentMap, toDeclare = null) {
  Object.keys(componentMap).forEach((key) => {

    // console.log(key);

    let item = componentMap[key];
    if (!item) {
      return;
    }

    if (item.fn) { // && typeof item.fn === 'function'
    	// console.log(key);
    	// let toDeclare = key.split('_')[1];
    	switch (toDeclare) {
    		case 'run':
    		case 'config':
    // console.log(toDeclare);
    			componentModule[toDeclare](item.fn);
    			break;
    		default:
    // console.log(toDeclare);
      		componentModule[toDeclare](item.name, item.fn);
    			break;
    	}
    } else {
    	// console.log(item, key);
      declare(item, key.split('_')[1]);
      // declare(item);
    }
  });
}

declare(components);

export default componentModule;
