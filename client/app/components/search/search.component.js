import template from './search.html';
import controller from './search.controller';
import './search.scss';

const searchComponent = {
  template,
  controller,
	bindings: {
		query: '@',
		filters: '<'
	}
};

export default searchComponent;
