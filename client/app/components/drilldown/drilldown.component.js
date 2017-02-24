import template from './drilldown.html';
import controller from './drilldown.controller';
import './drilldown.scss';

const drilldownComponent = {
  template,
  controller,
	controllerAs: 'item',
	bindings: {
		nextLevel: '@',
		children: '<'
	}
};

export default drilldownComponent;
