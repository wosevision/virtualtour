import angular from 'angular';
const bulk = require('bulk-require');

const components = bulk(__dirname, ['./**/!(*index|*_spec).js']);

let componentPath = __dirname.split('/');
componentPath.shift();
const component = componentPath.join('.');
const componentModule = angular.module(component, []);

function declare(componentMap, toDeclare) {
  Object.keys(componentMap).forEach((key) => {
    let item = componentMap[key];

      //console.log(key)
    if (!item) {
      return;
    }

    if (item.fn) {
      //console.log(toDeclare, item.name, item.fn);
      componentModule[toDeclare](item.name, item.fn);
    } else {
      declare(item, key.split('_')[1]);
    }
  });
}

declare(components);

export default componentModule;
