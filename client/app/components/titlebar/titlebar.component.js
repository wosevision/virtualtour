import template from './titlebar.html';
import './titlebar.scss';

const titleBarComponent = {
	template,
  transclude: true,
  bindings: {
  	title: '@',
  	mobile: '<'
  }
}

export default titleBarComponent;
